<?php
// src/OFSA/UserBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use API\CoreBundle\Entity\Droit;

/**
 * @ORM\Table(name="utilisateurs.t_roles")
 * @ORM\Entity
 * @UniqueEntity(em="geonature_db", fields="username", message="Cet identifiant est déjà utilisé")
 * @UniqueEntity(em="geonature_db", fields="email", message="Cet email est déjà associé à un compte utilisateur")
 */
class UserGeoNature
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id_role", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="utilisateurs.t_roles_id_role_seq", allocationSize=1, initialValue=1)
     *
     * @Serializer\Groups({"user_get", "droit_get"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="groupe", type="boolean")
     * @Serializer\Groups({"user_get", "droit_get"})
     */
    private $groupe;

    /**
     * @var string
     *
     * @ORM\Column(name="uuid_role", type="string")
     *
     * @Serializer\Groups({"user_get", "droit_get"})
     */
    private $uuid;

    /**
     * @var string
     *
     * @ORM\Column(name="identifiant", type="string", length=100)
     * @Assert\NotBlank(message="Veuillez renseigner un identifiant")
     * @Assert\Length(
     *      max = 100,
     *      maxMessage = "Attention, l'identifiant ne peut pas dépasser plus de {{ limit }} caractères"
     * )
     *
     * @Serializer\Groups({"user_get", "droit_get"})
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
     * @Assert\NotBlank(message="Veuillez renseigner un mot de passe")
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="nom_role", type="string", length=50)
     * @Assert\NotBlank(message="Veuillez renseigner votre nom")
     * @Assert\Length(
     *      max = 50,
     *      maxMessage = "Navré, votre nom ne peut pas dépasser plus de {{ limit }} caractères"
     * )
     *
     * @Serializer\Groups({"user_get", "droit_get"})
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom_role", type="string", length=50)
     * @Assert\NotBlank(message="Veuillez renseigner votre prénom")
     * @Assert\Length(
     *      max = 50,
     *      maxMessage = "Navré, votre prénom ne peut pas dépasser plus de {{ limit }} caractères"
     * )
     *
     * @Serializer\Groups({"user_get", "droit_get"})
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="desc_role", type="string")
     *
     * @Serializer\Groups({"user_get", "droit_get"})
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="id_unite", type="integer")
     */
    private $unite;

    /**
     * @var string
     *
     * @ORM\Column(name="id_organisme", type="integer")
     */
    private $organisme;

    /**
     * @var string
     *
     * @ORM\Column(name="organisme", type="string", length=32)
     */
    private $organismeTxt;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=250, unique=true)
     * @Assert\NotBlank(message="Veuillez renseigner une adresse email")
     * @Assert\Length(
     *      max = 250,
     *      maxMessage = "Navré, votre email ne peut pas dépasser plus de {{ limit }} caractères"
     * )
     * @Assert\Email(
     *     message = "Cet email '{{ value }}' ne semble pas être valide",
     *     checkMX = true
     * )
     *
     * @Serializer\Groups({"user_get", "droit_get"})
     */
    private $email;

    /**
     * @ORM\Column(name="date_insert", type="datetime")
     *
     * @Serializer\Groups({"user_get"})
     * @Serializer\Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")
     */
    private $dateCreation;

    /**
     * @ORM\Column(name="date_update", type="datetime")
     *
     * @Serializer\Groups({"user_get"})
     * @Serializer\Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")
     */
    private $dateUpdate;

    /**
     * @ORM\OneToMany(targetEntity="API\CoreBundle\Entity\Droit", mappedBy="user", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
     * @Serializer\Groups({"droit_get"})
     */
    private $droits;


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
    * Set unite
    *
    * @param string $unite
    * @return string
    */
    public function setUnite($unite)
    {
        $this->unite = $unite;

        return $this;
    }

    /**
    * Get unite
    *
    * @return integer 
    */
    public function getUnite()
    {
        return $this->unite;
    }


    /**
    * Set organisme
    *
    * @param string $organisme
    * @return string
    */
    public function setOrganisme($organisme)
    {
        $this->organisme = $organisme;

        return $this;
    }

    /**
    * Get organisme
    *
    * @return integer 
    */
    public function getOrganisme()
    {
        return $this->organisme;
    }


    /**
    * Set organismeTxt
    *
    * @param string $organismeTxt
    * @return string
    */
    public function setOrganismeTxt($organismeTxt)
    {
        $this->organismeTxt = $organismeTxt;

        return $this;
    }

    /**
    * Get organismeTxt
    *
    * @return integer 
    */
    public function getOrganismeTxt()
    {
        return $this->organismeTxt;
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

    public function getNomPrenom()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return implode(' ', [$this->nom, $this->prenom]);
    }

    public function addDroit(Droit $item)
    {
        // Ici, on utilise l'ArrayCollection vraiment comme un tableau
        $this->droits[] = $item;
        
        // On lie le releve au obseur orga
        $item->setUser($this);

        return $this;
    }

    public function removeDroit(Droit $item)
    {
        // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
        $this->droits->removeElement($item);
        $item->setUser(null);
    }

    // Notez le pluriel, on récupère une liste de catégories ici !
    public function getDroits()
    {
        return $this->droits;
    }
}