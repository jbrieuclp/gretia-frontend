<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\ProjetBundle\Entity\Projet;

/**
* @ORM\Entity(repositoryClass="API\ProjetBundle\Entity\Repository\OrganismeRepository")
* @ORM\Table(name="projet.organisme")
*/
class Organisme
{
  public function __construct() {
    $this->projetsFinances = new ArrayCollection();
    $this->projetsTechniques = new ArrayCollection();
  }

	/**
	 * @ORM\Id
	 * @ORM\Column(name="id_organisme", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.organisme_id_organisme_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"organisme", "projet"})
	 */
	private $id;

	/**
	 * @ORM\Column(name="nom", type="string", nullable=false)
	 *
	 * @Serializer\Groups({"organisme"})
	 */
	private $nom;

	/**
	 * @ORM\Column(name="sigle", type="string", nullable=true)
	 *
	 * @Serializer\Groups({"organisme"})
	 */
	private $sigle;

  /**
   * @var ArrayCollection Projet $projetsFinances
   *
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Projet", mappedBy="partenairesFinanciers", cascade={"all"})
   * @Serializer\Groups({"organisme"})
   */
  private $projetsFinances;

  /**
   * @var ArrayCollection Projet $projetsTechniques
   *
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Projet", mappedBy="partenairesTechniques", cascade={"all"})
   * @Serializer\Groups({"organisme"})
   */
  private $projetsTechniques;

	/**
   * Get id
   *
   * @return integer 
   */
  public function getId()
  {
    return $this->id;
  }

	/**
   * Set nom
   *
   * @param string $nom
   * @return string
   */
  public function setNom($nom)
  {
    $this->nom = $nom;

    return $this;
  }

  /**
   * Get nom
   *
   * @return integer 
   */
  public function getNom()
  {
    return $this->nom;
  }

  /**
   * Set sigle
   *
   * @param string $sigle
   * @return string
   */
  public function setSigle($sigle)
  {
    $this->sigle = $sigle;

    return $this;
  }

  /**
   * Get sigle
   *
   * @return integer 
   */
  public function getSigle()
  {
    return $this->sigle;
  }

  /**
   * Add projetsFinances
   *
   * @param Projet $item
   */
  public function addProjetFinance(Projet $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->projetsFinances->contains($item)) {
        if (!$item->getPartenairesFinanciers()->contains($this)) {
            $item->addPartenaireFinancier($this);  // Lie le Client au produit.
        }
        $this->projetsFinances->add($item);
    }
  }

  public function setProjetsFinances($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addProjetFinance($item);
        }
    } elseif ($items instanceof Projet) {
        $this->addProjetFinance($items);
    } else {
        throw new Exception("$items must be an instance of Projet or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $projetsFinances
   */
  public function getProjetsFinances() {
    return $this->projetsFinances;
  }


  /**
   * Add projetsTechniques
   *
   * @param Projet $item
   */
  public function addProjetTechnique(Projet $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->projetsTechniques->contains($item)) {
        if (!$item->getPartenairesTechniques()->contains($this)) {
            $item->addPartenaireTechnique($this);  // Lie le Client au produit.
        }
        $this->projetsTechniques->add($item);
    }
  }

  public function setProjetsTechniques($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addProjetTechnique($item);
        }
    } elseif ($items instanceof Projet) {
        $this->addProjetTechnique($items);
    } else {
        throw new Exception("$items must be an instance of Projet or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $projetsTechniques
   */
  public function getProjetsTechniques() {
    return $this->projetsTechniques;
  }
}