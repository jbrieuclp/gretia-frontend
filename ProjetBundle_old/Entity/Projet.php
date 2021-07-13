<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\ProjetBundle\Entity\Organisme;
use API\ProjetBundle\Entity\Mission;
use API\ProjetBundle\Entity\ProjetPersonne;

/**
* @ORM\Entity
* @ORM\Table(name="projet.projet")
* @ORM\HasLifecycleCallbacks
*/
class Projet
{
	public function __construct() {
    $this->partenairesFinanciers = new ArrayCollection();
    $this->partenairesTechniques = new ArrayCollection();
    $this->missions = new ArrayCollection();
    $this->travailleurs = new ArrayCollection();
  }

  /**
	 * @ORM\Id
	 * @ORM\Column(name="id_projet", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.projet_id_projet_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"projet", "mission"})
	 */
	private $id;

	/**
	 * @ORM\Column(name="libelle", type="string", nullable=false)
	 *
	 * @Serializer\Groups({"projet", "mission"})
	 */
	private $libelle;

	/**
	 * @ORM\Column(name="localisation", type="string", nullable=true)
	 *
	 * @Serializer\Groups({"projet"})
	 */
	private $localisation;

  /**
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Organisme", inversedBy="projetsFinances", cascade={"all"})
   * @ORM\JoinTable(name="projet.a_projet_part_financier",
   *   joinColumns={@ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="organisme_id", referencedColumnName="id_organisme")}
   * )
   *
   * @Serializer\Groups({"projet"})
   */
  private $partenairesFinanciers;

  /**
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Organisme", inversedBy="projetsTechniques", cascade={"all"})
   * @ORM\JoinTable(name="projet.a_projet_part_technique",
   *   joinColumns={@ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="organisme_id", referencedColumnName="id_organisme")}
   * )
   *
   * @Serializer\Groups({"projet"})
   */
  private $partenairesTechniques;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Type", cascade={"all"}, fetch="EAGER")
   * @ORM\JoinColumn(name="type_id", referencedColumnName="id_projet_type", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $type;

  /**
   * @ORM\Column(name="objet", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $objet;

  /**
   * @ORM\Column(name="milieux", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $milieux;

  /**
   * @ORM\Column(name="groupes", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $groupes;

  /**
   * @ORM\Column(name="nb_jour", type="float", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $nbJour;

  /**
   * @ORM\Column(name="cout", type="float", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $cout;

  /**
   * @ORM\Column(name="cout_total", type="float", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $coutTotal;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Personne", cascade={"all"}, fetch="EAGER")
   * @ORM\JoinColumn(name="responsable_id", referencedColumnName="id_personne", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $responsable;

  /**
   * @ORM\Column(name="date_debut", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $dateDebut;

  /**
   * @ORM\Column(name="date_fin", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $dateFin;

  /**
   * @ORM\Column(name="date_rendu", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $dateRendu;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Etat", cascade={"all"}, fetch="EAGER")
   * @ORM\JoinColumn(name="etat_id", referencedColumnName="id_etat", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $etat;

  /**
   * @ORM\Column(name="date_create", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $dateCreate;

  /**
   * @ORM\Column(name="compte_create_id", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $compteCreate;

  /**
   * @ORM\Column(name="date_update", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $dateUpdate;

  /**
   * @ORM\Column(name="compte_update_id", type="string", nullable=true)
   *
   * @Serializer\Groups({"projet"})
   */
  private $compteUpdate;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Mission", mappedBy="projet", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"projet"})
   */
  private $missions;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\ProjetPersonne", mappedBy="projet", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"projet"})
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
   * Set localisation
   *
   * @param string $localisation
   * @return string
   */
  public function setLocalisation($localisation)
  {
    $this->localisation = $localisation;

    return $this;
  }

  /**
   * Get localisation
   *
   * @return integer 
   */
  public function getLocalisation()
  {
    return $this->localisation;
  }

  /**
   * Add partenairesFinanciers
   *
   * @param Organisme $item
   */
  public function addPartenaireFinancier(Organisme $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->partenairesFinanciers->contains($item)) {
      $this->partenairesFinanciers->add($item);
    }
  }

  /**
   * Remove partenairesFinanciers
   *
   * @param Organisme $item
   */
  public function removePartenaireFinancier(Organisme $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if ($this->partenairesFinanciers->contains($item)) {
      $this->partenairesFinanciers->removeElement($item);
    }
  }

