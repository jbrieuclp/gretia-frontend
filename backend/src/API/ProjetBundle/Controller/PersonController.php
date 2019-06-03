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

use API\ProjetBundle\Entity\Personne;

use API\ProjetBundle\Form\PersonneType;

/**
    //PERSONNE
    GET /personnes : retourne la liste des personnes
    GET /personne/id : retourne la personne id
    POST /personne : create une personne
    PUT /personne/id : update personne id
    DELETE /personne/id : delete personne id
    GET /personne/id/projets : retourne la liste des projets de personne id
    GET /personne/id/missions : retourne la liste des mission de personne id
    GET /personne/id/travails : retourne la liste des travaux de personne id
    GET /personne/id/date/travails : retourne la liste des travaux de personne id
    GET /personne/id/mission/id/travails : retourne la liste des travaux de personne id
    GET /personne/id/mission/id/date/travails : retourne la liste des travaux de personne id
**/

class PersonController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/personnes")
    */
    public function getPersonsAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $personnes = $em->getRepository('APIProjetBundle:Personne')->findAll();
        return $personnes;
    }

    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/personne/{id}")
    * @ParamConverter("personne", class="APIProjetBundle:Personne", options={"entity_manager" = "gretiadb"})
    */
    public function getPersonAction(Personne $personne)
    {
        return $personne;
    }

    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/personne")
    */
    public function postAction(Request $request)
    {
        $personne = new Personne();
        $form = $this->createForm(PersonneType::class, $personne);

        $form->submit(json_decode($request->getContent(), true)); // Validation des données

        if ($form->isValid()) {
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
    * @Rest\Put("/personne/{id}")
    */
    public function putAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $personne = $em->getRepository('APIProjetBundle:Personne')->find($id);

        if ($personne === null) {
            return new NotFoundHttpException("Personne non trouvée", 1);   
        }

        $form = $this->createForm(PersonneType::class, $personne);

        $form->submit(json_decode($request->getContent(), true)); // Validation des données

        if ($form->isValid()) {
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
    * @Rest\Delete("/personne/{id}")
    */
    public function deleteAction(Request $request, $id)
    {
        try {
            $em = $this->getDoctrine()->getManager('gretiadb');
            $personne = $em->getRepository('APIProjetBundle:Personne')->find($id);
            $em->remove($personne);
            $em->flush();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

}
