<?php
// src/OFSA/ReferentielBundle/Entity/Territoire.php 

namespace Visu\ConsultationBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 

use Visu\ConsultationBundle\Entity\TerritoireCommune;

/**
* @ORM\Table(name="territoires")
* @ORM\Entity(repositoryClass="Visu\ConsultationBundle\Entity\Repository\TerritoireRepository")
*/
class Territoire
{

	public function __construct()
    {
        $this->communes = new ArrayCollection();
    }

	/**
     * @var integer
     *
     * @ORM\Column(name="terri_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="territoires_terri_id_seq", allocationSize=1, initialValue=1)
     */
	private $id;

	/**
	* @ORM\Column(name="terri_lib", type="text", nullable=true)
	*/
	private $libelle;

	/**
   	* @ORM\OneToMany(targetEntity="Visu\ConsultationBundle\Entity\TerritoireCommune", mappedBy="territoire", cascade={"persist"})
   	*/
	private $communes;

	/**
	* Get id
	*
	* @return text
	*/
	public function getId()
	{
		return $this->id;
	}

	/**
	* Set libelle
	*
	* @param text $libelle
	* @return Territoire
	*/
	public function setLibelle($libelle)
	{
		$this->libelle = $libelle;
	}

	/**
	* Get libelle
	*
	* @return text
	*/
	public function getLibelle()
	{
		return $this->libelle;
	}

	public function addCommune(TerritoireCommune $commune)
    {
        // Ici, on utilise l'ArrayCollection vraiment comme un tableau
        $this->communes[] = $commune;
        
        // On lie le releve au obseur orga
        $commune->setTerritoire($this);

        return $this;
    }

    public function removeCommune(TerritoireCommune $commune)
    {
        // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
        $this->communes->removeElement($commune);
        $commune->setTerritoire(null);
    }

    // Notez le pluriel, on récupère une liste de catégories ici !
    public function getCommunes()
    {
        return $this->communes;
    }

} 
?>