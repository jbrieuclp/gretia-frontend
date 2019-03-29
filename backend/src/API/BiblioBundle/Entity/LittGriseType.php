<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.litt_grise_type")
*/
class LittGriseType
{

    /**
     * @ORM\Id
     * @ORM\Column(name="id_litt_grise_type", type="integer")
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="biblio.litt_grise_type_id_litt_grise_type_seq", allocationSize=1, initialValue=1)
     *
     * @Serializer\Groups({"publications", "litteratureGrises"})
     */
    private $id;

    /**
    * @ORM\Column(name="libelle", type="string", length=255, nullable=false)
    *
    * @Serializer\Groups({"publications", "litteratureGrise"})
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