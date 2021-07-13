<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

use API\ProjetBundle\Entity\Projet;

/**
* @ORM\Entity
* @ORM\Table(name="projet.type_projet")
*/
class TypeProjet
{
	public function __construct() {
    $this->projets = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_type_projet", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.type_projet_id_type_projet_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"type_projet", "projet", "type_projet_ref"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\TypeProjetRef", inversedBy="typesProjet", cascade={"persist", "merge"}, fetch="EAGER")
   * @ORM\JoinColumn(name="type_projet_ref_id", referencedColumnName="id_type_projet_ref", nullable=false)
   * @Assert\NotNull(message="Type de projet non renseigné")
   *
   * @Serializer\Groups({"type_projet", "projet"})
   */
  private $typeProjetRef;
  /**
   * @ORM\Column(name="application_debut", type="string", nullable=false)
   * @Assert\NotNull(message="Date de début d'application non renseignée")
   *
   * @Serializer\Groups({"type_projet", "projet", "type_projet_ref"})
   */
  private $applicationDebut;
  /**
   * @ORM\Column(name="application_fin", type="string", nullable=false)
   *
   * @Serializer\Groups({"type_projet", "projet", "type_projet_ref"})
   */
  private $applicationFin;
  /**
   * @ORM\Column(name="cout_jour", type="decimal", nullable=false)
   * @Assert\NotNull(message="Coût jour non renseigné")
   *
   * @Serializer\Groups({"type_projet", "projet", "type_projet_ref"})
   */
  private $coutJour; 

    /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Projet", mappedBy="typeProjet", fetch="EAGER")
   *
   * @Serializer\Groups({"type_projet", "type_projet_ref"})
   */
  private $projets;

  /**
   * @Serializer\VirtualProperty
   * @Serializer\SerializedName("removable")
   * @Serializer\Groups({"type_projet", "type_projet_ref"})
   */
  public function isRemovable(): bool {
   return !(count($this->getProjets()) ?: false);
  }
  


  /**
   * Get id_projet
   *
   * @return integer 
   */
  public function getId()
  {
    return $this->id;
  }

  /**
   * Set typeProjetRef
   *
   * @param string $typeProjetRef
   * @return string
   */
  public function setTypeProjetRef($typeProjetRef)
  {
    $this->typeProjetRef = $typeProjetRef;

    return $this;
  }

  /**
   * Get typeProjetRef
   *
   * @return integer 
   */
  public function getTypeProjetRef()
  {
    return $this->typeProjetRef;
  }

  /**
   * Set applicationDebut
   *
   * @param string $applicationDebut
   * @return string
   */
  public function setApplicationDebut($applicationDebut)
  {
    $this->applicationDebut = $applicationDebut;

    return $this;
  }

  /**
   * Get applicationDebut
   *
   * @return integer 
   */
  public function getApplicationDebut()
  {
    return $this->applicationDebut;
  }

  /**
   * Set applicationFin
   *
   * @param string $applicationFin
   * @return string
   */
  public function setApplicationFin($applicationFin)
  {
    $this->applicationFin = $applicationFin;

    return $this;
  }

  /**
   * Get applicationFin
   *
   * @return integer 
   */
  public function getApplicationFin()
  {
    return $this->applicationFin;
  }

  /**
   * Set coutJour
   *
   * @param string $coutJour
   * @return string
   */
  public function setCoutJour($coutJour)
  {
    $this->coutJour = $coutJour;

    return $this;
  }

  /**
   * Get coutJour
   *
   * @return integer 
   */
  public function getCoutJour()
  {
    return $this->coutJour;
  }

  /**
  * Projets
  */
  public function addProjet(Projet $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->projets[] = $item;
    
    // liaison inverse avec entité
    $item->setTypeProjet($this);

    return $this;
  }

  public function removeProjet(Projet $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->projets->removeElement($item);
    $item->setTypeProjet(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getProjets()
  {
    return $this->projets;
  }


}