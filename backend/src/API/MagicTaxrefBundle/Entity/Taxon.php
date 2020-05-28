<?php
// src/Serena/ImportBundle/Entity/Fichier.php 

namespace API\MagicTaxrefBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 
use JMS\Serializer\Annotation as Serializer;


/**
* @ORM\Entity(repositoryClass="API\MagicTaxrefBundle\Entity\Repository\TaxonRepository")
* @ORM\Table(name="taxref.taxon")
*/
class Taxon
{

	public function __construct()
    {

    }

    /**
     * @ORM\Id
     * @ORM\Column(name="cd_nom", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Serializer\Groups({"taxon"})
     */
    private $cdNom;

    /**
    * @ORM\Column(name="nom_complet", type="json_array", nullable=true)
    *
    * @Serializer\Groups({"taxon"})
    */
    private $nomComplet;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref2
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref2")
     * @ORM\JoinColumn(name="t2", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     *
     */
    private $taxref2;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref3
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref3")
     * @ORM\JoinColumn(name="t3", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     *
     */
    private $taxref3;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref4
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref4")
     * @ORM\JoinColumn(name="t4", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     *
     */
    private $taxref4;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref5
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref5")
     * @ORM\JoinColumn(name="t5", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     *
     */
    private $taxref5;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref6
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref6")
     * @ORM\JoinColumn(name="t6", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref6;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref7
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref7")
     * @ORM\JoinColumn(name="t7", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref7;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref8
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref8")
     * @ORM\JoinColumn(name="t8", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref8;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref9
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref9")
     * @ORM\JoinColumn(name="t9", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref9;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref10
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref10")
     * @ORM\JoinColumn(name="t10", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref10;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref11
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref11")
     * @ORM\JoinColumn(name="t11", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref11;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref12
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref12")
     * @ORM\JoinColumn(name="t12", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref12;

    /**
     * @var \API\MagicTaxrefBundle\Entity\Taxref13
     *
     * @ORM\ManyToOne(targetEntity="API\MagicTaxrefBundle\Entity\Taxref13")
     * @ORM\JoinColumn(name="t13", referencedColumnName="cd_nom", nullable=true)
     *
     * @Serializer\Groups({"taxon"})
     */
    private $taxref13;




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
     * Set Taxref2
     *
     * @param integer $taxref2
     * @return Taxref
     */
    public function setTaxref2($taxref2)
    {
        $this->taxref2 = $taxref2;

        return $this;
    }

    /**
     * Get Taxref2
     *
     * @return integer 
     */
    public function getTaxref2()
    {
        return $this->taxref2;
    }

    /**
     * Set taxref3
     *
     * @param integer $taxref3
     * @return Taxref
     */
    public function setTaxref3($taxref3)
    {
        $this->taxref3 = $taxref3;

        return $this;
    }

    /**
     * Get taxref3
     *
     * @return integer 
     */
    public function getTaxref3()
    {
        return $this->taxref3;
    }

    /**
     * Set taxref4
     *
     * @param integer $taxref4
     * @return Taxref
     */
    public function setTaxref4($taxref4)
    {
        $this->taxref4 = $taxref4;

        return $this;
    }

    /**
     * Get taxref4
     *
     * @return integer 
     */
    public function getTaxref4()
    {
        return $this->taxref4;
    }

    /**
     * Set taxref5
     *
     * @param integer $taxref5
     * @return Taxref
     */
    public function setTaxref5($taxref5)
    {
        $this->taxref5 = $taxref5;

        return $this;
    }

    /**
     * Get taxref5
     *
     * @return integer 
     */
    public function getTaxref5()
    {
        return $this->taxref5;
    }

    /**
     * Set taxref6
     *
     * @param integer $taxref6
     * @return Taxref
     */
    public function setTaxref6($taxref6)
    {
        $this->taxref6 = $taxref6;

        return $this;
    }

    /**
     * Get taxref6
     *
     * @return integer 
     */
    public function getTaxref6()
    {
        return $this->taxref6;
    }

    /**
     * Set taxref7
     *
     * @param integer $taxref7
     * @return Taxref
     */
    public function setTaxref7($taxref7)
    {
        $this->taxref7 = $taxref7;

        return $this;
    }

    /**
     * Get taxref7
     *
     * @return integer 
     */
    public function getTaxref7()
    {
        return $this->taxref7;
    }

    /**
     * Set taxref8
     *
     * @param integer $taxref8
     * @return Taxref
     */
    public function setTaxref8($taxref8)
    {
        $this->taxref8 = $taxref8;

        return $this;
    }

    /**
     * Get taxref8
     *
     * @return integer 
     */
    public function getTaxref8()
    {
        return $this->taxref8;
    }

    /**
     * Set taxref9
     *
     * @param integer $taxref9
     * @return Taxref
     */
    public function setTaxref9($taxref9)
    {
        $this->taxref9 = $taxref9;

        return $this;
    }

    /**
     * Get taxref9
     *
     * @return integer 
     */
    public function getTaxref9()
    {
        return $this->taxref9;
    }

    /**
     * Set taxref10
     *
     * @param integer $taxref10
     * @return Taxref
     */
    public function setTaxref10($taxref10)
    {
        $this->taxref10 = $taxref10;

        return $this;
    }

    /**
     * Get taxref10
     *
     * @return integer 
     */
    public function getTaxref10()
    {
        return $this->taxref10;
    }

    /**
     * Set taxref11
     *
     * @param integer $taxref11
     * @return Taxref
     */
    public function setTaxref11($taxref11)
    {
        $this->taxref11 = $taxref11;

        return $this;
    }

    /**
     * Get taxref11
     *
     * @return integer 
     */
    public function getTaxref11()
    {
        return $this->taxref11;
    }
    
    /**
     * Set taxref12
     *
     * @param integer $taxref12
     * @return Taxref
     */
    public function setTaxref12($taxref12)
    {
        $this->taxref12 = $taxref12;

        return $this;
    }

    /**
     * Get taxref11
     *
     * @return integer 
     */
    public function getTaxref12()
    {
        return $this->taxref12;
    }

    /**
     * Set taxref13
     *
     * @param integer $taxref13
     * @return Taxref
     */
    public function setTaxref13($taxref13)
    {
        $this->taxref13 = $taxref13;

        return $this;
    }

    /**
     * Get taxref13
     *
     * @return integer 
     */
    public function getTaxref13()
    {
        return $this->taxref13;
    }
} 
