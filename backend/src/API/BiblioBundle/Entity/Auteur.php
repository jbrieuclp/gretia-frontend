<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Chapitre;
use API\BiblioBundle\Entity\PublicationAuteur;

/**
* @ORM\Entity(repositoryClass="API\BiblioBundle\Entity\Repository\AuteurRepository")
* @ORM\Table(name="biblio.auteur")
*/
class Auteur
{

	public function __construct() { 
    $this->chapitres = new ArrayCollection();
		$this->publications = new ArrayCollection();
	}


	/**
   * @ORM\Id
   * @ORM\Column(name="id_auteur", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.auteur_id_auteur_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"get_publication", "get_auteur"})
   */
  private $id;

  /**
  * @ORM\Column(name="nom", type="string", length=255, nullable=false)
  *
  * @Serializer\Groups({"get_publication", "get_auteur"})
  */
  private $nom;

  /**
  * @ORM\Column(name="prenom", type="string", length=255, nullable=true)
  *
  * @Serializer\Groups({"get_publication", "get_auteur"})
  */
  private $prenom;


  /**
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Chapitre", mappedBy="auteurs", cascade={"persist"})
   *
   * @Serializer\Groups({"get_publication", "chapitres"})
   */
  private $chapitres;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\PublicationAuteur", mappedBy="auteur", cascade={"persist"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"get_publication"})
   */
  private $publications;


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
   * Set prenom
   *
   * @param string $prenom
   * @return string
   */
  public function setPrenom($prenom)
  {
      $this->prenom = $prenom;

      return $this;
  }

  /**
   * Get prenom
   *
   * @return integer 
   */
  public function getPrenom()
  {
      return $this->prenom;
  }

  

  /**
   * Add Chapitre
   *
   * @param Chapitre $item
   */
  public function addChapitre(Chapitre $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->chapitres->contains($item)) {
      $this->chapitres->add($item);
    }
  }

  public function setChapitres($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
      foreach ($items as $item) {
        $this->addChapitre($item);
      }
    } elseif ($items instanceof Chapitre) {
      $this->addChapitre($items);
    } else {
      throw new Exception("$items must be an instance of Chapitre or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $chapitres
   */
  public function getChapitres() {
    return $this->chapitres;
  }


  public function addPublication(PublicationAuteur $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->publications[] = $item;
    
    // On lie le releve au obseur orga
    $item->setAuteur($this);

    return $this;
  }

  public function removePublication(PublicationAuteur $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->publications->removeElement($item);
    $item->setAuteur(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getPublications() {
    return $this->publications;
  }
}