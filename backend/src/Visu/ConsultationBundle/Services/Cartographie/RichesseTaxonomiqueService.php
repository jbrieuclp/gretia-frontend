<?php
namespace Visu\ConsultationBundle\Services\Cartographie;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;

use Visu\ConsultationBundle\Services\Cartographie\IndicateurService;

class RichesseTaxonomiqueService extends IndicateurService
{
    protected $echelles = array('communes'  => '',
                                'maille_utm_10' => '',
                                'maille10'  => '',
                                'maille5'   => '',
                                'maille2'   => '',
                                'maille1'   => '',
                                'maille500' => 'ROLE_RICH_TAXO_500M',
                                'maille200' => 'ROLE_RICH_TAXO_200M',
                                'maille100' => 'ROLE_RICH_TAXO_100M',
                                'precise'   => 'ROLE_RICH_TAXO_100M',
                              );

    protected function setGeojsonQuery() {
        parent::setGeojsonQuery();

        $qb = $this->queryBuilder;
        
        $qb->addSelect("'".str_replace('AAA', "'||d.id_unique", $this->router->generate('visu_carto_richesse_taxo_infobulle', array('echelle' => $this->getEchelle(), 'maille_id' => 'AAA'))).' AS url');

        // En fonction de si filtre sur taxon ou pas on change le select
        $qb->addSelect('array_length(array_remove(array_agg(DISTINCT taxon), NULL),1) AS total ');
    }

    protected function setInformationQuery() {

        $subqb = $this->queryBuilder;

        // On créée notre contenu du With
        $subqb->select("d.id_unique, 
                    array_agg(DISTINCT(coalesce(releve, ''))) as releves, 
                    array_agg(DISTINCT(d.commune)) commune, 
                    coalesce(d.nom_valide, '') AS taxon,
                    count(DISTINCT d.taxon) AS somme,
                    array_to_json(array_remove(array_agg(DISTINCT statut_espece.lib_statut), NULL)) AS statuts")
           ->from('referentiel.indicateur_'.$this->getEchelle(), 'd')
           ->groupBy('d.id_unique')
           ->addGroupBy("d.nom_valide");

        // En fonction de la présence d'un filtre (esp prot, menacées, ...) la table taxon est déjà jointe. On réalise le test de filtre.
        // S'il n'y a pas de filtre, il faut rajouter cette table 
        $this->setWhere();

        // Jointure de la table des statuts pour TOUS les afficher filtre ou non.
        $subqb->leftJoin('d', 'referentiel.v_esp_statut', 'statut_espece', 'statut_espece.cd_ref = d.taxon AND d.departement = ANY(statut_espece.departements)');

        $qb = $this->newQuery();

        $qb->select("data.id_unique, 
                        array_to_json(ARRAY(SELECT DISTINCT UNNEST(array_cat_agg(releves)))) as releves, 
                        array_to_json(ARRAY(SELECT DISTINCT UNNEST(array_cat_agg(commune)))) as communes, 
                        '{'||string_agg('\"'||replace(taxon, '\"', '\"\"')||'\":'||statuts::text, ',')||'}' AS taxons")
           ->from('('.$subqb->getSQL().')', 'data')
           ->groupBy("data.id_unique");

        $qb->setParameters($subqb->getParameters());

        return $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);
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

}
