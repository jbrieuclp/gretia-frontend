<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.exemplaire_emprunt")
*/
class Emprunt
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
  * @ORM\Column(name="time_emprunt", type="datetime", nullable=true)
  *
  * @Serializer\Groups({"exemplaires", "emprunteurs"})
  */
  private $emprunt;

  /**
  * @ORM\Column(name="time_retour", type="datetime", nullable=true)
  *
  * @Serializer\Groups({"exemplaires", "emprunteurs"})
  */
  private $retour;

  /**
  * @ORM\Column(name="comm_emprunt", type="string", nullable=false)
  *
  * @Serializer\Groups({"exemplaires", "emprunteurs"})
  */
  private $commentaire;

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
   * Set emprunt
   *
   * @param string $emprunt
   * @return string
   */
  public function setEmprunt($emprunt)
  {
      $this->emprunt = $emprunt;

      return $this;
  }

  /**
   * Get emprunt
   *
   * @return integer 
   */
  public function getEmprunt()
  {
      return $this->emprunt;
  }

  /**
   * Set retour
   *
   * @param string $retour
   * @return string
   */
  public function setRetour($retour)
  {
      $this->retour = $retour;

      return $this;
  }

  /**
   * Get retour
   *
   * @return integer 
   */
  public function getRetour()
  {
      return $this->retour;
  }

  /**
   * Set commentaire
   *
   * @param string $commentaire
   * @return string
   */
  public function setCommentairer($commentaire)
  {
      $this->commentaire = $commentaire;

      return $this;
  }

  /**
   * Get commentaire
   *
   * @return integer 
   */
  public function getCommentaire()
  {
      return $this->commentaire;
  }

}