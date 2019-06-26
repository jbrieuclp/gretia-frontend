<?php

namespace API\CartoBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use \Symfony\Component\Yaml\Parser;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class CartoController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"scale"})
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/scales")
    */
    public function getScalesAction()
    {
        $cpt_id = $this->get('security.token_storage')->getToken()->getUser()->getId();
        $em = $this->getDoctrine()->getManager('geonature_db');
        $scales = $em->getRepository('APICartoBundle:Scale')->getScaleForUser($cpt_id);
        return $scales;
    }

    /**
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/repartition/{cd_ref}.geojson")
    */
    public function layerRepartitionAction()
    {
        $service = $this->get('api_carto.service.repartition_taxonomique');

        return new Response($service->getGeoJson(3857));
    }

    /**
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/pression-inventaires.geojson")
    */
    public function layerPressionAction()
    {
        $service = $this->get('api_carto.service.pression_connaissance');

        return new Response($service->getGeoJson(3857));
    }

    /**
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/richesse-taxonomique.geojson")
    */
    public function layerRichesseTaxoAction()
    {
        $service = $this->get('api_carto.service.richesse_taxonomique');

        return new Response($service->getGeoJson(3857));
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/pression-inventaires/{area}")
    */
    public function infoPressionAction($area)
    {
        $service = $this->get('api_carto.service.pression_connaissance');

        $data = $service->getInfoBulle($area);

        //mise au propre des données
        $data['observateurs'] = json_decode($data['observateurs']);
        $data['datasets'] = json_decode($data['datasets'], true);
        $data['afs'] = json_decode($data['afs'], true);
        $data['communes'] = json_decode($data['communes'], true);

        return $data;
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/richesse-taxonomique/{area}")
    */
    public function infoRichesseTaxoAction($area)
    {
        $service = $this->get('api_carto.service.richesse_taxonomique');

        $data = $service->getInfoBulle($area);

        //mise au propre des données
        $data['observateurs'] = json_decode($data['observateurs']);
        $data['datasets'] = json_decode($data['datasets'], true);
        $data['afs'] = json_decode($data['afs'], true);
        $data['communes'] = json_decode($data['communes'], true);
        $data['taxons'] = json_decode($data['taxons'], true);

        return $data;
    }

}
