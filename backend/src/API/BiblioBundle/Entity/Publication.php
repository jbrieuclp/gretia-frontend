<?php

namespace API\BiblioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use API\BiblioBundle\Entity\Exemplaire;
use API\BiblioBundle\Entity\Territoire;
use API\BiblioBundle\Entity\GuildeFonctionnelle;
use API\BiblioBundle\Entity\Taxon;
use API\BiblioBundle\Entity\Contenu;
use API\BiblioBundle\Entity\Langue;
use API\BiblioBundle\Entity\PublicationAuteur;


/**
* @ORM\Entity(repositoryClass="API\BiblioBundle\Entity\Repository\PublicationRepository")
* @ORM\Table(name="biblio.publication")
*/
class Publication
{

	public function __construct() {
      $this->exemplaires = new ArrayCollection();
      $this->territoires = new ArrayCollection();
      $this->guildeFonctionnelles = new ArrayCollection();
      $this->taxons = new ArrayCollection();
      $this->contenus = new ArrayCollection();
      $this->langues = new ArrayCollection();
      $this->auteurs = new ArrayCollection();
  }

	/**
	 * @ORM\Id
	 * @ORM\Column(name="id_publication", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="biblio.publication_id_publication_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"get_publication", "livres"})
	 */
	private $id;
	
	/**
	* @ORM\Column(name="titre", type="string", length=1000, nullable=false)
	*
	* @Serializer\Groups({"get_publication", "livres"})
	*/
	private $titre;

	/**
	* @ORM\Column(name="resume", type="string", nullable=true)
	*
	* @Serializer\Groups({"get_publication", "livres"})
	*/
	private $resume;

	/**
	* @ORM\Column(name="annee_parution", type="integer", nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $anneeParution;

	/**
	* @ORM\Column(name="collection", type="string", length=255, nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $collection;

	/**
	* @ORM\Column(name="volume", type="string", length=255, nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $volume;

	/**
	* @ORM\Column(name="tome", type="string", length=255, nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $tome;

	/**
	* @ORM\Column(name="fascicule", type="string", length=255, nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $fascicule;

	/**
	* @ORM\Column(name="numero", type="string", length=250, nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $numero;

	/**
	* @ORM\Column(name="no_serie", type="string", length=255, nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $noSerie;

	/**
	* @ORM\Column(name="image_path", type="string", nullable=true)
	*
	* @Serializer\Groups({"get_publication"})
	*/
	private $imagePath;

	/**
	* @ORM\Column(name="commentaires", type="string", nullable=true)
	*
	* @ Serializer\Expose
	*/
	private $commentaires;

	/**
	* @ORM\Column(name="in_zotero", type="smallint", nullable=true)
	*
	* @ Serializer\Expose
	*/
	private $inZotero;

	/**
	 * @var \API\BiblioBundle\Entity\StatutSaisie
	 *
	 * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\StatutSaisie", cascade={"persist"})
	 * @ORM\JoinColumn(name="statut_saisie_id", referencedColumnName="id_statut_saisie", nullable=true)
	 *
	 * @ Serializer\Expose
	 * @Serializer\Type("API\BiblioBundle\Entity\StatutSaisie")
	 */
	private $statutSaisie;

	/**
	 * @var \API\BiblioBundle\Entity\StatutIntegration
	 *
	 * @ORM\ManyToOne(targetEntity="API\BiblioBundle\Entity\StatutIntegration", cascade={"persist"})
	 * @ORM\JoinColumn(name="statut_integration_id", referencedColumnName="id_statut_integration", nullable=true)
	 *
	 * @ Serializer\Expose
	 * @Serializer\Type("API\BiblioBundle\Entity\StatutIntegration")
	 */
	private $statutIntegration;

	/**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\Exemplaire", mappedBy="publication", cascade={"all"}, orphanRemoval=true)
   * @ Serializer\Expose
   * @Serializer\SkipWhenEmpty
   */
	private $exemplaires;

	/**
   * @var ArrayCollection Territoire $territoires
   *
   * Inverse Side
   *
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Territoire", inversedBy="publications", cascade={"all"})
   * @ORM\JoinTable(name="biblio.publication_territoire",
   *   joinColumns={@ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="territoire_id", referencedColumnName="id_territoire")}
   * )
   *
   * @Serializer\Groups({"get_publication"})
   */
	private $territoires;

	/**
   * @var ArrayCollection GuildeFonctionnelle $guildeFonctionnelles
   *
   * Inverse Side
   *
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\GuildeFonctionnelle", inversedBy="publications", cascade={"all"})
   * @ORM\JoinTable(name="biblio.publication_guilde",
   *   joinColumns={@ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication", nullable=true)},
   *   inverseJoinColumns={@ORM\JoinColumn(name="guilde_fonctionnelle_id", referencedColumnName="id_guilde_fonctionnelle")}
   * )
   *
   * @Serializer\Groups({"get_publication"})
   */
	private $guildeFonctionnelles;

