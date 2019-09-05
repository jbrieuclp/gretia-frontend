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
    public function createUserTravailAction(Request $request)
    {
      $cpt_id = $this->get('security.token_storage')->getToken()->getUser()->getId();
      $em = $this->getDoctrine()->getManager('gretiadb');
      $user = $em->getRepository('APIProjetBundle:Personne')->findOneByCompte($cpt_id);

      if (empty($user)) {
        return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
      }

      return $this->createTravailAction($request, $user);
    }

    /**
    * @Rest\View(serializerGroups = {"travail"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/personne/{user}/travail")
    * @ParamConverter("person", class="APIProjetBundle:Personne", options={"mapping": {"user": "id"}, "entity_manager" = "gretiadb"})
    */
    public function createPersonTravailAction(Request $request, Personne $person)
    {
      if (empty($person)) {
        return new JsonResponse(['message' => 'Person not found'], Response::HTTP_NOT_FOUND);
      }

      return $this->createTravailAction($request, $person);
    }

    public function createTravailAction(Request $request, Personne $person)
    {

      $item = new Travail();
      $item->setPersonne($person);
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

    
}
