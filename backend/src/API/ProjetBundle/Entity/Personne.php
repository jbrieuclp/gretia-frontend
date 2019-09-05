<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as Serializer;

use API\ProjetBundle\Entity\ProjetPersonne;
use API\ProjetBundle\Entity\MissionPersonne;

/**
* @ORM\Entity
* @ORM\Table(name="projet.personne")
* @UniqueEntity(fields="surnom", message="Une personne au même surnom existe déjà.")
*/
class Personne
{
	
  public function __construct() {
    $this->projets = new ArrayCollection();
    $this->missions = new ArrayCollection();
  }

  /**
	 * @ORM\Id
	 * @ORM\Column(name="id_personne", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.personne_id_personne_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"personne", "projet", "travail"})
	 */
	private $id;

	/**
   * @ORM\Column(name="nom", type="string", nullable=false)
   *
   * @Serializer\Groups({"personne"})
   */
  private $nom;

  /**
   * @ORM\Column(name="prenom", type="string", nullable=false)
   *
   * @Serializer\Groups({"personne"})
   */
  private $prenom;

  /**
   * @ORM\Column(name="surnom", type="string", nullable=false, unique=true)
   *
   * @Serializer\Groups({"personne"})
   */
  private $surnom;

  /**
   * @ORM\Column(name="compte_gn_id", type="integer", nullable=true)
   *
   * @Serializer\Groups({})
   */
  private $compte;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\ProjetPersonne", mappedBy="personne", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({})
   */
  private $projets;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\MissionPersonne", mappedBy="personne", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({})
   */
  private $missions;

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
   * Set surnom
   *
   * @param string $surnom
   * @return string
   */
  public function setSurnom($surnom)
  {
    $this->surnom = $surnom;

    return $this;
  }

  /**
   * Get surnom
   *
   * @return integer 
   */
  public function getSurnom()
  {
    return $this->surnom;
  }

  /**
   * Set compte
   *
   * @param string $compte
   * @return string
   */
  public function setCompte($compte)
  {
    $this->compte = $compte;

    return $this;
  }

  /**
   * Get compte
   *
   * @return integer 
   */
  public function getCompte()
  {
    return $this->compte;
  }

  /**
   * Add projets
   *
   * @param Projet $item
   */
  public function addProjet(ProjetPersonne $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->projets[] = $item;
    
    // On lie le releve au obseur orga
    $item->setPersonne($this);

    return $this;
  }

  public function removeProjet(ProjetPersonne $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->projets->removeElement($item);
    $item->setPersonne(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getProjets() {
    return $this->projets;
  }

  /**
   * Add mission
   *
   * @param Projet $item
   */
  public function addMission(MissionPersonne $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->missions[] = $item;
    
    // On lie le releve au obseur orga
    $item->setPersonne($this);

    return $this;
  }

  public function removeMission(MissionPersonne $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->missions->removeElement($item);
    $item->setPersonne(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getMissions() {
    return $this->missions;
  }
}