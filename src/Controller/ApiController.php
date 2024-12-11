<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;
use Psr\Log\LoggerInterface;

class ApiController extends AbstractController implements IAPTokenAuthenticatedController
{
  private $guzzleClient;

  public function __construct(Client $guzzleClient, private string $contactServiceUrlRoot, private LoggerInterface $logger)
  {
    $this->guzzleClient = $guzzleClient;
  }

  #[Route('/api/contacts', name: 'app_api_data')]
  public function getData(Request $request): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact";

    try {
      $response = $this->guzzleClient->request('GET', $serviceUrl, ['headers' => ['X-Goog-Authenticated-User-Id' => $request->attributes->get('identity_id')]]);

      $externalData = json_decode($response->getBody()->getContents(), true);

      return $this->json($externalData);
    } catch (\Exception $e) {
      // Handle any exceptions that occur during the request
      return $this->json(['error'  => $e->getMessage()], 500);
    }
  }
}
