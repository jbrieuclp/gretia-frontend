<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.recup")
*/
class Recup
{
	public function __construct() {
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_recup", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.recup_id_recup_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"recup", "salarie"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Salarie", cascade={"all"})
   * @ORM\JoinColumn(name="salarie_id", referencedColumnName="id_salarie", nullable=false)
   * @Assert\NotNull(message="Salarie non renseignée")
   *
   * @Serializer\Groups({"recup"})
   */
  private $salarie;

  /**
   * @ORM\Column(name="date_recup", type="datetime", nullable=false)
   *
   * @Serializer\Groups({"recup", "salarie"})
   */
  private $dateRecup;

  /**
   * @ORM\Column(name="quantite", type="decimal", nullable=false)
   *
   * @Serializer\Groups({"recup", "salarie"})
   */
  private $quantite;

  


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
   * Set dateRecup
   *
   * @param string $dateRecup
   * @return string
   */
  public function setDateRecup($dateRecup)
  {
    $this->dateRecup = $dateRecup;

    return $this;
  }

  /**
   * Get dateRecup
   *
   * @return integer 
   */
  public function getDateRecup()
  {
    return $this->dateRecup;
  }

  /**
   * Set quantite
   *
   * @param string $quantite
   * @return string
   */
  public function setQuantite($quantite)
  {
    $this->quantite = $quantite;

    return $this;
  }

  /**
   * Get quantite
   *
   * @return integer 
   */
  public function getQuantite()
  {
    return $this->quantite;
  }

}