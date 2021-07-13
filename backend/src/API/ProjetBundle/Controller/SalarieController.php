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

use API\ProjetBundle\Entity\Antenne;
use API\ProjetBundle\Entity\FonctionSalarie;
use API\ProjetBundle\Entity\Personne;
use API\ProjetBundle\Entity\Salarie;
use API\ProjetBundle\Form\AntenneType;
use API\ProjetBundle\Form\FonctionSalarieType;
use API\ProjetBundle\Form\PersonneType;
use API\ProjetBundle\Form\SalarieType;

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

class SalarieController extends FOSRestController implements ClassResourceInterface
{
    
  /**
  * @Rest\View(serializerGroups = {"antenne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Get("/antennes")
  */
  public function listAntennesAction()
  {
    $items = $this
      ->getDoctrine()
      ->getManager('gretiadb')
      ->getRepository('APIProjetBundle:Antenne')
      ->findAll();
    return $items;
  }

  /**
  * @Rest\View(serializerGroups = {"antenne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/antenne")
  */
  public function createAntenneAction(Request $request)
  {
    $item = new Antenne();
    $form = $this->createForm(AntenneType::class, $item);

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
  * @Rest\View(serializerGroups = {"antenne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/antenne/{id}", requirements={"id"="\d+"}, defaults={"id"=null})
  * @ParamConverter("item", class="APIProjetBundle:Antenne", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function updateAntenneAction(Request $request, $item)
  {
    $form = $this->createForm(AntenneType::class, $item);

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
  * @Rest\View(serializerGroups = {"antenne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Delete("/antenne/{id}")
  * @ParamConverter("item", class="APIProjetBundle:Antenne", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function deleteAntenneAction(Request $request, $item)
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


  //////////////
  // FONCTION //
  //////////////
  /**
  * @Rest\View(serializerGroups = {"fonction_salarie"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Get("/fonctions")
  */
  public function listFonctionsAction()
  {
    $items = $this
      ->getDoctrine()
      ->getManager('gretiadb')
      ->getRepository('APIProjetBundle:FonctionSalarie')
      ->findAll();
    return $items;
  }

  /**
  * @Rest\View(serializerGroups = {"fonction_salarie"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/fonction")
  */
  public function createFonctionAction(Request $request)
  {
    $item = new FonctionSalarie();
    $form = $this->createForm(FonctionSalarieType::class, $item);

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
  * @Rest\View(serializerGroups = {"fonction_salarie"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/fonction/{id}", requirements={"id"="\d+"}, defaults={"id"=null})
  * @ParamConverter("item", class="APIProjetBundle:FonctionSalarie", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function updateFonctionAction(Request $request, $item)
  {
    $form = $this->createForm(FonctionSalarieType::class, $item);

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
  * @Rest\View(serializerGroups = {"fonction_salarie"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Delete("/antenne/{id}")
  * @ParamConverter("item", class="APIProjetBundle:FonctionSalarie", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function deleteFonctionAction(Request $request, $item)
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

  //////////////
  // PERSONNE //
  //////////////
  /**
  * @Rest\View(serializerGroups = {"personne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Get("/personnes")
  */
  public function listPersonnesAction()
  {
    $items = $this
      ->getDoctrine()
      ->getManager('gretiadb')
      ->getRepository('APIProjetBundle:Personne')
      ->findAll();
    return $items;
  }

  /**
  * @Rest\View(serializerGroups = {"salarie"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Get("/salaries")
  */
  public function listSalariesAction()
  {
    $items = $this
      ->getDoctrine()
      ->getManager('gretiadb')
      ->getRepository('APIProjetBundle:Salarie')
      ->findAll();
    return $items;
  }

  /**
  * @Rest\View(serializerGroups = {"personne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/personne")
  */
  public function createPersonneAction(Request $request)
  {
    $item = new Personne();
    $form = $this->createForm(PersonneType::class, $item);

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
  * @Rest\View(serializerGroups = {"personne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/personne/{id}", requirements={"id"="\d+"}, defaults={"id"=null})
  * @ParamConverter("item", class="APIProjetBundle:Personne", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function updatePersonneAction(Request $request, $item)
  {
    $form = $this->createForm(PersonneType::class, $item);

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
  * @Rest\View(serializerGroups = {"personne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Delete("/personne/{id}")
  * @ParamConverter("item", class="APIProjetBundle:Personne", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function deletePersonneAction(Request $request, $item)
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
  * @Rest\View(serializerGroups = {"personne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Post("/personne/{id}/contrat", requirements={"id"="\d+"})
  * @ParamConverter("personne", class="APIProjetBundle:Personne", options={"mapping": {"id": "id"}, "entity_manager" = "gretiadb"})
  */
  public function addContratPersonneAction(Request $request, $personne)
  {
    $salarie = new Salarie();
    $salarie->setPersonne($personne);
    $form = $this->createForm(SalarieType::class, $salarie);

    $form->submit(json_decode($request->getContent(), true)); // Validation des données

    if ($form->isValid()) {
        $personne->addSalarie($salarie);
        $em = $this->getDoctrine()->getManager('gretiadb');
        $em->persist($personne);
        $em->flush();
        return $personne;
    } else {
        return $form;
    }
  }

  /**
  * @Rest\View(serializerGroups = {"personne"})
  * @Security("has_role('GESTION_PROJET')")
  *
  * @Rest\Delete("/personne/{id_p}/contrat/{id_s}")
  * @ParamConverter("personne", class="APIProjetBundle:Personne", options={"mapping": {"id_p": "id"}, "entity_manager" = "gretiadb"})
  * @ParamConverter("salarie", class="APIProjetBundle:Salarie", options={"mapping": {"id_s": "id"}, "entity_manager" = "gretiadb"})
  */
  public function deleteContratAction($personne, $salarie)
  {
    try {
      $personne->removeSalarie($salarie);
      $em = $this->getDoctrine()->getManager('gretiadb');
      $em->persist($personne);
      $em->flush();
      return $personne;
    } catch (Exception $e) {
      return new HttpException();
    }
  }
}
