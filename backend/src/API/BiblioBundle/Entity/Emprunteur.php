<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Emprunt;
use API\BiblioBundle\Entity\Reservation;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.emprunteur")
*/
class Emprunteur
{

	public function __construct() { 
    $this->emprunts = new ArrayCollection();
    $this->reservations = new ArrayCollection();
  }


  /**
   * @ORM\Id
   * @ORM\Column(name="id_emprunteur", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.emprunteur_id_emprunteur_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"emprunteurs"})
   */
  private $id;

  /**
   * @ORM\Column(name="nom", type="text", length=255, nullable=false)
   *
   * @Serializer\Groups({"emprunteurs"})
   */
  private $nom;

  /**
   * @ORM\Column(name="prenom", type="text", length=255, nullable=true)
   *
   * @Serializer\Groups({"emprunteurs"})
   */
  private $prenom;

  /**
   * @var \API\BiblioBundle\Entity\Structure
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Structure", cascade={"persist"})
   * @ORM\JoinColumn(name="structure_id", referencedColumnName="id_structure", nullable=true)
   *
   * @Serializer\Groups({"emprunteurs", "structures"})
   */
  private $structure;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Emprunt", mappedBy="emprunteur", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"emprunteur"})
   */
  private $emprunts;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Reservation", mappedBy="emprunteur", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"emprunteur"})
   */
  private $reservations;

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
   * Set structure
   *
   * @param string $structure
   * @return string
   */
  public function setStructure($structure)
  {
      $this->structure = $structure;

      return $this;
  }

  /**
   * Get structure
   *
   * @return integer 
   */
  public function getStructure()
  {
      return $this->structure;
  }

  public function addEmprunt(Emprunt $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->emprunts[] = $item;
    
    // On lie le releve au obseur orga
    $item->setEmprunteur($this);

    return $this;
  }

  public function removeEmprunt(Emprunt $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->emprunts->removeElement($item);
    $item->setEmprunteur(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getEmprunts() {
    return $this->emprunts;
  }

  public function addReservation(Reservation $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->reservations[] = $item;
    
    // On lie le releve au obseur orga
    $item->setEmprunteur($this);

    return $this;
  }

  public function removeReservation(Reservation $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->reservations->removeElement($item);
    $item->setEmprunteur(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getReservations() {
    return $this->reservations;
  }

}