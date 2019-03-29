<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Article;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.revue")
*/
class Revue
{

	public function __construct() {
      $this->articles = new ArrayCollection();
  }

	/**
   * @ORM\Id
   * @ORM\Column(name="id_revue", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.revue_id_revue_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"revues", "publications"})
   */
  private $id;

  /**
   * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="revue", cascade={"persist"}) 
   * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")
   *
   * @Serializer\Groups({"revues", "publications"})
   */
  private $publication;

  /**
  * @ORM\Column(name="issn", type="string", length=30, nullable=true)
  *
  * @Serializer\Groups({"revues", "publications"})
  */
  private $issn;

  /**
  * @ORM\Column(name="doi", type="string", length=30, nullable=true)
  *
  * @Serializer\Groups({"revues", "publications"})
  */
  private $doi;

  /**
  * @ORM\Column(name="lieu_edition", type="string", length=255, nullable=true)
  *
  * @Serializer\Groups({"revues", "publications"})
  */
  private $lieuEdition;

  /**
  * @ORM\Column(name="editeur_revue", type="string", length=250, nullable=true)
  *
  * @Serializer\Groups({"revues", "publications"})
  */
  /**
   * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Structure", cascade={"persist"}) 
   * @ORM\JoinColumn(name="editeur_id", referencedColumnName="id_structure")
   *
   * @Serializer\Groups({"revues", "publications"})
   */
  private $editeur;

  /**
	 * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Article", mappedBy="revue", cascade={"all"}, orphanRemoval=true)
   *
	 * @Serializer\Groups({"revues", "publications"})
	 */
	private $articles;


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
   * Set issn
   *
   * @param string $issn
   * @return string
   */
  public function setIssn($issn)
  {
      $this->issn = $issn;

      return $this;
  }

  /**
   * Get issn
   *
   * @return integer 
   */
  public function getIssn()
  {
      return $this->issn;
  }

  /**
   * Set doi
   *
   * @param string $doi
   * @return string
   */
  public function setDoi($doi)
  {
      $this->doi = $doi;

      return $this;
  }

  /**
   * Get doi
   *
   * @return integer 
   */
  public function getDoi()
  {
      return $this->doi;
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
  * Article
  */
  public function addArticle(Article $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->articles[] = $item;
    
    // On lie le observation au obseur orga
    $item->setRevue($this);

    return $this;
  }

  public function removeArticle(Article $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->articles->removeElement($item);
    $item->setRevue(null);
  }

  // Notez le pluriel, on récupère une liste de d'exemplaires ici !
  public function getArticles()
  {
    return $this->articles;
  }

}