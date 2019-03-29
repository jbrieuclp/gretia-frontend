<?php
// src/AppBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Table(name="core.fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"user_get"})
     */
    protected $id;

    /**
     * @Serializer\Groups({"user_get"})
     */
    protected $username;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
}