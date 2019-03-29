<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;


/**
* @ORM\Entity(repositoryClass="API\BiblioBundle\Entity\Repository\LivreRepository")
* @ORM\Table(name="biblio.livre")
*/
class Livre
{

  /**
   * @ORM\Id
   * @ORM\Column(name="id_livre", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.livre_id_livre_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"livres", "publications"})
   */
  private $id;

  /**
   * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="livre", cascade={"all"}, orphanRemoval=true) 
   * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")
   *
   * @Serializer\Groups({"livres"})
 */
  private $publication;

  /**
   * @var \API\BiblioBundle\Entity\Editeur
   *
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Structure", inversedBy="livres")
   * @ORM\JoinColumn(name="editeur_id", referencedColumnName="id_structure", nullable=true)
   *
   * @Serializer\Groups({"livres", "publications"})
   */
  private $editeur;

  /**
  * @ORM\Column(name="isbn", type="string", length=30, nullable=true)
  *
  * @Serializer\Groups({"livres", "publications"})
  */
  private $isbn;

  /**
  * @ORM\Column(name="lieu_edition", type="string", length=255, nullable=true)
  *
  * @Serializer\Groups({"livres", "publications"})
  */
  private $lieuEdition;

  /**
  * @ORM\Column(name="nb_pages", type="smallint", nullable=true)
  *
  * @Serializer\Groups({"livres", "publications"})
  */
  private $nbPages;

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
   * Set editeur
   *
   * @param string $editeur
   * @return string
   */
  public function setEditeur($editeur)
  {
      $this->editeur = $editeur;

      return $this;
  }

  /**
   * Get editeur
   *
   * @return integer 
   */
  public function getEditeur()
  {
      return $this->editeur;
  }

	/**
   * Set isbn
   *
   * @param string $isbn
   * @return string
   */
  public function setIsbn($isbn)
  {
      $this->isbn = $isbn;

      return $this;
  }

  /**
   * Get isbn
   *
   * @return integer 
   */
  public function getIsbn()
  {
      return $this->isbn;
  }

	/**
   * Set lieuEdition
   *
   * @param string $lieuEdition
   * @return string
   */
  public function setLieuEdition($lieuEdition)
  {
      $this->lieuEdition = $lieuEdition;

      return $this;
  }

  /**
   * Get lieuEdition
   *
   * @return integer 
   */
  public function getLieuEdition()
  {
      return $this->lieuEdition;
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


}