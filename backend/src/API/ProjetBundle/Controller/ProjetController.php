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

use API\ProjetBundle\Entity\Localisation;
use API\ProjetBundle\Form\LocalisationType;
use API\ProjetBundle\Entity\Projet;
use API\ProjetBundle\Form\ProjetType;


/**
    //ANTENNE
    GET /antennes : retourne la liste des antennes

    //SALARIE
    GET /personnes : retourne la liste des personnes
    GET /personne/id : retourne la personne id
    POST /personne : create une personne
    PUT /personne/id : update personne id
    DELETE /personne/id : delete personne id
    GET /personne/id/projets : retourne la liste des projets de personne id
    GET /personne/id/missions : retourne la liste des mission de personne id
    GET /personne/id/travails : retourne la liste des travaux de personne id
    GET /personne/id/date/travails : retourne la liste des travaux de personne id
    GET /personne/id/projet/id?date : retourne la liste des travaux sur un projet de personne id
    GET /personne/id/mission/id?date : retourne la liste des travaux sur une mission de personne id
**/

class ProjetController extends FOSRestController implements ClassResourceInterface
{
    
  /**
  * @Rest\View(serializerGroups = {"localisation"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Get("/localisations")
  */
  public function listLocalisationsAction()
  {
    $items = $this
      ->getDoctrine()
      ->getManager('gretiadb')
      ->getRepository('APIProjetBundle:Localisation')
      ->findAll();
    return $items;
  }

  /**
  * @Rest\View(serializerGroups = {"localisation"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/localisation")
  */
  public function createLocalisationAction(Request $request)
  {
    $item = new Localisation();
    $form = $this->createForm(LocalisationType::class, $item);

    $form->submit(json_decode($request->getContent(), true)); // Validation des données

    if ($form->isValid()) {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $em->persist($item);
        $em->flush();
        return $item;
    } else {
        return $form;
    }
  }

  /**
  * @Rest\View(serializerGroups = {"localisation"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/localisation/{id}", requirements={"id"="\d+"}, defaults={"id"=null})
  * @ParamConverter("item", class="APIProjetBundle:Localisation", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function updateLocalisationAction(Request $request, $item)
  {
    $form = $this->createForm(LocalisationType::class, $item);

    $form->submit(json_decode($request->getContent(), true)); // Validation des données

    if ($form->isValid()) {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $em->flush();
        return $item;
    } else {
        return $form;
    }
  }

  /**
  * @Rest\View(serializerGroups = {"localisation"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Delete("/localisation/{id}")
  * @ParamConverter("item", class="APIProjetBundle:Localisation", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function deleteLocalisationAction(Request $request, $item)
  {
    try {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $em->remove($item);
      $em->flush();
      return true;
    } catch (Exception $e) {
      return new HttpException();
    }
  }


  ////////////
  // PROJET //
  ////////////
  /**
  * @Rest\View(serializerGroups = {"projet"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Get("/projets")
  */
  public function listProjetsAction()
  {
    $items = $this
      ->getDoctrine()
      ->getManager('gretiadb')
      ->getRepository('APIProjetBundle:Projet')
      ->findAll();
    return $items;
  }

  /**
  * @Rest\View(serializerGroups = {"projet"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/projet")
  */
  public function createProjetAction(Request $request)
  {
    $item = new Projet();
    $form = $this->createForm(ProjetType::class, $item);

    $form->submit(json_decode($request->getContent(), true)); // Validation des données

    if ($form->isValid()) {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $em->persist($item);
        $em->flush();
        return $item;
    } else {
        return $form;
    }
  }

}
