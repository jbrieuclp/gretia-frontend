<?php
// src/Serena/ImportBundle/Entity/Fichier.php 

namespace API\MagicTaxrefBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 

use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="taxref.taxref_2")
*/
class Taxref2
{


    /**
     * @ORM\Id
     * @ORM\Column(name="cd_nom", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $cdNom;

    /**
    * @ORM\Column(name="nom_complet", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
    */
    private $nomComplet;

    /**
     * @ORM\Column(name="regne", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $regne;

    /**
     * @ORM\Column(name="phylum", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $phylum;

    /**
     * @ORM\Column(name="classe", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $classe;

    /**
     * @ORM\Column(name="ordre", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $ordre;

    /**
     * @ORM\Column(name="famille", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $famille;

    /**
     * @ORM\Column(name="lb_nom", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $lbNom;

    /**
     * @ORM\Column(name="lb_auteur", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $lbAuteur;

    /**
     * @ORM\Column(name="cd_ref", type="integer")
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $cdRef;

    /**
     * @ORM\Column(name="nom_valide", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $nomValide;

    /**
     * @ORM\Column(name="rang", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $rang;

    /**
     * @ORM\Column(name="nom_vern", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $nomVern;

    /**
     * @ORM\Column(name="nom_vern_eng", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $nomVernEng;

    /**
     * @ORM\Column(name="fr", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $fr;

    /**
     * @ORM\Column(name="mar", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $mar;

    /**
     * @ORM\Column(name="gua", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $gua;

    /**
     * @ORM\Column(name="smsb", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $smsb;

    /**
     * @ORM\Column(name="gf", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $gf;

    /**
     * @ORM\Column(name="spm", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $spm;

    /**
     * @ORM\Column(name="reu", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $reu;

    /**
     * @ORM\Column(name="may", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $may;

    /**
     * @ORM\Column(name="taaf", type="string", nullable=true)
     *
     * @Serializer\Groups({"taxon", "taxref2"})
     */
    private $taaf;


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
     * Set nomValide
     *
     * @param integer $nomValide
     * @return Taxref
     */
    public function setNomValide($nomValide)
    {
        $this->nomValide = $nomValide;

        return $this;
    }

    /**
     * Get nomValide
     *
     * @return integer 
     */
    public function getNomValide()
    {
        return $this->nomValide;
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


    public function toArray() 
    {
        $tab = get_object_vars($this);
        unset($tab['__initializer__']);
        unset($tab['__cloner__']);
        unset($tab['__isInitialized__']);

        return $tab;
    }

} 
