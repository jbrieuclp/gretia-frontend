<?php

namespace API\BiblioBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use API\BiblioBundle\Entity\Publication;

class TestController extends Controller
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('bibliodb');
        $livre = $em->getRepository('APIBiblioBundle:Article')->find(1);

        return $this->render('APIBiblioBundle:Default:index.html.twig', array('data' => $livre));
    }
}
