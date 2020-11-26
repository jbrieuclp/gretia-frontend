<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

use API\ProjetBundle\Entity\Recup;
use API\ProjetBundle\Entity\CongePaye;
use API\ProjetBundle\Entity\TacheAttribution;
use API\ProjetBundle\Entity\Travail;

/**
* @ORM\Entity
* @ORM\Table(name="projet.salarie")
*/
class Salarie
{
	public function __construct() {
    $this->recups = new ArrayCollection();
    $this->conges = new ArrayCollection();
    $this->attributionTaches = new ArrayCollection();
    $this->travaux = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_salarie", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.salarie_id_salarie_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Personne", cascade={"all"})
   * @ORM\JoinColumn(name="personne_id", referencedColumnName="id_personne", nullable=false)
   * @Assert\NotNull(message="Personne non renseignée")
   *
   * @Serializer\Groups({"salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
   */
  private $personne;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\FonctionSalarie", cascade={"all"})
   * @ORM\JoinColumn(name="fonction_salarie_id", referencedColumnName="id_fonction_salarie", nullable=false)
   * @Assert\NotNull(message="Fonction non renseignée")
   *
   * @Serializer\Groups({"salarie"})
   */
  private $fonction;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Antenne", cascade={"all"})
   * @ORM\JoinColumn(name="antenne_id", referencedColumnName="id_antenne", nullable=false)
   * @Assert\NotNull(message="Antenne non renseignée")
   *
   * @Serializer\Groups({"salarie"})
   */
  private $antenne;

  /**
   * @ORMColumn(name="date_debut", type="datetime", nullable=false)
   *
   * @SerializerGroups({"salarie"})
   */
  private $dateDebut;

  /**
   * @ORMColumn(name="date_fin", type="datetime", nullable=false)
   *
   * @SerializerGroups({"salarie"})
   */
  private $dateFin;

  /**
   * @ORMColumn(name="taux", type="decimal", nullable=false)
   *
   * @SerializerGroups({"salarie"})
   */
  private $taux;

  /**
   * @var ArrayCollection Projet $responsableProjets
   *
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Projet", mappedBy="responsables")
   * @Serializer\Groups({"salarie"})
   */
  private $responsableProjets;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Recup", mappedBy="salarie", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"salarie"})
   */
  private $recups;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\CongePaye", mappedBy="salarie", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"salarie"})
   */
  private $conges;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\TacheAttribution", mappedBy="salarie", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"salarie"})
   */
  private $attributionTaches;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Travail", mappedBy="salarie", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"salarie"})
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
   * Set personne
   *
   * @param string $personne
   * @return string
   */
  public function setPersonne($personne)
  {
    $this->personne = $personne;

    return $this;
  }

  /**
   * Get personne
   *
   * @return integer 
   */
  public function getPersonne()
  {
    return $this->personne;
  }

  /**
   * Set fonction
   *
   * @param string $fonction
   * @return string
   */
  public function setFonction($fonction)
  {
    $this->fonction = $fonction;

    return $this;
  }

  /**
   * Get fonction
   *
   * @return integer 
   */
  public function getFonction()
  {
    return $this->fonction;
  }

  /**
   * Set antenne
   *
   * @param string $antenne
   * @return string
   */
  public function setAntenne($antenne)
  {
    $this->antenne = $antenne;

    return $this;
  }

  /**
   * Get antenne
   *
   * @return integer 
   */
  public function getAntenne()
  {
    return $this->antenne;
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
   * Set taux
   *
   * @param string $taux
   * @return string
   */
  public function setTaux($taux)
  {
    $this->taux = $taux;

    return $this;
  }

  /**
   * Get taux
   *
   * @return integer 
   */
  public function getTaux()
  {
    return $this->taux;
  }

  /**
   * Add responsableProjets
   *
   * @param Projet $item
   */
  public function addresponsableProjet(Projet $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->responsableProjets->contains($item)) {
      if (!$item->getResponsables()->contains($this)) {
        $item->addLocalisation($this);  // Lie le Client au produit.
      }
      $this->responsableProjets->add($item);
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $responsableProjets
   */
  public function setResponsableProjets($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addresponsableProjet($item);
      }
    } elseif ($items instanceof Projet) {
      $this->addresponsableProjet($items);
    } else {
      throw new Exception("$items must be an instance of Projet or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $responsableProjets
   */
  public function getResponsableProjets() {
    return $this->responsableProjets;
  }

  /**
  * Recup
  */
  public function addRecup(Recup $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->recups[] = $item;
    
    // liaison inverse avec entité
    $item->setSalarie($this);

    return $this;
  }

  public function removeRecup(Recup $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->recups->removeElement($item);
    $item->setSalarie(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getRecups()
  {
    return $this->recups;
  }

  /**
  * CongePaye
  */
  public function addConge(CongePaye $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->conges[] = $item;
    
    // liaison inverse avec entité
    $item->setSalarie($this);

    return $this;
  }

  public function removeConge(CongePaye $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->conges->removeElement($item);
    $item->setSalarie(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getConges()
  {
    return $this->conges;
  }

  /**
  * TacheAttribution
  */
  public function addAttribution(TacheAttribution $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->attributionTaches[] = $item;
    
    // liaison inverse avec entité
    $item->setSalarie($this);

    return $this;
  }

  public function removeAttribution(TacheAttribution $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->attributionTaches->removeElement($item);
    $item->setSalarie(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getAttributions()
  {
    return $this->attributionTaches;
  }

  /**
  * Travail
  */
  public function addTravail(Travail $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->travaux[] = $item;
    
    // liaison inverse avec entité
    $item->setSalarie($this);

    return $this;
  }

  public function removeTravail(Travail $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->travaux->removeElement($item);
    $item->setSalarie(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getTravaux()
  {
    return $this->travaux;
  }
}