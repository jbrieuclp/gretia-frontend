<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Publication;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.taxon")
*/
class Taxon
{

	public function __construct() {
    $this->publications = new ArrayCollection();
  }


	/**
   * @ORM\Id
   * @ORM\Column(name="id_taxon", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.taxon_id_taxon_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"publications", "taxons"})
   */
  private $id;

  /**
  * @ORM\Column(name="nom", type="string", length=255, nullable=false)
  *
  * @Serializer\Groups({"publications", "taxons"})
  */
  private $nom;

  /**
  * @ORM\Column(name="cd_nom", type="smallint", nullable=true)
  *
  * @Serializer\Groups({"publications", "taxons"})
  */
  private $codeNom;

  /**
   * @var ArrayCollection Publication $publications
   * Owning Side
   *
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Publication", mappedBy="taxons", cascade={"persist", "merge"})
   
	 *
   * @Serializer\Groups({"publications", "taxons"})
   */
  private $publications;


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
   * Set codeNom
   *
   * @param string $codeNom
   * @return string
   */
  public function setCodeNom($codeNom)
  {
      $this->codeNom = $codeNom;

      return $this;
  }

  /**
   * Get codeNom
   *
   * @return integer 
   */
  public function getCodeNom()
  {
      return $this->codeNom;
  }
  /**
   * Add Publication
   *
   * @param Publication $item
   */
  public function addPublication(Publication $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->publications->contains($item)) {
      $this->publications->add($item);
    }
  }

  public function setPublications($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addPublication($item);
      }
    } elseif ($items instanceof Publication) {
      $this->addPublication($items);
    } else {
      throw new Exception("$items must be an instance of Publication or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $publications
   */
  public function getPublications() {
    return $this->publications;
  }

}