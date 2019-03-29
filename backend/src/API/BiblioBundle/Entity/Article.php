<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;


/**
* @ORM\Entity
* @ORM\Table(name="biblio.article")
*/
class Article
{

	/**
	 * @ORM\Id
	 * @ORM\Column(name="id_article", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
	 * @ORM\SequenceGenerator(sequenceName="biblio.article_id_article_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"articles", "publications"})
	 */
	private $id;

	/**
	 * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="article", cascade={"persist"}) 
	 * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")
	 *
	 */
	private $publication;

	/**
	 * @var \API\BiblioBundle\Entity\Revue
	 *
	 * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Revue", inversedBy="articles")
	 * @ORM\JoinColumn(name="revue_id", referencedColumnName="id_revue", nullable=true)
	 *
	 * @Serializer\Groups({"articles", "publications"})
	 */
	private $revue;

	/**
	* @ORM\Column(name="page_debut", type="smallint", nullable=true)
	*
	* @Serializer\Groups({"articles", "publications"})
	*/
	private $pageDebut;

	/**
	* @ORM\Column(name="page_fin", type="smallint", nullable=true)
	*
	* @Serializer\Groups({"articles", "publications"})
	*/
	private $pageFin;

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
   * Set revue
   *
   * @param string $revue
   * @return string
   */
  public function setRevue($revue)
  {
      $this->revue = $revue;

      return $this;
  }

  /**
   * Get revue
   *
   * @return integer 
   */
  public function getRevue()
  {
      return $this->revue;
  }

	/**
   * Set pageDebut
   *
   * @param string $pageDebut
   * @return string
   */
  public function setPageDebut($pageDebut)
  {
      $this->pageDebut = $pageDebut;

      return $this;
  }

  /**
   * Get pageDebut
   *
   * @return integer 
   */
  public function getPageDebut()
  {
      return $this->pageDebut;
  }

	/**
   * Set pageFin
   *
   * @param string $pageFin
   * @return string
   */
  public function setPageFin($pageFin)
  {
      $this->pageFin = $pageFin;

      return $this;
  }

  /**
   * Get pageFin
   *
   * @return integer 
   */
  public function getPageFin()
  {
      return $this->pageFin;
  }


}