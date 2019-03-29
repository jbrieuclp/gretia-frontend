<?php
// src/Serena/ImportBundle/Entity/Fichier.php 

namespace API\MagicTaxrefBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 


/**
* @ORM\Entity(repositoryClass="API\MagicTaxrefBundle\Entity\Repository\NomCompletRepository")
* @ORM\Table(name="taxref.nom_complet")
*/
class NomComplet
{

	public function __construct()
    {

    }

    /**
     * @ORM\Column(name="cd_nom", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $cdNom;

    /**
     * @ORM\Id
     * @ORM\Column(name="nom_complet", type="string")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $taxref2;

    /**
    * @ORM\Column(name="t3", type="boolean", nullable=true)
    */
    private $taxref3;

    /**
    * @ORM\Column(name="t4", type="boolean", nullable=true)
    */
    private $taxref4;

    /**
    * @ORM\Column(name="t5", type="boolean", nullable=true)
    */
    private $taxref5;

    /**
    * @ORM\Column(name="t6", type="boolean", nullable=true)
    */
    private $taxref6;

    /**
    * @ORM\Column(name="t7", type="boolean", nullable=true)
    */
    private $taxref7;

    /**
    * @ORM\Column(name="t8", type="boolean", nullable=true)
    */
    private $taxref8;

    /**
    * @ORM\Column(name="t9", type="boolean", nullable=true)
    */
    private $taxref9;

    /**
    * @ORM\Column(name="t10", type="boolean", nullable=true)
    */
    private $taxref10;




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
     * Set taxref2
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
     * Get taxref2
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
} 
