<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.a_projet_personne")
*/
class ProjetPersonne
{

	/**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Projet", inversedBy="travailleurs")
   * @ORM\JoinColumn(name="projet_id", referencedColumnName="id_projet", nullable=false)
   *
   * @Serializer\Groups({"personne"})
   */
  private $projet;

  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Personne", inversedBy="projets", fetch="EAGER")
   * @ORM\JoinColumn(name="personne_id", referencedColumnName="id_personne", nullable=false)
   *
   * @Serializer\Groups({"projet"})
   */
  private $personne;

  /**
  * @ORM\Column(name="temps", type="float", nullable=true)
  *
  * @Serializer\Groups({"projet", "personne"})
  */
  private $temps;


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
   * Set temps
   *
   * @param string $temps
   * @return string
   */
  public function setTemps($temps)
  {
      $this->temps = $temps;

      return $this;
  }

  /**
   * Get temps
   *
   * @return integer 
   */
  public function getTemps()
  {
      return $this->temps;
  }
}