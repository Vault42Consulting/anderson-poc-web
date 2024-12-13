<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;
use Psr\Log\LoggerInterface;
use Google\Auth\ApplicationDefaultCredentials;

class ApiController extends AbstractController implements IAPTokenAuthenticatedController
{
  private $guzzleClient;
  private $targetAudience = 'anderson-poc-backend-service';


  public function __construct(Client $guzzleClient, private string $contactServiceUrlRoot, private LoggerInterface $logger)
  {
    $this->guzzleClient = $guzzleClient;
  }

  private function GetAuthHeaders(Request $request): array
  {
    if ($request->attributes->get('identity_jwtToken' !== null)) {
      $credentials = ApplicationDefaultCredentials::getIDTokenCredentials($this->targetAudience);
      $token = $credentials->fetchAuthToken()['id_token'];

      $headers = [
        'X-Serverless-Authorization' => 'Bearer ' . $token,
        'X-Backend-Service-UserId' => $request->attributes->get('identity_id')
      ];
      return $headers;
    } else {
      $headers = [
        'X-Backend-Service-UserId' => $request->attributes->get('identity_id')
      ];
      return $headers;
    }
  }

  #[Route('/api/contact', name: 'app_api_data', methods: ["GET"])]
  public function getContacts(Request $request): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact";

    try {
      $response = $this->guzzleClient->request('GET', $serviceUrl, [
        'headers' => $this->GetAuthHeaders($request)
      ]);

      $externalData = json_decode($response->getBody()->getContents(), true);

      return $this->json($externalData);
    } catch (\Exception $e) {
      // Handle any exceptions that occur during the request
      return $this->json(['error'  => $e->getMessage()], 500);
    }
  }

  #[Route('/api/contact/{contact_id}', name: 'app_api_put_data', methods: ['PUT'])]
  public function putContact(Request $request, string $contact_id): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact/$contact_id";

    try {
      $contactData = json_decode($request->getContent(), true);

      $response = $this->guzzleClient->request('PUT', $serviceUrl, [
        'headers' => $this->GetAuthHeaders($request),
        'json'    => $contactData
      ]);

      $externalData = json_decode($response->getBody()->getContents(), true);

      return $this->json($externalData);
    } catch (\Exception $e) {
      // Handle any exceptions that occur during the request
      return $this->json(['error'  => $e->getMessage()], 500);
    }
  }

  #[Route('/api/contact/{contact_id}', name: 'app_api_delete_data', methods: ['DELETE'])]
  public function deleteContact(Request $request, string $contact_id): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact/$contact_id";

    try {
      $contactData = json_decode($request->getContent(), true);

      $response = $this->guzzleClient->request('DELETE', $serviceUrl, [
        'headers' => $this->GetAuthHeaders($request),
        'json'    => $contactData
      ]);

      $externalData = json_decode($response->getBody()->getContents(), true);

      return $this->json($externalData);
    } catch (\Exception $e) {
      // Handle any exceptions that occur during the request
      return $this->json(['error'  => $e->getMessage()], 500);
    }
  }

  #[Route('/api/contact', name: 'app_api_post_data', methods: ["POST"])]
  public function createContact(Request $request): Response
  {
    $serviceUrl = "$this->contactServiceUrlRoot/contact";

    try {
      $contactData = json_decode($request->getContent(), true);

      $response = $this->guzzleClient->request('POST', $serviceUrl, [
        'headers' => $this->GetAuthHeaders($request),
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
