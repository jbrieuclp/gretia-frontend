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


class FichierController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"fichier"})
    * @Security("has_role('CARTO_SYNTHESE')")
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
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/fichier/{id}")
    */
    public function getFichierAction($id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:Fichier')->find($id);
      if (empty($item)) {
        return new JsonResponse(['message' => 'Fichier not found'], Response::HTTP_NOT_FOUND);
      }
      return $item;
    }


    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/fichier/{id}/fields")
    */
    public function getFieldsAction($id)
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

      //$file_fields_name = champs non mappés
      foreach ($file_fields_name as $key => $value) {
        $champ = new FichierChamp();
        $champ->setChamp($value);
        $champ->setFichier($fichier);
        $fields[] = $champ;
      }

      return $fields;
    }

    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/fichier/{id}/field")
    */
    public function addMappedFieldAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $fichier = $em->getRepository('APIImportBundle:Fichier')->find($id);

        $item = new FichierChamp();
        $form = $this->createForm(FichierChampType::class, $item);

        $form->submit(json_decode($request->getContent(), true)); // Validation des données

        if ($form->isValid()) {
            $item->setFichier($fichier);
            $em->persist($item);
            $em->flush();
            return $item;
        } else {
            return $form;
        }
    }

}
