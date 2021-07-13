<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use API\ProjetBundle\Entity\Localisation;
use API\ProjetBundle\Entity\Salarie;

/**
* @ORM\Entity
* @ORM\Table(name="projet.projet")
* @UniqueEntity(fields="code", message="Un projet au même code existe déjà.")
* @UniqueEntity(fields="intitule", message="Un projet au même intitulé existe déjà.")
*/
class Projet
{
	public function __construct() {
    $this->localisations = new ArrayCollection();
    $this->projetsEnfant = new ArrayCollection();
    $this->responsables = new ArrayCollection();
    $this->taches = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_projet", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.projet_id_projet_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"projet", "salarie", "tache"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Projet", inversedBy="childrens", cascade={"all"})
   * @ORM\JoinColumn(name="projet_parent_id", referencedColumnName="id_projet", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $parent;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Projet", mappedBy="parent")
   *
   * @Serializer\Groups({"projet"})
   */
    protected $childrens;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\TypeProjet", cascade={"all"})
   * @ORM\JoinColumn(name="type_projet_id", referencedColumnName="id_type_projet", nullable=false)
   * @ Assert\NotNull(message="Type de projet non renseigné")
   *
   * @Serializer\Groups({"projet"})
   */
  private $typeProjet;
  
  /**
   * @ORM\Column(name="code", type="string", length=50, nullable=false)
   * @Assert\NotNull(message="Code non renseigné")
   * @Assert\Length(
   *      max = 50,
   *      maxMessage = "Le code du projet ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"projet", "salarie", "tache"})
   */
  private $code;
  
  /**
   * @ORM\Column(name="intitule", type="string", length=500, nullable=false)
   * @Assert\NotNull(message="Intitulé non renseigné")
   * @Assert\Length(
   *      max = 500,
   *      maxMessage = "L'intitulé' du projet ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"projet", "salarie", "tache"})
   */
  private $intitule;
  
  /**
   * @ORM\Column(name="objectif", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $objectif;
  
  /**
   * @ORM\Column(name="date_debut", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $dateDebut;
  
  /**
   * @ORM\Column(name="date_fin", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $dateFin;

  /**
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Localisation", inversedBy="projets", cascade={"all"})
   * @ORM\JoinTable(name="projet.projet_localisation",
   *   joinColumns={@ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="localisation_id", referencedColumnName="id_localisation")}
   * )
   *
   * @Serializer\Groups({"projet"})
   */
  private $localisations;

  /**
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Salarie", inversedBy="projets", cascade={"all"})
   * @ORM\JoinTable(name="projet.projet_responsable",
   *   joinColumns={@ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="salarie_id", referencedColumnName="id_salarie")}
   * )
   *
   * @Serializer\Groups({"projet"})
   */
  private $responsables;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Tache", mappedBy="projet", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"projet"})
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
   * Set parent
   *
   * @param string $parent
   * @return string
   */
  public function setParent($parent)
  {
    $this->parent = $parent;

    return $this;
  }

  /**
   * Get parent
   *
   * @return integer 
   */
  public function getParent()
  {
    return $this->parent;
  }

  /**
   * Set typeProjet
   *
   * @param string $typeProjet
   * @return string
   */
  public function setTypeProjet($typeProjet)
  {
    $this->typeProjet = $typeProjet;

    return $this;
  }

  /**
   * Get typeProjet
   *
   * @return integer 
   */
  public function getTypeProjet()
  {
    return $this->typeProjet;
  }

  /**
   * Set code
   *
   * @param string $code
   * @return string
   */
  public function setCode($code)
  {
    $this->code = $code;

    return $this;
  }

  /**
   * Get code
   *
   * @return integer 
   */
  public function getCode()
  {
    return $this->code;
  }

  /**
   * Set intitule
   *
   * @param string $intitule
   * @return string
   */
  public function setIntitule($intitule)
  {
    $this->intitule = $intitule;

    return $this;
  }

  /**
   * Get intitule
   *
   * @return integer 
   */
  public function getIntitule()
  {
    return $this->intitule;
  }

  /**
   * Set objectif
   *
   * @param string $objectif
   * @return string
   */
  public function setObjectif($objectif)
  {
    $this->objectif = $objectif;

    return $this;
  }

  /**
   * Get objectif
   *
   * @return integer 
   */
  public function getObjectif()
  {
    return $this->objectif;
  }

  /**
   * Set dateDebut
   *
   * @param string $dateDebut
   * @return string
   */
  public function setdateDebut($dateDebut)
  {
    $this->dateDebut = $dateDebut;

    return $this;
  }

  /**
   * Get dateDebut
   *
   * @return integer 
   */
  public function getDateDebut()
  {
    return $this->dateDebut;
  }

  /**
   * Set dateFin
   *
   * @param string $dateFin
   * @return string
   */
  public function setDateFin($dateFin)
  {
    $this->dateFin = $dateFin;

    return $this;
  }

  /**
   * Get dateFin
   *
   * @return integer 
   */
  public function getDateFin()
  {
    return $this->dateFin;
  }

  /**
   * Add localisation
   *
   * @param Localisation $item
   */
  public function addLocalisation(Localisation $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->localisations->contains($item)) {
      $this->localisations->add($item);
    }
  }

  /**
   * Remove localisation
   *
   * @param Localisation $item
   */
  public function removeLocalisation(Localisation $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if ($this->localisations->contains($item)) {
      $this->localisations->removeElement($item);
    }
  }

  /**
   * Set Localisations
   *
   * @return ArrayCollection $localisations
   */
  public function setLocalisations($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addLocalisation($item);
      }
    } elseif ($items instanceof Localisation) {
      $this->addLocalisation($items);
    } else {
      throw new Exception("$items must be an instance of Localisation or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $localisations
   */
  public function getLocalisations() {
    return $this->localisations;
  }

  /**
   * Add responsable
   *
   * @param Salarie $item
   */
  public function addResponsable(Salarie $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->responsables->contains($item)) {
      $this->responsables->add($item);
    }
  }

  /**
   * Remove responsable
   *
   * @param Salarie $item
   */
  public function removeResponsable(Salarie $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if ($this->responsables->contains($item)) {
      $this->responsables->removeElement($item);
    }
  }

  /**
   * Set Responsables
   *
   * @return ArrayCollection $responsables
   */
  public function setResponsables($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addResponsable($item);
      }
    } elseif ($items instanceof Salarie) {
      $this->addResponsable($items);
    } else {
      throw new Exception("$items must be an instance of Salarie or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $responsables
   */
  public function getResponsables() {
    return $this->responsables;
  }

  /**
  * Tache
  */
  public function addTache(Tache $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->taches[] = $item;
      
      // liaison inverse avec entité
      $item->setProjet($this);

      return $this;
  }

  public function removeTache(Tache $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->taches->removeElement($item);
      $item->setProjet(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getTaches()
  {
      return $this->taches;
  }

  /**
  * Projets Enfant
  */
  public function addChildren(Projet $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->childrens[] = $item;
      
      // liaison inverse avec entité
      $item->setParent($this);

      return $this;
  }

  public function removeChildren(Projet $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->childrens->removeElement($item);
      $item->setParent(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getChildrens()
  {
      return $this->childrens;
  }

}