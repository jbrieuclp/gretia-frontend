<?php
namespace API\CartoBundle\Services\Cartographie;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;

use API\CartoBundle\Services\Cartographie\IndicateurService;

class RichesseTaxonomiqueService extends IndicateurService
{
    protected function setGeojsonQuery() {
        parent::setGeojsonQuery();

        $qb = $this->queryBuilder;
        
        // En fonction de si filtre sur taxon ou pas on change le select
        $qb->addSelect('count(distinct s.cd_ref) AS total ');
    }

    protected function setInformationQuery() {

        parent::setInformationQuery();
        $this->queryBuilder->addSelect("json_agg(DISTINCT (json_build_object('cd_ref', s.cd_ref, 'nom_valide', s.nom_valide))::jsonb) as taxons");
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
    public function getInfoBulle($area)
    {
        parent::getInfoBulle($area);

        return $this->makeInfoBulle();
    }

}
