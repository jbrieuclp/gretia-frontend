<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;


/**
* @ORM\Entity
* @ORM\Table(name="localisation")
*/
class Localisation
{

	/**
   * @ORM\Id
   * @ORM\Column(name="id_localisation", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.localisation_id_localisation_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"localisations", "exemplaires"})
   */
  private $id;

  /**
  * @ORM\Column(name="libelle", type="string", length=255, nullable=false)
  *
  * @Serializer\Groups({"localisations", "exemplaires"})
  */
  private $libelle;

  /**
  * @ORM\Column(name="precision_loc", type="string", nullable=true)
  *
  * @Serializer\Groups({"localisations", "exemplaires"})
  */
  private $precisionLoc;

  /**
  * @ORM\Column(name="ordre", type="smallint", nullable=true)
  *
  * @Serializer\Groups({"localisations", "exemplaires"})
  */
  private $ordre;


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
   * Set precisionLoc
   *
   * @param string $libelle
   * @return string
   */
  public function setPrecisionLoc($precisionLoc)
  {
      $this->precisionLoc = $precisionLoc;

      return $this;
  }

  /**
   * Get precisionLoc
   *
   * @return integer 
   */
  public function getPrecisionLoc()
  {
      return $this->precisionLoc;
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


}