<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Structure;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.document")
*/
class Document
{

	public function __construct() { 
    $this->emetteurs = new ArrayCollection();
  }


  /**
   * @ORM\Id
   * @ORM\Column(name="id_document", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.document_id_document_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"publications", "documents"})
   */
  private $id;

  /**
   * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="document", cascade={"persist"}) 
   * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")
   *
   * @Serializer\Groups({"publications", "documents"})
   */
  private $publication;

  /**
  * @ORM\Column(name="nb_pages", type="smallint", nullable=true)
  *
  * @Serializer\Groups({"publications", "documents"})
  */
  private $nbPages;

  /**
   * @var \API\BiblioBundle\Entity\DocumentType
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\DocumentType", cascade={"persist"})
   * @ORM\JoinColumn(name="document_type_id", referencedColumnName="id_document_type", nullable=true)
   *
   * @Serializer\Groups({"publications", "documents"})
   */
  private $type;

  /**
     * @var ArrayCollection Auteur $auteurs
     * Owning Side
     *
     * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Auteur", inversedBy="chapitres", cascade={"persist", "merge"})
     * @ORM\JoinTable(name="biblio.chapitre_auteur",
     *   joinColumns={@ORM\JoinColumn(name="chapitre_id", referencedColumnName="id_chapitre")},
     *   inverseJoinColumns={@ORM\JoinColumn(name="auteur_id", referencedColumnName="id_auteur")}
     * )
     *
     * @Serializer\Groups({"chapitres", "auteurs", "publications"})
     */
  private $emetteurs;

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


  /**
   * Add Emetteur
   * @param Auteur $item
   */
  public function addEmetteur(Structure $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->emetteurs->contains($item)) {
      if (!$item->getDocuments()->contains($this)) {
        $item->addDocument($this);  // Lie le Client au produit.
      }
      $this->emetteurs->add($item);
    }
  }

  public function setEmetteurs($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addEmetteur($item);
      }
    } elseif ($items instanceof Structure) {
      $this->addEmetteur($items);
    } else {
      throw new Exception("$items must be an instance of Structure or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   * @return ArrayCollection $auteurs
   */
  public function getEmetteurs() {
    return $this->emetteurs;
  }

}