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
    * @Rest\Post("/layer-info/pression-inventaires/{area}")
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
    * @Rest\Post("/layer-info/richesse-taxonomique/{area}")
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

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{area}/observateurs", requirements={"area"="\d+"})
    */
    public function infoObservateursAction($area) {
        $service = $this->get('api_carto.service.layer_info');
        return $service->getInfoObservateurs($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{cd_ref}/{area}/observateurs", requirements={"cd_ref"="\d+", "area"="\d+"})
    */
    public function infoObservateursRepartitionAction($area) {
        return $this->infoObservateursAction($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{area}/datasets", requirements={"area"="\d+"})
    */
    public function infoDatasetsAction($area) {
        $service = $this->get('api_carto.service.layer_info');
        return $service->getInfoJDDs($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{cd_ref}/{area}/datasets", requirements={"cd_ref"="\d+", "area"="\d+"})
    */
    public function infoDatasetsRepartitionAction($area) {
        return $this->infoDatasetsAction($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{area}/communes", requirements={"area"="\d+"})
    */
    public function infoCommunesAction($area) {
        $service = $this->get('api_carto.service.layer_info');
        return $service->getInfoCommunes($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{cd_ref}/{area}/communes", requirements={"cd_ref"="\d+", "area"="\d+"})
    */
    public function infoCommunesRepartitionAction($area) {
        return $this->infoCommunesAction($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{area}/counts", requirements={"area"="\d+"})
    */
    public function infoCountsAction($area) {
        $service = $this->get('api_carto.service.layer_info');
        return $service->getInfoCounts($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{cd_ref}/{area}/counts", requirements={"cd_ref"="\d+", "area"="\d+"})
    */
    public function infoCountsRepartitionAction($area) {
        return $this->infoCountsAction($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{area}/taxons", requirements={"area"="\d+"})
    */
    public function infoTaxonsAction($area) {
        $service = $this->get('api_carto.service.layer_info');
        return $service->getInfoTaxons($area);
    }

    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Post("/layer/info/{cd_ref}/{area}/taxons", requirements={"cd_ref"="\d+", "area"="\d+"})
    */
    public function infoTaxonsRepartitionAction($area) {
        return $this->infoTaxonsAction($area);
    }

}
