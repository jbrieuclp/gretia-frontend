<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Encadrement;
use API\BiblioBundle\Entity\Structure;
use API\BiblioBundle\Entity\Redacteur;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.litt_grise")
*/
class LitteratureGrise
{

	public function __construct() { 
    $this->encadrements = new ArrayCollection();
    $this->structuresFinanceuses = new ArrayCollection();
    $this->redacteurs = new ArrayCollection();
  }


  /**
   * @ORM\Id
   * @ORM\Column(name="id_litt_grise", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.litt_grise_id_litt_grise_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"publications", "litteratureGrises"})
   */
  private $id;

  /**
   * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="litteratureGrise", cascade={"persist"}) 
   * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")
   *
   * @Serializer\Expose
   */
  private $publication;

  /**
  * @ORM\Column(name="nb_pages", type="smallint", nullable=true)
  *
  * @Serializer\Groups({"publications", "litteratureGrises"})
  */
  private $nbPages;

  /**
   * @var \API\BiblioBundle\Entity\LittGriseType
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\LittGriseType", cascade={"persist"})
   * @ORM\JoinColumn(name="litt_grise_type_id", referencedColumnName="id_litt_grise_type", nullable=true)
   *
   * @Serializer\Groups({"publications", "litteratureGrises"})
   */
  private $type;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Encadrement", mappedBy="litteratureGrise", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"publications", "litteratureGrises", "structures"})
   */
  private $encadrements;

  /**
     * @var ArrayCollection Structure $structuresFinanceuses
     * Owning Side
     *
     * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Structure", inversedBy="litteraturesFinancees", cascade={"persist", "merge"})
     * @ORM\JoinTable(name="biblio.litt_grise_finance",
     *   joinColumns={@ORM\JoinColumn(name="litt_grise_id", referencedColumnName="id_litt_grise")},
     *   inverseJoinColumns={@ORM\JoinColumn(name="structure_id", referencedColumnName="id_structure")}
     * )
     *
     * @Serializer\Groups({"publications", "litteratureGrises", "structures"})
     */
  private $structuresFinanceuses;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Redacteur", mappedBy="litteratureGrise", cascade={"all"}, orphanRemoval=true)
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
   * Set publication
   *
   * @param string $publication
   * @return string
   */
  public function setPublication($publication)
  {
      $this->publication = $publication;

      return $this;
  }

  /**
   * Get publication
   *
   * @return integer 
   */
  public function getPublication()
  {
      return $this->publication;
  }

	/**
   * Set nbPages
   *
   * @param string $nbPages
   * @return string
   */
  public function setNbPages($nbPages)
  {
      $this->nbPages = $nbPages;

      return $this;
  }

  /**
   * Get nbPages
   *
   * @return integer 
   */
  public function getNbPages()
  {
      return $this->nbPages;
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

  public function addEncadrement(Encadrement $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->encadrements[] = $item;
    
    // On lie le releve au obseur orga
    $item->setLitteratureGrise($this);

    return $this;
  }

  public function removeEncadrement(Encadrement $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->encadrements->removeElement($item);
    $item->setLitteratureGrise(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getEncadrements() {
    return $this->encadrements;
  }

  /**
   * Add Auteur
   *
   * @param Auteur $item
   */
  public function addStructureFinanceuse(Structure $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->structuresFinanceuses->contains($item)) {
      if (!$item->getLitteraturesFinancees()->contains($this)) {
        $item->addLitteratureFinancee($this);  // Lie le Client au produit.
      }
      $this->structuresFinanceuses->add($item);
    }
  }

  public function setstructuresFinanceuses($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addStructureFinanceuse($item);
      }
    } elseif ($items instanceof Structure) {
      $this->addStructureFinanceuse($items);
    } else {
      throw new Exception("$items must be an instance of Structure or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $auteurs
   */
  public function getStructuresFinanceuses() {
    return $this->structuresFinanceuses;
  }


  public function addRedacteur(Redacteur $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->redacteurs[] = $item;
    
    // On lie le releve au obseur orga
    $item->setLitteratureGrise($this);

    return $this;
  }

  public function removeRedacteur(Redacteur $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->redacteurs->removeElement($item);
    $item->setLitteratureGrise(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getRedacteurs() {
    return $this->redacteurs;
  }
}