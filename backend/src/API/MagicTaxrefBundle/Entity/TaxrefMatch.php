<?php
// src/Serena/ImportBundle/Entity/Fichier.php 

namespace API\MagicTaxrefBundle\Entity; 


class TaxrefMatch
{
    private $source = [];
    private $source_to_clean = [];
    private $clean_to_taxrefProp = [];
    private $clean_to_cdNom = [];

    public function __construct() {}

    public function getsource()
    {
        return $this->source;
    }

    public function setSource($source)
    {
        //source en tableau
        $this->source = $source;
        //lance le nettoyage des données
        $this->cleanArray();
        return $this;
    }


    //Fait le lien entre les données brutes (Array) et la donnée nettoyée
    private function cleanArray()
    {
        //supprime les doublons et nettoie le texte
        foreach (array_unique($this->source) as $value) {
            //on nettoie le texte
            if ( !empty($this->textClean($value)) )
                $this->source_to_clean[$value] = $this->textClean($value);
        }
        //on retourne le tableau pour que les valeurs nettoyées soit les clées, on initialise avec un tableau vide les valeurs
        $this->clean_to_taxrefProp = array_fill_keys(array_unique(array_values($this->source_to_clean)), []);
    }

    public function getSourceJoinClean()
    {
        return $this->source_to_clean;
    }

    public function getCleanValues()
    {
        return array_diff_key($this->clean_to_taxrefProp, $this->clean_to_cdNom);
    }

    public function getCdNomValues()
    {
        return $this->clean_to_cdNom;
    }


    private function textClean($text)
    {
        $to_return = $text;

        $to_return = trim($to_return);
        $to_return = preg_replace('/^"|"$/', "", $to_return);
        $to_return = strip_tags($to_return);
        $to_return = trim($to_return);

        return $to_return;
    }

    public function addTaxrefToValue($value, array $taxref)
    {
        //on verifie si la valeur est dans notre tableau
        array_push($this->clean_to_taxrefProp[$value], $taxref);
        if ( array_key_exists($value, $this->clean_to_taxrefProp) )
        {
        }
    }

    public function addCdNomValue($value, $cd_nom)
    {
        //on verifie si la valeur est dans notre tableau
        if ( array_key_exists($value, $this->clean_to_taxrefProp) and !array_key_exists($value, $this->clean_to_cdNom) )
        {
            $this->clean_to_cdNom[$value] = $cd_nom;
        }
    }

    public function getMatchs() 
    {
        //$matchs = [taxon: string, matchs: any[]];
        $matchs = [];
        foreach ($this->source as $key => $value) {
            $matchs[] = ['taxon'=>$value, 'matchs'=>$this->clean_to_taxrefProp[$this->source_to_clean[$value]]];
        }
        return $matchs;
    }
} 
