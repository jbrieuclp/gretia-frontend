<?php
// src/OFSA/UserBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="utilisateurs.t_applications")
 * @ORM\Entity
 */
class App
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id_application", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="utilisateurs.t_applications_id_application_seq", allocationSize=1, initialValue=1)
     * @Serializer\Groups({"app_get", "droit_get"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nom_application", type="string")
     * @Serializer\Groups({"app_get", "droit_get"})
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="desc_application", type="string")
     * @Serializer\Groups({"app_get", "droit_get"})
     */
    private $description;

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
}