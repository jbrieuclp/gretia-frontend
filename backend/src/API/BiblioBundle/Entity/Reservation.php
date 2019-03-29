<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.exemplaire_reservation")
*/
class Reservation
{

	/**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Exemplaire", inversedBy="emprunts", cascade={"persist"})
   * @ORM\JoinColumn(name="exemplaire_id", referencedColumnName="id_exemplaire", nullable=false)
   *
   * @Serializer\Groups({"exemplaires", "emprunteurs"})
   */
  private $exemplaire;

  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Emprunteur", inversedBy="emprunts", cascade={"persist"})
   * @ORM\JoinColumn(name="emprunteur_id", referencedColumnName="id_emprunteur", nullable=false)
   *
   * @Serializer\Groups({"exemplaires", "emprunteurs"})
   */
  private $emprunteur;

  /**
  * @ORM\Column(name="time_reservation", type="datetime", nullable=true)
  *
  * @Serializer\Groups({"exemplaires", "emprunteurs"})
  */
  private $reservation;

  /**
  * @ORM\Column(name="time_retour", type="boolean", nullable=true)
  *
  * @Serializer\Groups({"exemplaires", "emprunteurs"})
  */
  private $isActive = true;

	/**
   * Set exemplaire
   *
   * @param string $exemplaire
   * @return string
   */
  public function setExemplaire($exemplaire)
  {
      $this->exemplaire = $exemplaire;

      return $this;
  }

  /**
   * Get exemplaire
   *
   * @return integer 
   */
  public function getExemplaire()
  {
      return $this->exemplaire;
  }


  /**
   * Set emprunteur
   *
   * @param string $emprunteur
   * @return string
   */
  public function setEmprunteur($emprunteur)
  {
      $this->emprunteur = $emprunteur;

      return $this;
  }

  /**
   * Get emprunteur
   *
   * @return integer 
   */
  public function getEmprunteur()
  {
      return $this->emprunteur;
  }

  /**
   * Set reservation
   *
   * @param string $reservation
   * @return string
   */
  public function setReservation($reservation)
  {
      $this->reservation = $reservation;

      return $this;
  }

  /**
   * Get reservation
   *
   * @return integer 
   */
  public function getReservation()
  {
      return $this->reservation;
  }

  /**
   * Set isActive
   *
   * @param string $isActive
   * @return string
   */
  public function setIsActive($isActive)
  {
      $this->isActive = $isActive;

      return $this;
  }

  /**
   * Get isActive
   *
   * @return integer 
   */
  public function getIsActive()
  {
      return $this->isActive;
  }



}