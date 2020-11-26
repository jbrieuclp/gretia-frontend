<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
* @ORM\Entity
* @ORM\Table(name="projet.localisation")
* @UniqueEntity(fields="intitule", message="Un même nom de localisation existe déjà")
*/
class Localisation
{
	public function __construct() {
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_localisation", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.localisation_id_localisation_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"localisation", "projet"})
   */
  private $id;

  /**
   * @ORMColumn(name="nom", type="string", nullable=false)
   * @Assert\NotNull(message="Nom de localisation non renseigné")
   *
   * @SerializerGroups({"localisation", "projet"})
   */
  private $nom;

  /**
   * @var ArrayCollection Projet $projets
   *
   * @ORM\ManyToMany(targetEntity="API\ProjetBundle\Entity\Projet", mappedBy="localisations")
   * @Serializer\Groups({"localisation"})
   */
  private $projets;
  

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
   * Add projets
   *
   * @param Projet $item
   */
  public function addProjet(Projet $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->projets->contains($item)) {
        if (!$item->getLocalisations()->contains($this)) {
            $item->addLocalisation($this);  // Lie le Client au produit.
        }
        $this->projets->add($item);
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $projets
   */
  public function setProjets($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addProjet($item);
        }
    } elseif ($items instanceof Projet) {
        $this->addProjet($items);
    } else {
        throw new Exception("$items must be an instance of Projet or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $projets
   */
  public function getProjets() {
    return $this->projets;
  }

}