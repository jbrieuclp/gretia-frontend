<?php
 
namespace API\CartoBundle\Entity;
 
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Type;
use Symfony\Component\Validator\Constraints as Assert;
 
/**
* @ORM\Entity(repositoryClass="API\CartoBundle\Entity\Repository\ScaleRepository")
* @ORM\Table(name="pr_atlas.t_restitution_level")
*/
class Scale
{
     
 
  /**
   * @ORM\Id
   * @ORM\Column(name="id_restitution_level", type="integer")
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="pr_atlas.t_restitution_level_id_restitution_level_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"scale"})
   */
  private $id;
 
  /**
   * @ORM\Column(name="id_type", type="integer", nullable=false)
   *
   * @Serializer\Groups({"scale"})
   */
  private $type;
 
  /**
   * @ORM\Column(name="label", type="string", nullable=false)
   *
   * @Serializer\Groups({"scale"})
   */
  private $label;

  /**
   * @ORM\Column(name="priority", type="integer", nullable=false)
   *
   * @Serializer\Groups({"scale"})
   */
  private $priority;
 
 
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
   * Set type
   *
   * @param string $type
   * @return string
   */
  public function setType($type)
  {
    $this->type = $type;
 
    return $this;
  }
 
  /**
   * Get type
   *
   * @return integer 
   */
  public function getType()
  {
    return $this->type;
  }
 
  /**
   * Set label
   *
   * @param string $label
   * @return string
   */
  public function setLabel($label)
  {
    $this->label = $label;
 
    return $this;
  }
 
  /**
   * Get label
   *
   * @return integer 
   */
  public function getLabel()
  {
    return $this->label;
  }

  /**
   * Set priority
   *
   * @param string $priority
   * @return string
   */
  public function setPriority($priority)
  {
    $this->priority = $priority;
 
    return $this;
  }
 
  /**
   * Get priority
   *
   * @return integer 
   */
  public function getPriority()
  {
    return $this->priority;
  }
}