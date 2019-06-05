<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreFlushEventArgs;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Type;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.a_mission_personne")
* @ORM\HasLifecycleCallbacks
*/
class MissionPersonne
{

	/**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Mission", inversedBy="travailleurs")
   * @ORM\JoinColumn(name="mission_id", referencedColumnName="id_mission", nullable=false)
   *
   * @Serializer\Groups({"personne"})
   */
  private $mission;

  /**
   * @ORM\Id
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Personne", inversedBy="missions", fetch="EAGER")
   * @ORM\JoinColumn(name="personne_id", referencedColumnName="id_personne", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $personne;

  /**
  * @ORM\Column(name="temps", type="float", nullable=true)
  *
  * @Serializer\Groups({"mission", "personne"})
  */
  private $temps;


	/**
   * Set mission
   *
   * @param string $mission
   * @return string
   */
  public function setMission($mission)
  {
      $this->mission = $mission;

      return $this;
  }

  /**
   * Get mission
   *
   * @return integer 
   */
  public function getMission()
  {
      return $this->mission;
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

  /**
  * @ORM\PrePersist()
  */
  public function prePersist(LifecycleEventArgs $args)
  {
    $em = $args->getEntityManager('gretiadb');

    if ( !is_null($this->mission) and !is_null($this->mission->getId()) ) 
      $this->mission = $em->getReference('APIProjetBundle:Mission', $this->mission->getId());

    if ( !is_null($this->personne) and !is_null($this->personne->getId()) ) 
      $this->personne = $em->getReference('APIProjetBundle:Personne', $this->personne->getId());  
  }

  /**
  * @ORM\PreFlush()
  */
  public function preFlush(PreFlushEventArgs $args)
  {
    $em = $args->getEntityManager('gretiadb');

    if ( !is_null($this->mission) and !is_null($this->mission->getId()) ) 
      $this->mission = $em->getReference('APIProjetBundle:Mission', $this->mission->getId());

    if ( !is_null($this->personne) and !is_null($this->personne->getId()) ) 
      $this->personne = $em->getReference('APIProjetBundle:Personne', $this->personne->getId());  
  }
}