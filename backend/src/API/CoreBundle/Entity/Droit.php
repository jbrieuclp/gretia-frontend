<?php
// src/OFSA/UserBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table(name="utilisateurs.cor_app_privileges")
 * @ORM\Entity
 * @UniqueEntity(em="geonature_db", fields="username", message="Cet identifiant est déjà utilisé")
 * @UniqueEntity(em="geonature_db", fields="email", message="Cet email est déjà associé à un compte utilisateur")
 */
class Droit
{
    /**
     * @var API\CoreBundle\Entity\Tag
     *
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\Tag", cascade={"persist", "merge"}, fetch="EAGER")
     * @ORM\JoinColumn(name="id_tag_action", referencedColumnName="id_tag", nullable=false)
     *
     * @Serializer\Groups({"droit_get"})
     */
    private $action;

    /**
     * @var API\CoreBundle\Entity\Tag
     *
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\Tag", cascade={"persist", "merge"}, fetch="EAGER")
     * @ORM\JoinColumn(name="id_tag_object", referencedColumnName="id_tag", nullable=false)
     *
     * @Serializer\Groups({"droit_get"})
     */
    private $object;

    /**
     * @var API\CoreBundle\Entity\App
     *
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\App", cascade={"persist", "merge"}, fetch="EAGER")
     * @ORM\JoinColumn(name="id_application", referencedColumnName="id_application", nullable=false)
     *
     * @Serializer\Groups({"droit_get"})
     */
    private $app;

    /**
     * @var API\CoreBundle\Entity\UserGeoNature
     *
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\UserGeoNature", inversedBy="droits", cascade={"persist", "merge"}, fetch="EAGER")
     * @ORM\JoinColumn(name="id_role", referencedColumnName="id_role", nullable=false)
     *
     * @Serializer\Groups({"droit_get"})
     */
    private $user;


    /**
    * Set action
    *
    * @param string $action
    * @return string
    */
    public function setAction($action)
    {
        $this->action = $action;

        return $this;
    }

    /**
    * Get action
    *
    * @return integer 
    */
    public function getAction()
    {
        return $this->action;
    }



    /**
    * Set object
    *
    * @param string $object
    * @return string
    */
    public function setObject($object)
    {
        $this->object = $object;

        return $this;
    }

    /**
    * Get object
    *
    * @return integer 
    */
    public function getObject()
    {
        return $this->object;
    }



    /**
    * Set app
    *
    * @param string $app
    * @return string
    */
    public function setApp($app)
    {
        $this->app = $app;

        return $this;
    }

    /**
    * Get app
    *
    * @return integer 
    */
    public function getApp()
    {
        return $this->app;
    }



    /**
    * Set user
    *
    * @param string $user
    * @return string
    */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
    * Get user
    *
    * @return integer 
    */
    public function getUser()
    {
        return $this->user;
    }
}