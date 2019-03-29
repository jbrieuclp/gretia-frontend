<?php
namespace Visu\ConsultationBundle\Services\Cartographie;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;

use Visu\ConsultationBundle\Services\Cartographie\LayerService;

class RepartitionTaxonomiqueService extends LayerService
{
    protected $echelles = array('communes' => '',
                                'maille10' => '',
                                'maille5' => '',
                                'maille_utm_10' => '',
                                'maille2' => '',
                                'maille1' => '',
                                'maille500' => '',
                                'maille200' => '',
                                'maille100' => '',
                                'precise'   => ''
                                //'precise'   => 'ROLE_PC_PRECISE',
                              );

    public function __construct(Connection $dbalConnection, AuthorizationChecker $authorization, TokenStorage $context, Router $router, RequestStack $request)  {
        parent::__construct($dbalConnection, $authorization, $context, $router, $request);

        //$this->setStatutTaxon();        
    }

    /**
    *   Cette fonction modifie le référentiel droit/échelle en fonction du statut de sensibilité du taxon
    *   Un taxon non sensible doit pouvoir être affiché à la maille de 1 sans droit particulier
    */
    private function setStatutTaxon() {
        $qbTaxon = $this->newQuery();

        $qbTaxon->select("max(statut) as code")
           ->from('referentiel.tax_dept_sensibilite', 'sensibilite')
           ->where('cd_ref = :cd_ref')
           ->setParameter('cd_ref', $this->request->get('cd_ref'))
           ->groupBy("cd_ref");

        $result = $qbTaxon->execute()->fetch(\PDO::FETCH_ASSOC);
        $statut = $result['code'];

        switch ($statut) {
            case '0':
                $this->echelles['maille10'] = '';
                $this->echelles['maille5'] = '';
                $this->echelles['maille2'] = '';
                $this->echelles['maille1'] = '';
                break;
            case '1':
                $this->echelles['maille10'] = '';
                $this->echelles['maille5'] = '';
                break;
            case '2':
                $this->echelles['maille10'] = '';
                break;
            default:
                # code...
                break;
        }
    }

    protected function setCriteres(/*$maille_id = null*/) {
        parent::setCriteres();

        $this->addCriteres('taxon', $this->request->get('cd_ref'));
    }


    protected function setGeojsonQuery() {
        $qb = $this->queryBuilder;
        $qb->select("id_unique, 
                     max(EXTRACT('year' from d.date)) annee_max, 
                     max(validation) validation, 
                     ST_AsGeoJSON(ST_Transform(the_geom, 3857), 0) as the_geom ")
           ->addSelect("'".str_replace('AAA', "'||d.id_unique", $this->router->generate('visu_carto_taxon_repartition_infobulle', array('cd_ref' => $this->request->get('cd_ref'), 'echelle' => $this->getEchelle(), 'maille_id' => 'AAA'))).' AS url')
           ->from('referentiel.indicateur_'.$this->getEchelle(), 'd')
           ->groupBy('id_unique')
           ->addGroupBy('the_geom');
    }


    /**
	 * Cette fonction recupère les données permettant de generer un geojson pour une echelle spécifié
	 * Sortie : tableau associatif des données
	 */
    public function getGeoJson($projection = 3857)
    {
        parent::getGeoJson($projection);

        return $this->makeGeoJson();
    }

    /**
    * Cette fonction recupère les données attributaire liées à une maille
    * Sortie : tableau associatif des données
    */
    public function getInfoBulle()
    {
        parent::getInfoBulle();

        return $this->setInformationQuery();
    }


    protected function setInformationQuery() {

        $subqb = $this->queryBuilder;

        //on créée notre contenu du With
        $subqb->select("id_unique, 
                    min(d.date) as date_min,
                    max(d.date) as date_max,
                    array_agg(DISTINCT(coalesce(releve, ''))) as releves, 
                    array_agg(DISTINCT(d.commune)) commune, 
                    coalesce(d.nom_valide, '') as taxon,
                    array_to_json(array_remove(array_agg(DISTINCT statut_espece.lib_statut), NULL)) as statuts")
           ->from('referentiel.indicateur_'.$this->getEchelle(), 'd')
           ->leftJoin('d', 'referentiel.v_esp_statut', 'statut_espece', 'statut_espece.cd_ref = d.taxon AND d.departement = ANY(statut_espece.departements)')
           ->groupBy('id_unique')
           ->addGroupBy("d.nom_valide");


        $this->setWhere();

        $qb = $this->newQuery();

        $qb->select("id_unique, 
                        to_char(min(date_min), 'DD/MM/YYYY') as date_min,
                        to_char(max(date_max), 'DD/MM/YYYY') as date_max,
                        array_to_json(ARRAY(SELECT DISTINCT UNNEST(array_cat_agg(releves)))) as releves, 
                        array_to_json(ARRAY(SELECT DISTINCT UNNEST(array_cat_agg(commune)))) as communes, 
                        '{'||string_agg('\"'||replace(taxon, '\"', '\"\"')||'\":'||statuts::text, ',')||'}' as taxons")
           ->from('('.$subqb->getSQL().')', 'data')
           ->groupBy("id_unique");

        $qb->setParameters($subqb->getParameters());

        return $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }


    /**
     * Fonctions internes nécessaires aux indicateurs 
     *
     */

    protected function setTaxon($taxon)
    {
        if (!is_numeric($taxon))
            return;

        $this->queryBuilder->andWhere("(".$taxon." = ANY(d.code_sup) OR ".$taxon." = d.taxon)");
    }

}
