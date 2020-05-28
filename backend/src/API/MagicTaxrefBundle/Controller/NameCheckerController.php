<?php

namespace API\MagicTaxrefBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NameCheckerController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"taxref12"})
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Get("/name-checker/{taxon}")
    */
    public function getTaxonsAction(Request $request, $cd_nom)
    {
        $taxrefMatch = $this->get('magic_taxref.service.name_checker')->check();
        return $taxrefMatch;
    }

    /**
    * @Rest\View() serializerGroups = {"taxref12"}
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Post("/name-checker")
    */
    public function postTaxonsAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $taxrefMatch = $this->get('magic_taxref.service.name_checker')->check($data['taxons']);
        return $taxrefMatch;
    }

}
