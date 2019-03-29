<?php

namespace API\BiblioBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class LocalisationController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @Rest\View()
     * @ Security("has_role('ROLE_READER')")
     */
    public function getAllAction()
    {
      return $this->getDoctrine()->getRepository('APIBiblioBundle:Localisation')->findBy(array(), array('libelle'=>'asc'));
    }

}
