<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Document;
use API\BiblioBundle\Entity\Encadrement;
use API\BiblioBundle\Entity\LitteratureGrise;
use API\BiblioBundle\Entity\Redacteur;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.structure")
*/
class Structure
{

	public function __construct() {
    $this->documents = new ArrayCollection();
    $this->encadrements = new ArrayCollection();
    $this->litteraturesFinancees = new ArrayCollection();
    $this->redacteurs = new ArrayCollection();
  }


	/**
   * @ORM\Id
   * @ORM\Column(name="id_structure", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.structure_id_structure_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"structures", "documents"})
   */
  private $id;

  /**
  * @ORM\Column(name="nom", type="string", length=510, nullable=false)
  *
  * @Serializer\Groups({"structures"})
  */
  private $nom;

  /**
  * @ORM\Column(name="sigle", type="string", length=255, nullable=true)
  *
  * @Serializer\Groups({"structures"})
  */
  private $sigle;

  /**
  * @ORM\Column(name="adresse", type="string", length=510, nullable=false)
  *
  * @Serializer\Groups({"structures"})
  */
  private $adresse;

  /**
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Document", mappedBy="emetteurs", cascade={"persist", "merge"})
   *
   * @Serializer\Groups({"structures", "documents"})
   */
  private $documents;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Encadrement", mappedBy="structure", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"publications", "litteratureGrises", "structures"})
   */
  private $encadrements;

  /**
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\LitteratureGrise", mappedBy="structuresFinanceuses", cascade={"persist", "merge"})
   *
   * @Serializer\Groups({"publications", "litteratureGrises", "structures"})
   */
  private $litteraturesFinancees;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Redacteur", mappedBy="structure", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"publications", "litteratureGrises", "structures"})
   */
  private $redacteurs;

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
   * Set sigle
   *
   * @param string $sigle
   * @return string
   */
  public function setSigle($sigle)
  {
      $this->sigle = $sigle;

      return $this;
  }

  /**
   * Get sigle
   *
   * @return integer 
   */
  public function getSigle()
  {
      return $this->sigle;
  }

  /**
   * Set adresse
   *
   * @param string $adresse
   * @return string
   */
  public function setAdresse($adresse)
  {
      $this->adresse = $adresse;

      return $this;
  }

  /**
   * Get adresse
   *
   * @return integer 
   */
  public function getAdresse()
  {
      return $this->adresse;
  }

  /**
   * Add Document
   * @param Auteur $item
   */
  public function addDocument(Document $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->documents->contains($item)) {
      if (!$item->getEmetteurs()->contains($this)) {
        $item->addEmetteur($this);  // Lie le Client au produit.
      }
      $this->documents->add($item);
    }
  }

  public function setDocuments($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addDocument($item);
      }
    } elseif ($items instanceof Document) {
      $this->addDocument($items);
    } else {
      throw new Exception("$items must be an instance of Document or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   * @return ArrayCollection $documents
   */
  public function getDocuments() {
    return $this->documents;
  }

  public function addEncadrement(Encadrement $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->encadrements[] = $item;
    
    // On lie le releve au obseur orga
    $item->setStructure($this);

    return $this;
  }

  public function removeEncadrement(Encadrement $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->encadrements->removeElement($item);
    $item->setStructure(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getEncadrements() {
    return $this->encadrements;
  }

  /**
   * Add litteraturesFinancees
   *
   * @param litteraturesFinancees $item
   */
  public function addLitteratureFinancee(LitteratureGrise $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->litteraturesFinancees->contains($item)) {
      $this->litteraturesFinancees->add($item);
    }
  }

  public function setLitteraturesFinancees($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addLitteratureFinancee($item);
      }
    } elseif ($items instanceof LitteratureGrise) {
      $this->addLitteratureFinancee($items);
    } else {
      throw new Exception("$items must be an instance of LitteratureGrise or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $chapitres
   */
  public function getLitteraturesFinancees() {
    return $this->litteraturesFinancees;
  }


  public function addRedacteur(Redacteur $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->redacteurs[] = $item;
    
    // On lie le releve au obseur orga
    $item->setStructure($this);

    return $this;
  }

  public function removeRedacteur(Redacteur $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->redacteurs->removeElement($item);
    $item->setStructure(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getRedacteurs() {
    return $this->redacteurs;
  }
}