<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="projet.travail_categorie")
*/
class Categorie
{
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id_travail_categ", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.travail_categorie_id_travail_categ_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"categorie", "projet", "travail"})
	 */
	private $id;

	/**
	 * @ORM\Column(name="libelle", type="string", nullable=false)
	 *
	 * @Serializer\Groups({"categorie", "travail"})
	 */
	private $libelle;

	/**
	 * @ORM\Column(name="ordre", type="smallint", nullable=true)
	 *
	 * @Serializer\Groups({"categorie"})
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