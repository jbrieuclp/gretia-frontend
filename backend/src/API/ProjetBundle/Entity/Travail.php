<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.travail")
*/
class Travail
{
	public function __construct() {
    $this->deplacements = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_travail", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.travail_id_travail_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"travail", "deplacement"})
   */
  private $id;

  /*
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Tache", inversedBy="travaux", cascade={"all"})
   * @ORM\JoinColumn(name="tache_id", referencedColumnName="id_tache", nullable=false)
   * @Assert\NotNull(message="Tâche non renseignée")
   *
   * @Serializer\Groups({"travail"})
   */
  private $tache;

  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\Salarie", inversedBy="travaux", cascade={"all"})
   * @ORM\JoinColumn(name="salarie_id", referencedColumnName="id_salarie", nullable=false)
   * @Assert\NotNull(message="Salarie non renseignée")
   *
   * @Serializer\Groups({"travail"})
   */
  private $salarie;

  /**
   * @ORM\Column(name="date_travail", type="datetime", nullable=false)
   *
   * @Serializer\Groups({"travail"})
   */
  private $dateTravail;

  /**
   * @ORM\Column(name="temps", type="integer", nullable=false)
   *
   * @Serializer\Groups({"travail"})
   */
  private $temps;

  /**
   * @ORM\Column(name="detail", type="string", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $detail;

  /**
   * @ORM\Column(name="est_nuit", type="boolean", nullable=false)
   *
   * @Serializer\Groups({"travail"})
   */
  private $estNuit;

  /**
   * @ORM\Column(name="est_we", type="boolean", nullable=false)
   *
   * @Serializer\Groups({"travail"})
   */
  private $estWe;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Deplacement", mappedBy="travail", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"travail"})
   */
  private $deplacements;

  
  
  


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
   * @param Tache $tache
   * @return self
   */
  public function setTache($tache)
  {
    $this->tache = $tache;

    return $this;
  }

  /**
   * Get tache
   *
   * @return Tache 
   */
  public function getTache()
  {
    return $this->tache;
  }

  /**
   * Set salarie
   *
   * @param string $salarie
   * @return self
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
   * Set dateTravail
   *
   * @param string $dateTravail
   * @return string
   */
  public function setDateTravail($dateTravail)
  {
    $this->dateTravail = $dateTravail;

    return $this;
  }

  /**
   * Get dateTravail
   *
   * @return integer 
   */
  public function getDateTravail()
  {
    return $this->dateTravail;
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
   * Set detail
   *
   * @param string $detail
   * @return string
   */
  public function setDetail($detail)
  {
    $this->detail = $detail;

    return $this;
  }

  /**
   * Get detail
   *
   * @return integer 
   */
  public function getDetail()
  {
    return $this->detail;
  }

  /**
   * Set estNuit
   *
   * @param string $estNuit
   * @return string
   */
  public function setEstNuit($estNuit)
  {
    $this->estNuit = $estNuit;

    return $this;
  }

  /**
   * Get estNuit
   *
   * @return integer 
   */
  public function getEstNuit()
  {
    return $this->estNuit;
  }

  /**
   * Set estWe
   *
   * @param string $estWe
   * @return string
   */
  public function setEstWe($estWe)
  {
    $this->estWe = $estWe;

    return $this;
  }

  /**
   * Get estWe
   *
   * @return integer 
   */
  public function getEstWe()
  {
    return $this->estWe;
  }

  /**
  * Deplacement
  */
  public function addDeplacement(Deplacement $item)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->deplacements[] = $item;
      
      // liaison inverse avec entité
      $item->setTravail($this);

      return $this;
  }

  public function removeDeplacement(Deplacement $item)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->deplacements->removeElement($item);
      $item->setTravail(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getDeplacements()
  {
      return $this->deplacements;
  }
}