<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Emprunt;
use API\BiblioBundle\Entity\Reservation;

/**
* @ORM\Entity
* @ORM\Table(name="exemplaire")
*/
class Exemplaire
{

	public function __construct() { 
    $this->emprunts = new ArrayCollection();
		$this->reservations = new ArrayCollection();
	}


	/**
   * @ORM\Id
   * @ORM\Column(name="id_exemplaire", type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   *
   * @Serializer\Groups({"exemplaires"})
   */
  private $id;

  /**
  * @ORM\Column(name="url", type="text", nullable=false)
  *
  * @Serializer\Groups({"exemplaires"})
  */
  private $url;

  /**
  * @ORM\Column(name="file_name", type="text", nullable=false)
  *
  * @Serializer\Groups({"exemplaires"})
  */
  private $fileName;

  /**
  * @ORM\Column(name="extension", type="text", length=10, nullable=false)
  *
  * @Serializer\Groups({"exemplaires"})
  */
  private $extension;

  /**
   * @var \API\BiblioBundle\Entity\ExemplaireForme
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\ExemplaireForme")
   * @ORM\JoinColumn(name="exemplaire_forme_id", referencedColumnName="id_exemplaire_forme", nullable=true)
   *
   * @Serializer\Groups({"exemplaires"})
   */
  private $forme;

  /**
   * @var \API\BiblioBundle\Entity\Localisation
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Localisation")
   * @ORM\JoinColumn(name="localisation_id", referencedColumnName="id_localisation", nullable=true)
   *
   * @Serializer\Groups({"exemplaires"})
   */
  private $localisation;

  /**
   * @var \API\BiblioBundle\Entity\Publication
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="exemplaires")
   * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication", nullable=false)
   *
   * @Serializer\Groups({"exemplaires"})
   */
  private $publication;

  /**
   * @var \API\BiblioBundle\Entity\RangementCat1
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Rangement")
   * @ORM\JoinColumn(name="rangement_id", referencedColumnName="id_rangement", nullable=true)
   *
   * @Serializer\Groups({"exemplaires"})
   */
  private $rangement;

  /**
  * @ORM\Column(name="public", type="boolean", nullable=false)
  *
  * @Serializer\Groups({"exemplaires"})
  */
  private $public = false;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Emprunt", mappedBy="exemplaire", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"exemplaires"})
   */
	private $emprunts;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Reservation", mappedBy="exemplaire", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"exemplaires"})
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
   * Set url
   *
   * @param string $url
   * @return string
   */
  public function setUrl($url)
  {
      $this->url = $url;

      return $this;
  }

  /**
   * Get url
   *
   * @return integer 
   */
  public function getUrl()
  {
      return $this->url;
  }

  /**
   * Set fileName
   *
   * @param string $fileName
   * @return string
   */
  public function setFileName($fileName)
  {
      $this->fileName = $fileName;

      return $this;
  }

  /**
   * Get fileName
   *
   * @return integer 
   */
  public function getFileName()
  {
      return $this->fileName;
  }

  /**
   * Set extension
   *
   * @param string $extension
   * @return string
   */
  public function setExtension($extension)
  {
      $this->extension = $extension;

      return $this;
  }

  /**
   * Get extension
   *
   * @return integer 
   */
  public function getExtension()
  {
      return $this->extension;
  }

	/**
   * Set forme
   *
   * @param string $forme
   * @return string
   */
  public function setForme($forme)
  {
      $this->forme = $forme;

      return $this;
  }

  /**
   * Get forme
   *
   * @return integer 
   */
  public function getForme()
  {
      return $this->forme;
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
   * Set rangementCat1
   *
   * @param string $rangementCat1
   * @return string
   */
  public function setRangement($rangement)
  {
      $this->rangement = $rangement;

      return $this;
  }

  /**
   * Get rangement
   *
   * @return integer 
   */
  public function getRangement()
  {
      return $this->rangement;
  }

	/**
   * Set public
   *
   * @param string $public
   * @return string
   */
  public function setPublic($public)
  {
      $this->public = $public;

      return $this;
  }

  /**
   * Get public
   *
   * @return integer 
   */
  public function getPublic()
  {
    return $this->public;
  }

  public function addEmprunt(Emprunt $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->emprunts[] = $item;
    
    // On lie le releve au obseur orga
    $item->setExemplaire($this);

    return $this;
  }

  public function removeEmprunt(Emprunt $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->emprunts->removeElement($item);
    $item->setExemplaire(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getEmprunts() {
    return $this->emprunts;
  }

  public function addReservation(Reservation $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->reservations[] = $item;
    
    // On lie le releve au obseur orga
    $item->setExemplaire($this);

    return $this;
  }

  public function removeReservation(Reservation $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->reservations->removeElement($item);
    $item->setExemplaire(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getReservations() {
    return $this->reservations;
  }
}