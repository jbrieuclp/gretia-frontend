<?php
// src/API/ImportBundle/Entity/ValeurSerena.php 

namespace API\ImportBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 


/**
* @ ORM\Entity (repositoryClass="API\ImportBundle\Entity\Repository\OrganismeRepository")
* @ ORM\Table(name="metadata.fic_champ")
*/
class ValeurSerena
{

	/**
     * @var integer
     *
     * @ ORM\Column(name="id", type="integer", nullable=false)
     * @ ORM\Id
     * @ ORM\GeneratedValue(strategy="SEQUENCE")
     * @ ORM\SequenceGenerator(sequenceName="metadata.valeur_serena_fsd_id_seq", allocationSize=1, initialValue=1)
     */
	private $id;

	/**
	* @ ORM\Column(name="valeur", type="text", nullable=true, length=255)
	*/
	private $valeur;

	/**
     * @var \API\ImportBundle\Entity\SerenaFSD
     *
     * @ ORM\ManyToOne(targetEntity="API\ImportBundle\Entity\SerenaFSD")
     * @ ORM\JoinColumn(name="fsd_id", referencedColumnName="id", nullable=true)
     */
	private $fsd;


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
	* Set valeur
	*
	* @param text $valeur
	* @return Organismes
	*/
	public function setValeur($valeur)
	{
		$this->valeur = $valeur;

		return $this;
	}

	/**
	* Get valeur
	*
	* @return text
	*/
	public function getValeur()
	{
		return $this->valeur;
	}

	/**
	* Set fsd
	*
	* @param text $fsd
	* @return Organismes
	*/
	public function setFsd($fsd)
	{
		$this->fsd = $fsd;

		return $this;
	}

	/**
	* Get fsd
	*
	* @return text
	*/
	public function getFsd()
	{
		return $this->fsd;
	}

} 
