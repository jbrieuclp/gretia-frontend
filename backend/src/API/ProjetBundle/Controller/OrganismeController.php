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

use API\ProjetBundle\Entity\Organisme;

use API\ProjetBundle\Form\OrganismeType;

/**
    //ORGANISME
    GET /organismes : retourne la liste des organismes
    GET /organisme/id : retourne organisme id
    POST /organisme : create organisme
    PUT /organisme/id : update organisme id
    DELETE /organisme/id : delete organisme id
    GET /organisme/id/projets : retourne la liste des projets de organisme id
**/

class OrganismeController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/organismes")
    */
    public function getOrganismesAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $item = $em->getRepository('APIProjetBundle:Organisme')->findAll();
        return $item;
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/organisme/{id}")
    * @ParamConverter("organisme", class="APIProjetBundle:Organisme", options={"entity_manager" = "gretiadb"})
    */
    public function getOrganismeAction(Organisme $organisme)
    {
        return $organisme;
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/organismes/recherche")
    */
    public function searchAction(Request $request)
    {
      $term = null;

      if ( !empty($request->query->get('term')) ) 
        $term = $request->query->get('term');

      $em = $this->getDoctrine()->getManager('gretiadb');

      return $em->getRepository('APIProjetBundle:Organisme')->search($term);
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/organismes")
    */
    public function createOrganismeAction(Request $request)
    {
        $item = new Organisme();
        $form = $this->createForm(OrganismeType::class, $item);

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
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/organisme/{id}")
    */
    public function putAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $item = $em->getRepository('APIProjetBundle:Organisme')->find($id);

        if ($item === null) {
            return new NotFoundHttpException("Organisme non trouvée", 1);   
        }

        $form = $this->createForm(OrganismeType::class, $item);

        $form->submit(json_decode($request->getContent(), true)); // Validation des données

        if ($form->isValid()) {
            $em->persist($item);
            $em->flush();
            return $item;
        } else {
            return $form;
        }
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Delete("/organisme/{id}")
    */
    public function deleteAction(Request $request, $id)
    {
        try {
            $em = $this->getDoctrine()->getManager('gretiadb');
            $item = $em->getRepository('APIProjetBundle:Organisme')->find($id);
            $em->remove($item);
            $em->flush();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

}
