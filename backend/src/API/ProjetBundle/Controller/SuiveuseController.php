<?php

namespace API\ProjetBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


use API\ProjetBundle\Entity\Personne;


/**
    //USER
    POST /travail : create un travail
    PUT /travail/id : update un travail existant
    DELETE /travail/id/ : delete un travail

**/

class SuiveuseController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/suiveuse/{user}")
    * @ParamConverter("user", class="APIProjetBundle:Personne", options={"mapping": {"user": "surnom"}, "entity_manager" = "gretiadb"})
    */
    public function dashboardAction(Personne $user)
    {
        
        return $user;
    }

    

}
