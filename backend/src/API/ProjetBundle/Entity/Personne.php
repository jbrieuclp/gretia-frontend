<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use API\ProjetBundle\Entity\Salarie;

/**
* @ORM\Entity
* @ORM\Table(name="projet.personne")
* @UniqueEntity(fields="alias", message="Cet alias est déjà utilisé")
*/
class Personne
{
	public function __construct() {
    $this->salaries = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_personne", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.personne_id_personne_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"personne", "salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
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
   * @Serializer\Groups({"personne", "salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
   */
  private $nom;

  /**
   * @ORM\Column(name="prenom", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Prenom non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "Le prenom ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"personne", "salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
   */
  private $prenom;

  /**
   * @ORM\Column(name="alias", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Alias non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "L'alias ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"personne", "salarie"})
   */
  private $alias;

  /**
   * @ORM\Column(name="compte_id", type="integer", nullable=true)
   *
   * @Serializer\Groups({"personne", "salarie"})
   */
  private $compteId;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Salarie", mappedBy="personne", cascade={"persist", "merge"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"personne"})
   */
  private $salaries;

  /**
   * @Serializer\VirtualProperty
   * @Serializer\SerializedName("workIn")
   * @Serializer\Groups({"salarie", "personne"})
   */
  public function workIn() {
    foreach ($this->salaries as $salarie) {
      if ( $salarie->getDateDebut() <= new \DateTime("now") and ($salarie->getDateFin() === null or $salarie->getDateFin() >= new \DateTime("now")) ) {
        return $salarie;
      }
    }
    return null;
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
   * Set prenom
   *
   * @param string $prenom
   * @return string
   */
  public function setPrenom($prenom)
  {
    $this->prenom = $prenom;

    return $this;
  }

  /**
   * Get prenom
   *
   * @return integer 
   */
  public function getPrenom()
  {
    return $this->prenom;
  }

  /**
   * Set alias
   *
   * @param string $alias
   * @return string
   */
  public function setAlias($alias)
  {
    $this->alias = $alias;

    return $this;
  }

  /**
   * Get alias
   *
   * @return integer 
   */
  public function getAlias()
  {
    return $this->alias;
  }

  /**
   * Set compteId
   *
   * @param string $compteId
   * @return string
   */
  public function setCompteId($compteId)
  {
    $this->compteId = $compteId;

    return $this;
  }

  /**
   * Get compteId
   *
   * @return integer 
   */
  public function getCompteId()
  {
    return $this->compteId;
  }

  /**
  * Salarie
  */
  public function addSalarie(Salarie $item)
  {
      // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
      if (!$this->salaries->contains($item)) {
        $this->salaries->add($item);
        $item->setPersonne($this);
      }
  }

  public function removeSalarie(Salarie $item)
  {
      // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
      if ($this->salaries->contains($item)) {
        $this->salaries->removeElement($item);
        $item->setPersonne(null);
      }
  }

  // // Notez le pluriel, on récupère une liste de catégories ici !
  public function setSalaries($items = []) 
  {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addSalarie($item);
      }
    } elseif ($items instanceof Salarie) {
      $this->addSalarie($items);
    } else {
      throw new \Exception('Salarie must be an instance of Salarie or ArrayCollection');
    }
  }

  /**
   * @return ArrayCollection|Salarie[]
   */
  public function getSalaries()
  {
      return $this->salaries;
  }

}