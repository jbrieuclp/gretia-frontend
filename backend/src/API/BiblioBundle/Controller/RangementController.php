<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;

class RangementController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @Rest\View()
     */
    public function getAllCat1Action()
    {
        return $this->getDoctrine()->getRepository('APIBiblioBundle:RangementCat1')->findBy(array(), array('libelle'=>'asc'));
    }

}
