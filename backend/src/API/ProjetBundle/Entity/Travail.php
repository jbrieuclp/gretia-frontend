<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="projet.travail")
*/
class Travail
{
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.travail_id_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"travail"})
	 */
	private $id;

	/**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Mission", cascade={"all"})
   * @ORM\JoinColumn(name="mission_id", referencedColumnName="id_mission", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $mission;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Personne", cascade={"all"})
   * @ORM\JoinColumn(name="personne_id", referencedColumnName="id_personne", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $personne;

  /**
   * @ORM\Column(name="date", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $date;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Categorie", cascade={"all"})
   * @ORM\JoinColumn(name="travail_categ_id", referencedColumnName="id_travail_categ", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $categorie;

  /**
   * @ORM\Column(name="duree", type="float", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $duree;

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
   * Set mission
   *
   * @param string $mission
   * @return string
   */
  public function setMission($mission)
  {
    $this->mission = $mission;

    return $this;
  }

  /**
   * Get mission
   *
   * @return integer 
   */
  public function getMission()
  {
    return $this->mission;
  }

  /**
   * Set personne
   *
   * @param string $personne
   * @return string
   */
  public function setPersonne($personne)
  {
    $this->personne = $personne;

    return $this;
  }

  /**
   * Get personne
   *
   * @return integer 
   */
  public function getPersonne()
  {
    return $this->personne;
  }

  /**
   * Set date
   *
   * @param string $date
   * @return string
   */
  public function setDate($date)
  {
    $this->date = $date;

    return $this;
  }

  /**
   * Get date
   *
   * @return integer 
   */
  public function getDate()
  {
    return $this->date;
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
   * Set duree
   *
   * @param string $duree
   * @return string
   */
  public function setDuree($duree)
  {
    $this->duree = $duree;

    return $this;
  }

  /**
   * Get duree
   *
   * @return integer 
   */
  public function getDuree()
  {
    return $this->duree;
  }

}