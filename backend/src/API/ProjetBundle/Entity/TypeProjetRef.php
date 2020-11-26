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
    $this->typeProjets = new ArrayCollection();
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
   * @ORMColumn(name="libelle", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Libellé non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "Le libellé ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @SerializerGroups({"type_projet_ref", "type_projet", "projet"})
   */
  private $libelle;

  /**
   * @ORMColumn(name="description", type="string", nullable=true)
   *
   * @SerializerGroups({"type_projet_ref"})
   */
  private $description;

  /**
   * @ORMColumn(name="ordre", type="integer", nullable=true)
   *
   * @SerializerGroups({"type_projet_ref"})
   */
  private $ordre;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\TypeProjet", mappedBy="typeProjetRef", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"type_projet_ref"})
   */
  private $typeProjets;
 
  


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
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->typeProjets[] = $item;
      
      // liaison inverse avec entité
      $item->setTypeProjetRef($this);

      return $this;
  }

  public function removeTypeProjet(TypeProjet $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->typeProjets->removeElement($item);
      $item->setTypeProjetRef(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getTypeProjets()
  {
      return $this->typeProjets;
  }

}