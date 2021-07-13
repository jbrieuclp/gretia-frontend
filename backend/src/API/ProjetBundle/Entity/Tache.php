<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

use API\ProjetBundle\Entity\TachePeriode; 
use API\ProjetBundle\Entity\TacheAttribution; 
use API\ProjetBundle\Entity\Travail; 

/**
* @ORM\Entity
* @ORM\Table(name="projet.tache")
*/
class Tache
{
	public function __construct() {
    $this->periodes = new ArrayCollection();
    $this->attributionSalaries = new ArrayCollection();
    $this->travaux = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_tache", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.tache_id_tache_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"tache", "salarie"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Projet", cascade={"all"})
   * @ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet", nullable=true)
   *
   * @Serializer\Groups({"tache", "salarie"})
   */
  private $projet;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Action", cascade={"all"})
   * @ORM\JoinColumn(name="action_id", referencedColumnName="id_action", nullable=true)
   *
   * @Serializer\Groups({"tache", "salarie"})
   */
  private $action;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\EtatAvancement", cascade={"all"})
   * @ORM\JoinColumn(name="etat_avancement_id", referencedColumnName="id_etat_avancement", nullable=true)
   *
   * @Serializer\Groups({"tache", "salarie"})
   */
  private $avancement;

  /**
   * @ORM\Column(name="intitule", type="string", nullable=false)
   * @Assert\NotNull(message="Intitulé non renseigné")
   * @Assert\Length(
   *      max = 500,
   *      maxMessage = "L'intitulé ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"tache", "salarie"})
   */
  private $intitule;

  /**
   * @ORM\Column(name="objectif", type="string", nullable=true)
   *
   * @Serializer\Groups({"tache", "salarie"})
   */
  private $objectif;

  /**
   * @ORM\Column(name="nb_jours", type="decimal", nullable=true)
   *
   * @Serializer\Groups({"tache"})
   */
  private $nbJours;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\TachePeriode", mappedBy="tache", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"tache"})
   */
  private $periodes;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\TacheAttribution", mappedBy="tache", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"tache"})
   */
  private $attributionSalaries;

  /**
   * @ ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Travail", mappedBy="tache", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @ Serializer\Groups({"tache"})
   */
  private $travaux;
  
  


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
   * Set projet
   *
   * @param string $projet
   * @return string
   */
  public function setProjet($projet)
  {
    $this->projet = $projet;

    return $this;
  }

  /**
   * Get projet
   *
   * @return integer 
   */
  public function getProjet()
  {
    return $this->projet;
  }

  /**
   * Set action
   *
   * @param string $action
   * @return string
   */
  public function setAction($action)
  {
    $this->action = $action;

    return $this;
  }

  /**
   * Get action
   *
   * @return integer 
   */
  public function getAction()
  {
    return $this->action;
  }

  /**
   * Set avancement
   *
   * @param string $avancement
   * @return string
   */
  public function setAvancement($avancement)
  {
    $this->avancement = $avancement;

    return $this;
  }

  /**
   * Get avancement
   *
   * @return integer 
   */
  public function getAvancement()
  {
    return $this->avancement;
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
   * Set nbJours
   *
   * @param string $nbJours
   * @return string
   */
  public function setNbJours($nbJours)
  {
    $this->nbJours = $nbJours;

    return $this;
  }

  /**
   * Get nbJours
   *
   * @return integer 
   */
  public function getNbJours()
  {
    return $this->nbJours;
  }

  /**
  * TachePeriode
  */
  public function addPeriode(TachePeriode $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->periodes[] = $item;
      
      // liaison inverse avec entité
      $item->setTache($this);

      return $this;
  }

  public function removePeriode(TachePeriode $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->periodes->removeElement($item);
      $item->setTache(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getPeriodes()
  {
      return $this->periodes;
  }

  /**
  * TacheAttribution
  */
  public function addAttribution(TacheAttribution $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->attributionSalaries[] = $item;
      
      // liaison inverse avec entité
      $item->setTache($this);

      return $this;
  }

  public function removeAttribution(TacheAttribution $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->attributionSalaries->removeElement($item);
      $item->setTache(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getAttributions()
  {
      return $this->attributionSalaries;
  }

  /**
  * Travail
  */
  public function addTravail(Travail $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->travaux[] = $item;
    
    // liaison inverse avec entité
    $item->setTache($this);

    return $this;
  }

  public function removeTravail(Travail $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->travaux->removeElement($item);
    $item->setTache(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getTravaux()
  {
    return $this->travaux;
  }
}