<?php

namespace Visu\ConsultationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use Visu\TaxonBundle\Entity\Taxref;


class CartographieController extends Controller
{

    public function templateCarteAction()
    {
        return $this->render('VisuConsultationBundle:Carto:templateCarto.html.twig');
    }

    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
    public function carteAction()
    {
        return $this->render('VisuConsultationBundle:Carto:carte.html.twig');
    }


    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
	public function repartitionAction(Request $request)
    {
        $geojson = $this->getLayer('repartition_service', $request);

        return new JsonResponse($geojson);
    }
    

    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
    public function GeoJsonPCAction()
    {
        $service = $this->get('visu_consultation.service.pression_connaissance');

        return new Response($service->getGeoJson(3857));
    }
    
    
    /**
     * Affichage de l'infobulle de pression de connaissance
     * @Security("has_role('CARTO_SYNTHESE')")
     */
    public function InfobullePCAction()
    {
        $service = $this->get('visu_consultation.service.pression_connaissance');

        $informations = $service->getInfoBulle();

        return $this->render('VisuConsultationBundle:Infobulles:info_pc.html.twig', array('informations' => $informations));
    }


    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
    public function geoJsonRichesseTaxoAction()
    {
        $service = $this->get('visu_consultation.service.richesse_taxonomique');

        return new Response($service->getGeoJson(3857));
    }
    
    
    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
    public function InfobulleRichesseTaxoAction()
    {
        $service = $this->get('visu_consultation.service.richesse_taxonomique');

        $informations = $service->getInfoBulle();
        
        return $this->render('VisuConsultationBundle:Infobulles:info_richesse_taxonomique.html.twig', array('informations' => $informations));
    }


    /**
     * Afficher la repartition d'un taxon en geojson
     * @Security("has_role('CARTO_SYNTHESE')")
     */
    public function repartitionTaxonAction()
    {
        $service = $this->get('visu_consultation.service.repartition_taxonomique');

        return new Response($service->getGeoJson(3857));
    }

    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
    public function InfobulleRepartitionTaxonAction()
    {
        $service = $this->get('visu_consultation.service.repartition_taxonomique');

        $informations = $service->getInfoBulle();
        
        return $this->render('VisuConsultationBundle:Infobulles:info_repartition_taxon.html.twig', array('informations' => $informations));
    }



    /**
     * Afficher la repartition d'un ou plusieurs territoire(s) en geojson
     * @Security("has_role('CARTO_SYNTHESE')")
     */
    public function geoJsonTerritoireAction(Request $request)
    {
        $spatialService = $this->get('visu_consultation.service.spatial');

        $territoires = $request->request->get('territoire');

        $datas = $this->getDoctrine()
            ->getManager('serena_db')
            ->getRepository('VisuConsultationBundle:Territoire')
            ->getGeomByIds($territoires);

        return new Response($spatialService->toGeoJson($datas, '3857', 'the_geom'));
    }


    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
    private function getLayer($service, $echelle="maille5", $projection='3857', $critere=array()) {
        
        $serviceLayer = $this->get($service);    

        $echelle = $serviceLayer->getAuthorizedEchelle($echelle); 

        //geojson = arrayAssoc('header', 'features', 'footer');
        return $serviceLayer->getGeoJson(array(
											'echelle' => $echelle,
											'projection' => $projection,
											'criteres' => $critere,
                                            )
                                    );
    }


    /**
    * @Security("has_role('CARTO_SYNTHESE')")
    */
    private function getCriteres(Request $request, $maille_id = null) {

        $criteres = array(
                    'extent' => $request->request->get('extent'),
                    'maille_id' => $maille_id,
                    'departements' => $request->request->get('departements'),
                    'date_min' => $request->request->get('date_min'),
                    'date_max' => $request->request->get('date_max'),
                    'typeDate' => $request->request->get('typeDate'),
                    'origine' => $request->request->get('origine'),
                    'typeReleve' => $request->request->get('typeReleve'),
                    'organisme' => $request->request->get('organisme'),
                    'territoire' => $request->request->get('territoire'),
                    'filtres' => $request->request->get('filtres'),
                    'suivi' => $request->request->get('suivi'),
                  );

        return $criteres;
    }

}
