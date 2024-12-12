<?php

// src/EventSubscriber/TokenSubscriber.php
namespace App\EventSubscriber;

use App\Controller\IAPTokenAuthenticatedController;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use GuzzleHttp;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Psr\Log\LoggerInterface;


use Firebase\JWT\CachedKeySet;
use Firebase\JWT\JWT;
use InvalidArgumentException;

class IAPTokenSubscriber implements EventSubscriberInterface
{
  private CachedKeySet $cachedKeys;

  private static ?FilesystemAdapter $jwksCache = null;

  public function __construct(
    private string $jwksUri,
    private bool $enabled,
    private LoggerInterface $logger,
    private GuzzleHttp\Client $guzzleClient,
    private GuzzleHttp\Psr7\HttpFactory $guzzleFactory
  ) {
    if ($this->enabled && self::$jwksCache === null) {
      self::$jwksCache =
        new FilesystemAdapter($namespace = 'jwkscache');
    }
    if ($this->enabled) {
      if ($this->jwksUri === 'undefined') {
        throw new InvalidArgumentException("JWKS_URI must be defined when IAP_VALIDATION_ENABLED is true");
      }

      $this->logger->info("Fetching public keys for {$this->jwksUri}...");

      $this->cachedKeys = new CachedKeySet(
        $jwksUri,
        $this->guzzleClient,
        $this->guzzleFactory,
        self::$jwksCache,
        null, // $expiresAfter int seconds to set the JWKS to expire
        true  // $rateLimit    true to enable rate limit of 10 RPS on lookup of invalid keys
      );
    }
  }

  public function onKernelController(ControllerEvent $event): void
  {
    // If we don't have a jwksUri defined do nothing.
    if (!$this->enabled) {
      $this->logger->warning("IAPTokenSubscriber is disabled.");
      $event->getRequest()->attributes->set("identity_id", "12345");
      return;
    }

    $controller = $event->getController();

    // when a controller class defines multiple action methods, the controller
    // is returned as [$controllerInstance, 'methodName']
    if (is_array($controller)) {
      $controller = $controller[0];
    }

    if ($controller instanceof IAPTokenAuthenticatedController) {
      $token = $event->getRequest()->headers->get('x-goog-iap-jwt-assertion');
      if ($token) {
        $decoded = JWT::decode($token, $this->cachedKeys);

        //Set request attributes and continue.
        $event->getRequest()->attributes->set("identity_jwtToken", $token);
        $event->getRequest()->attributes->set("identity_id", $decoded->sub);
        $event->getRequest()->attributes->set("identity_email", $decoded->email);
      } else {
        throw new AccessDeniedHttpException('This action needs a valid token!');
      }
    }
  }

  public static function getSubscribedEvents(): array
  {
    return [
      KernelEvents::CONTROLLER => 'onKernelController',
    ];
  }
}
