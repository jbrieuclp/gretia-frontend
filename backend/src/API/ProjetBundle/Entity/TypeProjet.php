<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="projet.type_projet")
*/
class TypeProjet
{
	public function __construct() {
  }

  /**
   * @ORM\Id
   * @ORM\Column(name="id_id_type_projet", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.type_projet_id_type_projet_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"type_projet", "projet", "type_projet_ref"})
   */
  private $id;
  
  /**
   * @ORM\ManyToOne(targetEntity="API\ProjetBundle\Entity\TypeProjetRef", inversedBy=", inversedBy="typeProjets)
   * @ORM\JoinColumn(name="type_projet_ref_id", referencedColumnName="id_type_projet_ref", nullable=false)
   * @Assert\NotNull(message="Type de projet non renseigné")
   *
   * @Serializer\Groups({"type_projet", "projet"})
   */
  private $typeProjetRef;
  /**
   * @ORMColumn(name="applicationDebut", type="datetime", nullable=false)
   * @Assert\NotNull(message="Date de début d'application non renseignée")
   *
   * @SerializerGroups({"type_projet", "projet", "type_projet_ref"})
   */
  private $applicationDebut;
  /**
   * @ORMColumn(name="applicationFin", type="datetime", nullable=false)
   * @Assert\NotNull(message="Date de fin d'application non renseignée")
   *
   * @SerializerGroups({"type_projet", "projet", "type_projet_ref"})
   */
  private $applicationFin;
  /**
   * @ORMColumn(name="coutJour", type="decimal", nullable=false)
   * @Assert\NotNull(message="Coût jour non renseigné")
   *
   * @SerializerGroups({"type_projet", "projet", "type_projet_ref"})
   */
  private $coutJour; 
  


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
   * Set typeProjetRef
   *
   * @param string $typeProjetRef
   * @return string
   */
  public function setTypeProjetRef($typeProjetRef)
  {
    $this->typeProjetRef = $typeProjetRef;

    return $this;
  }

  /**
   * Get typeProjetRef
   *
   * @return integer 
   */
  public function getTypeProjetRef()
  {
    return $this->typeProjetRef;
  }

  /**
   * Set applicationDebut
   *
   * @param string $applicationDebut
   * @return string
   */
  public function setApplicationDebut($applicationDebut)
  {
    $this->applicationDebut = $applicationDebut;

    return $this;
  }

  /**
   * Get applicationDebut
   *
   * @return integer 
   */
  public function getApplicationDebut()
  {
    return $this->applicationDebut;
  }

  /**
   * Set applicationFin
   *
   * @param string $applicationFin
   * @return string
   */
  public function setApplicationFin($applicationFin)
  {
    $this->applicationFin = $applicationFin;

    return $this;
  }

  /**
   * Get applicationFin
   *
   * @return integer 
   */
  public function getApplicationFin()
  {
    return $this->applicationFin;
  }

  /**
   * Set coutJour
   *
   * @param string $coutJour
   * @return string
   */
  public function setCoutJour($coutJour)
  {
    $this->coutJour = $coutJour;

    return $this;
  }

  /**
   * Get coutJour
   *
   * @return integer 
   */
  public function getCoutJour()
  {
    return $this->coutJour;
  }


}