<?php
// src/Serena/ImportBundle/Entity/Fichier.php 

namespace API\MagicTaxrefBundle\Entity; 


class TaxrefMatch
{

	private $source;
    private $sourceArray = [];
    private $source_to_clean = [];
    private $clean_to_taxrefProp = [];
    private $clean_to_cdNom = [];

    public function __construct()
    {

    }

    public function getSource()
    {
        return $this->source;
    }

    public function getSourceArray()
    {
        return $this->sourceArray;
    }

    public function setSource($source)
    {
        //source brute
        $this->source = $source; 
        //source brute transformé en tableau
        $this->sourceArray = preg_split('/\n|\r\n?/', $source);
        //lance le nettoyage des données
        $this->cleanArray();
        return $this;
    }


    //Fait le lien entre les données brutes (Array) et la donnée nettoyée
    private function cleanArray()
    {
        //supprime les doublons et nettoie le texte
        foreach (array_unique($this->sourceArray) as $value) {
            //on nettoie le texte
            if ( !empty($this->textClean($value)) )
                $this->source_to_clean[$value] = $this->textClean($value);
        }

        $this->clean_to_taxrefProp = array_flip(array_unique(array_values($this->source_to_clean)));
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
        if ( array_key_exists($value, $this->clean_to_taxrefProp) )
        {
            //on teste si un rattachement taxref à déjà eu lieu, sinon on créée un tableau de possibilité
            if ( !is_array($this->clean_to_taxrefProp[$value]) ) 
            {
                $this->clean_to_taxrefProp[$value] = $taxref;
            } else 
            {
                //si un seul taxon on créer le tableau de possibilité
                if ( array_key_exists('cd_nom', $this->clean_to_taxrefProp[$value]) ) 
                {
                    $temp = array($this->clean_to_taxrefProp[$value]);
                    $this->clean_to_taxrefProp[$value] = $temp;
                } 
                //on ajoute la nouvelle valeur taxref a la liste de possibilité
                array_push($this->clean_to_taxrefProp[$value], $taxref);
            }
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

    /** @see \Serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->source,
            $this->sourceArray,
            $this->source_to_clean,
            $this->clean_to_taxrefProp,
            $this->clean_to_cdNom,
        ));
    }

    /** @see \Serializable::unserialize() */
    public function unserialize($serialized)
    {
        list (
            $this->source,
            $this->sourceArray,
            $this->source_to_clean,
            $this->clean_to_taxrefProp,
            $this->clean_to_cdNom,
        ) = unserialize($serialized);

        return $this;
    }
} 
