<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;

class FormController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @Rest\View()
     */
    public function getPublicationAction()
    {
        $em = $this->getDoctrine()->getManager('bibliodb');
        $statutSaisies = $em->getRepository('APIBiblioBundle:StatutSaisie')->findBy(array(), array('libelle'=>'asc'));
        $statutIntegrations = $em->getRepository('APIBiblioBundle:StatutIntegration')->findBy(array(), array('libelle'=>'asc'));
        $editeurs = $em->getRepository('APIBiblioBundle:Editeur')->findBy(array(), array('nom'=>'asc'));
        $revues = $em->getRepository('APIBiblioBundle:Revue')->findBy(array(), array('nom'=>'asc'));

        $retour = array('statutSaisies' => $statutSaisies, 
      									'statutIntegrations' => $statutIntegrations,
      									'editeurs' => $editeurs,
      									'revues' => $revues,
      								);
        return $retour;
    }

}
