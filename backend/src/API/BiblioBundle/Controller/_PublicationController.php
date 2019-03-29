<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

class PublicationController extends FOSRestController implements ClassResourceInterface
{
    public function indexAction()
    {
        return $this->render('@APIBiblio/Default/index.html.twig');
    }

    /**
     * @Rest\View()
     */
    public function getPublicationAction()
    {
        return $this->getDoctrine()->getRepository('APIBiblioBundle:Publication')->findAll();
    }

    /**
     * @Rest\View()
     */
    public function searchPublicationAction(Request $request)
    {
        $serializer = $this->get('jms_serializer');
        $data = $serializer->deserialize($request->getContent(), 'array', 'json');

        return $this->getDoctrine()->getRepository('APIBiblioBundle:Publication')->search($data);
    }

    /**
     * @Rest\View()
     */
    public function savePublicationAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager('bibliodb');
        $serializer = $this->get('jms_serializer');
        $data = $serializer->deserialize($request->getContent(), 'API\BiblioBundle\Entity\Publication', 'json');
$data->setLivre(null);
        $entity = $em->merge($data);
        $em->persist($entity);
        $em->flush();

        return $data;
    }

}
