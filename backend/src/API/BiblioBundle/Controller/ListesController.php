<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Form\Extension\Core\Type\TextType;


class ListesController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"auteurs"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/listes", name="_types_auteurs")
    */
    public function getListesAction(Request $request)
    {
      $listes = array(array('url' => $this->generateUrl('get_auteur_type_types_auteurs'), 'name' => 'Types d\'auteurs'));

      return $listes;
    }

}
