<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use API\ProjetBundle\Entity\Tache; 

/**
* @ORM\Entity
* @ORM\Table(name="projet.action")
* @UniqueEntity(fields="libelle", message="Ce libellé existe déjà")
*/
class Action
{
	public function __construct() {
    $this->taches = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_action", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.action_id_action_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"action", "tache"})
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
   * @Serializer\Groups({"action", "tache"})
   */
  private $libelle;

  /**
   * @ORM\Column(name="description", type="string", nullable=true)
   *
   * @Serializer\Groups({"action"})
   */
  private $description;

  /**
   * @ORM\Column(name="ordre", type="integer", nullable=true)
   *
   * @Serializer\Groups({"action"})
   */
  private $ordre;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Tache", mappedBy="action", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"action"})
   */
  private $taches;
 
  


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
  * Tache
  */
  public function addTache(Tache $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->taches[] = $item;
      
      // liaison inverse avec entité
      $item->setAction($this);

      return $this;
  }

  public function removeTache(Tache $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->taches->removeElement($item);
      $item->setAction(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getTaches()
  {
      return $this->taches;
  }

}