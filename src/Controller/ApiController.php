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

  #[Route('/api/contacts', name: 'app_api_data', methods: ["GET"])]
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

  #[Route('/api/contacts/{contact_id}', name: 'app_api_put_data', methods: ['PUT'])]
  public function putData(Request $request, string $contact_id): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact/$contact_id";

    try {
      $contactData = json_decode($request->getContent(), true);

      $response = $this->guzzleClient->request('PUT', $serviceUrl, [
        'headers' => ['X-Goog-Authenticated-User-Id' => $request->attributes->get('identity_id')],
        'json'    => $contactData
      ]);

      $externalData = json_decode($response->getBody()->getContents(), true);

      return $this->json($externalData);
    } catch (\Exception $e) {
      // Handle any exceptions that occur during the request
      return $this->json(['error'  => $e->getMessage()], 500);
    }
  }

  #[Route('/api/contacts/{contact_id}', name: 'app_api_delete_data', methods: ['DELETE'])]
  public function deleteData(Request $request, string $contact_id): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact/$contact_id";

    try {
      $contactData = json_decode($request->getContent(), true);

      $response = $this->guzzleClient->request('DELETE', $serviceUrl, [
        'headers' => ['X-Goog-Authenticated-User-Id' => $request->attributes->get('identity_id')],
        'json'    => $contactData
      ]);

      $externalData = json_decode($response->getBody()->getContents(), true);

      return $this->json($externalData);
    } catch (\Exception $e) {
      // Handle any exceptions that occur during the request
      return $this->json(['error'  => $e->getMessage()], 500);
    }
  }

  #[Route('/api/contacts', name: 'app_api_post_data', methods: ["POST"])]
  public function postData(Request $request): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact";

    try {
      $contactData = json_decode($request->getContent(), true);

      $response = $this->guzzleClient->request('POST', $serviceUrl, [
        'headers' => ['X-Goog-Authenticated-User-Id' => $request->attributes->get('identity_id')],
        'json'    => $contactData
      ]);

      $externalData = json_decode($response->getBody()->getContents(), true);

      return $this->json($externalData);
    } catch (\Exception $e) {
      // Handle any exceptions that occur during the request
      return $this->json(['error'  => $e->getMessage()], 500);
    }
  }
}
