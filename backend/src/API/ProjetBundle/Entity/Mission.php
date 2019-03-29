<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="projet.mission")
*/
class Mission
{
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id_mission", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.mission_id_mission_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"mission"})
	 */
	private $id;

  /**
   * @ORM\Column(name="libelle", type="string", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $libelle;

  /**
   * @ORM\Column(name="detail", type="string", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $detail;

  /**
   * @ORM\Column(name="nb_jour", type="float", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $nbJour;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Etat", cascade={"all"})
   * @ORM\JoinColumn(name="etat_id", referencedColumnName="id_etat", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $etat;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Projet", cascade={"all"})
   * @ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $projet;

  /**
   * @ORM\Column(name="date_create", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $dateCreate;

  /**
   * @ORM\Column(name="compte_create_id", type="string", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $compteCreate;

  /**
   * @ORM\Column(name="date_update", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $dateUpdate;

  /**
   * @ORM\Column(name="compte_update_id", type="string", nullable=true)
   *
   * @Serializer\Groups({"mission"})
   */
  private $compteUpdate;



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
   * Set detail
   *
   * @param string $detail
   * @return string
   */
  public function setDetail($detail)
  {
    $this->detail = $detail;

    return $this;
  }

  /**
   * Get detail
   *
   * @return integer 
   */
  public function getDetail()
  {
    return $this->detail;
  }

  /**
   * Set nbJour
   *
   * @param string $nbJour
   * @return string
   */
  public function setNbJour($nbJour)
  {
    $this->nbJour = $nbJour;

    return $this;
  }

  /**
   * Get nbJour
   *
   * @return integer 
   */
  public function getNbJour()
  {
    return $this->nbJour;
  }

  /**
   * Set etat
   *
   * @param string $etat
   * @return string
   */
  public function setEtat($etat)
  {
    $this->etat = $etat;

    return $this;
  }

  /**
   * Get etat
   *
   * @return integer 
   */
  public function getEtat()
  {
    return $this->etat;
  }

  /**
   * Set projet
   *
   * @param string $projet
   * @return string
   */
  public function setProjet($projet)
  {
    $this->projet = $projet;

    return $this;
  }

  /**
   * Get projet
   *
   * @return integer 
   */
  public function getProjet()
  {
    return $this->projet;
  }

  /**
   * Set dateCreate
   *
   * @param string $dateCreate
   * @return string
   */
  public function setDateCreate($dateCreate)
  {
    $this->dateCreate = $dateCreate;

    return $this;
  }

  /**
   * Get dateCreate
   *
   * @return integer 
   */
  public function getDateCreate()
  {
    return $this->dateCreate;
  }

  /**
   * Set compteCreate
   *
   * @param string $compteCreate
   * @return string
   */
  public function setCompteCreate($compteCreate)
  {
    $this->compteCreate = $compteCreate;

    return $this;
  }

  /**
   * Get compteCreate
   *
   * @return integer 
   */
  public function getCompteCreate()
  {
    return $this->compteCreate;
  }

  /**
   * Set dateUpdate
   *
   * @param string $dateUpdate
   * @return string
   */
  public function setDateUpdate($dateUpdate)
  {
    $this->dateUpdate = $dateUpdate;

    return $this;
  }

  /**
   * Get dateUpdate
   *
   * @return integer 
   */
  public function getDateUpdate()
  {
    return $this->dateUpdate;
  }

  /**
   * Set compteUpdate
   *
   * @param string $compteUpdate
   * @return string
   */
  public function setCompteUpdate($compteUpdate)
  {
    $this->compteUpdate = $compteUpdate;

    return $this;
  }

  /**
   * Get compteUpdate
   *
   * @return integer 
   */
  public function getCompteUpdate()
  {
    return $this->compteUpdate;
  }


}