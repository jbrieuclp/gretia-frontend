<?php
 
namespace API\CartoBundle\Entity;
 
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Type;
use Symfony\Component\Validator\Constraints as Assert;
 
use API\ProjetBundle\Entity\MissionPersonne;
 
/**
* @ORM\Entity
* @ORM\Table(name="pr_atlas.t_layers")
*/
class Layer
{
     
 
  /**
     * @ORM\Id
     * @ORM\Column(name="id_layer", type="integer")
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="pr_atlas.t_layers_id_layer_seq", allocationSize=1, initialValue=1)
     *
     * @Serializer\Groups({"layer"})
     */
    private $id;
 
  /**
   * @ORM\Column(name="title", type="string", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $title;
 
  /**
   * @ORM\Column(name="display_in_layer_switcher", type="boolean", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $displayInLayerSwitcher;
 
  /**
   * @ORM\Column(name="visible", type="boolean", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $visible;
 
  /**
   * @ORM\Column(name="ordre", type="integer", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $ordre;

  /**
   * @ORM\Column(name="id_l_group", type="integer", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $group;

  /**
   * @ORM\Column(name="layer_type", type="string", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $layerType;

  /**
   * @ORM\Column(name="source_type", type="string", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $sourceType;

  /**
   * @ORM\Column(name="source", type="json", nullable=false)
   *
   * @Serializer\Groups({"mission"})
   */
  private $source;
 
 
 
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
   * Set libelle
   *
   * @param string $libelle
   * @return string
   */
  public function setLibelle($libelle)
  {
    $this->libelle = $libelle;
 
    return $this;
  }
 
  /**
   * Get libelle
   *
   * @return integer 
   */
  public function getLibelle()
  {
    return $this->libelle;
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
   * Set nbJour
   *
   * @param string $nbJour
   * @return string
   */
  public function setNbJour($nbJour)
  {
    $this->nbJour = $nbJour;
 
    return $this;
  }
 
  /**
   * Get nbJour
   *
   * @return integer 
   */
  public function getNbJour()
  {
    return $this->nbJour;
  }
 
  /**
   * Set etat
   *
   * @param string $etat
   * @return string
   */
  public function setEtat($etat)
  {
    $this->etat = $etat;
 
    return $this;
  }
 
  /**
   * Get etat
   *
   * @return integer 
   */
  public function getEtat()
  {
    return $this->etat;
  }
 
  /**
   * Set projet
   *
   * @param string $projet
   * @return string
   */
  public function setProjet($projet)
  {
    $this->projet = $projet;
 
    return $this;
  }
 
  /**
   * Get projet
   *
   * @return integer 
   */
  public function getProjet()
  {
    return $this->projet;
  }
 
  /**
   * Set dateCreate
   *
   * @param string $dateCreate
   * @return string
   */
  public function setDateCreate($dateCreate)
  {
    $this->dateCreate = $dateCreate;
 
    return $this;
  }
 
  /**
   * Get dateCreate
   *
   * @return integer 
   */
  public function getDateCreate()
  {
    return $this->dateCreate;
  }
 
  /**
   * Set compteCreate
   *
   * @param string $compteCreate
   * @return string
   */
  public function setCompteCreate($compteCreate)
  {
    $this->compteCreate = $compteCreate;
 
    return $this;
  }
 
  /**
   * Get compteCreate
   *
   * @return integer 
   */
  public function getCompteCreate()
  {
    return $this->compteCreate;
  }
 
  /**
   * Set dateUpdate
   *
   * @param string $dateUpdate
   * @return string
   */
  public function setDateUpdate($dateUpdate)
  {
    $this->dateUpdate = $dateUpdate;
 
    return $this;
  }
 
  /**
   * Get dateUpdate
   *
   * @return integer 
   */
  public function getDateUpdate()
  {
    return $this->dateUpdate;
  }
 

}