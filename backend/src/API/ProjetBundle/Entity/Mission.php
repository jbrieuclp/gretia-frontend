<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Type;
use Symfony\Component\Validator\Constraints as Assert;

use API\ProjetBundle\Entity\MissionPersonne;

/**
* @ORM\Entity
* @ORM\Table(name="projet.mission")
* @ORM\HasLifecycleCallbacks
*/
class Mission
{
	
  public function __construct() {
    $this->travailleurs = new ArrayCollection();
    $this->travails = new ArrayCollection();
  }

  /**
	 * @ORM\Id
	 * @ORM\Column(name="id_mission", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.mission_id_mission_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"mission", "travail", "projet"})
	 */
	private $id;

  /**
   * @ORM\Column(name="libelle", type="string", nullable=true)
   * @Assert\NotBlank(message="Le nom de la mission ne doit pas être vide.")
   * @Assert\Length(
   *      max = 512,
   *      maxMessage = "Le nom de la mission ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"mission", "travail", "projet"})
   */
  private $libelle;

  /**
   * @ORM\Column(name="detail", type="string", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $detail;

  /**
   * @ORM\Column(name="nb_jour", type="float", nullable=true)
   *
   * @Serializer\Groups({"mission", "projet"})
   */
  private $nbJour;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Etat")
   * @ORM\JoinColumn(name="etat_id", referencedColumnName="id_etat", nullable=true)
   * @Assert\NotNull(message="L'état doit être spécifié.")
   *
   * @Serializer\Groups({"mission"})
   */
  private $etat;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Projet", inversedBy="missions")
   * @ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet", nullable=true)
   * @Assert\NotNull(message="La mission doit être associé à un projet.")
   *
   * @Serializer\Groups({"mission"})
   */
  private $projet;

  /**
   * @ORM\Column(name="date_create", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $dateCreate;

  /**
   * @ORM\Column(name="compte_create", type="string", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $compteCreate;

  /**
   * @ORM\Column(name="date_update", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $dateUpdate;

  /**
   * @ORM\Column(name="compte_update", type="string", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $compteUpdate;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\MissionPersonne", mappedBy="mission", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   * @Serializer\Groups({"mission", "projet"})
   */
  private $travailleurs;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Travail", mappedBy="mission", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"mission", "projet"})
   */
  private $travails;



  /**
   * Get id
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
   * Set detail
   *
   * @param string $detail
   * @return string
   */
  public function setDetail($detail)
  {
    $this->detail = $detail;

    return $this;
  }

  /**
   * Get detail
   *
   * @return integer 
   */
  public function getDetail()
  {
    return $this->detail;
  }

  /**
   * Set nbJour
   *
   * @param string $nbJour
   * @return string
   */
  public function setNbJour($nbJour)
  {
    $this->nbJour = $nbJour;

    return $this;
  }

  /**
   * Get nbJour
   *
   * @return integer 
   */
  public function getNbJour()
  {
    return !isset($this->nbJour) ? $this->nbJour : 0;
  }

  /**
   * Set etat
   *
   * @param string $etat
   * @return string
   */
  public function setEtat($etat)
  {
    $this->etat = $etat;

    return $this;
  }

