<?php
// src/OFSA/ReferentielBundle/Entity/Commune.php 

namespace Visu\ConsultationBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 

use Visu\ConsultationBundle\Entity\TerritoireCommune;

/**
* @ORM\Entity(repositoryClass="Visu\ConsultationBundle\Entity\Repository\CommuneRepository")
* @ORM\Table(name="communes_2013")
*/
class Commune
{

	public function __construct()
    {
        $this->territoires = new ArrayCollection();
    }

	/**
	* @ORM\Column(name="gid", type="integer", nullable=true)
	*/
	private $gid;

	/**
	* @ORM\Column(name="nom_commun", type="text", nullable=true)
	*/
	private $nomComm;

	/**
	* @ORM\Id
	* @ORM\Column(name="insee_comm", type="text")
	* @ORM\GeneratedValue(strategy="AUTO")
	*/
	private $inseeComm;

	/**
	* @ORM\Column(name="nom_dep", type="text", nullable=true)
	*/
	private $nomDept;

	/**
	* @ORM\Column(name="code_dep", type="text", nullable=true)
	*/
	private $inseeDept;

	/**
	* @ORM\Column(name="nom_region", type="text", nullable=true)
	*/
	private $nomRegion;

	/**
	* @ORM\Column(name="the_geom", type="geometry", nullable=true)
	*/
	private $theGeom;

	/**
   	* @ORM\OneToMany(targetEntity="Visu\ConsultationBundle\Entity\TerritoireCommune", mappedBy="commune", cascade={"persist"})
   	*/
	private $territoires;

	/**
	* Get id
	*
	* @return integer
	*/
	public function getId()
	{
	return $this->inseeComm;
	}

	/**
	* Set gid
	*
	* @param integer $gid
	* @return Communes_cbnsa
	*/
	public function setGid($gid)
	{
	$this->gid = $gid;
	}

	/**
	* Get gid
	*
	* @return integer
	*/
	public function getGid()
	{
	return $this->gid;
	}

	/**
	* Set nomComm
	*
	* @param text $nomComm
	* @return Communes_cbnsa
	*/
	public function setNomComm($nomComm)
	{
	$this->nomComm = $nomComm;
	}

	/**
	* Get nomComm
	*
	* @return text
	*/
	public function getNomComm()
	{
	return $this->nomComm;
	}

	/**
	* Set inseeComm
	*
	* @param text $inseeComm
	* @return Communes_cbnsa
	*/
	public function setInseeComm($inseeComm)
	{
	$this->inseeComm = $inseeComm;
	}

	/**
	* Get inseeComm
	*
	* @return text
	*/
	public function getInseeComm()
	{
	return $this->inseeComm;
	}

	/**
	* Set nomDept
	*
	* @param text $nomDept
	* @return Communes_cbnsa
	*/
	public function setNomDept($nomDept)
	{
		$this->nomDept = $nomDept;
	}

	/**
	* Get nomDept
	*
	* @return text
	*/
	public function getNomDept()
	{
		return $this->nomDept;
	}

	/**
	* Set inseeDept
	*
	* @param text $inseeDept
	* @return Communes_cbnsa
	*/
	public function setInseeDept($inseeDept)
	{
		$this->inseeDept = $inseeDept;
	}

	/**
	* Get inseeDept
	*
	* @return text
	*/
	public function getInseeDept()
	{
		return $this->inseeDept;
	}

	/**
	* Set nomRegion
	*
	* @param text $nomRegion
	* @return Communes_cbnsa
	*/
	public function setNomRegion($nomRegion)
	{
		$this->nomRegion = $nomRegion;
	}

	/**
	* Get nomRegion
	*
	* @return text
	*/
	public function getNomRegion()
	{
		return $this->nomRegion;
	}

	/**
	* Set theGeom
	*
	* @param text $theGeom
	* @return Communes_cbnsa
	*/
	public function setTheGeom($theGeom)
	{
		$this->theGeom = $theGeom;
	}

	/**
	* Get theGeom
	*
	* @return text
	*/
	public function getTheGeom()
	{
		return $this->theGeom;
	}


	public function getLibelle()
	{
		return $this->nomComm.' ('.$this->inseeDept.')';
	}

	public function addTerritoire(TerritoireCommune $territoire)
    {
        // Ici, on utilise l'ArrayCollection vraiment comme un tableau
        $this->territoires[] = $territoire;
        
        // On lie le releve au obseur orga
        $territoire->setCommune($this);

        return $this;
    }

    public function removeTerritoire(TerritoireCommune $territoire)
    {
        // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
        $this->territoires->removeElement($territoire);
        $territoire->setCommune(null);
    }

    // Notez le pluriel, on récupère une liste de catégories ici !
    public function getTerritoires()
    {
        return $this->territoires;
    }

} 
?>