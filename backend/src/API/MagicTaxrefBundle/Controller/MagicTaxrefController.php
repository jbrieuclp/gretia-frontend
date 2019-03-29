<?php

namespace API\MagicTaxrefBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MagicTaxrefController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"taxref12"})
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Route("/taxons")
    */
    public function getTaxonsAction(Request $request, $cd_nom)
    {
        $em = $this->getDoctrine()->getManager('mc_taxref_db');
        $taxon = $em->getRepository('APIMagicTaxrefBundle:Taxon')->findWithTaxrefVersion($cd_nom);
    //    $request->attributes->get('_view')->setSerializerGroups($groups);

        return $taxon;


        //return new JsonResponse($taxon, 200, array("Access-Control-Allow-Origin" => "*"));
    }

    /**
    * @Rest\View(serializerGroups = {"taxon"})
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Route("/taxons/{cd_nom}", methods={"GET"}, requirements={"cd_nom"="\d+"})
    */
    public function getTaxonAction(Request $request, $cd_nom)
    {
        $em = $this->getDoctrine()->getManager('mc_taxref_db');
        $taxon = $em->getRepository('APIMagicTaxrefBundle:Taxon')->findWithTaxrefVersion($cd_nom);

        return $taxon;


        //return new JsonResponse($taxon, 200, array("Access-Control-Allow-Origin" => "*"));
    }

    /**
     * @Rest\View()
     * @Rest\Route("/taxref/{version}/taxons/{cd_nom}", methods={"GET"}, requirements={"cd_nom"="\d+", "version"="[0-9]{1,2}"})
     * @Security("has_role('MAGIC_TAXREF')")
     */
    public function taxonByTaxrefVAction(Request $request, $version, $cd_nom)
    {
        $em = $this->getDoctrine()->getManager('mc_taxref_db');
        try {
          $taxon = $em->getRepository('APIMagicTaxrefBundle:Taxref'.$version)->find($cd_nom);
        } catch(\Doctrine\DBAL\DBALException $e) {
            return array();
        }
        $request->attributes->get('_template')->setSerializerGroups(array('taxref'.$version));

        return $taxon;
    }

    

    /**
    * @Rest\View()
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Route("/taxref/{version}/taxons/{cd_ref}/synonymes", methods={"GET"}, requirements={"cd_ref"="\d+", "version"="[0-9]{1,2}"})
    */
    public function getSynonymesAction(Request $request, $version, $cd_ref)
    {
        $em = $this->getDoctrine()->getManager('mc_taxref_db');
        try {
          $taxons = $em->getRepository('APIMagicTaxrefBundle:Taxref'.$version)->findByCdRef($cd_ref);
        } catch(\Doctrine\DBAL\DBALException $e) {
            return array();
        }
        $request->attributes->get('_template')->setSerializerGroups(array('taxref'.$version));
        return $taxons;
    }

    /**
    * @Rest\View(serializerGroups = {"taxon"})
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Route("/taxref/{version}/taxons/{cd_ref}/parents", methods={"GET"}, requirements={"cd_ref"="\d+", "version"="[0-9]{1,2}"})
    */
    public function getTaxonParentsAction(Request $request, $version, $cd_ref)
    {
        $em = $this->getDoctrine()->getManager('mc_taxref_db');

        $arborescence = [];
        $current_taxon = $em->getRepository('APIMagicTaxrefBundle:Taxref'.$version)->find($cd_ref);
        $arborescence[] = $current_taxon;

        while ( $current_taxon->getCdSup() !== null ) {
            $current_taxon = $em->getRepository('APIMagicTaxrefBundle:Taxref'.$version)->find($current_taxon->getCdSup());
            $arborescence[] = $current_taxon;
        }

        return array_reverse($arborescence);


        //return new JsonResponse($taxon, 200, array("Access-Control-Allow-Origin" => "*"));
    }

    /**
    * @Rest\View(serializerGroups = {"taxon"})
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Route("/taxref/{version}/taxons/{cd_ref}/childrens", methods={"GET"}, requirements={"cd_ref"="\d+", "version"="[0-9]{1,2}"})
    */
    public function getTaxonChildrensAction(Request $request, $version, $cd_ref)
    {
        $em = $this->getDoctrine()->getManager('mc_taxref_db');

        return $em->getRepository('APIMagicTaxrefBundle:Taxref'.$version)->findByCdSup($cd_ref);
    }

    /**
     * @Rest\View()
     * @Rest\Route("/taxons/recherche", methods={"GET"})
     * @Security("has_role('MAGIC_TAXREF')")
     */
    public function rechercheTaxonAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager('mc_taxref_db');

        $term = $request->query->get('name');

        if ( empty($term) )
          throw new NotFoundHttpException("Taxon non trouvé");

        if ( ctype_digit($term) ) {
          exit();
        }

        $taxons = $em->getRepository('APIMagicTaxrefBundle:NomComplet')->getListByPattern($term);

        return $taxons;
    }

    /**
    * @Rest\View(serializerGroups = {"taxon"})
    * @Security("has_role('MAGIC_TAXREF')")
    *
    * @Rest\Route("/taxref/{version}/taxons/{taxon}/change", methods={"GET"}, requirements={"taxon"="\d+", "version"="[0-9]{1,2}"})
    */
    public function getChangeElementAction(Request $request, $version, $taxon)
    {
        if ($version == 2) { return array();}
        
        $em = $this->getDoctrine()->getManager('mc_taxref_db');

        return $em->getRepository('APIMagicTaxrefBundle:Taxon')->getChange($version, $taxon);
    }


}
