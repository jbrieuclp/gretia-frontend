<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Auteur;

/**
* @ORM\Entity
* @ORM\Table(name="biblio.chapitre")
*/
class Chapitre
{

	/**
     * @ORM\Id
     * @ORM\Column(name="id_chapitre", type="integer")
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="biblio.chapitre_id_chapitre_seq", allocationSize=1, initialValue=1)
     *
     * @Serializer\Groups({"chapitres", "publications"})
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Publication", inversedBy="chapitre", cascade={"persist"}) 
     * @ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")
     *
     * @Serializer\Groups({"chapitres", "publications"})
     */
    private $publication;

    /**
     * @var \API\BiblioBundle\Entity\Livre
     *
     * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\Livre", cascade={"persist"})
     * @ORM\JoinColumn(name="livre_id", referencedColumnName="id_livre", nullable=true)
     *
     * @ Serializer\Expose
     * @Serializer\Type("API\BiblioBundle\Entity\Livre")
     */
    private $livre;

    /**
     * @ORM\Column(name="page_debut", type="smallint", nullable=true)
     *
     * @Serializer\Groups({"chapitres", "publications"})
     */
    private $pageDebut;

    /**
     * @ORM\Column(name="page_fin", type="smallint", nullable=true)
     *
     * @Serializer\Groups({"chapitres", "publications"})
     */
    private $pageFin;

    /**
    * @var ArrayCollection Taxon $taxons
    *
    * Inverse Side
    *
    * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Auteur", inversedBy="chapitres", cascade={"all"})
    * @ORM\JoinTable(name="biblio.chapitre_auteur",
    *   joinColumns={@ORM\JoinColumn(name="chapitre_id", referencedColumnName="id_chapitre")},
    *   inverseJoinColumns={@ORM\JoinColumn(name="auteur_id", referencedColumnName="id_auteur")}
    * )
    *
    * @Serializer\Groups({"get_publication"})
    */
    private $auteurs;


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
     * Set publication
     *
     * @param string $publication
     * @return string
     */
    public function setPublication($publication)
    {
        $this->publication = $publication;

        return $this;
    }

    /**
     * Get publication
     *
     * @return integer 
     */
    public function getPublication()
    {
        return $this->publication;
    }

    /**
     * Get livre
     *
     * @return integer 
     */
    public function getLivre()
    {
        return $this->livre;
    }

    /**
     * Set livre
     *
     * @param string $livre
     * @return string
     */
    public function setLivre($livre)
    {
        $this->livre = $livre;

        return $this;
    }

	/**
     * Set pageDebut
     *
     * @param string $pageDebut
     * @return string
     */
    public function setPageDebut($pageDebut)
    {
        $this->pageDebut = $pageDebut;

        return $this;
    }

    /**
     * Get pageDebut
     *
     * @return integer 
     */
    public function getPageDebut()
    {
        return $this->pageDebut;
    }

		/**
     * Set pageFin
     *
     * @param string $pageFin
     * @return string
     */
    public function setPageFin($pageFin)
    {
        $this->pageFin = $pageFin;

        return $this;
    }

    /**
     * Get pageFin
     *
     * @return integer 
     */
    public function getPageFin()
    {
        return $this->pageFin;
    }

    /**
   * Add Taxon
   *
   * @param Taxon $item
   */
  public function addAuteur(Taxon $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->auteurs->contains($item)) {
        if (!$item->getChapitres()->contains($this)) {
            $item->addChapitre($this);  // Lie le Client au produit.
        }
        $this->auteurs->add($item);
    }
  }

  public function setAuteurs($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addAuteur($item);
        }
    } elseif ($items instanceof Taxon) {
        $this->addAuteur($items);
    } else {
        throw new Exception("$items must be an instance of Auteur or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $auteurs
   */
  public function getAuteurs() {
    return $this->auteurs;
  }
}