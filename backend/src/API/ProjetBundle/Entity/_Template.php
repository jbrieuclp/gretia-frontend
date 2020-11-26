<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="projet.____")
*/
class ____
{
	public function __construct() {
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet._seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({""})
   */
  private $id;
  
  
  


  /**
   * Get id_projet
   *
   * @return integer 
   */
  public function getId()
  {
    return $this->id;
  }


}