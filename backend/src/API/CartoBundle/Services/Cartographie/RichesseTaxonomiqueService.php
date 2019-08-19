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

    /**
     * Cette fonction recupère les données permettant de generer un geojson pour une echelle spécifié
     * Sortie : tableau associatif des données
     */
    public function getGeoJson($projection = 3857)
    {
        parent::getGeoJson($projection);

        return $this->makeGeoJson();
    }
}
