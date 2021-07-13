<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.tache_attribution")
*/
class TacheAttribution
{
	 
  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Tache", inversedBy="attributionSalaries", cascade={"persist", "merge"}, fetch="EAGER")
   * @ORM\JoinColumn(name="tache_id", referencedColumnName="id_tache", nullable=false)
   * @Assert\NotNull(message="Tâche non renseignée")
   *
   * @Serializer\Groups({"tache_attribution", "salarie"})
   */
  private $tache;

  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Salarie", cascade={"persist", "merge"}, fetch="EAGER")
   * @ORM\JoinColumn(name="salarie_id", referencedColumnName="id_salarie", nullable=false)
   * @Assert\NotNull(message="Salarié non renseigné")
   *
   * @Serializer\Groups({"tache_attribution", "tache"})
   */
  private $salarie;

  /**
   * @ORM\Column(name="nb_jours", type="decimal", nullable=false)
   * @Assert\NotNull(message="Nombre de jours non renseignée")
   *
   * @Serializer\Groups({"tache_attribution", "tache", "salarie"})
   */
  private $nbJours;

  /**
   * @ORM\Column(name="date_debut", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"tache_attribution", "tache", "salarie"})
   */
  private $dateDebut;

  /**
   * @ORM\Column(name="date_fin", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"tache_attribution", "tache", "salarie"})
   */
  private $dateFin;
  
  

  /**
   * Set tache
   *
   * @param string $tache
   * @return string
   */
  public function setTache($tache)
  {
    $this->tache = $tache;

    return $this;
  }

  /**
   * Get tache
   *
   * @return integer 
   */
  public function getTache()
  {
    return $this->tache;
  }

  /**
   * Set salarie
   *
   * @param string $salarie
   * @return string
   */
  public function setSalarie($salarie)
  {
    $this->salarie = $salarie;

    return $this;
  }

  /**
   * Get salarie
   *
   * @return integer 
   */
  public function getSalarie()
  {
    return $this->salarie;
  }

  /**
   * Set nbJours
   *
   * @param string $nbJours
   * @return string
   */
  public function setNbJours($nbJours)
  {
    $this->nbJours = $nbJours;

    return $this;
  }

  /**
   * Get nbJours
   *
   * @return integer 
   */
  public function getNbJours()
  {
    return $this->nbJours;
  }

  /**
   * Set dateDebut
   *
   * @param string $dateDebut
   * @return string
   */
  public function setDateDebut($dateDebut)
  {
    $this->dateDebut = $dateDebut;

    return $this;
  }

  /**
   * Get dateDebut
   *
   * @return integer 
   */
  public function getDateDebut()
  {
    return $this->dateDebut;
  }

  /**
   * Set dateFin
   *
   * @param string $dateFin
   * @return string
   */
  public function setDateFin($dateFin)
  {
    $this->dateFin = $dateFin;

    return $this;
  }

  /**
   * Get dateFin
   *
   * @return integer 
   */
  public function getDateFin()
  {
    return $this->dateFin;
  }
}