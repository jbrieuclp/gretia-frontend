<?php
namespace API\CartoBundle\Services\Cartographie;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;

use API\CartoBundle\Services\Cartographie\LayerService;

class LayerInfoService extends LayerService
{
    public function __construct(EntityManager $em, AuthorizationChecker $authorization, TokenStorage $context, Router $router, RequestStack $request)  {
      parent::__construct($em, $authorization, $context, $router, $request);    

    }

    protected function setCriteres(/*$maille_id = null*/) {
      parent::setCriteres();

      $this->addCriteres('taxon', $this->request->get('cd_ref', null));
      //si repartition taxon on ne filtre pas sur le statut
      if ($this->request->get('cd_ref', null) === null) {
        $this->addCriteres('statuts', $this->request->request->get('statuts', null));
      }
    }

    public function getInfoObservateurs($area) {
      $this->addCriteres('area', $area);
      $this->setObservateursQuery();
      $this->setWhere();
      return $this->queryBuilder->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getInfoJDDs($area) {
      $this->addCriteres('area', $area);
      $this->setJDDsQuery();
      $this->setWhere();
      return $this->queryBuilder->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getInfoCommunes($area) {
      $this->addCriteres('area', $area);
      $this->setCommunesQuery();
      $this->setWhere();
      return $this->queryBuilder->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getInfoCounts($area) {
      $this->addCriteres('area', $area);
      $this->setCountsQuery();
      $this->setWhere();
      return $this->queryBuilder->execute()->fetch(\PDO::FETCH_ASSOC);
    }

    public function getInfoTaxons($area) {
      $this->addCriteres('area', $area);
      $this->setTaxonsQuery();
      $this->setWhere();
      return $this->queryBuilder->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected function setObservateursQuery() {
      $qb = $this->queryBuilder;
      $qb->select("roles.nom_role as nom, roles.prenom_role as prenom")
         ->addSelect("min(s.date_min)::date as date_min")
         ->addSelect("max(s.date_max)::date as date_max")
         ->addSelect("count(DISTINCT s.id_synthese) AS nb_obs")
         ->from('ref_geo.l_areas', 'a')
         ->innerJoin('a', 'pr_atlas.vm_atlas', 'atlas', 'a.id_area = atlas.id_area AND a.id_type = :type_geom')
         ->setParameter('type_geom', $this->getScale()->getType())
         ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
         ->innerJoin('s', 'pr_occtax.v_releve_role_org', 'obseur', 's.unique_id_sinp_grp = obseur.unique_id_sinp_grp')
         ->innerJoin('obseur', 'utilisateurs.t_roles', 'roles', 'roles.id_role = ANY(obseur.roles)')
         ->groupBy('roles.nom_role, roles.prenom_role');
    }

    protected function setJDDsQuery() {
      $qb = $this->queryBuilder;
      $qb->select("afs.id_acquisition_framework as id_af, afs.acquisition_framework_name as name_af, dts.id_dataset as id_dts, dts.dataset_name as name_dts")
         ->from('ref_geo.l_areas', 'a')
         ->innerJoin('a', 'pr_atlas.vm_atlas', 'atlas', 'a.id_area = atlas.id_area AND a.id_type = :type_geom')
         ->setParameter('type_geom', $this->getScale()->getType())
         ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
         ->innerJoin('s', 'gn_meta.t_datasets', 'dts', 'dts.id_dataset = s.id_dataset')
         ->innerJoin('dts', 'gn_meta.t_acquisition_frameworks', 'afs', 'dts.id_acquisition_framework = afs.id_acquisition_framework')
         ->groupBy('afs.id_acquisition_framework, afs.acquisition_framework_name, dts.id_dataset, dts.dataset_name');
    }

    protected function setCommunesQuery() {
      $qb = $this->queryBuilder;
      $qb->select("commune.area_code as insee, commune.area_name as name")
         ->addSelect("min(s.date_min)::date as date_min")
         ->addSelect("max(s.date_max)::date as date_max")
         ->addSelect("count(DISTINCT s.id_synthese) AS nb_obs")
         ->from('ref_geo.l_areas', 'a')
         ->innerJoin('a', 'pr_atlas.vm_atlas', 'atlas', 'a.id_area = atlas.id_area AND a.id_type = :type_geom')
         ->setParameter('type_geom', $this->getScale()->getType())
         ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
         ->innerJoin('atlas', 'ref_geo.l_areas', 'commune', 'commune.id_area = atlas.id_area_commune')
         ->groupBy('commune.area_code, commune.area_name');
    }

    protected function setCountsQuery() {
      $qb = $this->queryBuilder;
      $qb->select("count(DISTINCT s.id_synthese) AS nb_obs")
         ->addSelect("min(s.date_min)::date as date_min")
         ->addSelect("max(s.date_max)::date as date_max")
         ->addSelect("count(DISTINCT s.cd_ref) AS nb_taxon")
         ->from('ref_geo.l_areas', 'a')
         ->innerJoin('a', 'pr_atlas.vm_atlas', 'atlas', 'a.id_area = atlas.id_area AND a.id_type = :type_geom')
         ->setParameter('type_geom', $this->getScale()->getType())
         ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese');
    }

    protected function setTaxonsQuery() {
      $qb = $this->queryBuilder;
      $qb->select("s.cd_ref, s.nom_valide")
         ->addSelect("min(s.date_min)::date as date_min")
         ->addSelect("max(s.date_max)::date as date_max")
         ->addSelect("count(DISTINCT s.id_synthese) AS nb_obs")
         ->addSelect("array_to_json(array_remove(array_agg(DISTINCT statut_espece.lb_type_statut), NULL)) as statuts")
         ->from('ref_geo.l_areas', 'a')
         ->innerJoin('a', 'pr_atlas.vm_atlas', 'atlas', 'a.id_area = atlas.id_area AND a.id_type = :type_geom')
         ->setParameter('type_geom', $this->getScale()->getType())
         ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
         ->leftJoin('s', 'taxonomie.vm_esp_statut', 'statut_espece', 's.cd_ref = statut_espece.cd_ref AND atlas.departement = ANY(statut_espece.departements)')
         ->groupBy('s.cd_ref, s.nom_valide')
         ->orderBy('s.nom_valide');
    }
}
