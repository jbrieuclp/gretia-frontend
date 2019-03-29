<?php

namespace API\SerenaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;


/**
* @ORM\Entity(repositoryClass="API\SerenaBundle\Entity\Repository\PersonneRepository")
* @ORM\Table(name="referentiel.user_diff")
*
* @Serializer\ExclusionPolicy("all")
*/
class Personne
{

	public function __construct() { }


	    /**
	     * @ORM\Id
	     * @ORM\Column(name="id", type="integer", nullable=false)
     	 * @ORM\Id
       * @ORM\GeneratedValue(strategy="SEQUENCE")
       * @ORM\SequenceGenerator(sequenceName="referentiel.user_diff_id_seq", allocationSize=1, initialValue=1)
	     *
	     * @Serializer\Expose
	     */
	    private $id;

	    /**
	    * @ORM\Column(name="id_serena", type="integer", nullable=true)
	    *
	    * @Serializer\Expose
	    */
	    private $serenaID;

	    /**
	    * @ORM\Column(name="nom", type="text", nullable=true)
	    *
	    * @Serializer\Expose
	    */
	    private $nom;

	    /**
	    * @ORM\Column(name="prenom", type="text", nullable=true)
	    *
	    * @Serializer\Expose
	    */
	    private $prenom;

	    /**
	    * @ORM\Column(name="date_min", type="date", nullable=true)
	    *
	    * @Serializer\Expose
	    */
	    private $dateMin;

	    /**
	    * @ORM\Column(name="date_max", type="date", nullable=true)
	    *
	    * @Serializer\Expose
	    */
	    private $dateMax;

	    /**
	    * @ORM\Column(name="departements", type="text_array", nullable=true)
	    *
	    * @Serializer\Expose
	    */
	    private $departements;

	    /**
	    * @ORM\Column(name="auth_diff", type="text", nullable=true)
	    *
	    * @Serializer\Expose
	    */
	    private $authorisation;

	    /**
     * @var \Personne
     *
     * @ORM\ManyToOne(targetEntity="API\SerenaBundle\Entity\Personne")
     * @ORM\JoinColumn(name="to_valid", referencedColumnName="id", nullable=true)
     */
	    private $validUser;

	    /**
		   * Get id
		   *
		   * @return integer 
		   */
		  public function getId()
		  {
		      return $this->id;
		  }

			/**
	     * Set serenaID
	     *
	     * @param string $serenaID
	     * @return string
	     */
	    public function setSerenaID($serenaID)
	    {
	        $this->serenaID = $serenaID;

	        return $this;
	    }

	    /**
	     * Get serenaID
	     *
	     * @return integer 
	     */
	    public function getSerenaID()
	    {
	        return $this->serenaID;
	    }

			/**
	     * Set nom
	     *
	     * @param string $nom
	     * @return string
	     */
	    public function setNom($nom)
	    {
	        $this->nom = $nom;

	        return $this;
	    }

	    /**
	     * Get nom
	     *
	     * @return integer 
	     */
	    public function getNom()
	    {
	        return $this->nom;
	    }

			/**
	     * Set prenom
	     *
	     * @param string $prenom
	     * @return string
	     */
	    public function setPrenom($prenom)
	    {
	        $this->prenom = $prenom;

	        return $this;
	    }

	    /**
	     * Get prenom
	     *
	     * @return integer 
	     */
	    public function getPrenom()
	    {
	        return $this->prenom;
	    }

			/**
	     * Set dateMin
	     *
	     * @param string $dateMin
	     * @return string
	     */
	    public function setDateMin($dateMin)
	    {
	        $this->dateMin = $dateMin;

	        return $this;
	    }

	    /**
	     * Get dateMin
	     *
	     * @return integer 
	     */
	    public function getDateMin()
	    {
	        return $this->dateMin;
	    }

	    /**
	     * Set dateMax
	     *
	     * @param string $dateMax
	     * @return string
	     */
	    public function setDateMax($dateMax)
	    {
	        $this->dateMax = $dateMax;

	        return $this;
	    }

	    /**
	     * Get dateMax
	     *
	     * @return integer 
	     */
	    public function getDateMax()
	    {
	        return $this->dateMax;
	    }

	    /**
	     * Set departements
	     *
	     * @param string $departements
	     * @return string
	     */
	    public function setDepartements($departements)
	    {
	        $this->departements = $departements;

	        return $this;
	    }

	    /**
	     * Get departements
	     *
	     * @return integer 
	     */
	    public function getDepartements()
	    {
	        return $this->departements;
	    }

	    /**
	     * Set authorisation
	     *
	     * @param string $authorisation
	     * @return string
	     */
	    public function setAuthorisation($authorisation)
	    {
	        $this->authorisation = $authorisation;

	        return $this;
	    }

	    /**
	     * Get authorisation
	     *
	     * @return integer 
	     */
	    public function getAuthorisation()
	    {
	        return $this->authorisation;
	    }

	    /**
	     * Set validUser
	     *
	     * @param string $validUser
	     * @return string
	     */
	    public function setValidUser($validUser)
	    {
	        $this->validUser = $validUser;

	        return $this;
	    }

	    /**
	     * Get validUser
	     *
	     * @return integer 
	     */
	    public function getValidUser()
	    {
	        return $this->validUser;
	    }

}