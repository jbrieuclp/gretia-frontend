<?php
// src/OFSA/ReferentielBundle/Entity/TerritoireCommune.php 

namespace Visu\ConsultationBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 

use Visu\ConsultationBundle\Entity\Territoire;
use Visu\ConsultationBundle\Entity\Commune;

/**
* @ORM\Entity
* @ORM\Table(name="territoire_commune")
*/
class TerritoireCommune
{

	/**
    * @ORM\Id
    * @ORM\ManyToOne(targetEntity="Visu\ConsultationBundle\Entity\Territoire", inversedBy="communes")
   	* @ORM\JoinColumn(name="terri_id", referencedColumnName="terri_id", nullable=false)
    */
	private $territoire;

	/**
    * @ORM\Id
    * @ORM\ManyToOne(targetEntity="Visu\ConsultationBundle\Entity\Commune", inversedBy="territoires")
   	* @ORM\JoinColumn(name="insee_com", referencedColumnName="insee_comm", nullable=false)
    */
	private $commune;


	/**
	* Set territoire
	*
	* @param integer $territoire
	* @return TerritoireCommune
	*/
	public function setTerritoire(Territoire $territoire)
	{
		$this->territoire = $territoire;
		return $this;
	}

	/**
	* Get territoire
	*
	* @return Observateur
	*/
	public function getTerritoire()
	{
		return $this->territoire;
	}

	/**
	* Set commune
	*
	* @param integer $commune
	* @return TerritoireCommune
	*/
	public function setCommune(Commune $commune)
	{
		$this->commune = $commune;
		return $this;
	}

	/**
	* Get commune
	*
	* @return Releve
	*/
	public function getCommune()
	{
		return $this->commune;
	}

} 
?>