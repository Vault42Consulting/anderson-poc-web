<?php

namespace App\Controller;

use App\Controller\IAPTokenAuthenticatedController;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HealthController extends AbstractController
{
    #[Route('/health', name: 'app_health')]
    public function index(): Response
    {
        return new Response('OK');
    }
}
