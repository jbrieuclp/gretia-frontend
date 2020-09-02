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
use \Symfony\Component\Yaml\Parser;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use API\ImportBundle\Entity\FichierChamp;
use API\ImportBundle\Entity\Fichier;
use API\ImportBundle\Form\FichierChampType;
use API\ImportBundle\Form\FichierType;


class FichierController extends FOSRestController implements ClassResourceInterface
{
    
    private function getFichier($id) {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:Fichier')->find($id);
      if (empty($item)) {
        return new JsonResponse(['message' => 'Fichier not found'], Response::HTTP_NOT_FOUND);
      }

      return array($item, $em);
    }

    /**
    * @Rest\View(serializerGroups = {"fichier"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichiers")
    */
    public function getFichiersAction()
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $items = $em->getRepository('APIImportBundle:Fichier')->findAll();
        return $items;
    }

    /**
    * @Rest\View(serializerGroups = {"fichier"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}")
    */
    public function getFichierAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);
      return $fichier;
    }

    ////////////////// 
    //
    //    Stats
    //
    ////////////////// 

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}/releves/info")
    */
    public function getRegroupingInfoAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      //on vérifie si un champ uuid relevé est mappé avec ce fichier
      if (count($fichier->getFieldByFSD('unique_id_sinp_grp')) > 1) {
        return new JsonResponse(['message' => 'Plusieurs champs sont indiqués comme UUID de relevé'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      $data = [
        'already_exists' => $em->getRepository('APIImportBundle:Fichier')->getAlreadyGrouping($fichier),
        'possible_groupings' => $em->getRepository('APIImportBundle:Fichier')->getPossibleGroupings($fichier)
      ];
      return $data;
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}/count")
    */
    public function getCountDataAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      return $em->getRepository('APIImportBundle:Fichier')->count($fichier);
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}/localisations/info")
    */
    public function getLocalisationInfoAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $data = [
        'localized' => $em->getRepository('APIImportBundle:Fichier')->localizedCount($fichier),
        'not_localized' => $em->getRepository('APIImportBundle:Fichier')->notLocalizedCount($fichier),
      ];
      return $data;
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}/observers/info")
    */
    public function getObserversInfoAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $data = [
        'observers_json' => $em->getRepository('APIImportBundle:Fichier')->localizedCount($fichier),
        'not_observers_json' => $em->getRepository('APIImportBundle:Fichier')->notLocalizedCount($fichier),
        'observers_txt' => $em->getRepository('APIImportBundle:Fichier')->notLocalizedCount($fichier),
      ];
      return $data;
    }

    ////////////////// 
    //
    //    Fin Stats
    //
    //////////////////


    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}/fields")
    */
    public function getFieldsAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $fichier = $em->getRepository('APIImportBundle:Fichier')->find($id);
      $file_fields_name = $em->getRepository('APIImportBundle:Fichier')->getFields($id);
      $fields = $fichier->getChamps();

      //suppression des champs mappés de la liste des champs du fichier
      foreach ($fields as $field) {
        if (($key = array_search($field->getChamp(), $file_fields_name)) !== false) {
            unset($file_fields_name[$key]);
        }
      }

      if ( $request->query->get("only-mapped", false) !== 'true' ) {
        //ajout des champs non mappés à la liste des champs
        //$file_fields_name = champs non mappés
        foreach ($file_fields_name as $key => $value) {
          $champ = new FichierChamp();
          $champ->setChamp($value);
          $champ->setFichier($fichier);
          $fields[] = $champ;
        }
      }

      return $fields;
    }


    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/view")
    */
    public function getFichierViewAction(Request $request, $id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $order = ['sort' => $request->query->get('sort', 'adm_id_import'),
                'direction' => $request->query->get('direction', 'asc'),
                'index' => $request->query->get('index', '0'),
                'limit' => $request->query->get('limit', '100')];

      try {
        $data = $em->getRepository('APIImportBundle:Fichier')->getTableView($fichier, json_decode($request->getContent(), true), $order);
      } catch (Exception $e) {
        return new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      $resultsLength = count($data) ? $data[0]['items_count'] : 0;
      //suppression de la colonne retournant le nombre de résula
      array_walk($data, function (&$row) {
        unset($row['items_count']);
      });
      
      return [ 'resultsLength' => $resultsLength,
               'items' => $data ];
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/add-field")
    */
    public function addFieldAction(Request $request, $id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $data = json_decode($request->getContent(), true);

      if ( !preg_match('/^[a-z][a-z_]*$/', $data['field']) ) {
        return new JsonResponse(['message' => 'Erreur de nom de champ'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
      return $em->getRepository('APIImportBundle:Fichier')->addField($fichier, $data['field']);
    }


    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Patch("/fichier/{id}/row/{row}", requirements={"id"="\d+", "row"="\d+"})
    */
    public function patchCellFichierAction(Request $urlRequest, $id, $row)
    {
      list($fichier, $em) = $this->getFichier($id);

      if ( !count($request = json_decode($urlRequest->getContent(), true)) ) {
        return new JsonResponse(['message' => 'Erreur : paramètre manquant'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      try {
        $em->getRepository('APIImportBundle:Fichier')->updateTableCell($fichier, $row, $request);
      } catch (Exception $e) {
        return new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      return true;
    }


    /**
    * @Rest\View(serializerGroups = {"fichier"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/upload")
    */
    public function createFileAction(Request $request)
    {
      
    //  return $request->files->get('file');
      $em = $this->getDoctrine()->getManager('geonature_db');
      $maxSize = 30000000;
      $extension_autorisees =['csv'];

      $fichier = new Fichier();
      $fichier->setDateImport(new \Datetime());

      if ( empty($name = $request->request->get('table')) ) {
        return new JsonResponse(['message' => 'Le nom de la table ne peut être vide'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
      if ( !preg_match('/^[a-z][a-z0-9_]*$/', $name) ) {
        return new JsonResponse(['message' => 'Le nom de la table est incorrecte'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
      $name = "gn_imports.$name";
      if ( $em->getRepository('APIImportBundle:Fichier')->findOneByTable($name) !== null ) {
        return new JsonResponse(['message' => 'Un fichier sous ce nom a déjà été importé'], Response::HTTP_INTERNAL_SERVER_ERROR);
      } 
      $fichier->setTable($name);

      $file = $request->files->get('file');

      if ( empty($file) ) {
        return new JsonResponse(['message' => 'Fichier manquant'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
      if( $file->getClientSize() > $maxSize ){
        return new JsonResponse(['message' => 'Le fichier est trop gros pour être uploadé'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
      if( !in_array($file->getClientOriginalExtension(), $extension_autorisees) ){
        return new JsonResponse(['message' => 'Ce type de fichier n\'est pas valide'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      $fichier->setFile($file);

      //on créer et upload le fichier sur le serveur
      $em->persist($fichier);
      $em->flush();
      //creation de la table dans postgres
      $retour = $em->getRepository('APIImportBundle:Fichier')->importToPostgres($fichier);
      //si pas d'erreur
      if ( !$retour['error']) { 
        return $fichier;
      }
      //si erreur on supprime la ligne de la table (qui a été créé precedemment)
      $em->remove($fichier);
      $em->flush();
      
      return new JsonResponse(['message' => $retour['message']], Response::HTTP_INTERNAL_SERVER_ERROR);

    }

    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/field")
    */
    public function addMappedFieldAction(Request $request, $id)
    {
        list($fichier, $em) = $this->getFichier($id);

        $item = new FichierChamp();
        $form = $this->createForm(FichierChampType::class, $item);

        $form->submit(json_decode($request->getContent(), true), false); // Validation des données

        if ($form->isValid()) {
            $item->setFichier($fichier);
            $em->persist($item);
            $em->flush();
            return $item;
        } else {
            return $form;
        }
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}/localisations")
    */
    public function getLocalisationsAction(Request $request, $id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $fields_localisation = ['latitude' => null, 'longitude' => null];

      foreach ($fichier->getChamps() as $champ) {
        switch ($champ->getFieldFSD()->getChamp()) {
          case '__LATITUDE__':
            if ( !is_null($fields_localisation['latitude']) ) {
              return new JsonResponse(['message' => 'Champ latitude mappé plusieurs fois'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            $fields_localisation['latitude'] = $champ->getChamp();
            break;

          case '__LONGITUDE__':
            if ( !is_null($fields_localisation['longitude']) ) {
              return new JsonResponse(['message' => 'Champ longitude mappé plusieurs fois'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            $fields_localisation['longitude'] = $champ->getChamp();
            break;
        }
      }

      if ( is_null($fields_localisation['latitude']) and is_null($fields_localisation['longitude']) ) {
        return new JsonResponse(['message' => 'Aucun champ de  localisation n\'est spécifié pour ce fichier'], Response::HTTP_NOT_FOUND);
      }

      //champs : value, ok, ban
      return $em->getRepository('APIImportBundle:Fichier')->getListLocalisations($fichier, $fields_localisation);
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Get("/fichier/{id}/localisations/geoms")
    */
    public function getLocalisationsGeomsAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      //champs : value, ok, ban
      return $em->getRepository('APIImportBundle:Fichier')->getLocalisationsGeoms($fichier);
    }


    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/duplicate-lines/check")
    */
    public function getDuplicateLinesAction(Request $request, $id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $fields = json_decode($request->getContent(), true);

      return $em->getRepository('APIImportBundle:Fichier')->checkDuplicateLines($fichier, $fields);
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/duplicate-lines/tag")
    */
    public function tagDuplicateLinesAction(Request $request, $id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $fields = json_decode($request->getContent(), true);

      return $em->getRepository('APIImportBundle:Fichier')->tagDuplicateLines($fichier, $fields);
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @ Rest\Post("/fichier/{id}/exists-in-db/check")
    */
    public function getExistsInDBAction(Request $request, $id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $fields = json_decode($request->getContent(), true);

      return $em->getRepository('APIImportBundle:Fichier')->checkExistsInDB($fichier, $fields);
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @ Rest\Post("/fichier/{id}/exists-in-db/tag")
    */
    public function tagExistsInDBAction(Request $request, $id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $fields = json_decode($request->getContent(), true);

      return $em->getRepository('APIImportBundle:Fichier')->tagDuplicateLines($fichier, $fields);
    }


    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/regrouping")
    */
    public function setRegroupingAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      return $em->getRepository('APIImportBundle:Fichier')->setRegrouping($fichier);
    }


    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/observers/set-id")
    */
    public function setObserversIDAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      //vérification qu'il y ait bien qu'un champ observateur mappé pour ce fichier.
      if ( !$fichier->hasOnlyOneObserversField() ) {
        return new JsonResponse(['message' => 'Champ observateurs non mappé ou mappé plusieurs fois'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      $data = $em->getRepository('APIImportBundle:FichierChamp')->getListObservers($fichier->getChampObservateur());

      $init_values = [];
      foreach ($data as $value) {
        $observers = array_values(array_unique(json_decode($value['observers_bd'], true)));
        //gestion d'un potentiel erreur d'un observateur présent 2 fois en BD
        if ( count($observers) !== 1 ) {
          return new JsonResponse(
            ['message' => 'Un nom "'.$observers[0].'" correspondant à plusieurs observateurs existe en BD - A faire vérifier par l\'administrateur'], 
            Response::HTTP_INTERNAL_SERVER_ERROR
          );
        }
        foreach (json_decode($value['init_value'], true) as $init_value) {
          $init_values[$init_value][] = $observers[0];
        }
      }

      return $em->getRepository('APIImportBundle:Fichier')->setObserversId($fichier, $init_values) ? 
                      true : 
                      new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
    * @Rest\View()
    * @Security("has_role('IMPORT')")
    *
    * @Rest\Post("/fichier/{id}/switch-status")
    */
    public function switchStatusAction($id)
    {
      list($fichier, $em) = $this->getFichier($id);

      $fichier->setClos(!$fichier->getClos());

      $em->persist($fichier);
      $em->flush();
      return true;
    }
}


