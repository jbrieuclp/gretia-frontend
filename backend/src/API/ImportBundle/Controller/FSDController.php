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


class FSDController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"fsd"})
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/fsd-fields")
    */
    public function getFSDFieldsAction()
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $items = $em->getRepository('APIImportBundle:SyntheseFSD')->findAll();
        return $items;
    }

    /**
    * @Rest\View(serializerGroups = {"champ"})
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/fichier/{id}/field-by-fsd")
    * Retourne un champ FSD à partir d'un nom fournit en paramètre GET
    */
    public function getFSDFieldAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $fichier = $em->getRepository('APIImportBundle:Fichier')->find($id);
      if (empty($fichier)) 
        return new JsonResponse(['message' => 'Fichier non trouvé'], Response::HTTP_NOT_FOUND);

      $champ = $request->query->get('champ');
      $fsd = $em->getRepository('APIImportBundle:SyntheseFSD')->findByChamp($champ);
      if (empty($fsd)) 
        return new JsonResponse(['message' => 'Champ FSD non trouvé'], Response::HTTP_NOT_FOUND);

      $field = $em->getRepository('APIImportBundle:FichierChamp')->findBy(array('fieldFSD' => $fsd, 'fichier' => $fichier));

      if (empty($field)) {
        return new JsonResponse(['message' => 'Le champ Observateur n\'a pas été mappé'], Response::HTTP_NOT_FOUND);
      } elseif (count($field) > 1) {
        return new JsonResponse(['message' => 'Le champ Observateur est mappé à plusieur champ pour ce fichier. Veuillez le faire correspondre à un unique champ.'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      return $field[0];
    }

    /**
    * @Rest\View()
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/fsd-field/{id}/values")
    */
    public function getFSDFieldValuesAction($id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:SyntheseFSD')->find($id);
      if (empty($item)) {
          return new JsonResponse(['message' => 'FSD field not found'], Response::HTTP_NOT_FOUND);
      }
      if ( empty($item->getSQL()) ) {
        return new JsonResponse(['message' => 'Problème de configuration du champ FSD'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
      $values = $em->getRepository('APIImportBundle:SyntheseFSD')->listValues($item->getSQL());

      return $values;
    }


    /**
    * @Rest\View()
    * @Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/fsd-field/{id}/recherche")
    */
    public function searchFSDFieldValuesAction(Request $request, $id)
    {
      $em = $this->getDoctrine()->getManager('geonature_db');
      $item = $em->getRepository('APIImportBundle:SyntheseFSD')->find($id);
      if (empty($item)) {
          return new JsonResponse(['message' => 'FSD field not found'], Response::HTTP_NOT_FOUND);
      }

      if (empty($item->getSQL())) {
          return new JsonResponse(['message' => 'Problème de configuration du champ FSD'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
      
      $term = $request->query->get('term');

      if (strlen($term) < 3) {
          return new JsonResponse(['message' => 'Element de recherche trop court'], Response::HTTP_NOT_FOUND);
      }

      $values = $em->getRepository('APIImportBundle:SyntheseFSD')->search($item->getSQL(), $term);

      return $values;
    }
}
