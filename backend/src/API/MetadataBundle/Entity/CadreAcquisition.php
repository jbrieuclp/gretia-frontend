<?php

namespace API\MetadataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use API\MetadataBundle\Entity\JDD AS JDD;

/**
* @ORM\Entity
* @ORM\Table(name="metadata.cadre_acquisition")
* @UniqueEntity(fields="nom", message="Un cadre d'acquisition de même nom existe déjà.")
*/
class CadreAcquisition
{

  public function __construct() {
    $this->jdds = new ArrayCollection();
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="metadata.cadre_acquisition_id_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"cadre", "post", "jdd_get", "jdds_get"})
   */
  private $id;

  /**
   * @ORM\Column(name="nom", type="text", length=512, nullable=false, unique=true)
   * @Assert\NotBlank(message="Le nom du cadre d'acquisition ne doit pas être vide.")
   * @Assert\Length(
   *      max = 512,
   *      maxMessage = "Le nom du cadre d'acquisition ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"cadre", "jdds_get"})
   */
  private $nom;

  /**
   * @ORM\Column(name="description", type="text", nullable=true)
   *
   * @Serializer\Groups({"cadre"})
   */
  private $description;

  /**
   * @ORM\Column(name="date_debut", type="date", nullable=true)
   * @Assert\Date(message="La date de commencement n'est pas une date valide.")
   *
   * @Serializer\Groups({"cadre"})
   * @Serializer\Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")
   */
  private $dateDebut;

  /**
   * @ORM\Column(name="date_fin", type="date", nullable=true)
   * @Assert\Date(message="La date de fin n'est pas une date valide.")
   *
   * @Serializer\Groups({"cadre"})
   * @Serializer\Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")
   */
  private $dateFin;

  /**
   * @ORM\Column(name="acteurs", type="text", nullable=true)
   *
   * @Serializer\Groups({"cadre"})
   */
  private $acteurs;

  /**
   * @var \API\MetadataBundle\Entity\Territoire
   *
   * @ORM\ManyToOne(targetEntity="API\MetadataBundle\Entity\Territoire", cascade={"all"}, fetch="EAGER")
   * @ORM\JoinColumn(name="territoire_id", referencedColumnName="id", nullable=false)
   *
   * @Assert\NotNull(message="Le territoire doit être spécifié.")
   *
   * @Serializer\Groups({"cadre"})
   * @Serializer\Type("API\MetadataBundle\Entity\Territoire")
   */
  private $territoire;

  /**
   * @ORM\Column(name="territoire_com", type="text", nullable=true)
   *
   * @Serializer\Groups({"cadre"})
   */
  private $territoireCom;

  /**
   * @ORM\Column(name="referents", type="text", nullable=true)
   *
   * @Serializer\Groups({"cadre"})
   */
  private $referents;

  /**
   * @var \API\MetadataBundle\Entity\Avancement
   *
   * @ORM\ManyToOne(targetEntity="API\MetadataBundle\Entity\Avancement", cascade={"all"}, fetch="EAGER")
   * @ORM\JoinColumn(name="avancement_id", referencedColumnName="id", nullable=false)
   *
   * @Assert\NotNull(message="L'état d'avancement doit être indiqué.")
   *
   * @Serializer\Groups({"cadre"})
   * @Serializer\Type("API\MetadataBundle\Entity\Avancement")
   */
  private $avancement;

  /**
   * @ORM\Column(name="public", type="boolean", nullable=false)
   * @Assert\Type(type="bool", message="Erreur sur la case à cocher données publiques")
   *
   * @Serializer\Groups({"cadre"})
   */
  private $public;

  /**
   * @ORM\Column(name="diffusable", type="boolean", nullable=false)
   * @Assert\Type(type="bool", message="Erreur sur la case à cocher données diffusables")
   *
   * @Serializer\Groups({"cadre"})
   */
  private $diffusable;

  /**
   * @ORM\Column(name="date_creat", type="datetime", nullable=false)
   *
   * @Serializer\Groups({"cadre"})
   * @Serializer\Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")
   */
  private $dateCreation;

  /**
   * @var \API\CoreBundle\Entity\User
   *
   * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\User")
   * @ORM\JoinColumn(name="user_creat", referencedColumnName="id", nullable=false)
   *
   * @Serializer\Groups({"cadre"})
   */
  private $userCreation;

  /**
   * @ORM\Column(name="date_modif", type="datetime", nullable=false)
   *
   * @Serializer\Groups({"cadre"})
   * @Serializer\Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")
   */
  private $dateModif;

  /**
   * @var \API\CoreBundle\Entity\User
   *
   * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\User")
   * @ORM\JoinColumn(name="user_modif", referencedColumnName="id", nullable=false)
   *
   * @Serializer\Groups({"cadre"})
   */
  private $userModif;

  /**
   * @ORM\OneToMany(targetEntity="API\MetadataBundle\Entity\JDD", mappedBy="cadre", cascade={"all"}, orphanRemoval=true)
   *
   * @Serializer\Groups({"jdd"})
   */
  private $jdds;

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
   * Set description
   *
   * @param string $description
   * @return string
   */
  public function setDescription($description)
  {
    $this->description = $description;

    return $this;
  }

  /**
   * Get description
   *
   * @return integer 
   */
  public function getDescription()
  {
    return $this->description;
  }



  /**
   * Set dateDebut
   *
   * @param string $dateDebut
   * @return string
   */
  public function setDateDebut(\DateTime $dateDebut = null)
  {
    $this->dateDebut = $dateDebut;

    return $this;
  }

  /**
   * Get dateDebut
   *
   * @return integer 
   */
  public function getDateDebut()
  {
    return $this->dateDebut;
  }



  /**
   * Set dateFin
   *
   * @param string $dateFin
   * @return string
   */
  public function setDateFin(\DateTime $dateFin = null)
  {
    $this->dateFin = $dateFin;

    return $this;
  }

  /**
   * Get dateFin
   *
   * @return integer 
   */
  public function getDateFin()
  {
    return $this->dateFin;
  }



  /**
   * Set acteurs
   *
   * @param string $acteurs
   * @return string
   */
  public function setActeurs($acteurs)
  {
    $this->acteurs = $acteurs;

    return $this;
  }

  /**
   * Get acteurs
   *
   * @return integer 
   */
  public function getActeurs()
  {
    return $this->acteurs;
  }



  /**
   * Set territoire
   *
   * @param string $territoire
   * @return string
   */
  public function setTerritoire($territoire)
  {
    $this->territoire = $territoire;

    return $this;
  }

  /**
   * Get territoire
   *
   * @return integer 
   */
  public function getTerritoire()
  {
    return $this->territoire;
  }



  /**
   * Set territoireCom
   *
   * @param string $territoireCom
   * @return string
   */
  public function setTerritoireCom($territoireCom)
  {
    $this->territoireCom = $territoireCom;

    return $this;
  }

  /**
   * Get territoireCom
   *
   * @return integer 
   */
  public function getTerritoireCom()
  {
    return $this->territoireCom;
  }



  /**
   * Set referents
   *
   * @param string $referents
   * @return string
   */
  public function setReferents($referents)
  {
    $this->referents = $referents;

    return $this;
  }

  /**
   * Get referents
   *
   * @return integer 
   */
  public function getReferents()
  {
    return $this->referents;
  }



  /**
   * Set avancement
   *
   * @param string $avancement
   * @return string
   */
  public function setAvancement($avancement)
  {
    $this->avancement = $avancement;

    return $this;
  }

  /**
   * Get avancement
   *
   * @return integer 
   */
  public function getAvancement()
  {
    return $this->avancement;
  }



  /**
   * Set public
   *
   * @param string $public
   * @return string
   */
  public function setPublic($public = false)
  {
    $this->public = $public;

    return $this;
  }

  /**
   * Get public
   *
   * @return integer 
   */
  public function getPublic()
  {
    return $this->public;
  }



  /**
   * Set diffusable
   *
   * @param string $diffusable
   * @return string
   */
  public function setDiffusable($diffusable = false)
  {
    $this->diffusable = $diffusable;

    return $this;
  }

  /**
   * Get diffusable
   *
   * @return integer 
   */
  public function getDiffusable()
  {
    return $this->diffusable;
  }



  /**
   * Set dateCreation
   *
   * @param string $dateCreation
   * @return string
   */
  public function setDateCreation(\DateTime $dateCreation = null)
  {
    $this->dateCreation = $dateCreation;

    return $this;
  }

  /**
   * Get dateCreation
   *
   * @return integer 
   */
  public function getDateCreation()
  {
    return $this->dateCreation;
  }



  /**
   * Set userCreation
   *
   * @param string $userCreation
   * @return string
   */
  public function setUserCreation($userCreation)
  {
    $this->userCreation = $userCreation;

    return $this;
  }

  /**
   * Get userCreation
   *
   * @return integer 
   */
  public function getUserCreation()
  {
    return $this->userCreation;
  }



  /**
   * Set dateModif
   *
   * @param string $dateModif
   * @return string
   */
  public function setDateModif(\DateTime $dateModif = null)
  {
    $this->dateModif = $dateModif;

    return $this;
  }

  /**
   * Get dateModif
   *
   * @return integer 
   */
  public function getDateModif()
  {
    return $this->dateModif;
  }



  /**
   * Set userModif
   *
   * @param string $userModif
   * @return string
   */
  public function setUserModif($userModif)
  {
    $this->userModif = $userModif;

    return $this;
  }

  /**
   * Get userModif
   *
   * @return integer 
   */
  public function getUserModif()
  {
    return $this->userModif;
  }


  /**
   * JDDs
   */
  public function addJdd(JDD $item)
  {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->jdds[] = $item;
    
    // On lie le cadre au JDD
    $item->setCadre($this);

    return $this;
  }

  public function removeJdd(JDD $item)
  {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer le JDD en argument
    $this->jdds->removeElement($item);
    $item->setCadre(null);
  }

  // Notez le pluriel, on récupère une liste de JDD ici !
  public function getJdds()
  {
    return $this->jdds;
  }

}