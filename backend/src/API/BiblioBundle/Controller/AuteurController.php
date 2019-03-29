<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;

class AuteurController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"get_auteur"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/auteurs")
    */
    public function auteursAction(Request $request)
    {
      $term = null;

      if ( !empty($request->query->get('term')) ) 
        $term = $request->query->get('term');

      $em = $this->getDoctrine()->getManager('bibliodb');

      return $em->getRepository('APIBiblioBundle:Auteur')->search($term);
    }

    /**
    * @Rest\View(serializerGroups = {"get_auteur"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/auteur/types")
    */
    public function auteurTypesAction(Request $request)
    {
      $em = $this->getDoctrine()->getManager('bibliodb');
      return $em->getRepository('APIBiblioBundle:AuteurType')->findAll();
    }
}
