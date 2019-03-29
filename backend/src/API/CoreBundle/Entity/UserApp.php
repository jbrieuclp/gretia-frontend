<?php
// src/OFSA/UserBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use API\CoreBundle\Entity\UserGeoNature;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Table(name="utilisateurs.t_roles")
 * @ORM\Entity(repositoryClass="API\CoreBundle\Entity\Repository\UserAppRepository")
 */
class UserApp implements UserInterface, \Serializable
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id_role", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="utilisateurs.t_roles_id_role_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="groupe", type="boolean")
     */
    private $groupe;

    /**
     * @var string
     *
     * @ORM\Column(name="uuid_role", type="string")
     */
    private $uuid;

    /**
     * @var string
     *
     * @ORM\Column(name="identifiant", type="string", length=100)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="pass", type="string", length=100)
     */
    private $md5;

    /**
     * @var string
     *
     * @ORM\Column(name="pass_plus", type="string")
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="nom_role", type="string", length=50)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom_role", type="string", length=50)
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="desc_role", type="string")
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=250, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(name="date_insert", type="date")
     */
    private $dateCreation;

    /**
     * @ORM\Column(name="date_update", type="date")
     */
    private $dateUpdate;

    /**
     * @ORM\Column(type="json_array")
     */
    private $roles;


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
    * Set groupe
    *
    * @param string $groupe
    * @return string
    */
    public function setGroupe($groupe)
    {
        $this->groupe = $groupe;

        return $this;
    }

    /**
    * Get groupe
    *
    * @return integer 
    */
    public function getGroupe()
    {
        return $this->groupe;
    }



    /**
    * Set uuid
    *
    * @param string $uuid
    * @return string
    */
    public function setUuid($uuid)
    {
        $this->uuid = $uuid;

        return $this;
    }

    /**
    * Get uuid
    *
    * @return integer 
    */
    public function getUuid()
    {
        return $this->uuid;
    }



    /**
    * Set username
    *
    * @param string $username
    * @return string
    */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
    * Get username
    *
    * @return integer 
    */
    public function getUsername()
    {
        return $this->username;
    }


    /**
    * Set md5
    *
    * @param string $md5
    * @return string
    */
    public function setMd5($md5)
    {
        $this->md5 = $md5;

        return $this;
    }

    /**
    * Get md5
    *
    * @return integer 
    */
    public function getMd5()
    {
        return $this->md5;
    }



    /**
    * Set password
    *
    * @param string $password
    * @return string
    */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
    * Get password
    *
    * @return integer 
    */
    public function getPassword()
    {
        return $this->password;
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
    * Set prenom
    *
    * @param string $prenom
    * @return string
    */
    public function setPrenom($prenom)
    {
        $this->prenom = $prenom;

        return $this;
    }

    /**
    * Get prenom
    *
    * @return integer 
    */
    public function getPrenom()
    {
        return $this->prenom;
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
    * Set email
    *
    * @param string $email
    * @return string
    */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
    * Get email
    *
    * @return integer 
    */
    public function getEmail()
    {
        return $this->email;
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

    public function getSalt()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return null;
    }

    public function setRoles()
    {
        $this->roles = $roles;

        return $this;
    }

    public function getRoles()
    {
        return $this->roles;
    }

    public function eraseCredentials()
    {
    }

    public function getNomPrenom()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return implode(' ', [$this->nom, $this->prenom]);
    }


    /** @see \Serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            // $this->salt,
        ));
    }

    /** @see \Serializable::unserialize() */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            // $this->salt
        ) = unserialize($serialized);
    }
}