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
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use API\ProjetBundle\Entity\Mission;
use API\ProjetBundle\Entity\MissionPersonne;
use API\ProjetBundle\Entity\Projet;
use API\ProjetBundle\Form\MissionType;
use API\ProjetBundle\Form\MissionPersonneType;

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
    public function getMissionsAction(Projet $projet)
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
    public function getAllMissionsAction()
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
    * @Rest\Post("/projet/{id}/missions")
    */
    public function createMissionAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $projet = $em->getRepository('APIProjetBundle:Projet')->find($id);

      if (empty($projet)) {
          return new JsonResponse(['message' => 'Projet not found'], Response::HTTP_NOT_FOUND);
      }

      $item = new Mission();
      $item->setProjet($projet);

      $form = $this->createForm(MissionType::class, $item);

      $form->submit($request->request->all());

      if ($form->isValid()) {
          $em->persist($item);
          $em->flush();
          return $item;
      } else {
          return $form;
      }
    }

    /**
    * @Rest\View(serializerGroups = {"mission"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/mission/{id}")
    */
    public function updateMissionAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $item = $em->getRepository('APIProjetBundle:Mission')->find($id);

      if (empty($item)) {
          return new JsonResponse(['message' => 'Mission not found'], Response::HTTP_NOT_FOUND);
      }

      $form = $this->createForm(MissionType::class, $item);

      $form->submit($request->request->all());

      if ($form->isValid()) {
          $em->merge($item);
          $em->flush();
          return $item;
      } else {
          return $form;
      }
    }


    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/mission/{id}/travailleurs")
    * @ParamConverter("mission", class="APIProjetBundle:Mission", options={"entity_manager" = "gretiadb"})
    */
    public function getTravailleursAction(Mission $mission)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $travailleurs = $em->getRepository('APIProjetBundle:MissionPersonne')->findByMission($mission);
        return $travailleurs;
    }

    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/mission/{mission_id}/travailleurs")
    */
    public function createTravailleurAction(Request $request, $mission_id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');

      $mission = $em->getRepository('APIProjetBundle:Mission')->find($mission_id);

      if (empty($mission)) {
          return new JsonResponse(['message' => 'Mission not found'], Response::HTTP_NOT_FOUND);
      }

      $item = new MissionPersonne();
      $item->setMission($mission);

      $form = $this->createForm(MissionPersonneType::class, $item);

      $form->submit($request->request->all());

      if ($form->isValid()) {
          $em->persist($item);
          $em->flush();
          return $em->getRepository('APIProjetBundle:MissionPersonne')->findByMission($mission);
      } else {
          return $form;
      }
    }

    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/mission/{mission_id}/travailleur/{trav_id}")
    */
    public function updateTravailleurAction(Request $request, $mission_id, $trav_id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $item = $em->getRepository('APIProjetBundle:MissionPersonne')->findOneBy(
                                      ['mission' => $em->getReference('APIProjetBundle:Mission', $mission_id),
                                      'personne' => $em->getReference('APIProjetBundle:Personne', $trav_id)]
                                    );

      if (empty($item)) {
          return new JsonResponse(['message' => 'Travailleur not found'], Response::HTTP_NOT_FOUND);
      }

      $form = $this->createForm(MissionPersonneType::class, $item);

      $form->submit($request->request->all());

      if ($form->isValid()) {
          $em->merge($item);
          $em->flush();
          return $em->getRepository('APIProjetBundle:MissionPersonne')->findByMission($em->getReference('APIProjetBundle:Mission', $mission_id));
      } else {
          return $form;
      }
    }

    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Delete("/mission/{mission_id}/travailleur/{trav_id}")
    */
    public function removeTravailleurAction($mission_id, $trav_id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $item = $em->getRepository('APIProjetBundle:MissionPersonne')->findOneBy(
                                      ['mission' => $em->getReference('APIProjetBundle:Mission', $mission_id),
                                      'personne' => $em->getReference('APIProjetBundle:Personne', $trav_id)]
                                    );

      if (empty($item)) {
          return new JsonResponse(['message' => 'Travailleur not found'], Response::HTTP_NOT_FOUND);
      }

      $em->remove($item);
      $em->flush();
      return $em->getRepository('APIProjetBundle:MissionPersonne')->findByMission($em->getReference('APIProjetBundle:Mission', $mission_id));
    }
}
