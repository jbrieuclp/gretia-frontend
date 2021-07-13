<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use API\ProjetBundle\Entity\TypeProjet;

/**
* @ORM\Entity
* @ORM\Table(name="projet.type_projet_ref")
* @UniqueEntity(fields="libelle", message="Ce libellé existe déjà")
*/
class TypeProjetRef
{
	public function __construct() {
    $this->typesProjet = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_type_projet_ref", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.type_projet_ref_id_type_projet_ref_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"type_projet", "type_projet_ref", "projet"})
   */
  private $id;
  
  /**
   * @ORM\Column(name="libelle", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Libellé non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "Le libellé ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"type_projet_ref", "type_projet", "projet"})
   */
  private $libelle;

  /**
   * @ORM\Column(name="description", type="string", nullable=true)
   *
   * @Serializer\Groups({"type_projet_ref"})
   */
  private $description;

  /**
   * @ORM\Column(name="ordre", type="integer", nullable=true)
   *
   * @Serializer\Groups({"type_projet_ref"})
   */
  private $ordre;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\TypeProjet", mappedBy="typeProjetRef", cascade={"persist", "merge"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"type_projet_ref"})
   */
  private $typesProjet;
 
  


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
   * Set libelle
   *
   * @param string $libelle
   * @return string
   */
  public function setLibelle($libelle)
  {
    $this->libelle = $libelle;

    return $this;
  }

  /**
   * Get libelle
   *
   * @return integer 
   */
  public function getLibelle()
  {
    return $this->libelle;
  }

  /**
   * Set description
   *
   * @param string $description
   * @return string
   */
  public function setDescription($description)
  {
    $this->description = $description;

    return $this;
  }

  /**
   * Get description
   *
   * @return integer 
   */
  public function getDescription()
  {
    return $this->description;
  }

  /**
   * Set ordre
   *
   * @param string $ordre
   * @return string
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
  * TypeProjet
  */
  public function addTypeProjet(TypeProjet $item)
  {
      // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
      if (!$this->typesProjet->contains($item)) {
        $this->typesProjet->add($item);
        $item->setTypeProjetRef($this);
      }
  }

  public function removeTypeProjet(TypeProjet $item)
  {
      // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
      if ($this->typesProjet->contains($item)) {
        $this->typesProjet->removeElement($item);
        $item->setTypeProjetRef(null);
      }
  }

  // // Notez le pluriel, on récupère une liste de catégories ici !
  public function setTypesProjet($items) 
  {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addTypeProjet($item);
      }
    } elseif ($items instanceof TypeProjet) {
      $this->addTypeProjet($items);
    } else {
      throw new \Exception('TypeProjet must be an instance of TypeProjet or ArrayCollection');
    }
  }

  /**
   * @return ArrayCollection|TypeProjet[]
   */
  public function getTypesProjet()
  {
      return $this->typesProjet;
  }

}