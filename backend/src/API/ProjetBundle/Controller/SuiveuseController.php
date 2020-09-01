<?php

namespace API\ProjetBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


use API\ProjetBundle\Entity\Personne;
use API\ProjetBundle\Entity\Travail;
use API\ProjetBundle\Form\TravailType;


/**
    //USER
    POST /travail : create un travail
    PUT /travail/id : update un travail existant
    DELETE /travail/id/ : delete un travail

**/

class SuiveuseController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"categorie"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/suiveuse/categories")
    */
    public function getCategoriesAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $categories = $em->getRepository('APIProjetBundle:Categorie')->findBy([], ['ordre'=>'ASC']);
        return $categories;
    }

    /**
    * @Rest\View(serializerGroups = {"travail"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/suiveuse/personne/{user}")
    * @ParamConverter("user", class="APIProjetBundle:Personne", options={"mapping": {"user": "surnom"}, "entity_manager" = "gretiadb"})
    */
    public function dashboardAction(Personne $user)
    {
        
        return $user;
    }

    /**
    * @Rest\View(serializerGroups = {"travail"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/personne/{person}/synthese")
    * @ParamConverter("person", class="APIProjetBundle:Personne", options={"mapping": {"person": "id"}, "entity_manager" = "gretiadb"})
    * @QueryParam(
    *     name="startAt",
    *     requirements="[0-9]{4}-[0-9]{2}-[0-9]{2}",
    *     nullable=true,
    *     description="Sort order (asc or desc)"
    * )
    * @QueryParam(
    *     name="endAt",
    *     requirements="[0-9]{4}-[0-9]{2}-[0-9]{2}",
    *     nullable=true,
    *     description="Sort order (asc or desc)"
    * )
    * @QueryParam(
    *     name="limit",
    *     requirements="[0-9]+",
    *     nullable=true,
    *     description="Sort order (asc or desc)"
    * )
    */
    public function getSyntheseAction(Personne $person, $startAt, $endAt, $limit)
    {
        $options = ['startAt' => $startAt, 'endAt' => $endAt, 'limit' => $limit];
        $em = $this->getDoctrine()->getManager('gretiadb');
        $synthese = $em->getRepository('APIProjetBundle:Travail')->getSynthese($person, $options);
        return $synthese;
    }

    /**
    * @Rest\View(serializerGroups = {"travail"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/personne/{person}/travaux")
    * @ParamConverter("person", class="APIProjetBundle:Personne", options={"mapping": {"person": "id"}, "entity_manager" = "gretiadb"})
    * @QueryParam(
    *     name="startAt",
    *     requirements="[0-9]{4}-[0-9]{2}-[0-9]{2}",
    *     nullable=true,
    *     description="Sort order (asc or desc)"
    * )
    * @QueryParam(
    *     name="endAt",
    *     requirements="[0-9]{4}-[0-9]{2}-[0-9]{2}",
    *     nullable=true,
    *     description="Sort order (asc or desc)"
    * )
    * @QueryParam(
    *     name="limit",
    *     requirements="[0-9]+",
    *     nullable=true,
    *     description="Sort order (asc or desc)"
    * )
    */
    public function getTravauxAction(Personne $person, $startAt, $endAt, $limit)
    {
        $options = ['startAt' => $startAt, 'endAt' => $endAt, 'limit' => $limit];
        $em = $this->getDoctrine()->getManager('gretiadb');
        $travaux = $em->getRepository('APIProjetBundle:Travail')->findByPersonne($person, $options);
        return $travaux;
    }

    /**
    * @Rest\View(serializerGroups = {"travail"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/travail")
    */
    public function createTravailAction(Request $request)
    {
      $item = new Travail();
      $form = $this->createForm(TravailType::class, $item);

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
    * @Rest\View(serializerGroups = {"travail"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/travail/{id}")
    */
    public function updateTravailAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $item = $em->getRepository('APIProjetBundle:Travail')->find($id);

      if (empty($item)) {
          return new JsonResponse(['message' => 'Travail not found'], Response::HTTP_NOT_FOUND);
      }

      $form = $this->createForm(TravailType::class, $item);

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
    * @Rest\View(serializerGroups = {"travail"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/travail/{travail}")
    * @ParamConverter("travail", class="APIProjetBundle:Travail", options={"mapping": {"travail": "id"}, "entity_manager" = "gretiadb"})
    */
    public function getTravailAction(Request $request, Travail $travail)
    {
      if (empty($travail)) {
        return new JsonResponse(['message' => 'Travail not found'], Response::HTTP_NOT_FOUND);
      }

      return $travail;
    }    
}
