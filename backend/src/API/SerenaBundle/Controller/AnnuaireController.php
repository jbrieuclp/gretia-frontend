<?php

namespace API\SerenaBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;


class AnnuaireController extends FOSRestController implements ClassResourceInterface
{

    /**
     * @Rest\View()
     * @ Security("has_role('ROLE_READER')")
	   *
     * @Rest\Get("/users")
     */
    public function usersAction(Request $request)
    {
      $filtre = [];

      if ( !empty($request->query->get('nom')) ) 
      	$filtre['nom'] = $request->query->get('nom');

      if ( !empty($request->query->get('prenom')) ) 
      	$filtre['prenom'] = $request->query->get('prenom');

      $em = $this->getDoctrine()->getManager('serena_db');
    	return $em->getRepository('APISerenaBundle:Personne')->findBy($filtre, array('nom'=>'asc', 'prenom'=>'asc'));
    }

    /**
     * @Rest\View()
     * @ Security("has_role('ROLE_READER')")
	   *
     * @Rest\Get("/users/{userID}")
     */
    public function userAction(Request $request, $userID)
    {
      return $userID;
      //return $this->getDoctrine()->getRepository('APISerenaBundle:Personne')->findBy(array(), array('nom'=>'asc', 'prenom'=>'asc'));
    }
}
