<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Form\Extension\Core\Type\TextType;

use API\BiblioBundle\Entity\AuteurType;
use API\BiblioBundle\Form\Type\AuteurTypeType;

class AuteurTypeController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"auteurs"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/types-auteurs")
    */
    public function getTypesAuteursAction(Request $request)
    {
      //liste des attributs sur lequel il est possible de filtrer par get
      $allowerFilter = array('libelle');

      //pour chaque parametre passés on test si autorisé ou si non vide, sinon on le supprime
      foreach ($request->query->all() as $key => $value) {
        if ( !in_array($key, $allowerFilter) or empty($value) ) {
          $request->query->remove($key);
        }
      }

      $em = $this->getDoctrine()->getManager('bibliodb');
      return $em->getRepository('APIBiblioBundle:AuteurType')->findBy($request->query->all(), array('libelle'));
    }

    /**
    * @Rest\View(serializerGroups = {"auteurs"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/types-auteurs/{typeID}")
    */
    public function getTypeAuteurAction(Request $request, $typeID)
    {
      $em = $this->getDoctrine()->getManager('bibliodb');
      return $em->getRepository('APIBiblioBundle:AuteurType')->find($typeID);
    }

    /**
    * @Rest\View(serializerGroups = {"auteurs"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Post("/types-auteurs")
    */
    public function postTypeAuteurAction(Request $request)
    {
      $em = $this->getDoctrine()->getManager('bibliodb');
      $auteurType = new AuteurType();

      $form = $this->createForm(AuteurTypeType::class, $auteurType);

      if ($form->handleRequest($request)->isValid()) {
        $em->persist($auteurType);
        $em->flush();

        return $auteurType;
      }

      throw new HttpException(400, $form['libelle']->getErrors());
    }

}
