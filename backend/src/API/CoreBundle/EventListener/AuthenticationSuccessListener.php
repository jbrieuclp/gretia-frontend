<?php

namespace API\CoreBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    private $time_to_expire;
    public function __construct($time_to_expire) {
    	$this->time_to_expire = $time_to_expire;
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
     // $time_to_expire = $this->container->getParameter('jwt_token_ttl');

      $event->setData(array(
        'id' => $event->getUser()->getId(),
        'username' => $event->getUser()->getUsername(),
        'nom' => $event->getUser()->getNom(),
        'prenom' => $event->getUser()->getPrenom(),
        'token' => $event->getData()['token'],
        'expires_at'  => date('c', time() + $this->time_to_expire),
        'modules'  => $event->getUser()->getRoles(),
      ));
    }
}