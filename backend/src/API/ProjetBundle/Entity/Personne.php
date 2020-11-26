<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
* @ORM\Entity
* @ORM\Table(name="projet.personne")
* @UniqueEntity(fields="alias", message="Cet alias est déjà utilisé")
* @UniqueEntity(fields="compte_id", message="Ce compte est déjà utilisé")
*/
class Personne
{
	public function __construct() {
    $this->salaries = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_personne", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.personne_id_personne_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"personne", "salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
   */
  private $id;
  
  /**
   * @ORMColumn(name="nom", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Nom non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "Le nom ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @SerializerGroups({"personne", "salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
   */
  private $nom;

  /**
   * @ORMColumn(name="prenom", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Prenom non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "Le prenom ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @SerializerGroups({"personne", "salarie", "projet", "recup", "conge", "fonction_salarie", "antenne"})
   */
  private $prenom;

  /**
   * @ORMColumn(name="alias", type="string", length=255, nullable=false)
   * @Assert\NotNull(message="Alias non renseignée")
   * @Assert\Length(
   *      max = 255,
   *      maxMessage = "L'alias ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @SerializerGroups({"personne", "salarie"})
   */
  private $alias;

  /**
   * @ORMColumn(name="compte_id", type="integer", nullable=true)
   *
   * @SerializerGroups({"personne", "salarie"})
   */
  private $compteId;

  /**
   * @ORM\OneToMany(targetEntity="API\ProjetBundle\Entity\Salarie", mappedBy="personne", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"personne"})
   */
  private $salaries;
 
  


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
   * Set alias
   *
   * @param string $alias
   * @return string
   */
  public function setAlias($alias)
  {
    $this->alias = $alias;

    return $this;
  }

  /**
   * Get alias
   *
   * @return integer 
   */
  public function getAlias()
  {
    return $this->alias;
  }

  /**
   * Set compteId
   *
   * @param string $compteId
   * @return string
   */
  public function setNom($compteId)
  {
    $this->compteId = $compteId;

    return $this;
  }

  /**
   * Get compteId
   *
   * @return integer 
   */
  public function getNom()
  compteId    return $this->nom;
  }

  /**
  * Salarie
  */
  public function addSalarie(Salarie $salarie)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->salaries[] = $salarie;
      
      // liaison inverse avec entité
      $salarie->setAntenne($this);

      return $this;
  }

  public function removeSalarie(Salarie $salarie)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->salaries->removeElement($salarie);
      $salarie->setAntenne(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getSalaries()
  {
      return $this->salaries;
  }

}