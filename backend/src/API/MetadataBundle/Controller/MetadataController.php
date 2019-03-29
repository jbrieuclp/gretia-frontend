<?php

namespace API\MetadataBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;
use Symfony\Component\HttpFoundation\File\File;


use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use API\MetadataBundle\Entity\CadreAcquisition;
use API\MetadataBundle\Form\Type\CadreAcquisitionType;
use API\MetadataBundle\Entity\JDD;

class MetadataController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"cadre"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Get("/cadres")
    */
    public function getCadresAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $cadres = $em->getRepository('APIMetadataBundle:CadreAcquisition')->findAll();
        return $cadres;
    }

    /**
    * @Rest\View(serializerGroups = {"cadre"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Get("/cadre/{cadre}")
    */
    public function getCadreAction($cadre)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $cadre = $em->getRepository('APIMetadataBundle:CadreAcquisition')->find($cadre);
        return $cadre;
    }

    /**
    * @Rest\View(serializerGroups = {"cadre"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Post("/cadre")
    * @ParamConverter("cadre", converter="fos_rest.request_body")
    */
    public function createCadreAction(CadreAcquisition $cadre)
    {

      $errors = $this->get('validator')->validate($cadre);

      if (count($errors)) {
          return $this->view($errors, Response::HTTP_BAD_REQUEST);
      }

      $em = $this->getDoctrine()->getManager('gretiadb');
      $user = $this->get('security.token_storage')->getToken()->getUser();

      $cadre->setTerritoire($em->merge($cadre->getTerritoire()));
      $cadre->setAvancement($em->merge($cadre->getAvancement()));
      $cadre->setDateCreation(new \Datetime());
      $cadre->setDateModif(new \Datetime());
      if ($cadre->getPublic()) {
        $cadre->setDiffusable(true);
      }
      if ( $cadre->getPublic() === null ) { $cadre->setPublic(false); }
      if ( $cadre->getDiffusable() === null ) { $cadre->setDiffusable(false); }

      $cadre->setUserCreation($user);
      $cadre->setUserModif($user);

      $em->persist($cadre);
      $em->flush();

      return $cadre;
    }

    /**
    * @Rest\View(serializerGroups = {"cadre"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Put("/cadre/{cadre}")
    * @ParamConverter("cadre", converter="fos_rest.request_body")
    */
    public function updateCadreAction(CadreAcquisition $cadre)
    {
      $em = $this->getDoctrine()->getManager('gretiadb');
      $cadre = $em->merge($cadre);

      $errors = $this->get('validator')->validate($cadre);

      if (count($errors)) {
          return $this->view($errors, Response::HTTP_BAD_REQUEST);
      }

      $user = $this->get('security.token_storage')->getToken()->getUser();

      $cadre->setTerritoire($em->merge($cadre->getTerritoire()));
      $cadre->setAvancement($em->merge($cadre->getAvancement()));
      $cadre->setDateModif(new \Datetime());
      if ($cadre->getPublic()) {
        $cadre->setDiffusable(true);
      }
      if ( $cadre->getPublic() === null ) { $cadre->setPublic(false); }
      if ( $cadre->getDiffusable() === null ) { $cadre->setDiffusable(false); }

      $cadre->setUserModif($user);

      $em->persist($cadre);
      $em->flush();

      return $cadre;
    }


    /**
    * @Rest\View(serializerGroups = {"jdd_get"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Get("/cadres/{cadre}/jeux-de-donnees")
    */
    public function getJDDFromCadreAction($cadre)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $jdds = $em->getRepository('APIMetadataBundle:JDD')->findByCadre($cadre);
    //    $request->attributes->get('_view')->setSerializerGroups($groups);

        return $jdds;


        //return new JsonResponse($taxon, 200, array("Access-Control-Allow-Origin" => "*"));
    }


    /**
    * @Rest\View(serializerGroups = {"territoire"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Get("/territoires")
    */
    public function getTerritoiresAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $territoires = $em->getRepository('APIMetadataBundle:Territoire')->findAll();
    //    $request->attributes->get('_view')->setSerializerGroups($groups);

        return $territoires;


        //return new JsonResponse($taxon, 200, array("Access-Control-Allow-Origin" => "*"));
    }

    /**
    * @Rest\View(serializerGroups = {"avancement"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Route("/avancements")
    */
    public function getAvancementsAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $avancements = $em->getRepository('APIMetadataBundle:Avancement')->findAll();
    //    $request->attributes->get('_view')->setSerializerGroups($groups);

        return $avancements;


        //return new JsonResponse($taxon, 200, array("Access-Control-Allow-Origin" => "*"));
    }

    /**
    * @Rest\View(serializerGroups = {"jdds_get", "get"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Get("/jdds")
    */
    public function getJDDsAction()
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $jdds = $em->getRepository('APIMetadataBundle:JDD')->getList();
        return $jdds;
    }

    /**
    * @Rest\View(serializerGroups = {"jdd_get", "user_get"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Get("/jdd/{jdd}")
    */
    public function getJDDAction($jdd)
    {
        $em = $this->getDoctrine()->getManager('gretiadb');
        $jdd = $em->getRepository('APIMetadataBundle:JDD')->find($jdd);
        return $jdd;
    }


    /**
    * @Rest\View(serializerGroups = {"post"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Post("/jdd")
    * @ParamConverter("jdd", converter="fos_rest.request_body")
    */
    public function createJDDAction(Request $request, JDD $jdd)
    {


   /*   $view = $this->view(var_dump($jdd->getNom()), 200)
            ->setFormat('html')
            ->setTemplate("APIMetadataBundle:Test:test.html.twig")
            ->setTemplateVar('users');

      return $this->handleView($view);
      return $this->view($jdd->getFile(), Response::HTTP_BAD_REQUEST);*/

      $errors = $this->get('validator')->validate($jdd);

      if (count($errors)) {
          return $this->view($errors, Response::HTTP_BAD_REQUEST);
      }

      $em = $this->getDoctrine()->getManager('gretiadb');

      $cadre = $em->getRepository('APIMetadataBundle:CadreAcquisition')->find($jdd->getCadre()->getId());
      $user = $this->get('security.token_storage')->getToken()->getUser();

      $jdd->setCadre($cadre);
      $jdd->setDateCreation(new \Datetime());
      $jdd->setDateModif(new \Datetime());
      if ($jdd->getPublic()) {
        $jdd->setDiffusable(true);
      }
      if ($jdd->getFile() !== null) { //si un fichier est déposé on prend les metadonnées associées
        $jdd->setFileDepos(new \Datetime());
        $jdd->setUserDepos($user);
      }

      if ( $jdd->getIntegre() === null ) { $jdd->setIntegre(false); }
      if ( $jdd->getPublic() === null ) { $jdd->setPublic(false); }
      if ( $jdd->getDiffusable() === null ) { $jdd->setDiffusable(false); }

      $jdd->setUserCreation($user);
      $jdd->setUserModif($user);

      $em->persist($jdd);
      $em->flush();

      return $jdd;
    }

    /**
    * @Rest\View(serializerGroups = {"post"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Put("/jdd/{jdd}")
    * @ParamConverter("jdd", converter="fos_rest.request_body")
    */
    public function updateJDDAction(Request $request, JDD $jdd)
    {

      $em = $this->getDoctrine()->getManager('gretiadb');
      $jdd = $em->merge($jdd);

      $errors = $this->get('validator')->validate($jdd);

      if (count($errors)) {
          return $this->view($errors, Response::HTTP_BAD_REQUEST);
      }

      $user = $this->get('security.token_storage')->getToken()->getUser();

      $jdd->setDateModif(new \Datetime());
      if ($jdd->getPublic()) {
        $jdd->setDiffusable(true);
      }
      if ($jdd->getFile() !== null) { //si un fichier est déposé on prend les metadonnées associées
        $jdd->setFileDepos(new \Datetime());
        $jdd->setUserDepos($user);
      }

      if ( $jdd->getIntegre() === null ) { $jdd->setIntegre(false); }
      if ( $jdd->getPublic() === null ) { $jdd->setPublic(false); }
      if ( $jdd->getDiffusable() === null ) { $jdd->setDiffusable(false); }

      $jdd->setUserModif($user);

      $em->persist($jdd);
      $em->flush();

      return $jdd;
    }


  /**
    * @ Rest\View(serializerGroups = {"get"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Get("/jdd/{jdd}/file")
    */
  public function getJDDFileAction($jdd)
  {
    $em = $this->getDoctrine()->getManager('gretiadb');
    $jdd = $em->getRepository('APIMetadataBundle:JDD')->find($jdd);
    // load the file from the filesystem
    $file = new File($this->get('kernel')->getRootDir() . '/../web/'.$jdd->getWebPath());

    return $this->file($file);

  }

}
