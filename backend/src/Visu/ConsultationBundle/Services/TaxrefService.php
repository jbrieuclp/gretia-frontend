<?php
// OFSA\TaxonBundle\Services\TaxrefService.php
namespace Visu\ConsultationBundle\Services;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TaxrefService
{

	/**
    *
    * @var Connection
    */
    protected $connection;
    protected $em;
    protected $referentielEchelle = array('communes' => '',
                                      'maille10' => '',
                                      'maille5' => '',
                                      'maille2' => '',
                                      'maille1' => 'ROLE_PC_1KM',
                                      'maille500' => 'ROLE_PC_500M',
                                      'maille200' => 'ROLE_PC_200M',
                                      'maille100' => 'ROLE_PC_100M',
                                      );


    public function __construct(EntityManager $entityManager)  {
        $this->connection = $entityManager->getConnection();    
        $this->em = $entityManager;    
    }

    /**
     * Cette fonction recupère les données permettant de generer un geojson pour une echelle spécifié
     * Sortie : tableau associatif des données
     */
    public function getListAjax($term)
    {
        $tab = explode(' ' , str_replace("'", "''", $term));

        $firstData = array_shift($tab);

        $sql = "SELECT cd_nom, lb_nom as nom_latin, lb_auteur as decouvreur, cd_ref, nom_valide, nom_vern, CASE WHEN cd_nom = cd_ref THEN 1 ELSE 0 END as cd_nom_ref
            FROM taxref.taxref_11
            WHERE nom_complet ILIKE :firstData ";

        if ( count($tab) ) {
            foreach ($tab as $value) {
                $sql .= " AND nom_complet ILIKE '%".$value."%'";
            }
        }

        $sql .= " ORDER BY cd_nom_ref DESC, nom_complet ASC";

        $requete = $this->connection->prepare($sql);

        $requete->bindValue(':firstData', $firstData.'%');

        $requete->execute();

        $result = $requete->fetchAll();

        $requete->closeCursor();

        return $result;
    }
}
