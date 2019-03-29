<?php

namespace API\MetadataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
* @ORM\Entity(repositoryClass="API\MetadataBundle\Entity\Repository\JDDRepository")
* @ORM\Table(name="metadata.jdd")
* @ORM\HasLifecycleCallbacks
* @UniqueEntity(fields={"nom", "cadre"}, message="Ce nom existe déjà pour ce cadre d'acquisition.")
*/
class JDD
{

  /**
   * @ORM\Id
   * @ORM\Column(name="id", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="metadata.jdd_id_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"jdd", "jdd_get", "post", "jdds_get"})
   */
  private $id;

  /**
   * @ORM\Column(name="nom", type="text", length=510, nullable=false)
   * @Assert\NotBlank(message="Le nom du jeu ne doit pas être vide.")
   * @Assert\Length(
   *      max = 512,
   *      maxMessage = "Le nom du jeu ne doit pas faire plus de {{ limit }} caractères"
   * )
   *
   * @Serializer\Groups({"jdd", "jdd_get", "jdds_get"})
   */
  private $nom;

  /**
   * @ORM\Column(name="description", type="text", nullable=true)
   *
   * @Serializer\Groups({"jdd", "jdd_get", "jdds_get"})
   */
  private $description;

  /**
   * @var \API\MetadataBundle\Entity\CadreAcquisition
   *
   * @ORM\ManyToOne(targetEntity="API\MetadataBundle\Entity\CadreAcquisition", inversedBy="jdds")
   * @ORM\JoinColumn(name="c_acquisition_id", referencedColumnName="id", nullable=false)
   *
   * @Serializer\Groups({"jdd", "jdd_get", "post", "jdds_get"})
   */
  private $cadre;

  /**
   * @ORM\Column(name="acteurs", type="text", nullable=true)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $acteurs;

  /**
   * @ORM\Column(name="integre", type="boolean", nullable=false)
   * @Assert\Type(type="bool", message="Erreur sur la case à cocher données intégrées")
   *
   * @Serializer\Groups({"jdd", "jdd_get", "jdds_get"})
   */
  private $integre;

  /**
   * @ORM\Column(name="public", type="boolean", nullable=false)
   * @Assert\Type(type="bool", message="Erreur sur la case à cocher données publiques")
   *
   * @Serializer\Groups({"jdd", "jdd_get", "jdds_get"})
   */
  private $public;

  /**
   * @ORM\Column(name="diffusable", type="boolean", nullable=false)
   * @Assert\Type(type="bool", message="Erreur sur la case à cocher données diffusables")
   *
   * @Serializer\Groups({"jdd", "jdd_get", "jdds_get"})
   */
  private $diffusable;

  /**
   * @ORM\Column(name="date_creat", type="datetime", nullable=false)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $dateCreation;

  /**
   * @var \API\CoreBundle\Entity\User
   *
   * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\User")
   * @ORM\JoinColumn(name="user_creat", referencedColumnName="id", nullable=false)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $userCreation;

  /**
   * @ORM\Column(name="date_modif", type="datetime", nullable=false)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $dateModif;

  /**
   * @var \API\CoreBundle\Entity\User
   *
   * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\User")
   * @ORM\JoinColumn(name="user_modif", referencedColumnName="id", nullable=false)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $userModif;

  /**
   * @ORM\Column(name="file_alt", type="text", length=255, nullable=true)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $alt;

  /**
   * @ORM\Column(name="file_extension", type="text", length=10, nullable=true)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $extension;

  /**
   * @ORM\Column(name="file_date_depos", type="datetime", nullable=true)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $fileDepos;

  /**
   * @var \API\CoreBundle\Entity\User
   *
   * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\User")
   * @ORM\JoinColumn(name="file_user_depos", referencedColumnName="id", nullable=true)
   *
   * @Serializer\Groups({"jdd", "jdd_get"})
   */
  private $userDepos;

  /**
   *
   * @Serializer\Type("string")
   */
  private $file;

  /**
   *
   * @Serializer\Type("string")
   */
  private $fileName;

  /**
   *
   * @Serializer\Type("string")
   */
  private $fileExtension;

  /**
   *
   * @Serializer\Type("string")
   */
  private $tempFilename;

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
   * Set cadre
   *
   * @param string $cadre
   * @return string
   */
  public function setCadre($cadre)
  {
    $this->cadre = $cadre;

    return $this;
  }