	/**
   * @var ArrayCollection Taxon $taxons
   *
   * Inverse Side
   *
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Taxon", inversedBy="publications", cascade={"all"})
   * @ORM\JoinTable(name="biblio.publication_taxon",
   *   joinColumns={@ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="taxon_id", referencedColumnName="id_taxon")}
   * )
   *
   * @Serializer\Groups({"get_publication"})
   */
	private $taxons;

	/**
   * @var ArrayCollection Contenu $contenus
   *
   * Inverse Side
   *
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Contenu", inversedBy="publications", cascade={"all"})
   * @ORM\JoinTable(name="biblio.publication_contenu",
   *   joinColumns={@ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="contenu_id", referencedColumnName="id_contenu")}
   * )
   *
   * @Serializer\Groups({"get_publication"})
   */
	private $contenus;

	/**
   * @var ArrayCollection Langue $langues
   *
   * Inverse Side
   *
   * @ORM\ManyToMany(targetEntity="API\BiblioBundle\Entity\Langue", inversedBy="publications", cascade={"all"})
   * @ORM\JoinTable(name="biblio.publication_langue",
   *   joinColumns={@ORM\JoinColumn(name="publication_id", referencedColumnName="id_publication")},
   *   inverseJoinColumns={@ORM\JoinColumn(name="langue_id", referencedColumnName="id_langue")}
   * )
   *
   * @Serializer\Groups({"get_publication"})
   */
	private $langues;

	/**
	 * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Livre", mappedBy="publication", cascade={"all"}, orphanRemoval=true)
	 * @Serializer\Groups({"get_publication"})
   */
  private $livre;

  /**
	 * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Article", mappedBy="publication", cascade={"all"}, orphanRemoval=true)
	 * @Serializer\Groups({"get_publication"})
   */
  private $article;

  /**
	 * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\LitteratureGrise", mappedBy="publication", cascade={"all"}, orphanRemoval=true)
	 * @Serializer\Groups({"get_publication"})
   */
  private $litteratureGrise;

  /**
	 * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Document", mappedBy="publication", cascade={"all"}, orphanRemoval=true)
	 * @Serializer\Groups({"get_publication"})
   */
  private $document;

  /**
	 * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Chapitre", mappedBy="publication", cascade={"all"}, orphanRemoval=true)
	 * @Serializer\Groups({"get_publication"})
   */
  private $chapitre;

  /**
	 * @ORM\OneToOne(targetEntity="API\BiblioBundle\Entity\Revue", mappedBy="publication", cascade={"all"}, orphanRemoval=true)
	 * @Serializer\Groups({"get_publication"})
   */
  private $revue;

  /**
   * @ORM\OneToMany(targetEntity="API\BiblioBundle\Entity\PublicationAuteur", mappedBy="publication", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
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
   * Set titre
   *
   * @param string $titre
   * @return string
   */
  public function setTitre($titre)
  {
      $this->titre = $titre;

      return $this;
  }

  /**
   * Get titre
   *
   * @return integer 
   */
  public function getTitre()
  {
      return $this->titre;
  }

  /**
   * Set resume
   *
   * @param string $resume
   * @return string
   */
  public function setResume($resume)
  {
      $this->resume = $resume;

      return $this;
  }

  /**
   * Get resume
   *
   * @return integer 
   */
  public function getResume()
  {
      return $this->resume;
  }

	/**
   * Set anneeParution
   *
   * @param string $anneeParution
   * @return string
   */
  public function setAnneeParution($anneeParution)
  {
      $this->anneeParution = $anneeParution;

      return $this;
  }

  /**
   * Get anneeParution
   *
   * @return integer 
   */
  public function getAnneeParution()
  {
      return $this->anneeParution;
  }

  /**
   * Set collection
   *
   * @param string $collection
   * @return string
   */
  public function setCollection($collection)
  {
      $this->collection = $collection;

      return $this;
  }

  /**
   * Get collection
   *
   * @return integer 
   */
  public function getCollection()
  {
      return $this->collection;
  }

	/**
   * Set volume
   *
   * @param string $volume
   * @return string
   */
  public function setVolume($volume)
  {
      $this->volume = $volume;

      return $this;
  }

  /**
   * Get volume
   *
   * @return integer 
   */
  public function getVolume()
  {
      return $this->volume;
  }

	/**
   * Set tome
   *
   * @param string $tome
   * @return string
   */
  public function setTome($tome)
  {
      $this->tome = $tome;

      return $this;
  }

  /**
   * Get tome
   *
   * @return integer 
   */
  public function getTome()
  {
      return $this->tome;
  }


