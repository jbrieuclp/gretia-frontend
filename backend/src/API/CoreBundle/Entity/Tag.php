<?php
// src/OFSA/UserBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="utilisateurs.t_tags")
 * @ORM\Entity
 */
class Tag
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id_tag", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="utilisateurs.t_tags_id_tag_seq", allocationSize=1, initialValue=1)
     * @Serializer\Groups({"tag_get", "droit_get"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="id_tag_type", type="integer")
     * @Serializer\Groups({"tag_get", "droit_get"})
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="tag_label", type="string")
     * @Serializer\Groups({"tag_get", "droit_get"})
     */
    private $label;

    /**
    * Set id
    *
    * @param string $id
    * @return string
    */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

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
}