  /**
   * Get cadre
   *
   * @return integer 
   */
  public function getCadre()
  {
    return $this->cadre;
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
   * Set integre
   *
   * @param string $integre
   * @return string
   */
  public function setIntegre($integre = false)
  {
    $this->integre = $integre;

    return $this;
  }

  /**
   * Get integre
   *
   * @return integer 
   */
  public function getIntegre()
  {
    return $this->integre;
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
  public function setDateCreation($dateCreation)
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
  public function setDateModif($dateModif)
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
   * Set alt
   *
   * @param string $alt
   * @return string
   */
  public function setAlt($alt)
  {
    $this->alt = $alt;

    return $this;
  }

  /**
   * Get alt
   *
   * @return integer 
   */
  public function getAlt()
  {
    return $this->alt;
  }



  /**
   * Set extension
   *
   * @param string $extension
   * @return string
   */
  public function setExtension($extension)
  {
    $this->extension = $extension;

    return $this;
  }

  /**
   * Get extension
   *
   * @return integer 
   */
  public function getExtension()
  {
    return $this->extension;
  }



  /**
   * Set fileDepos
   *
   * @param string $fileDepos
   * @return string
   */
  public function setFileDepos($fileDepos)
  {
    $this->fileDepos = $fileDepos;

    return $this;
  }

  /**
   * Get fileDepos
   *
   * @return integer 
   */
  public function getFileDepos()
  {
    return $this->fileDepos;
  }



  /**
   * Set userDepos
   *
   * @param string $userDepos
   * @return string
   */
  public function setUserDepos($userDepos)
  {
    $this->userDepos = $userDepos;

    return $this;
  }

  /**
   * Get userDepos
   *
   * @return integer 
   */
  public function getUserDepos()
  {
    return $this->userDepos;
  }

  /**
   * Set file
   *
   * @param string $file
   * @return Actualites
   */
  public function setFile($file = null)
  {     
      $this->file = $file;

      // On vérifie si on avait déjà un fichier pour cette entité
      if (null !== $this->extension) {
          // On sauvegarde l'extension du fichier pour le supprimer plus tard
          $this->tempFilename = $this->extension;

          // On réinitialise les valeurs des attributs extension et alt
          $this->extension = null;
          $this->alt = null;
      } else {
          // Le nom du fichier est son id, on doit juste stocker également son extension
          $this->extension = $this->fileExtension;

          // Et on génère l'attribut alt de la balise <img>, à la valeur du nom du fichier sur le PC de l'internaute
          $this->alt = $this->fileName;
      }
      return $this;
  }

  /**
   * Get file
   *
   * @return string 
   */
  public function getFile()
  {
      return $this->file;
  }


  /**
  * @ORM\PrePersist()
  * @ORM\PreUpdate()
  */
  public function preUpload()
  {
      // Si jamais il n'y a pas de fichier (champ facultatif)
      if (null === $this->file) {
          return;
      }

      // Le nom du fichier est son id, on doit juste stocker également son extension
      $this->extension = $this->fileExtension;

      // Et on génère l'attribut alt de la balise <img>, à la valeur du nom du fichier sur le PC de l'internaute
      $this->alt = $this->fileName;
  }

  /**
  * @ORM\PostPersist()
  * @ORM\PostUpdate()
  */
  public function upload()
  {
      // Si jamais il n'y a pas de fichier (champ facultatif)
      if (null === $this->file) {
          return;
      }

      // Si on avait un ancien fichier, on le supprime
      if (null !== $this->tempFilename) {
          $oldFile = $this->getUploadRootDir().'/'.$this->id.'.'.$this->tempFilename;
          if (file_exists($oldFile)) {
              unlink($oldFile);
          }
      }    

      // On déplace le fichier envoyé dans le répertoire de notre choix
      $file_parts = explode(";base64,", $this->file);
      $content = base64_decode($file_parts[1]);
      $fichier = file_put_contents($this->getUploadRootDir().'/'.$this->id.'.'.$this->extension, $content);
  }

  /**
  * @ORM\PreRemove()
  */
  public function preRemoveUpload()
  {
      // On sauvegarde temporairement le nom du fichier, car il dépend de l'id
      $this->tempFilename = $this->getUploadRootDir().'/'.$this->id.'.'.$this->extension;
  }

  /**
  * @ORM\PostRemove()
  */
  public function removeUpload()
  {
      // En PostRemove, on n'a pas accès à l'id, on utilise notre nom sauvegardé
      if (file_exists($this->tempFilename)) {
          // On supprime le fichier
          unlink($this->tempFilename);
      }
  }

  public function getUploadDir()
  {
      // On retourne le chemin relatif vers l'image pour un navigateur (relatif au répertoire /web donc)
      return 'files/jdds';
  }

  protected function getUploadRootDir()
  {
      // On retourne le chemin relatif vers le fichier pour notre code PHP
      return __DIR__.'/../../../../web/'.$this->getUploadDir();
  }

  public function getWebPath($truePath = false)
  {
      return '/'.$this->getUploadDir().'/'.$this->id.'.'.$this->extension;
  }

  /**
   * Set fileName
   *
   * @param string $fileName
   * @return string
   */
  public function setFileName($fileName)
  {
    $this->fileName = $fileName;
    return $this;
  } 

  /**
   * Get fileName
   *
   * @return string 
   */
  public function getFileName()
  {
    return $this->fileName;
  }

  /**
   * Set fileExtension
   *
   * @param string $fileExtension
   * @return string
   */
  public function setFileExtension($fileExtension)
  {
    $this->fileExtension = $fileExtension;
    return $this;
  } 

  /**
   * Get fileExtension
   *
   * @return string 
   */
  public function getFileExtension()
  {
    return $this->fileExtension;
  }

}