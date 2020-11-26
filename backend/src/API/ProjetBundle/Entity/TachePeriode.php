<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.tache_periode")
*/
class TachePeriode
{
	
  /**
   * @ORM\Id
   * @ORM\Column(name="id_tache_periode", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.tache_periode_id_tache_periode_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"tache_periode", "tache"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Tache", cascade={"all"})
   * @ORM\JoinColumn(name="tache_id", referencedColumnName="id_tache", nullable=true)
   * @Assert\NotNull(message="Tâche non renseignée")
   *
   * @SerializerGroups({"tache_periode"})
   */
  private $tache;

  /**
   * @ORMColumn(name="date_debut", type="", nullable=false)
   * @Assert\NotNull(message="Date de début non renseignée")
   *
   * @SerializerGroups({"tache_periode", "tache"})
   */
  private $dateDebut;

  /**
   * @ORMColumn(name="date_fin", type="", nullable=false)
   * @Assert\NotNull(message="Date de fin non renseignée")
   *
   * @SerializerGroups({"tache_periode", "tache"})
   */
  private $dateFin;
  
  


  /**
   * Get id_projet
   *
   * @return integer 
   */
  public function getId()
  {
    return $this->id;
  }

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