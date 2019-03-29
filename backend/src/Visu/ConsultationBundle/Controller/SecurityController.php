<?php
//OFSA/UserBundle/Controller/SecurityController.php

namespace Visu\ConsultationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;


class SecurityController extends Controller
{

	//Controler qui gère l'action lorsqu'un utilisateur se logue
	public function loginAction(Request $request)
	{

	    $authenticationUtils = $this->get('security.authentication_utils');

	    // get the login error if there is one
	    $error = $authenticationUtils->getLastAuthenticationError();

	    // last username entered by the user
	    $lastUsername = $authenticationUtils->getLastUsername();

	    return $this->render(
	        'VisuConsultationBundle:Security:login.html.twig',
	        array(
	            // last username entered by the user
	            'last_username' => $lastUsername,
	            'error'         => $error,
	        )
	    );
	}

		//Controler qui gère l'action lorsqu'un utilisateur se logue
	public function logoutAction(Request $request)
	{
		return $this->redirect($this->generateUrl('visu_security_login'));
	}

}