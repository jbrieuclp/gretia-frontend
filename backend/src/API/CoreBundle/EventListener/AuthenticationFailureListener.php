<?php

namespace API\CoreBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;

class AuthenticationFailureListener
{
		/**
		 * @param AuthenticationFailureEvent $event
		 */
		public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
		{
		    $data = [
		        'status'  => '401 Unauthorized',
		        'message' => 'Mauvais identifiant ou mot de passe',
		    ];

		    $response = new JWTAuthenticationFailureResponse($data);

		    $event->setResponse($response);
		}
}