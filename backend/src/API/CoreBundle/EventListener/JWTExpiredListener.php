<?php

namespace API\CoreBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

class JWTExpiredListener
{
    /**
		 * @param JWTExpiredEvent $event
		 */
		public function onJWTExpired(JWTExpiredEvent $event)
		{
		   //print_r("coucou");
		    /** @var JWTAuthenticationFailureResponse */
		    $response = $event->getResponse();

		    $response->setMessage('Votre accès a expiré, veuillez vous reconnecter');
		}
}