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
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use API\ProjetBundle\Entity\Projet;
use API\ProjetBundle\Entity\ProjetPersonne;
use API\ProjetBundle\Entity\Personne;
use API\ProjetBundle\Entity\Organisme;

use API\ProjetBundle\Form\ProjetType;
use API\ProjetBundle\Form\ProjetPersonneType;

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
    */
    public function getProjetAction($id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $projet = $em->getRepository('APIProjetBundle:Projet')->find($id);

      if (empty($projet)) {
          return new JsonResponse(['message' => 'Projet not found'], Response::HTTP_NOT_FOUND);
      }

      return $projet;
    }

    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/projets")
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

    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/projet/{id}")
    */
    public function updateProjetAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $item = $em->getRepository('APIProjetBundle:Projet')->find($id);

      if (empty($item)) {
          return new JsonResponse(['message' => 'Projet not found'], Response::HTTP_NOT_FOUND);
      }

      $form = $this->createForm(ProjetType::class, $item);

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
    * @Rest\Get("/projet/{id}/travailleurs")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"entity_manager" = "gretiadb"})
    */
    public function getTravailleursAction(Projet $projet)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $travailleurs = $em->getRepository('APIProjetBundle:ProjetPersonne')->findByProjet($projet);
        return $travailleurs;
    }


    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/projet/{projet_id}/travailleurs")
    */
    public function createTravailleurAction(Request $request, $projet_id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');

      $projet = $em->getRepository('APIProjetBundle:Projet')->find($projet_id);

      if (empty($projet)) {
          return new JsonResponse(['message' => 'Projet not found'], Response::HTTP_NOT_FOUND);
      }

      $item = new ProjetPersonne();
      $item->setProjet($projet);

      $form = $this->createForm(ProjetPersonneType::class, $item);

      $form->submit($request->request->all());

      if ($form->isValid()) {
          $em->persist($item);
          $em->flush();
          return $em->getRepository('APIProjetBundle:ProjetPersonne')->findByProjet($projet);
      } else {
          return $form;
      }
    }

    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/projet/{projet_id}/travailleur/{trav_id}")
    */
    public function updateTravailleurAction(Request $request, $projet_id, $trav_id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $item = $em->getRepository('APIProjetBundle:ProjetPersonne')->findOneBy(
                                      ['projet' => $em->getReference('APIProjetBundle:Projet', $projet_id),
                                      'personne' => $em->getReference('APIProjetBundle:Personne', $trav_id)]
                                    );

      if (empty($item)) {
          return new JsonResponse(['message' => 'Travailleur not found'], Response::HTTP_NOT_FOUND);
      }

      $form = $this->createForm(ProjetPersonneType::class, $item);

      $form->submit($request->request->all());

      if ($form->isValid()) {
          $em->merge($item);
          $em->flush();
          return $em->getRepository('APIProjetBundle:ProjetPersonne')->findByProjet($em->getReference('APIProjetBundle:Projet', $projet_id));
      } else {
          return $form;
      }
    }

    /**
    * @Rest\View(serializerGroups = {"personne"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Delete("/projet/{projet_id}/travailleur/{trav_id}")
    */
    public function removeTravailleurAction($projet_id, $trav_id)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $item = $em->getRepository('APIProjetBundle:ProjetPersonne')->findOneBy(
                                      ['projet' => $em->getReference('APIProjetBundle:Projet', $projet_id),
                                      'personne' => $em->getReference('APIProjetBundle:Personne', $trav_id)]
                                    );

      if (empty($item)) {
          return new JsonResponse(['message' => 'Travailleur not found'], Response::HTTP_NOT_FOUND);
      }

      $em->remove($item);
      $em->flush();
      return $em->getRepository('APIProjetBundle:ProjetPersonne')->findByProjet($em->getReference('APIProjetBundle:Projet', $projet_id));
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/projet/{id}/partenaires-financiers")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"entity_manager" = "gretiadb"})
    */
    public function getPartenairesFinanciersAction(Projet $projet)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        return $em->getRepository('APIProjetBundle:Organisme')->findByProjetsFinances($projet);
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/projet/{projet_id}/partenaires-financiers/{organisme_id}")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"mapping": {"projet_id": "id"}, "entity_manager" = "gretiadb"})
    * @ParamConverter("organisme", class="APIProjetBundle:Organisme", options={"mapping": {"organisme_id": "id"}, "entity_manager" = "gretiadb"})
    */
    public function addPartenairesFinanciersAction(Projet $projet, Organisme $organisme)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $projet->addPartenaireFinancier($organisme);
        $em->merge($projet);
        $em->flush();

        return $this->getPartenairesFinanciersAction($projet);
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Delete("/projet/{projet_id}/partenaire-financier/{organisme_id}")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"mapping": {"projet_id": "id"}, "entity_manager" = "gretiadb"})
    * @ParamConverter("organisme", class="APIProjetBundle:Organisme", options={"mapping": {"organisme_id": "id"}, "entity_manager" = "gretiadb"})
    */
    public function removePartenaireFinancierAction(Projet $projet, Organisme $organisme)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $projet->removePartenaireFinancier($organisme);
      $em->merge($projet);
      $em->flush();
      return $this->getPartenairesFinanciersAction($projet);
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/projet/{id}/partenaires-techniques")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"entity_manager" = "gretiadb"})
    */
    public function getPartenairesTechniquesAction(Projet $projet)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        return $em->getRepository('APIProjetBundle:Organisme')->findByProjetsTechniques($projet);
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/projet/{projet_id}/partenaires-techniques/{organisme_id}")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"mapping": {"projet_id": "id"}, "entity_manager" = "gretiadb"})
    * @ParamConverter("organisme", class="APIProjetBundle:Organisme", options={"mapping": {"organisme_id": "id"}, "entity_manager" = "gretiadb"})
    */
    public function addPartenairesTechniquesAction(Projet $projet, Organisme $organisme)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $projet->addPartenaireTechnique($organisme);
        $em->merge($projet);
        $em->flush();

        return $this->getPartenairesTechniquesAction($projet);
    }

    /**
    * @Rest\View(serializerGroups = {"organisme"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Delete("/projet/{projet_id}/partenaire-technique/{organisme_id}")
    * @ParamConverter("projet", class="APIProjetBundle:Projet", options={"mapping": {"projet_id": "id"}, "entity_manager" = "gretiadb"})
    * @ParamConverter("organisme", class="APIProjetBundle:Organisme", options={"mapping": {"organisme_id": "id"}, "entity_manager" = "gretiadb"})
    */
    public function removePartenaireTechniqueAction(Projet $projet, Organisme $organisme)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $projet->removePartenaireTechnique($organisme);
      $em->merge($projet);
      $em->flush();
      return $this->getPartenairesTechniquesAction($projet);
    }

}
