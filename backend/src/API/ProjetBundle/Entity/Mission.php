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
  }

  /**
	 * @ORM\Id
	 * @ORM\Column(name="id_mission", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.mission_id_mission_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"mission"})
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
   * @Serializer\Groups({"mission"})
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
   * @Serializer\Groups({"mission"})
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
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Projet")
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
   * @Serializer\Groups({"mission"})
   */
  private $travailleurs;



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
    return $this->nbJour;
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