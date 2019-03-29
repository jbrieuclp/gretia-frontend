<?php

namespace Visu\ConsultationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class CommuneController extends Controller
{
    public function autocompleteAction(Request $request)
    {
        $value = $request->get('commune');
        $communes = $this->getData($value);

        return new JsonResponse($communes);
    }

    private function getData($value) 
    {
    	$txt = str_replace(array("'", " "), '-', $value);

	    $txt = htmlentities($txt, ENT_NOQUOTES, 'utf-8');
	 
	    // remplacer les entités HTML pour avoir juste le premier caractères non accentués
	    // Exemple : "&ecute;" => "e", "&Ecute;" => "E", "Ã " => "a" ...
	    $txt = preg_replace('#&([A-Za-z])(?:acute|grave|cedil|circ|orn|ring|slash|th|tilde|uml);#', '\1', $txt);
	 
	    // Remplacer les ligatures tel que : Œ, Æ ...
	    // Exemple "Å“" => "oe"
	    $txt = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $txt);
	    // Supprimer tout le reste
	    $txt = preg_replace('#&[^;]+;#', '-', $txt);

	    $patterns = explode("-", strtoupper($txt));

        $result = $this->getDoctrine()
            ->getManager('serena_db')
            ->getRepository('VisuConsultationBundle:Commune')
            ->getAutocomplete($patterns);

        return $result;
    }
}
