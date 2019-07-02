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
           ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
           ->groupBy('a.id_area')
           ->addGroupBy('a.geom');
    }


    protected function setInformationQuery() {
		
        $qb = $this->queryBuilder;
        $qb->select("a.id_area, min(s.date_min)::date as date_min, max(s.date_max)::date as date_max")
           ->addSelect("min(s.date_min)::date as date_min")
           ->addSelect("max(s.date_max)::date as date_max")
           ->addSelect("count(DISTINCT s.cd_ref) AS nb_taxon")
           ->addSelect("json_agg(DISTINCT concat_ws(' ', NULLIF(roles.nom_role, ''), NULLIF(roles.prenom_role, ''))) as observateurs")
           ->addSelect("json_agg(DISTINCT (json_build_object('id', dts.id_dataset, 'name', dts.dataset_name, 'af', afs.id_acquisition_framework))::jsonb) as datasets")
           ->addSelect("json_agg(DISTINCT (json_build_object('id', afs.id_acquisition_framework, 'name', afs.acquisition_framework_name))::jsonb) as afs")
           ->addSelect("json_agg(DISTINCT (json_build_object('id', commune.area_code, 'name', commune.area_name))::jsonb) as communes")
           ->from('ref_geo.l_areas', 'a')
           ->innerJoin('a', 'pr_atlas.vm_atlas', 'atlas', 'a.id_area = atlas.id_area AND a.id_type = :type_geom')
           ->setParameter('type_geom', $this->getScale()->getType())
           ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
           ->leftJoin('s', 'pr_occtax.v_releve_role_org', 'obseur', 's.unique_id_sinp_grp = obseur.unique_id_sinp_grp')
           ->leftJoin('obseur', 'utilisateurs.t_roles', 'roles', 'roles.id_role = ANY(obseur.roles)')
           ->leftJoin('s', 'gn_meta.t_datasets', 'dts', 'dts.id_dataset = s.id_dataset')
           ->leftJoin('dts', 'gn_meta.t_acquisition_frameworks', 'afs', 'dts.id_acquisition_framework = afs.id_acquisition_framework')
           ->leftJoin('atlas', 'ref_geo.l_areas', 'commune', 'commune.id_area = atlas.id_area_commune')
           ->groupBy('a.id_area');
    }

    /**
     * Fonctions internes nécessaires aux indicateurs 
     *
     */

    protected function setStatuts($statuts)
    {
      if (!is_array($statuts)) return;

      $qb = $this->queryBuilder;

      if (count($statuts)) {
        $qb->innerJoin('s', 'taxonomie.vm_esp_statut', 'statuts', 's.cd_ref = statuts.cd_ref AND ARRAY[atlas.departement::character varying(2)] && statuts.departements');
        $orModule = $qb->expr()->orx();
      }

      foreach ($statuts as $statut) {
        switch ($statut) {
          case 'PROT':
            $orModule->add($qb->expr()->in("statuts.cd_type_statut", "'PR', 'PN', 'PD'"));
            break;
          case 'ZDET':
            $orModule->add($qb->expr()->eq("statuts.cd_type_statut", "'ZDET'"));
            break;
          case 'N2000':
            $orModule->add($qb->expr()->in("statuts.cd_type_statut", "'DH', 'DO'"));
            break;
          
          default:
            # code...
            break;
        }
      }
      $qb->andWhere($orModule);
    }

}