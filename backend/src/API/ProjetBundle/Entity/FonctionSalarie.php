<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use API\ProjetBundle\Entity\Salarie;

/**
* @ORM\Entity
* @ORM\Table(name="projet.fonction_salarie")
* @UniqueEntity(fields="libelle", message="Ce libellé existe déjà")
*/
class FonctionSalarie
{
	public function __construct() {
    $this->salaries = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_fonction_salarie", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.fonction_salarie_id_fonction_salarie_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"fonction_salarie", "salarie"})
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
   * @SerializerGroups({"fonction_salarie", "salarie"})
   */
  private $libelle;

  /**
   * @ORMColumn(name="ordre", type="integer", nullable=true)
   *
   * @SerializerGroups({"fonction_salarie"})
   */
  private $ordre;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Salarie", mappedBy="fonction", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"fonction_salarie"})
   */
  private $salaries;
 
  


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
  * Salarie
  */
  public function addSalarie(Salarie $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->salaries[] = $item;
      
      // liaison inverse avec entité
      $item->setFonction($this);

      return $this;
  }

  public function removeSalarie(Salarie $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->salaries->removeElement($item);
      $item->setFonction(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getSalaries()
  {
      return $this->salaries;
  }

}