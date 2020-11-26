<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.deplacement")
*/
class Deplacement
{
	public function __construct() {
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_deplacement", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.deplacement_id_deplacement_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"deplacement", "travail"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Travail", cascade={"all"})
   * @ORM\JoinColumn(name="tache_id", referencedColumnName="id_tache", nullable=false)
   * @Assert\NotNull(message="Travail non renseigné")
   *
   * @SerializerGroups({"deplacement"})
   */
  private $travail;

  /**
   * @ORMColumn(name="quantite", type="integer", nullable=false)
   * @Assert\NotNull(message="Durée non renseignée")
   *
   * @SerializerGroups({"deplacement", "travail"})
   */
  private $duree;

  /**
   * @ORMColumn(name="quantite", type="integer", nullable=false)
   * @Assert\NotNull(message="Distance non renseignée")
   *
   * @SerializerGroups({"deplacement", "travail"})
   */
  private $distance;

  /**
   * @ORMColumn(name="quantite", type="boolean", nullable=false)
   * @Assert\NotNull(message="Covoiturage non renseigné")
   *
   * @SerializerGroups({"deplacement", "travail"})
   */
  private $covoiturage;
  


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
   * Set travail
   *
   * @param string $travail
   * @return string
   */
  public function setTravail($travail)
  {
    $this->travail = $travail;

    return $this;
  }

  /**
   * Get travail
   *
   * @return integer 
   */
  public function getTravail()
  {
    return $this->travail;
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

  /**
   * Set distance
   *
   * @param string $distance
   * @return string
   */
  public function setDistance($distance)
  {
    $this->distance = $distance;

    return $this;
  }

  /**
   * Get distance
   *
   * @return integer 
   */
  public function getDistance()
  {
    return $this->distance;
  }

  /**
   * Set covoiturage
   *
   * @param string $covoiturage
   * @return string
   */
  public function setCovoiturage($covoiturage)
  {
    $this->covoiturage = $covoiturage;

    return $this;
  }

  /**
   * Get covoiturage
   *
   * @return integer 
   */
  public function getCovoiturage()
  {
    return $this->covoiturage;
  }


}