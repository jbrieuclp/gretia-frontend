<?php
namespace API\CartoBundle\Services\Cartographie;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;

use API\CartoBundle\Services\Cartographie\IndicateurService;

class PressionConnaissanceService extends IndicateurService
{
    protected function setGeojsonQuery() {
        parent::setGeojsonQuery();

        $qb = $this->queryBuilder;

        // En fonction de si filtre sur taxon ou pas on change le select
        $qb->addSelect('count(DISTINCT unique_id_sinp) AS nb_data');
    }
	
    /**
	 * Cette fonction récupère les données permettant de générer un geojson pour une échelle spécifiée
	 * Sortie : tableau associatif des données
	 */
    public function getGeoJson($projection = 3857)
    {
        parent::getGeoJson($projection);

        return $this->makeGeoJson();
    }
}
