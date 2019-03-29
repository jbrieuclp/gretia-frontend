<?php

namespace API\CoreBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

class JWTInvalidListener
{
    /**
		 * @param JWTNotFoundEvent $event
		 */
		public function onJWTNotFound(JWTNotFoundEvent $event)
		{
		    $data = [
		        'status'  => '403 Forbidden',
		        'message' => 'Vous n\'avez pas d\'accès, veuillez vous connecter',
		    ];

		    $response = new JsonResponse($data, 403);

		    $event->setResponse($response);
		}


		/**
		 * @param JWTInvalidEvent $event
		 */
		public function onJWTInvalid(JWTInvalidEvent $event)
		{
		    $response = new JWTAuthenticationFailureResponse('Votre accès est invalide, veuillez vous reconnecter', 403);

		    $event->setResponse($response);
		}


}