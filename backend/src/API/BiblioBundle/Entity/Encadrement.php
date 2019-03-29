<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.litt_grise_encadrement")
*/
class Encadrement
{

	/**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\LitteratureGrise", inversedBy="encadrements", cascade={"persist"})
   * @ORM\JoinColumn(name="litt_grise_id", referencedColumnName="id_litt_grise", nullable=false)
   *
   * @Serializer\Groups({"litteratureGrises", "structures"})
   */
  private $litteratureGrise;

  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Structure", inversedBy="encadrements", cascade={"persist"})
   * @ORM\JoinColumn(name="structure_id", referencedColumnName="id_structure", nullable=false)
   *
   * @Serializer\Groups({"litteratureGrises", "structures"})
   */
  private $structure;

  /**
  * @ORM\Column(name="comm_encadrement", type="string", nullable=false)
  *
  * @Serializer\Groups({"litteratureGrises", "structures"})
  */
  private $commentaire;

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