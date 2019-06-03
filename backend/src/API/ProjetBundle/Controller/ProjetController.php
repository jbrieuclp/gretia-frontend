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

use API\ProjetBundle\Entity\Projet;
use API\ProjetBundle\Entity\ProjetPersonne;
use API\ProjetBundle\Entity\Personne;

use API\ProjetBundle\Form\ProjetType;

/**
    //PROJET
    GET /projets : retourne la liste des études existantes
    GET /projet/id : retourne le projet id
    POST /projet : créer un nouveau projet
    PUT /projet/id : update un projet
    DELETE /projet/id : remove un projet
    GET /projet/id/partenaires-financiers : retourne les partenaires financiers de projet id
    GET /projet/id/partenaires-techniques : retourne les partenaires techniques de projet id
    GET /projet/id/type : retourne le type de projet id
    GET /projet/id/etat : retourne l'état de projet id
    POST /projet/id/travailleur : ajoute un travailleur à un projet

    //MISSION
    GET /projet/id/missions : retourne les mission d'un projet
    POST /projet/id/mission : create nouvelle mission pour le projet id
    GET /mission/id : retourne une mission spécifique
    PUT /mission/id : update mission id
    DELETE /mission/id : delete mission id
    GET /mission/id/etat : retourne l'état de mission id
    GET /mission/id/projet : retourne le projet de mission id
    GET /mission/id/personnes : retourne les personnes de mission id

    //USER
    POST /travail : create un travail
    PUT /travail/id : update un travail existant
    DELETE /travail/id/ : delete un travail

**/

class ProjetController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/projets")
    */
    public function getProjetsAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $projets = $em->getRepository('APIProjetBundle:Projet')->findAll();
        return $projets;
    }

    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/projet/{id}")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"entity_manager" = "gretiadb"})
    */
    public function getProjetAction(Projet $projet)
    {
        return $projet;
    }

    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/projet")
    */
    public function postAction(Request $request)
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

    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/projet/{projet}/travailleur")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"entity_manager" = "gretiadb"})
    */
    public function postTravailleurAction(Request $request, Projet $projet)
    {
     //   return $projet;
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager('gretiadb');
        $personne = $em->getRepository('APIProjetBundle:Personne')->find($data['personne']['id']);
        $travailleur = $em->getRepository('APIProjetBundle:ProjetPersonne')->findOneBy(array('projet' => $projet, 'personne' => $personne));

        if ($travailleur === null) {
            $travailleur = new ProjetPersonne();
            $travailleur->setPersonne($personne);
            $travailleur->setTemps($data['temps']);
            $projet->addTravailleur($travailleur);
            $em->persist($projet);
            $em->flush();
        }

        return $projet->getTravailleurs();
    }

    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/projet/{projet}/travailleur/{personne}")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"entity_manager" = "gretiadb"})
    * @ParamConverter("personne", class="APIProjetBundle:Personne", options={"entity_manager" = "gretiadb"})
    */
    public function putTravailleurAction(Request $request, Projet $projet, Personne $personne)
    {
     //   return $projet;
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager('gretiadb');
        $travailleur = $em->getRepository('APIProjetBundle:ProjetPersonne')->findOneBy(array('projet' => $projet, 'personne' => $personne));

        if ($travailleur !== null) {
            $travailleur->setTemps($data['temps']);
            $em->persist($travailleur);
            $em->flush();
        }

        return $projet->getTravailleurs();
    }

}
