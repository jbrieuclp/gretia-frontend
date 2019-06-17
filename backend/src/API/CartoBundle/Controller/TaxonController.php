<?php

namespace API\CartoBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TaxonController extends FOSRestController implements ClassResourceInterface
{
    /**
    * @Rest\View()
    * @ Security("has_role('CARTO_SYNTHESE')")
    *
    * @Rest\Get("/taxons")
    */
    public function getTaxonsAction(Request $request)
    {
        $term = $request->get('term');
        $taxons = array();
        if (strlen($term) < 5) {
            return $taxons;
        }
        $connection = $this->getDoctrine()->getManager('geonature_db')->getConnection();

        $tab = explode(' ' , str_replace("'", "''", $term));

        $firstData = array_shift($tab);

        $sql = "SELECT cd_nom, lb_nom as nom_latin, lb_auteur as decouvreur, cd_ref, nom_vern, nom_valide
            FROM taxonomie.taxref
            WHERE nom_complet ILIKE :firstData ";

        if ( count($tab) ) {
            foreach ($tab as $value) {
                $sql .= " AND nom_complet ILIKE '%".$value."%'";
            }
        }

        $requete = $connection->prepare($sql);

        $requete->bindValue(':firstData', $firstData.'%');

        $requete->execute();

        $result = $requete->fetchAll();

        $requete->closeCursor();

        $classementLevenshtein = array();

        foreach ( $result as $row ) {
          //si le cd_ref n'est pas référencé dans les taxon on l'ajoute et le nom valide associé aussi
          if ( !array_key_exists($row['cd_ref'], $taxons) ){
            $taxons[$row['cd_ref']] = array('nom_valide' => [], 'synonymes' => []);
            $classementLevenshtein[$row['cd_ref']] = -1;
          }

          //on gère les synonymes
          if ( $row['cd_ref'] != $row['cd_nom'] ) {
            $taxons[$row['cd_ref']]['synonymes'][] = array('cd_nom' => $row['cd_nom'],
                                                            'nom_latin' => $row['nom_latin'],
                                                            'decouvreur' => $row['decouvreur']);
          } 

          if ( empty($taxons[$row['cd_ref']]['nom_valide']) ) {
            $taxons[$row['cd_ref']]['nom_valide'] = array('cd_ref' => $row['cd_ref'],
                                                          'nom_valide' => $row['nom_valide'],
                                                          'nom_vern' => $row['nom_vern']);
          }

          $levenshtein = levenshtein ( $term, implode(' ', array_filter([$row['nom_latin'], $row['decouvreur']]) ));

          if ( $classementLevenshtein[$row['cd_ref']] === -1 or $classementLevenshtein[$row['cd_ref']] < $levenshtein) {
            $classementLevenshtein[$row['cd_ref']] = $levenshtein;
          }
        }

        asort($classementLevenshtein);
        $result = array_replace($classementLevenshtein, $taxons);

        return array_values($result);
    }

}
