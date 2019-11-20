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


class FieldController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('CARTO_SYNTHESE')")
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
    * @Security("has_role('CARTO_SYNTHESE')")
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
          return $this->getFieldValuesAction($item->getId());
        }
        return new JsonResponse(['message' => 'Une erreur est survenue'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }


    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('CARTO_SYNTHESE')")
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
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('CARTO_SYNTHESE')")
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

      return $this->getFieldsAction($fichier_id);
    }


    /**
    * @Rest\View()
    * @Security("has_role('CARTO_SYNTHESE')")
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
        foreach ($values as $key => $value) {
          $value['ok'] =  preg_match($item->getFieldFSD()->getRegexp(), $value['value']);
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
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/field/{id}/observers")
    */
    public function getFieldObserversAction($id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:FichierChamp')->find($id);
      if (empty($item)) {
          return new JsonResponse(['message' => 'Field not found'], Response::HTTP_NOT_FOUND);
      }

      //champs : value, ok, ban
      $values = $em->getRepository('APIImportBundle:FichierChamp')->getListObservers($item);

      foreach ($values as &$value) {
        $value['proposition'] = json_decode($value['proposition']);
      }

      return $values;
    }

}
