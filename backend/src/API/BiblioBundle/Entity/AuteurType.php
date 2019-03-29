<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity(repositoryClass="API\BiblioBundle\Entity\Repository\AuteurTypeRepository")
* @ORM\Table(name="biblio.auteur_type")
*/
class AuteurType
{

    /**
     * @ORM\Id
     * @ORM\Column(name="id_auteur_type", type="integer")
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="biblio.auteur_type_id_auteur_type_seq", allocationSize=1, initialValue=1)
     *
     * @Serializer\Groups({"get_publication", "get_auteur"})
     */
    private $id;

    /**
    * @ORM\Column(name="libelle", type="string", length=255, nullable=false)
    *
    * @Serializer\Groups({"get_publication", "get_auteur"})
    */
    private $libelle;


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
}