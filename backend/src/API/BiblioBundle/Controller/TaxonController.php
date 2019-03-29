<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;

class TaxonController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @Rest\View()
     */
    public function getAllAction()
    {
        return $this->getDoctrine()->getRepository('APIBiblioBundle:Taxon')->findBy(array(), array('libelle'=>'asc'));
    }

}
