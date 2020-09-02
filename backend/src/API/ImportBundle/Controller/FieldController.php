<?php

namespace API\ImportBundle\Controller;

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
use Symfony\Component\Yaml\Parser;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use API\ImportBundle\Entity\FichierChamp;
use API\ImportBundle\Entity\Fichier;
use API\ImportBundle\Form\FichierChampType;

use API\CoreBundle\Entity\UserGeoNature;
use API\CoreBundle\Entity\UserList;

class FieldController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Patch("/field/{id}")
    */
    public function patchFieldAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
        if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(FichierChampType::class, $item);

        $form->submit(json_decode($request->getContent(), true), false); // Validation des données

        if ($form->isValid()) {
            $em->persist($item);
            $em->flush();
            return $item;
        } else {
            return $form;
        }
    }

    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Patch("/field/{id}/value")
    */
    public function patchFieldValueAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
        if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if ($em->getRepository('APIImportBundle:FichierChamp')->updateValue($item, $data['old'], $data['new'])) {
          return $data['new'];
        }
        return new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/field/{id}/values")
    * Realise plusieurs changement d'un coup
    */
    public function postFieldValuesAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
        if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if ($em->getRepository('APIImportBundle:FichierChamp')->updateValues($item, $data)) {
          return new JsonResponse(['message' => 'Modification effectuée']);
        }
        return new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Patch("/field/{id}/replace")
    */
    public function replaceFieldElementAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
        if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if ($em->getRepository('APIImportBundle:FichierChamp')->replaceElement($item, $data['search'], $data['replace'])) {
          if ( $request->query->get('values') === 'f' ) {
            return $data['replace'];
          }
          return $this->getFieldValuesAction($item->getId());
        }
        return new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }


    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Patch("/field/{id}/regexp-replace")
    */
    public function regexpReplaceFieldElementAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
        if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if ($em->getRepository('APIImportBundle:FichierChamp')->regexpReplaceElement($item, $data['search'], $data['replace'])) {
          if ( $request->query->get('values') === 'f' ) {
            return $data['replace'];
          }
          return $this->getFieldValuesAction($item->getId());
        }
        return new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }


    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Patch("/field/{id}/fsd/{fsd_id}")
    */
    public function patchFieldFSDAction($id, $fsd_id)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
        if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
        }

        $fsd = $em->getRepository('APIImportBundle:SyntheseFSD')->find($fsd_id);
        if (empty($fsd)) {
          return new JsonResponse(['message' => 'FSD Field not found'], Response::HTTP_NOT_FOUND);
        }

        $item->setFieldFSD($fsd);
        $em->persist($item);
        $em->flush();
        
        return $item;
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Delete("/field/{id}")
    */
    public function removeFieldAction($id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
      if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
      }
      $fichier_id = $item->getFichier()->getId();
      $em->remove($item);
      $em->flush();

      return true;
    }


    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/field/{id}/values")
    */
    public function getFieldValuesAction($id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
      if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
      }

      //champs : value, ok, ban
      $values = $em->getRepository('APIImportBundle:FichierChamp')->getFieldValues($item);

      if ( !empty($item->getFieldFSD()->getRegexp()) ) {
        //Comparaison par REGEXP
        foreach ($values as $key => &$value) {
          $value['ok'] = (bool) preg_match($item->getFieldFSD()->getRegexp(), $value['value']);
        }
      } elseif ( !empty($item->getFieldFSD()->getSql()) ) {
        //requete SQL pour comparer les valeurs
        $values = $em->getRepository('APIImportBundle:SyntheseFSD')->compareValues($item->getFieldFSD()->getSql(), $values);
      }

      //Pas de comparaison
      return $values;
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fields/values")
    */
    public function getFieldsValuesAction(Request $request)
    {
      $ids = $request->query->get('fields');
      if (empty($ids)) {
          return [];
      }

      $em = $this->getDoctrine()->getManager('geonature_db');
      $items = $em->createQuery('SELECT c FROM APIImportBundle:FichierChamp c WHERE c.id IN (:ids)')
                  ->setParameter('ids', $ids)
                  ->getResult();

      return $em->getRepository('APIImportBundle:FichierChamp')->getFieldsValues($items);
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/field/{id}/observers")
    *
    * Retourne un tableau de valeurs correspondant aux observateurs uniques
    */
    public function getFieldObserversAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
      if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
      }

      //champs : value, ok, ban
      $values = $em->getRepository('APIImportBundle:FichierChamp')->getListObservers($item);

      foreach ($values as &$value) {
        $value['propositions'] = array_values(array_unique(json_decode($value['propositions'], true)));
        $value['observers_bd'] = array_values(array_unique(json_decode($value['observers_bd'], true)));
        unset($value['init_value']);
      }

      return $values;
    }


    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/observer")
    */
    public function createObserverAction(Request $request)
    {
      $data = json_decode($request->getContent(), true);
      if (empty($data['nom'])) {
        return new JsonResponse(['message' => 'Un nom doit être renseigné'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      $nom = ucwords(mb_strtolower($data['nom']));
      $prenom = ucwords(mb_strtolower($data['prenom']));

      $em = $this->getDoctrine()->getManager('geonature_db');

      $user = $em->getRepository('APICoreBundle:UserGeoNature')->findOneBy(array('nom' => $nom, 'prenom' => $prenom));

      if ($user !== null) {
        return new JsonResponse(['message' => 'Un observateur avec ce nom et prénom existe déjà'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      $user = new UserGeoNature();

      $user->setGroupe(false);
      $user->setNom($nom);
      $user->setPrenom($prenom);

      $liste = new UserList();
      $liste->setListe(2); //id liste serena

      $user->addListe($liste);

      $em->persist($user);
      $em->flush();

      return trim($user->getNom().' '.$user->getPrenom());
    }


    /*

WITH observer (init_value, observer) as (
SELECT DISTINCT obse_obsv_id, trim(unnest(string_to_array(obse_obsv_id, '|')))
FROM gn_imports.serena_20191126
order by 1
), 
obsv_link (init_value, jsonb_result) as (
SELECT 
init_value, 
jsonb_agg(DISTINCT jsonb_build_object('id', presence.id_role, 'nom', presence.nom_role, 'prenom', presence.prenom_role)) as observers_bd
FROM observer
LEFT JOIN utilisateurs.t_roles presence ON CONCAT_WS(' ', NULLIF(presence.nom_role, ''), NULLIF(presence.prenom_role, '')) = observer AND presence.active
GROUP BY init_value
ORDER BY init_value
)


UPDATE gn_imports.serena_20191126 d SET adm_observers = jsonb_result FROM obsv_link link WHERE d.obse_obsv_id = link.init_value
*/


}
