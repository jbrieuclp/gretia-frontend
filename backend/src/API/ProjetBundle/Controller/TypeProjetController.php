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

use API\ProjetBundle\Entity\TypeProjetRef;
use API\ProjetBundle\Entity\TypeProjet;
use API\ProjetBundle\Form\TypeProjetRefType;
use API\ProjetBundle\Form\TypeProjetType;
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

class TypeProjetController extends FOSRestController implements ClassResourceInterface
{
    
  /**
  * @Rest\View(serializerGroups = {"type_projet_ref"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Get("/types-projet-ref")
  */
  public function listTypeProjetRefAction()
  {
    $items = $this
      ->getDoctrine()
      ->getManager('gretiadb')
      ->getRepository('APIProjetBundle:TypeProjetRef')
      ->findAll();
    return $items;
  }

  /**
  * @Rest\View(serializerGroups = {"type_projet_ref"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/type-projet-ref")
  */
  public function createTypeProjetRefAction(Request $request)
  {
    $item = new TypeProjetRef();
    $form = $this->createForm(TypeProjetRefType::class, $item);

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
  * @Rest\View(serializerGroups = {"type_projet_ref"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/type-projet-ref/{id}", requirements={"id"="\d+"}, defaults={"id"=null})
  * @ParamConverter("item", class="APIProjetBundle:TypeProjetRef", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function updateTypeProjetRefAction(Request $request, $item)
  {
    $form = $this->createForm(TypeProjetRefType::class, $item);

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
  * @Rest\View(serializerGroups = {"type_projet_ref"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Delete("/type-projet-ref/{id}")
  * @ParamConverter("item", class="APIProjetBundle:TypeProjetRef", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function deleteTypeProjetRefAction(Request $request, $item)
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

  /**
  * @Rest\View(serializerGroups = {"type_projet_ref"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/type-projet-ref/{id}/historique", requirements={"id"="\d+"})
  * @ParamConverter("typeProjetRef", class="APIProjetBundle:TypeProjetRef", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function addHistoriqueTypeProjetRefAction(Request $request, $typeProjetRef)
  {
    $historique = new TypeProjet();
    $historique->setTypeProjetRef($typeProjetRef);
    $form = $this->createForm(TypeProjetType::class, $historique);

    $form->submit(json_decode($request->getContent(), true)); // Validation des données

    if ($form->isValid()) {
        $typeProjetRef->addTypeProjet($historique);
        $em = $this->getDoctrine()->getManager('gretiadb');
        $em->persist($typeProjetRef);
        $em->flush();
        return $typeProjetRef;
    } else {
        return $form;
    }
  }

  /**
  * @Rest\View(serializerGroups = {"type_projet_ref"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Delete("/type-projet-ref/{id_ref}/historique/{id_h}")
  * @ParamConverter("ref", class="APIProjetBundle:TypeProjetRef", options={"mapping": {"id_ref": "id"}, "entity_manager" = "gretiadb"})
  * @ParamConverter("historique", class="APIProjetBundle:TypeProjet", options={"mapping": {"id_h": "id"}, "entity_manager" = "gretiadb"})
  */
  public function deleteHistoriqueTypeProjetRefAction($ref, $historique)
  {
    try {
      $ref->removeTypeProjet($historique);
      $em = $this->getDoctrine()->getManager('gretiadb');
      $em->persist($ref);
      $em->flush();
      return $ref;
    } catch (Exception $e) {
      return new HttpException();
    }
  }
}
