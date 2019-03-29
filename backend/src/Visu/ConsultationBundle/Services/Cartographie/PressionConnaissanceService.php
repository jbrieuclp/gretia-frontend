<?php
namespace Visu\ConsultationBundle\Services\Cartographie;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;

use Visu\ConsultationBundle\Services\Cartographie\IndicateurService;

class PressionConnaissanceService extends IndicateurService
{
    protected $echelles = array('communes'  => '',
                                'maille_utm_10' => '',
                                'maille10'  => '',
                                'maille5'   => '',
                                'maille2'   => '',
                                'maille1'   => '',
                                'maille500' => 'ROLE_PC_500M',
                                'maille200' => 'ROLE_PC_200M',
                                'maille100' => 'ROLE_PC_100M',
                                'precise'   => 'ROLE_PC_100M',
                              );
	
	protected function setGeojsonQuery() {
        parent::setGeojsonQuery();

        $qb = $this->queryBuilder;

        $qb->addSelect("'".str_replace('AAA', "'||d.id_unique", $this->router->generate('visu_carto_pc_infobulle', array('echelle' => $this->getEchelle(), 'maille_id' => 'AAA'))).' AS url');

        // En fonction de si filtre sur taxon ou pas on change le select
        $qb->addSelect('count(DISTINCT data_id) AS total');
    }
	
	protected function setInformationQuery() {
		parent::setInformationQuery();

        $qb = $this->queryBuilder;

        // En fonction de si filtre sur taxon ou pas on change le select
        $qb->addSelect('count(DISTINCT data_id) AS somme');
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

    /**
    * Cette fonction récupère les données attributaires liées à une maille
    * Sortie : tableau associatif des données
    */
    public function getInfoBulle()
    {
        parent::getInfoBulle();

        return $this->makeInfoBulle();
    }
}
