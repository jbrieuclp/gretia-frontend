<?php

namespace API\ProjetBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use API\ProjetBundle\Entity\Mission;
use API\ProjetBundle\Entity\Projet;
use API\ProjetBundle\Form\MissionType;

/**
    //MISSION
    GET /projet/id/missions : retourne les mission d'un projet
    GET /missions : retourne toutes les missions
    POST /mission : create nouvelle mission
    GET /mission/id : retourne une mission spécifique
    PUT /mission/id : update mission id
    DELETE /mission/id : delete mission id
    GET /mission/id/etat : retourne l'état de mission id
    GET /mission/id/projet : retourne le projet de mission id
    GET /mission/id/personnes : retourne les personnes de mission id
**/

class MissionController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"mission"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/projet/{id}/missions")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"entity_manager" = "gretiadb"})
    */
    public function getMissionsByProjetAction(Projet $projet)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $missions = $em->getRepository('APIProjetBundle:Mission')->findByProjet($projet);
        return $missions;
    }

    /**
    * @Rest\View(serializerGroups = {"mission"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/missions")
    */
    public function getMissionsAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $missions = $em->getRepository('APIProjetBundle:Mission')->findAll();
        return $missions;
    }

    /**
    * @Rest\View(serializerGroups = {"mission"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/mission/{id}")
    * @ParamConverter("mission", class="APIProjetBundle:Mission", options={"entity_manager" = "gretiadb"})
    */
    public function getMissionAction(Mission $mission)
    {
        return $mission;
    }

    /**
    * @Rest\View(serializerGroups = {"mission"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/mission")
    */
    public function postAction(Request $request)
    {
        $item = new Mission();
        $form = $this->createForm(MissionType::class, $item);
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $form->submit(json_decode($request->getContent(), true)); // Validation des données

        if ($form->isValid()) {
            $item->setCompteCreate($user->getId());
            $item->setCompteUpdate($user->getId());
            $em = $this->getDoctrine()->getManager('gretiadb');
            $em->persist($item);
            $em->flush();
            return $item;
        } else {
            return $form;
        }

    }
}