  public function setPartenairesFinanciers($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addPartenaireFinancier($item);
      }
    } elseif ($items instanceof Organisme) {
      $this->addPartenaireFinancier($items);
    } else {
      throw new Exception("$items must be an instance of Organisme or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $partenairesFinanciers
   */
  public function getPartenairesFinanciers() {
    return $this->partenairesFinanciers;
  }

  /**
   * Add partenairesTechniques
   *
   * @param Organisme $item
   */
  public function addPartenaireTechnique(Organisme $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->partenairesTechniques->contains($item)) {
      $this->partenairesTechniques->add($item);
    }
  }

  /**
   * Remove partenairesTechniques
   *
   * @param Organisme $item
   */
  public function removePartenaireTechnique(Organisme $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if ($this->partenairesTechniques->contains($item)) {
      $this->partenairesTechniques->removeElement($item);
    }
  }

  public function setPartenairesTechniques($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addPartenaireTechnique($item);
      }
    } elseif ($items instanceof Organisme) {
      $this->addPartenaireTechnique($items);
    } else {
      throw new Exception("$items must be an instance of Organisme or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $partenairesTechniques
   */
  public function getPartenairesTechniques() {
    return $this->partenairesTechniques;
  }

  /**
   * Set type
   *
   * @param string $type
   * @return string
   */
  public function setType($type)
  {
    $this->type = $type;

    return $this;
  }

  /**
   * Get type
   *
   * @return integer 
   */
  public function getType()
  {
    return $this->type;
  }

  /**
   * Set objet
   *
   * @param string $objet
   * @return string
   */
  public function setObjet($objet)
  {
    $this->objet = $objet;

    return $this;
  }

  /**
   * Get objet
   *
   * @return integer 
   */
  public function getObjet()
  {
    return $this->objet;
  }

  /**
   * Set milieux
   *
   * @param string $milieux
   * @return string
   */
  public function setMilieux($milieux)
  {
    $this->milieux = $milieux;

    return $this;
  }

  /**
   * Get milieux
   *
   * @return integer 
   */
  public function getMilieux()
  {
    return $this->milieux;
  }

  /**
   * Set groupes
   *
   * @param string $groupes
   * @return string
   */
  public function setGroupes($groupes)
  {
    $this->groupes = $groupes;

    return $this;
  }

  /**
   * Get groupes
   *
   * @return integer 
   */
  public function getGroupes()
  {
    return $this->groupes;
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
   * Set cout
   *
   * @param string $cout
   * @return string
   */
  public function setCout($cout)
  {
    $this->cout = $cout;

    return $this;
  }

  /**
   * Get cout
   *
   * @return integer 
   */
  public function getCout()
  {
    return $this->cout;
  }

  /**
   * Set coutTotal
   *
   * @param string $coutTotal
   * @return string
   */
  public function setCoutTotal($coutTotal)
  {
    $this->coutTotal = $coutTotal;

    return $this;
  }

  /**
   * Get coutTotal
   *
   * @return integer 
   */
  public function getCoutTotal()
  {
    return $this->coutTotal;
  }

  /**
   * Set responsable
   *
   * @param string $responsable
   * @return string
   */
  public function setResponsable($responsable)
  {
    $this->responsable = $responsable;

    return $this;
  }

  /**
   * Get responsable
   *
   * @return integer 
   */
  public function getResponsable()
  {
    return $this->responsable;
  }

  /**
   * Set dateDebut
   *
   * @param string $dateDebut
   * @return string
   */
  public function setDateDebut($dateDebut)
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
   * Set dateRendu
   *
   * @param string $dateRendu
   * @return string
   */
  public function setDateRendu($dateRendu)
  {
    $this->dateRendu = $dateRendu;

    return $this;
  }

  /**
   * Get dateRendu
   *
   * @return integer 
   */
  public function getDateRendu()
  {
    return $this->dateRendu;
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

  public function addTravailleur(ProjetPersonne $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->travailleurs[] = $item;
    
    // On lie le releve au obseur orga
    $item->setProjet($this);

    return $this;
  }

  public function removeTravailleur(ProjetPersonne $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->travailleurs->removeElement($item);
    $item->setProjet(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getTravailleurs() {
    return $this->travailleurs;
  }

  /**
  * Mission
  */
  public function addMission(Mission $mission)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->missions[] = $mission;
      
      // On lie le observation au obseur orga
      $mission->setProjet($this);

      return $this;
  }

  public function removeMission(Mission $mission)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->missions->removeElement($mission);
      $mission->setProjet(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getMissions()
  {
      return $this->missions;
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

  /**
   * @Serializer\VirtualProperty
   * @Serializer\SerializedName("usage_jour")
   * @Serializer\Groups({"projet"})
   */
  public function getUsageJours() {
    $temps_utilise = new \DateTime('00:00');
    foreach ($this->missions as $mission) {
      list($hours, $minutes, $seconds) = sscanf('14:30:00', '%d:%d:%d');
      $interval = new \DateInterval(sprintf('PT%dH%dM%dS', $hours, $minutes, $seconds));
      $temps_utilise->add($interval);
    }
    $heures = $temps_utilise->format("H");
    $minutes = $temps_utilise->format("I");

    $jours = ($heures/7) + ($minutes/3660);
    return round($jours, 2);
  }

  /**
   * @Serializer\VirtualProperty
   * @Serializer\SerializedName("usage_pc")
   * @Serializer\Groups({"projet"})
   */
  public function getUsagePC() {
    return $this->nbJour ? round($this->getUsageJours() / $this->nbJour * 100) : null;
  }

}