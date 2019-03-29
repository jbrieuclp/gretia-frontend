<?php
// src/Serena/ImportBundle/Entity/Fichier.php 

namespace API\MagicTaxrefBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 

use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="taxref.taxref_3")
*/
class Taxref3
{


    /**
     * @ORM\Id
     * @ORM\Column(name="cd_nom", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $cdNom;

    /**
     * @ORM\Column(name="nom_complet", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $nomComplet;

    /**
     * @ORM\Column(name="regne", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $regne;

    /**
     * @ORM\Column(name="phylum", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $phylum;

    /**
     * @ORM\Column(name="classe", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $classe;

    /**
     * @ORM\Column(name="ordre", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $ordre;

    /**
     * @ORM\Column(name="famille", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $famille;

    /**
     * @ORM\Column(name="lb_nom", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $lbNom;

    /**
     * @ORM\Column(name="lb_auteur", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $lbAuteur;

    /**
     * @ORM\Column(name="cd_ref", type="integer")
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $cdRef;

    /**
     * @ORM\Column(name="cd_taxsup", type="integer")
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $cdTaxsup;

    /**
     * @ORM\Column(name="rang", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $rang;

    /**
     * @ORM\Column(name="nom_vern", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $nomVern;

    /**
     * @ORM\Column(name="nom_vern_eng", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $nomVernEng;

    /**
     * @ORM\Column(name="habitat", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $habitat;

    /**
     * @ORM\Column(name="fr", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $fr;

    /**
     * @ORM\Column(name="mar", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $mar;

    /**
     * @ORM\Column(name="gua", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $gua;

    /**
     * @ORM\Column(name="smsb", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $smsb;

    /**
     * @ORM\Column(name="gf", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $gf;

    /**
     * @ORM\Column(name="spm", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $spm;

    /**
     * @ORM\Column(name="reu", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $reu;

    /**
     * @ORM\Column(name="may", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $may;

    /**
     * @ORM\Column(name="epa", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $epa;

    /**
     * @ORM\Column(name="taaf", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $taaf;

    /**
     * @ORM\Column(name="nc", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $nc;

    /**
     * @ORM\Column(name="wf", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $wf;

    /**
     * @ORM\Column(name="pf", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $pf;

    /**
     * @ORM\Column(name="cli", type="string", nullable=true)
     *
     *
     * @Serializer\Groups({"taxon", "taxref3"})
     */
    private $cli;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->cdNom;
    }


	/**
     * Get cdNom
     *
     * @return integer 
     */
    public function getCdNom()
    {
        return $this->cdNom;
    }

    /**
     * Set nomComplet
     *
     * @param integer $nomComplet
     * @return Taxref
     */
    public function setNomComplet($nomComplet)
    {
        $this->nomComplet = $nomComplet;

        return $this;
    }

    /**
     * Get nomComplet
     *
     * @return integer 
     */
    public function getNomComplet()
    {
        return $this->nomComplet;
    }

    /**
     * Set regne
     *
     * @param integer $regne
     * @return Taxref
     */
    public function setRegne($regne)
    {
        $this->regne = $regne;

        return $this;
    }

    /**
     * Get regne
     *
     * @return integer 
     */
    public function getRegne()
    {
        return $this->regne;
    }


    /**
     * Set phylum
     *
     * @param integer $phylum
     * @return Taxref
     */
    public function setPhylum($phylum)
    {
        $this->phylum = $phylum;

        return $this;
    }

    /**
     * Get phylum
     *
     * @return integer 
     */
    public function getPhylum()
    {
        return $this->phylum;
    }


    /**
     * Set classe
     *
     * @param integer $classe
     * @return Taxref
     */
    public function setClasse($classe)
    {
        $this->classe = $classe;

        return $this;
    }

    /**
     * Get classe
     *
     * @return integer 
     */
    public function getClasse()
    {
        return $this->classe;
    }


    /**
     * Set ordre
     *
     * @param integer $ordre
     * @return Taxref
     */
    public function setOrdre($ordre)
    {
        $this->ordre = $ordre;

        return $this;
    }

    /**
     * Get ordre
     *
     * @return integer 
     */
    public function getOrdre()
    {
        return $this->ordre;
    }


    /**
     * Set famille
     *
     * @param integer $famille
     * @return Taxref
     */
    public function setFamille($famille)
    {
        $this->famille = $famille;

        return $this;
    }

    /**
     * Get famille
     *
     * @return integer 
     */
    public function getFamille()
    {
        return $this->famille;
    }


    /**
     * Set lbNom
     *
     * @param integer $lbNom
     * @return Taxref
     */
    public function setLbNom($lbNom)
    {
        $this->lbNom = $lbNom;

        return $this;
    }

    /**
     * Get lbNom
     *
     * @return integer 
     */
    public function getLbNom()
    {
        return $this->lbNom;
    }


    /**
     * Set lbAuteur
     *
     * @param integer $lbAuteur
     * @return Taxref
     */
    public function setLbAuteur($lbAuteur)
    {
        $this->lbAuteur = $lbAuteur;

        return $this;
    }

    /**
     * Get lbAuteur
     *
     * @return integer 
     */
    public function getLbAuteur()
    {
        return $this->lbAuteur;
    }


    /**
     * Set cdRef
     *
     * @param integer $cdRef
     * @return Taxref
     */
    public function setCdRef($cdRef)
    {
        $this->cdRef = $cdRef;

        return $this;
    }

    /**
     * Get cdRef
     *
     * @return integer 
     */
    public function getCdRef()
    {
        return $this->cdRef;
    }


    /**
     * Set cdTaxsup
     *
     * @param integer $cdTaxsup
     * @return Taxref
     */
    public function setCdTaxsup($cdTaxsup)
    {
        $this->cdTaxsup = $cdTaxsup;

        return $this;
    }

    /**
     * Get cdTaxsup
     *
     * @return integer 
     */
    public function getCdTaxsup()
    {
        return $this->cdTaxsup;
    }

    /**
     * Set rang
     *
     * @param integer $rang
     * @return Taxref
     */
    public function setRang($rang)
    {
        $this->rang = $rang;

        return $this;
    }

    /**
     * Get rang
     *
     * @return integer 
     */
    public function getRang()
    {
        return $this->rang;
    }


    /**
     * Set nomVern
     *
     * @param integer $nomVern
     * @return Taxref
     */
    public function setNomVern($nomVern)
    {
        $this->nomVern = $nomVern;

        return $this;
    }

    /**
     * Get nomVern
     *
     * @return integer 
     */
    public function getNomVern()
    {
        return $this->nomVern;
    }


    /**
     * Set nomVernEng
     *
     * @param integer $nomVernEng
     * @return Taxref
     */
    public function setNomVernEng($nomVernEng)
    {
        $this->nomVernEng = $nomVernEng;

        return $this;
    }

    /**
     * Get nomVernEng
     *
     * @return integer 
     */
    public function getNomVernEng()
    {
        return $this->nomVernEng;
    }

    /**
     * Set habitat
     *
     * @param integer $habitat
     * @return Taxref
     */
    public function setHabitat($habitat)
    {
        $this->habitat = $habitat;

        return $this;
    }

    /**
     * Get habitat
     *
     * @return integer 
     */
    public function getHabitat()
    {
        return $this->habitat;
    }

    /**
     * Set fr
     *
     * @param integer $fr
     * @return Taxref
     */
    public function setFr($fr)
    {
        $this->fr = $fr;

        return $this;
    }

    /**
     * Get fr
     *
     * @return integer 
     */
    public function getFr()
    {
        return $this->fr;
    }


    /**
     * Set mar
     *
     * @param integer $mar
     * @return Taxref
     */
    public function setMar($mar)
    {
        $this->mar = $mar;

        return $this;
    }

    /**
     * Get mar
     *
     * @return integer 
     */
    public function getMar()
    {
        return $this->mar;
    }


    /**
     * Set gua
     *
     * @param integer $gua
     * @return Taxref
     */
    public function setGua($gua)
    {
        $this->gua = $gua;

        return $this;
    }

    /**
     * Get gua
     *
     * @return integer 
     */
    public function getGua()
    {
        return $this->gua;
    }


    /**
     * Set smsb
     *
     * @param integer $smsb
     * @return Taxref
     */
    public function setSmsb($smsb)
    {
        $this->smsb = $smsb;

        return $this;
    }

    /**
     * Get smsb
     *
     * @return integer 
     */
    public function getSmsb()
    {
        return $this->smsb;
    }


    /**
     * Set gf
     *
     * @param integer $gf
     * @return Taxref
     */
    public function setGf($gf)
    {
        $this->gf = $gf;

        return $this;
    }

    /**
     * Get gf
     *
     * @return integer 
     */
    public function getGf()
    {
        return $this->gf;
    }


    /**
     * Set spm
     *
     * @param integer $spm
     * @return Taxref
     */
    public function setSpm($spm)
    {
        $this->spm = $spm;

        return $this;
    }

    /**
     * Get spm
     *
     * @return integer 
     */
    public function getSpm()
    {
        return $this->spm;
    }


    /**
     * Set reu
     *
     * @param integer $reu
     * @return Taxref
     */
    public function setReu($reu)
    {
        $this->reu = $reu;

        return $this;
    }

    /**
     * Get reu
     *
     * @return integer 
     */
    public function getReu()
    {
        return $this->reu;
    }


    /**
     * Set may
     *
     * @param integer $may
     * @return Taxref
     */
    public function setMay($may)
    {
        $this->may = $may;

        return $this;
    }

    /**
     * Get may
     *
     * @return integer 
     */
    public function getMay()
    {
        return $this->may;
    }

    /**
     * Set epa
     *
     * @param integer $epa
     * @return Taxref
     */
    public function setEpa($epa)
    {
        $this->epa = $epa;

        return $this;
    }

    /**
     * Get epa
     *
     * @return integer 
     */
    public function getEpa()
    {
        return $this->epa;
    }


    /**
     * Set taaf
     *
     * @param integer $taaf
     * @return Taxref
     */
    public function setTaaf($taaf)
    {
        $this->taaf = $taaf;

        return $this;
    }

    /**
     * Get taaf
     *
     * @return integer 
     */
    public function getTaaf()
    {
        return $this->taaf;
    }

    /**
     * Set nc
     *
     * @param integer $nc
     * @return Taxref
     */
    public function setNc($nc)
    {
        $this->nc = $nc;

        return $this;
    }

    /**
     * Get nc
     *
     * @return integer 
     */
    public function getNc()
    {
        return $this->nc;
    }

    /**
     * Set wf
     *
     * @param integer $wf
     * @return Taxref
     */
    public function setWf($wf)
    {
        $this->wf = $wf;

        return $this;
    }

    /**
     * Get wf
     *
     * @return integer 
     */
    public function getWf()
    {
        return $this->wf;
    }

    /**
     * Set pf
     *
     * @param integer $pf
     * @return Taxref
     */
    public function setPf($pf)
    {
        $this->pf = $pf;

        return $this;
    }

    /**
     * Get pf
     *
     * @return integer 
     */
    public function getPf()
    {
        return $this->pf;
    }

    /**
     * Set cli
     *
     * @param integer $cli
     * @return Taxref
     */
    public function setCli($cli)
    {
        $this->cli = $cli;

        return $this;
    }

    /**
     * Get cli
     *
     * @return integer 
     */
    public function getCli()
    {
        return $this->cli;
    }


    public function toArray() 
    {
        $tab = get_object_vars($this);
        unset($tab['__initializer__']);
        unset($tab['__cloner__']);
        unset($tab['__isInitialized__']);
        
        return $tab;
    }

} 
