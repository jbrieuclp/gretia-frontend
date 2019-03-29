<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;

use API\BiblioBundle\Entity\Publication;
use API\BiblioBundle\Form\Type\PublicationType;

class PublicationController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"get_publication"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/publications")
    */
    public function publicationsAction(Request $request)
    {
      $filtre = [];

      if ( !empty($request->query->get('isbn')) ) 
        $filtre['isbn'] = $request->query->get('isbn');

      if ( !empty($request->query->get('titre')) ) 
        $filtre['titre'] = $request->query->get('titre');

      $em = $this->getDoctrine()->getManager('bibliodb');

      return "coucou";
      return $em->getRepository('APIBiblioBundle:Publication')->findBy($filtre, array());
    }

    /**
    * @Rest\View(serializerGroups = {"get_publication"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Post("/publication")
    */
    public function createAction(Request $request)
    {
      $session = $this->get('session');

      $publication = $session->get('publication', new Publication());

      $session->set('publication', $publication);
      return var_dump($session);
    }

    /**
    * @Rest\View(serializerGroups = {"get_publication"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Post("/publication/test")
    */
    public function testAction(Request $request)
    {
        $publication = new Publication();
        $form = $this->createForm(PublicationType::class, $publication);
        $form->submit(json_decode($request->getContent(), true)); // Validation des données
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('bibliodb');
            $em->persist($publication);
            $em->flush();
            return $publication;
        } else {
            return $form;
        }
    }

    /**
    * @Rest\View(serializerGroups = {"get_publication"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/publications/{publicationID}")
    */
    public function publicationAction(Request $request, $publicationID)
    {
      $em = $this->getDoctrine()->getManager('bibliodb');
      return $em->getRepository('APIBiblioBundle:Publication')->find($publicationID);
    }

    /**
    * @Rest\View(serializerGroups = {"livres"})
    * @ Security("has_role('ROLE_READER')")
    *
    * @Rest\Get("/livres")
    */
    public function livresAction(Request $request)
    {
      $filtre = [];

      if ( !empty($request->query->get('isbn')) ) 
        $filtre['isbn'] = $request->query->get('isbn');

      if ( !empty($request->query->get('titre')) ) 
        $filtre['titre'] = $request->query->get('titre');

      $em = $this->getDoctrine()->getManager('bibliodb');
      return $em->getRepository('APIBiblioBundle:Livre')->findBy($filtre, array());
    }

}