  /**
   * Get etat
   *
   * @return integer 
   */
  public function getEtat()
  {
    return $this->etat;
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
   * Set dateCreate
   *
   * @param string $dateCreate
   * @return string
   */
  public function setDateCreate($dateCreate)
  {
    $this->dateCreate = $dateCreate;

    return $this;
  }

  /**
   * Get dateCreate
   *
   * @return integer 
   */
  public function getDateCreate()
  {
    return $this->dateCreate;
  }

  /**
   * Set compteCreate
   *
   * @param string $compteCreate
   * @return string
   */
  public function setCompteCreate($compteCreate)
  {
    $this->compteCreate = $compteCreate;

    return $this;
  }

  /**
   * Get compteCreate
   *
   * @return integer 
   */
  public function getCompteCreate()
  {
    return $this->compteCreate;
  }

  /**
   * Set dateUpdate
   *
   * @param string $dateUpdate
   * @return string
   */
  public function setDateUpdate($dateUpdate)
  {
    $this->dateUpdate = $dateUpdate;

    return $this;
  }

  /**
   * Get dateUpdate
   *
   * @return integer 
   */
  public function getDateUpdate()
  {
    return $this->dateUpdate;
  }

  /**
   * Set compteUpdate
   *
   * @param string $compteUpdate
   * @return string
   */
  public function setCompteUpdate($compteUpdate)
  {
    $this->compteUpdate = $compteUpdate;

    return $this;
  }

  /**
   * Get compteUpdate
   *
   * @return integer 
   */
  public function getCompteUpdate()
  {
    return $this->compteUpdate;
  }

  // /**
  //  * Add Travailleur
  //  *
  //  * @param Travailleur $item
  //  */
  // public function addTravailleur(MissionPersonne $item) {
  //   // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
  //   if (!$this->travailleurs->contains($item)) {
  //     $this->travailleurs->add($item);
  //   }
  // }

  // public function setTravailleurs($items) {
  //   if ($items instanceof ArrayCollection || is_array($items)) {
  //     foreach ($items as $item) {
  //       $this->addTravailleur($item);
  //       $item->setMission($this);
  //     }
  //   } elseif ($items instanceof MissionPersonne) {
  //     $this->addTravailleur($items);
  //     $item->setMission($this);
  //   } else {
  //     throw new \Exception("$items must be an instance of MissionPersonne or ArrayCollection");
  //   }
  // }

  public function addTravailleur(MissionPersonne $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->travailleurs[] = $item;
    
    // On lie le releve au obseur orga
    $item->setMission($this);

    return $this;
  }

  public function removeTravailleur(MissionPersonne $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->travailleurs->removeElement($item);
    $item->setMission(null);
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $travailleurs
   */
  public function getTravailleurs() {
    return $this->travailleurs;
  }

  /**
  * Mission
  */
  public function addTravail(Travail $travail)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->travails[] = $travail;
      
      // On lie le observation au obseur orga
      $travail->setMission($this);

      return $this;
  }

  public function removeTravail(Travail $travail)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->travails->removeElement($travail);
      $travail->setMission(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getTravails()
  {
      return $this->travails;
  }


  /**
   * @Serializer\VirtualProperty
   * @Serializer\SerializedName("usage_jour")
   * @Serializer\Groups({"mission", "projet"})
   */
  public function getUsageJours() {
    $temps_utilise = new \DateTime('00:00');
    foreach ($this->travails as $travail) {
      list($hours, $minutes, $seconds) = sscanf($travail->getDuree(), '%d:%d:%d');
      $interval = new \DateInterval(sprintf('PT%dH%dM%dS', $hours, $minutes, $seconds));
      $temps_utilise->add($interval);
    }
    $mois = $temps_utilise->format("m");
    $jours = $temps_utilise->format("d");
    $heures = $temps_utilise->format("H");
    $minutes = $temps_utilise->format("I");

    $jours = $jours + ($heures/7) + ($minutes/3660);
    return round($jours, 2);
  }

  /**
   * @Serializer\VirtualProperty
   * @Serializer\SerializedName("usage_pc")
   * @Serializer\Groups({"mission", "projet"})
   */
  public function getUsagePC() {
    return $this->nbJour ? round($this->getUsageJours() / $this->nbJour * 100) : null;
  }

  /**
   * @Serializer\VirtualProperty
   * @Serializer\SerializedName("synthTravailleurs")
   * @Serializer\Groups({"mission", "projet"})
   */
  public function getSynthTravailleurs() {
    $travailleurs = [];
    foreach ($this->travailleurs as $travailleur) {
      if ( !array_key_exists($travailleur->getPersonne()->getId(), $travailleurs) ) {
        $travailleurs[$travailleur->getPersonne()->getId()] = [
          'id' => $travailleur->getPersonne()->getId(), 
          'nom' => $travailleur->getPersonne()->getNom(),
          'prenom' => $travailleur->getPersonne()->getPrenom(),
          'surnom' => $travailleur->getPersonne()->getSurnom(),
          'tempsMission' => $travailleur->getTemps(),
          'tempsPasseMission' => 0
        ];
      }
    }

    foreach ($this->travails as $travail) {
      if ( !array_key_exists($travail->getPersonne()->getId(), $travailleurs) ) {
        $travailleurs[$travailleur->getPersonne()->getId()] = [
          'id' => $travailleur->getPersonne()->getId(), 
          'nom' => $travailleur->getPersonne()->getNom(),
          'prenom' => $travailleur->getPersonne()->getPrenom(),
          'surnom' => $travailleur->getPersonne()->getSurnom(),
          'tempsMission' => 0,
          'tempsPasseMission' => 0
        ];
      }

      $travailleurs[$travail->getPersonne()->getId()]['tempsPasseMission'] = $travailleurs[$travail->getPersonne()->getId()]['tempsPasseMission'] + ($travail->getDuree()/60/7);
    }
    return array_values($travailleurs);
  }

  /**
  * @ORM\PrePersist()
  */
  public function prePersist(LifecycleEventArgs $args) {
    $this->dateCreate = new \Datetime();
    $this->dateUpdate = new \Datetime();
  }

  /**
  * @ORM\PreFlush()
  */
  public function preFlush(PreFlushEventArgs $args) {
    $this->dateUpdate = new \Datetime();
  }
}