	/**
   * Set fascicule
   *
   * @param string $fascicule
   * @return string
   */
  public function setFascicule($fascicule)
  {
      $this->fascicule = $fascicule;

      return $this;
  }

  /**
   * Get fascicule
   *
   * @return integer 
   */
  public function getFascicule()
  {
      return $this->fascicule;
  }

	/**
   * Set numero
   *
   * @param string $numero
   * @return string
   */
  public function setNumero($numero)
  {
      $this->numero = $numero;

      return $this;
  }

  /**
   * Get numero
   *
   * @return integer 
   */
  public function getNumero()
  {
      return $this->numero;
  }

	/**
   * Set noSerie
   *
   * @param string $noSerie
   * @return string
   */
  public function setNoSerie($noSerie)
  {
      $this->noSerie = $noSerie;

      return $this;
  }

  /**
   * Get noSerie
   *
   * @return integer 
   */
  public function getNoSerie()
  {
      return $this->noSerie;
  }

  /**
   * Set imagePath
   *
   * @param string $imagePath
   * @return string
   */
  public function setImagePath($imagePath)
  {
      $this->imagePath = $imagePath;

      return $this;
  }

  /**
   * Get imagePath
   *
   * @return integer 
   */
  public function getImagePath()
  {
      return $this->imagePath;
  }

	/**
   * Set commentaires
   *
   * @param string $commentaires
   * @return string
   */
  public function setCommentaires($commentaires)
  {
      $this->commentaires = $commentaires;

      return $this;
  }

  /**
   * Get commentaires
   *
   * @return integer 
   */
  public function getCommentaires()
  {
      return $this->commentaires;
  }

	/**
   * Set inZotero
   *
   * @param string $inZotero
   * @return string
   */
  public function setInZotero($inZotero)
  {
      $this->inZotero = $inZotero;

      return $this;
  }

  /**
   * Get inZotero
   *
   * @return integer 
   */
  public function getInZotero()
  {
      return $this->inZotero;
  }

  /**
   * Set statutSaisie
   *
   * @param string $statutSaisie
   * @return string
   */
  public function setStatutSaisie($statutSaisie)
  {
      $this->statutSaisie = $statutSaisie;

      return $this;
  }

  /**
   * Get statutSaisie
   *
   * @return integer 
   */
  public function getStatutSaisie()
  {
      return $this->statutSaisie;
  }

	/**
   * Set statutIntegration
   *
   * @param string $statutIntegration
   * @return string
   */
  public function setStatutIntegration($statutIntegration)
  {
      $this->statutIntegration = $statutIntegration;

      return $this;
  }

  /**
   * Get statutIntegration
   *
   * @return integer 
   */
  public function getStatutIntegration()
  {
      return $this->statutIntegration;
  }

	
  /**
  * Exemplaire
  */
  public function addExemplaire(Exemplaire $exemplaire)
  {
      // Ici, on utilise l'ArrayCollection vraiment comme un tableau
      $this->exemplaires[] = $exemplaire;
      
      // On lie le observation au obseur orga
      $exemplaire->setPublication($this);

      return $this;
  }

  public function removeExemplaire(Exemplaire $exemplaire)
  {
      // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
      $this->exemplaires->removeElement($exemplaire);
      $exemplaire->setPublication(null);
  }

  // Notez le pluriel, on récupère une liste de d'exemplaires ici !
  public function getExemplaires()
  {
      return $this->exemplaires;
  }

