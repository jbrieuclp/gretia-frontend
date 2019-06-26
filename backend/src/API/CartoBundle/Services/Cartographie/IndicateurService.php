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

        $this->addCriteres('filtre', $this->request->request->get('filtres'));
    }

    protected function setGeojsonQuery() {
        $qb = $this->queryBuilder;
        $qb->select("a.area_code, ST_AsGeoJSON(ST_Transform(a.geom, 3857), 0) AS the_geom ")
           ->from('ref_geo.l_areas', 'a')
           ->innerJoin('a', 'pr_atlas.atlas', 'atlas', 'a.area_code = atlas.type_'.$this->getScale()->getType())
           ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
           ->groupBy('a.area_code')
           ->addGroupBy('a.geom');
    }


    protected function setInformationQuery() {
		
        $qb = $this->queryBuilder;
        $qb->select("a.area_code, min(s.date_min)::date as date_min, max(s.date_max)::date as date_max")
           ->addSelect("min(s.date_min)::date as date_min")
           ->addSelect("max(s.date_max)::date as date_max")
           ->addSelect("count(DISTINCT s.cd_ref) AS nb_taxon")
           ->addSelect("json_agg(DISTINCT concat_ws(' ', NULLIF(roles.nom_role, ''), NULLIF(roles.prenom_role, ''))) as observateurs")
           ->addSelect("json_agg(DISTINCT (json_build_object('id', dts.id_dataset, 'name', dts.dataset_name, 'af', afs.id_acquisition_framework))::jsonb) as datasets")
           ->addSelect("json_agg(DISTINCT (json_build_object('id', afs.id_acquisition_framework, 'name', afs.acquisition_framework_name))::jsonb) as afs")
           ->addSelect("json_agg(DISTINCT (json_build_object('id', commune.area_code, 'name', commune.area_name))::jsonb) as communes")
           ->from('ref_geo.l_areas', 'a')
           ->innerJoin('a', 'pr_atlas.atlas', 'atlas', 'a.area_code = atlas.type_'.$this->getScale()->getType())
           ->innerJoin('atlas', 'gn_synthese.v_synthese_for_web_app', 's', 'atlas.id_synthese = s.id_synthese')
           ->leftJoin('s', 'pr_occtax.v_cor_counting_role_org', 'obseur', 's.entity_source_pk_value = obseur.id_counting_occtax')
           ->leftJoin('obseur', 'utilisateurs.t_roles', 'roles', 'roles.id_role = ANY(obseur.roles)')
           ->leftJoin('s', 'gn_meta.t_datasets', 'dts', 'dts.id_dataset = s.id_dataset')
           ->leftJoin('dts', 'gn_meta.t_acquisition_frameworks', 'afs', 'dts.id_acquisition_framework = afs.id_acquisition_framework')
           ->leftJoin('atlas', 'ref_geo.l_areas', 'commune', 'commune.area_code = atlas.type_25')
           ->groupBy('a.area_code');
    }

    /**
     * Fonctions internes nécessaires aux indicateurs 
     *
     */

    protected function setFiltre($filtres)
    {
        if (!is_array($filtres)) return;
		
		$ref_statuts_simples = array(
                'esp_determ' => "'deter_znieff_pc', 'deter_znieff_lim', 'deter_znieff_aq'",

                'esp_n2000' => "'CDH2', 'CDH4', 'CDH5'",

                'esp_messi' => "'Esp. mess.'",

                'esp_zh' => "'deter_zh'",
                             );

        $ref_statuts_complexes = array(
                'esp_prot' => "(s.type_statut = 'Protection')",

                'esp_mena' => " (s.type_statut = 'Liste rouge' AND s.categorie IN ('CR', 'CR*','VU','EN')) ",

                'esp_quasi_mena' => " (s.type_statut = 'Liste rouge' AND s.categorie IN ('NT')) ",

                'esp_exo_ave' => " (s.statut = 'esp_exo' AND s.categorie IN ('PEE avérée')) ",

                'esp_exo_pot' => " (s.statut = 'esp_exo' AND s.categorie IN ('PEE potentielle')) ",

                'esp_exo_emerg' => " (s.statut = 'esp_exo' AND s.categorie IN ('PEE émergente')) ",
                             );

        $statuts_simples = array();
        $statuts_complexes = array();

        foreach ($filtres as $valeur) {
            if ( array_key_exists($valeur, $ref_statuts_simples) ) {
                $statuts_simples[] = $ref_statuts_simples[$valeur];
            }

            if ( array_key_exists($valeur, $ref_statuts_complexes) ) {
                $statuts_complexes[] = $ref_statuts_complexes[$valeur];
            }
        }

        if (count($statuts_simples) OR count($statuts_complexes)) {
		$clauses = "";

		if (count($statuts_simples)) {
			$clauses = " s.statut IN (".implode(',', $statuts_simples).") ";
		}

		if (count($statuts_complexes)) {
			// Si des statuts simples ont déjà été filtrés on ajoute un OR
			if (!empty($clauses)) $clauses .= " OR ";

			$clauses .= implode(' OR ', $statuts_complexes);
		}

		// Optimisation des requêtes pour les filtres spécifiques (esp. prot., déterm. ZNIEFF, ZH, menacées, quasi-menacées, N2000) qui dépassent le quotat de 5 Go de mémoire allouée !
		// => il faut passer par une sous-requête...
		$qb = $this->queryBuilder;
        $qb->innerJoin('d', 'referentiel.v_esp_statut', 's', 's.cd_ref = d.taxon')
           ->andWhere($clauses)
           ->andWhere('d.departement = ANY(s.departements)');
        }        
    }
}