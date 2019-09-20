<?php
namespace API\CartoBundle\Services\Cartographie;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;

use API\CartoBundle\Services\Cartographie\LayerService;

abstract class IndicateurService extends LayerService
{

    protected function setCriteres(/*$maille_id = null*/) {
        parent::setCriteres();

        $this->addCriteres('statuts', $this->request->request->get('statuts'));
    }

    protected function setGeojsonQuery() {
        $qb = $this->queryBuilder;
        $qb->select("a.id_area, ST_AsGeoJSON(ST_Transform(a.geom, 3857), 0) AS the_geom ")
           ->from('ref_geo.l_areas', 'a')
           ->innerJoin('a', 'pr_atlas.vm_atlas', 'atlas', 'a.id_area = atlas.id_area AND a.id_type = :type_geom')
           ->setParameter('type_geom', $this->getScale()->getType())
           ->innerJoin('atlas', 'gn_synthese.synthese', 's', 'atlas.id_synthese = s.id_synthese')
           ->innerJoin('s', 'taxonomie.taxref', 'taxref', 'taxref.cd_nom = s.cd_nom')
           ->groupBy('a.id_area')
           ->addGroupBy('a.geom');
    } 
}