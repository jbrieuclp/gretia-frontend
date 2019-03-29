<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.publication_auteur")
*/
class PublicationAuteur
{

	/**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="auteurs")
   * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication", nullable=false)
   *
   * @Serializer\Groups({"get_publication"})
   */
  private $publication;

  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Auteur", inversedBy="publications", fetch="EAGER")
   * @ORM\JoinColumn(name="auteur_id", referencedColumnName="id_auteur", nullable=false)
   *
   * @Serializer\Groups({"get_publication"})
   */
  private $auteur;

  /**
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\AuteurType")
   * @ORM\JoinColumn(name="auteur_type_id", referencedColumnName="id_auteur_type", nullable=false)
   *
   * @Serializer\Groups({"get_publication"})
   */
  private $type;

  /**
  * @ORM\Column(name="ordre", type="smallint", nullable=true)
  *
  * @Serializer\Groups({"get_publication"})
  */
  private $ordre;


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
   * Set auteur
   *
   * @param string $auteur
   * @return string
   */
  public function setAuteur($auteur)
  {
      $this->auteur = $auteur;

      return $this;
  }

  /**
   * Get auteur
   *
   * @return integer 
   */
  public function getAuteur()
  {
      return $this->auteur;
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