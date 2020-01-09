<?php
// src/OFSA/UserBundle/Entity/User.php

namespace API\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection; 
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

use API\CoreBundle\Entity\Droit;
use API\CoreBundle\Entity\UserList;

/**
 * @ORM\Table(name="utilisateurs.t_roles")
 * @ORM\Entity
 */
class UserGeoNature
{
    public function __construct()
    {
        $this->listes = new ArrayCollection();
    }

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
     * @ORM\OneToMany(targetEntity="API\CoreBundle\Entity\UserList", mappedBy="user", cascade={"all"}, orphanRemoval=true)
     */
    private $listes;


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


    public function getNomPrenom()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return implode(' ', [$this->nom, $this->prenom]);
    }


    public function addListe(UserList $item)
    {
        // Ici, on utilise l'ArrayCollection vraiment comme un tableau
        $this->listes[] = $item;
        
        // On lie le releve au obseur orga
        $item->setUser($this);

        return $this;
    }

    public function removeListe(UserList $item)
    {
        // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
        $this->listes->removeElement($item);
        $item->setUser(null);
    }

    // Notez le pluriel, on récupère une liste de catégories ici !
    public function getListes()
    {
        return $this->listes;
    }
}