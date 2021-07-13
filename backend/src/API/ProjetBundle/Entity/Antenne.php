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
* @ORM\Table(name="projet.antenne")
* @UniqueEntity(fields="nom", message="Ce nom est déjà utilisé")
*/
class Antenne
{
	public function __construct() {
    $this->salaries = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_antenne", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.antenne_id_antenne_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"antenne", "salarie", "personne"})
   */
  private $id;
  
  /**
   * @ORM\Column(name="nom", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Nom non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "Le nom ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"antenne", "salarie", "personne"})
   */
  private $nom;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Salarie", mappedBy="antenne", fetch="EAGER")
   *
   * @Serializer\Groups({"antenne"})
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
  * Salarie
  */
  public function addSalarie(Salarie $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->salaries[] = $item;
      
      // liaison inverse avec entité
      $item->setAntenne($this);

      return $this;
  }

  public function removeSalarie(Salarie $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->salaries->removeElement($item);
      $item->setAntenne(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getSalaries()
  {
      return $this->salaries;
  }

}