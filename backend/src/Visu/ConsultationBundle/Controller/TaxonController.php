<?php

namespace Visu\ConsultationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class TaxonController extends Controller
{
    public function getListHTMLAction(Request $request)
    {
        $taxrefService = $this->get('visu_taxon.service.taxref');
        $term = $request->get('term');

        $result = $taxrefService->getListAjax($term);

        /* Format de la variable arrat $taxon :
         $taxon = array('cd_ref' => array('nom_valide' => array('nom_valide' => text,
                                                                'nom_vern' => text),
                                            'synonymes' => array(0 => array('cd_nom' => int,
                                                                             'nom_latin' => text,
                                                                             'decouvreur' => text,),
                                                                )
                                            ),
                        )
        */
        $taxons = array();
        $levenshtein = array();
        foreach ( $result as $row ) {
				
            //si le cd_ref n'est pas référencé dans les taxon on l'ajoute et le nom valide associé aussi
			if ( !array_key_exists($row['cd_ref'], $taxons) ){
				$taxons[$row['cd_ref']] = array('nom_valide' => array('nom_valide' => $row['nom_valide'],
                                                                      'nom_vern' => $row['nom_vern']), 
                                                'synonymes' => null);

                $levenshtein[$row['cd_ref']] = levenshtein ( $term, $row['nom_valide'] );
            }

            //on gère les synonymes
            if ( $row['cd_ref'] != $row['cd_nom'] ) {
                $taxons[$row['cd_ref']]['synonymes'][] = array('cd_nom' => $row['cd_nom'],
                                                                'nom_latin' => $row['nom_latin'],
                                                                'decouvreur' => $row['decouvreur']);
            } 
        }

        asort($levenshtein);
        $result = array_replace($levenshtein, $taxons);

        return $this->render('VisuConsultationBundle:Taxon:liste.html.twig', array(
	      	'taxons'   => $result,
	    ));
    }

}
