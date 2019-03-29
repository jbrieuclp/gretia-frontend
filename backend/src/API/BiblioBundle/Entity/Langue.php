<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;


/**
* @ORM\Entity
* @ORM\Table(name="biblio.langue")
*/
class Langue
{

	public function __construct() {
		$this->publications = new ArrayCollection();
	}


	/**
   * @ORM\Id
   * @ORM\Column(name="id_langue", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.langue_id_langue_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"publications", "langues"})
   */
  private $id;

  /**
  * @ORM\Column(name="libelle", type="string", length=255, nullable=false)
  *
  * @Serializer\Expose
  */
  private $libelle;

  /**
  * @ORM\Column(name="ordre", type="smallint", nullable=true)
  *
  * @Serializer\Groups({"publications", "langues"})
  */
  private $ordre;

  /**
   * @var ArrayCollection Publication $publications
   * Owning Side
   *
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Publication", mappedBy="langues", cascade={"persist", "merge"})
   
   *
	 * @Serializer\Groups({"publications", "langues"})
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
   * Set ordre
   *
   * @param string $ordre
   * @return string
   */
  public function setOrdre($ordre)
  {
      $this->ordre = $ordre;

      return $this;
  }

  /**
   * Get ordre
   *
   * @return integer 
   */
  public function getOrdre()
  {
      return $this->ordre;
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