<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;


/**
* @ORM\Entity
* @ORM\Table(name="biblio.rangement")
*/
class Rangement
{

	/**
   * @ORM\Id
   * @ORM\Column(name="id_rangement_cat1", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.rangement_categorie_id_rangement_categorie_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"rangements"})
   */
  private $id;

  /**
  * @ORM\Column(name="libelle", type="string", length=255, nullable=false)
  *
  * @Serializer\Groups({"rangements"})
  */
  private $libelle;

  /**
   * @var \API\BiblioBundle\Entity\RangementCategorie
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\RangementCategorie", cascade={"persist"})
   * @ORM\JoinColumn(name="rangement_categorie_id", referencedColumnName="id_rangement_categorie", nullable=true)
   *
   * @Serializer\Groups({"rangements"})
   */
  private $categorie;

  /**
   * @var \API\BiblioBundle\Entity\Rangement
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Rangement", cascade={"persist"})
   * @ORM\JoinColumn(name="rangement_parent_id", referencedColumnName="id_rangement", nullable=true)
   *
   * @Serializer\Groups({"rangements"})
   */
  private $parent;


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
   * Set categorie
   *
   * @param string $categorie
   * @return string
   */
  public function setCategorie($categorie)
  {
      $this->categorie = $categorie;

      return $this;
  }

  /**
   * Get categorie
   *
   * @return integer 
   */
  public function getCategorie()
  {
      return $this->categorie;
  }

  /**
   * Set parent
   *
   * @param string $parent
   * @return string
   */
  public function setParent($parent)
  {
      $this->parent = $parent;

      return $this;
  }

  /**
   * Get parent
   *
   * @return integer 
   */
  public function getParent()
  {
      return $this->parent;
  }


}