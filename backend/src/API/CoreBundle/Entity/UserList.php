<?php
// src/OFSA/UserBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Table(name="utilisateurs.cor_role_liste")
 * @ORM\Entity
 */
class UserList
{
    /**
     * @var integer
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="API\CoreBundle\Entity\UserGeoNature", inversedBy="listes", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="id_role", referencedColumnName="id_role", nullable=false)
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Id
     * @ORM\Column(name="id_liste", type="integer")
     */
    private $liste;


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



    /**
    * Set liste
    *
    * @param string $liste
    * @return string
    */
    public function setListe($liste)
    {
        $this->liste = $liste;

        return $this;
    }

    /**
    * Get liste
    *
    * @return integer 
    */
    public function getListe()
    {
        return $this->liste;
    }
}