  /**
   * Add Territoire
   *
   * @param Territoire $item
   */
  public function addTerritoire(Territoire $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->territoires->contains($item)) {
        if (!$item->getPublications()->contains($this)) {
            $item->addPublication($this);  // Lie le Client au produit.
        }
        $this->territoires->add($item);
    }
  }

  public function setTerritoires($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addTerritoire($item);
        }
    } elseif ($items instanceof Territoire) {
        $this->addTerritoire($items);
    } else {
        throw new Exception("$items must be an instance of Territoire or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $territoires
   */
  public function getTerritoires() {
    return $this->territoires;
  }

  /**
   * Add GuildeFonctionnelle
   *
   * @param GuildeFonctionnelle $item
   */
  public function addGuildeFonctionnelle(GuildeFonctionnelle $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->guildeFonctionnelles->contains($item)) {
        if (!$item->getPublications()->contains($this)) {
            $item->addPublication($this);  // Lie le Client au produit.
        }
        $this->guildeFonctionnelles->add($item);
    }
  }

  public function setGuildeFonctionnelles($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addGuildeFonctionnelle($item);
        }
    } elseif ($items instanceof GuildeFonctionnelle) {
        $this->addGuildeFonctionnelle($items);
    } else {
        throw new Exception("$items must be an instance of GuildeFonctionnelle or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $guildeFonctionnelles
   */
  public function getGuildeFonctionnelles() {
    return $this->guildeFonctionnelles;
  }


  /**
   * Add Taxon
   *
   * @param Taxon $item
   */
  public function addTaxon(Taxon $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->taxons->contains($item)) {
        if (!$item->getPublications()->contains($this)) {
            $item->addPublication($this);  // Lie le Client au produit.
        }
        $this->taxons->add($item);
    }
  }

  public function setTaxons($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addTaxon($item);
        }
    } elseif ($items instanceof Taxon) {
        $this->addTaxon($items);
    } else {
        throw new Exception("$items must be an instance of Taxon or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $taxons
   */
  public function getTaxons() {
    return $this->taxons;
  }
  

  /**
   * Add Contenu
   *
   * @param Contenu $item
   */
  public function addContenu(Contenu $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->contenus->contains($item)) {
        if (!$item->getPublications()->contains($this)) {
            $item->addPublication($this);  // Lie le Client au produit.
        }
        $this->contenus->add($item);
    }
  }

  public function setContenus($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addContenu($item);
        }
    } elseif ($items instanceof Contenu) {
        $this->addContenu($items);
    } else {
        throw new Exception("$items must be an instance of Contenu or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $contenus
   */
  public function getContenus() {
    return $this->contenus;
  }

  /**
   * Add Langue
   *
   * @param Langue $item
   */
  public function addLangue(Langue $item) {
    // Si l'objet fait déjà partie de la collection on ne l'ajoute pas
    if (!$this->langues->contains($item)) {
        if (!$item->getPublications()->contains($this)) {
            $item->addPublication($this);  // Lie le Client au produit.
        }
        $this->langues->add($item);
    }
  }

  public function setLangues($items) {
    if ($items instanceof ArrayCollection || is_array($items)) {
        foreach ($items as $item) {
            $this->addLangue($item);
        }
    } elseif ($items instanceof Langue) {
        $this->addLangue($items);
    } else {
        throw new Exception("$items must be an instance of Langue or ArrayCollection");
    }
  }

  /**
   * Get ArrayCollection
   *
   * @return ArrayCollection $langues
   */
  public function getLangues() {
    return $this->langues;
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
   * Get livre
   *
   * @return integer 
   */
  public function getLivre()
  {
      return $this->livre;
  }

  /**
   * Set article
   *
   * @param string $article
   * @return string
   */
  public function setArticle($article)
  {
      $this->article = $article;

      return $this;
  }

  /**
   * Get article
   *
   * @return integer 
   */
  public function getArticle()
  {
      return $this->article;
  }

  /**
   * Set litteratureGrise
   *
   * @param string $litteratureGrise
   * @return string
   */
  public function setLitteratureGrise($litteratureGrise)
  {
      $this->litteratureGrise = $litteratureGrise;

      return $this;
  }

  /**
   * Get litteratureGrise
   *
   * @return integer 
   */
  public function getLitteratureGrise()
  {
      return $this->litteratureGrise;
  }

  /**
   * Set document
   *
   * @param string $document
   * @return string
   */
  public function setDocument($document)
  {
      $this->document = $document;

      return $this;
  }

  /**
   * Get document
   *
   * @return integer 
   */
  public function getDocument()
  {
      return $this->document;
  }

  /**
   * Set chapitre
   *
   * @param string $chapitre
   * @return string
   */
  public function setChapitre($chapitre)
  {
      $this->chapitre = $chapitre;

      return $this;
  }

  /**
   * Get chapitre
   *
   * @return integer 
   */
  public function getChapitre()
  {
      return $this->chapitre;
  }

  /**
   * Set revue
   *
   * @param string $revue
   * @return string
   */
  public function setRevue($revue)
  {
      $this->revue = $revue;

      return $this;
  }

  /**
   * Get revue
   *
   * @return integer 
   */
  public function getRevue()
  {
      return $this->revue;
  }


 	public function addAut_eur(PublicationAuteur $item) {
    // Ici, on utilise l'ArrayCollection vraiment comme un tableau
    $this->auteurs[] = $item;
    
    // On lie le releve au obseur orga
    $item->setPublication($this);

    return $this;
  }

  public function removeAut_eur(PublicationAuteur $item) {
    // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
    $this->auteurs->removeElement($item);
    $item->setPublication(null);
  }

  // Notez le pluriel, on récupère une liste de catégories ici !
  public function getAut_eurs() {
    return $this->auteurs;
  }


  /**
   * Get document
   * @return integer 
   *
   * @Serializer\Groups({"get_publication", "livres"})
   * @Serializer\VirtualProperty()
   * @Serializer\SerializedName("type")
   */
  public function getType()
  {
      if ($this->livre !== null) {
      	return "livre";
      } else if ($this->article !== null) {
      	return "article";
      } else if ($this->document !== null) {
      	return "document";
      }
  }

}