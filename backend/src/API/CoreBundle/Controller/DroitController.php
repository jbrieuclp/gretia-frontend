<?php

namespace API\CoreBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;

use API\CoreBundle\Entity\UserGeoNature;
use API\CoreBundle\Entity\Droit;

class DroitController extends FOSRestController implements ClassResourceInterface
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
        $actions = $em->getRepository('APIMetadataBundle:CadreAcquisition')->findAll();
        return $cadres;
    }

    /**
    * @Rest\View(serializerGroups = {"tag_get"})
    * @Security("has_role('GESTION_DROIT')")
    *
    * @Rest\Get("/droit/actions")
    */
    public function getActionsAction()
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $actions = $em->getRepository('APICoreBundle:Tag')->findByType('2');
        return $actions;
    }

    /**
    * @Rest\View(serializerGroups = {"tag_get"})
    * @Security("has_role('GESTION_DROIT')")
    *
    * @Rest\Get("/droit/objects")
    */
    public function getObjectsAction()
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $objects = $em->getRepository('APICoreBundle:Tag')->findBy(array('type' => '3', 'id' => array(20,21,22,23)));
        return $objects;
    }

    /**
    * @Rest\View(serializerGroups = {"app_get"})
    * @Security("has_role('GESTION_DROIT')")
    *
    * @Rest\Get("/droit/apps")
    */
    public function getAppsAction()
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $apps = $em->getRepository('APICoreBundle:App')->findAll();
        return $apps;
    }

    /**
    * @Rest\View(serializerGroups = {"droit_get"})
    * @Security("has_role('GESTION_DROIT')")
    *
    * @Rest\Get("/user/{user}/droits")
    */
    public function getUserDroitsAction($user)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $droits = $em->getRepository('APICoreBundle:UserGeoNature')->find($user);
        return $droits;
    }

    /**
    * @Rest\View(serializerGroups = {"droit_get"})
    * @Security("has_role('GESTION_DROIT')")
    *
    * @Rest\Put("/user/{user}/droits")
    * @ParamConverter("user", converter="fos_rest.request_body")
    */
    public function updateUserDroitsAction(UserGeoNature $user)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $bdUser = $em->getRepository('APICoreBundle:UserGeoNature')->find($user->getId());

        foreach ($bdUser->getDroits() as &$droit) {
          $bdUser->removeDroit($droit);
        }
        $em->flush();

        foreach ($user->getDroits() as $droit) {
          $userDroit = new Droit();
          $userDroit->setApp($em->merge($droit->getApp()));
          $userDroit->setAction($em->merge($droit->getAction()));
          $userDroit->setObject($em->merge($droit->getObject()));
          $bdUser->addDroit($userDroit);
        }

        $em->persist($bdUser);
        $em->flush();
        return $bdUser;
    }

    /**
    * @Rest\View(serializerGroups = {"cadre"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Post("/cadre")
    * @ParamConverter("cadre", converter="fos_rest.request_body")
    */
 /*   public function createCadreAction(CadreAcquisition $cadre)
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
*/
    /**
    * @Rest\View(serializerGroups = {"cadre"})
    * @Security("has_role('METADATA')")
    *
    * @Rest\Put("/cadre/{cadre}")
    * @ParamConverter("cadre", converter="fos_rest.request_body")
    */
/*    public function updateCadreAction(CadreAcquisition $cadre)
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
*/
}
