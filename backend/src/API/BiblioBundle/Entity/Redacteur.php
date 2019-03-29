<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.litt_grise_redaction")
*/
class Redacteur
{

	/**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\LitteratureGrise", inversedBy="redacteurs", cascade={"persist"})
   * @ORM\JoinColumn(name="litt_grise_id", referencedColumnName="id_litt_grise", nullable=false)
   *
   * @Serializer\Groups({"litteratureGrises", "structures"})
   */
  private $litteratureGrise;

  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Structure", inversedBy="redacteurs", cascade={"persist"})
   * @ORM\JoinColumn(name="structure_id", referencedColumnName="id_structure", nullable=false)
   *
   * @Serializer\Groups({"litteratureGrises", "structures"})
   */
  private $structure;

  /**
  * @ORM\Column(name="coordinateur", type="boolean", nullable=false)
  *
  * @Serializer\Groups({"litteratureGrises", "structures"})
  */
  private $coordinateur;

	/**
   * Set litteratureGrise
   *
   * @param string $litteratureGrise
   * @return string
   */
  public function setLitteratureGrise($litteratureGrise)
  {
      $this->litteratureGrise = $litteratureGrise;

      return $this;
  }

  /**
   * Get litteratureGrise
   *
   * @return integer 
   */
  public function getLitteratureGrise()
  {
      return $this->litteratureGrise;
  }


  /**
   * Set structure
   *
   * @param string $structure
   * @return string
   */
  public function setStructure($structure)
  {
      $this->structure = $structure;

      return $this;
  }

  /**
   * Get structure
   *
   * @return integer 
   */
  public function getStructure()
  {
      return $this->structure;
  }

  /**
   * Set coordinateur
   *
   * @param string $coordinateur
   * @return string
   */
  public function setCoordinateur($coordinateur)
  {
      $this->coordinateur = $coordinateur;

      return $this;
  }

  /**
   * Get coordinateur
   *
   * @return integer 
   */
  public function getCoordinateur()
  {
      return $this->coordinateur;
  }

}