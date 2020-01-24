<?php
// src/Serena/ImportBundle/Entity/Fichier.php 

namespace API\ImportBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 
use JMS\Serializer\Annotation as Serializer;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;



/**
* @ORM\Entity(repositoryClass="API\ImportBundle\Entity\Repository\FichierRepository")
* @ORM\Table(name="gn_imports.t_fichiers")
* @ORM\HasLifecycleCallbacks
*/
class Fichier
{

	public function __construct()
    {
        $this->champs = new ArrayCollection();
    }

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gn_imports.t_fichiers_id_seq", allocationSize=1, initialValue=1)

     * @Serializer\Groups({"fichier", "champ"})
     */
	private $id;

	/**
	 * @ORM\Column(name="table_nom", type="text", nullable=true, length=255)
     *
     * @Serializer\Groups({"fichier"})
	 */
	private $table;

	/**
	* @ORM\Column(name="file_name", type="text", nullable=true)
  *
  * @Serializer\Groups({"fichier"})
	*/
	private $fileName;

  /**
  * @ORM\Column(name="extension", type="text", nullable=true)
  *
  * @Serializer\Groups({"fichier"})
  */
  private $extension;

	/**
	* @ORM\Column(name="date_import", type="datetime", nullable=true)
   *
  * @Serializer\Groups({"fichier"})
	*/
	private $dateImport;

	/**
	* @ORM\Column(name="clos", type="boolean", nullable=true)
  *
  * @Serializer\Groups({"fichier"})
	*/
	private $clos;

  /**
   * @ORM\OneToMany(targetEntity="API\ImportBundle\Entity\FichierChamp", mappedBy="fichier", cascade={"all"}, orphanRemoval=true, fetch="EAGER")
   *
   * @Serializer\Groups({"fichier"})
   */
  private $champs;

	private $file;
  private $tempFilename;




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
	* Set table
	*
	* @param text $table
	* @return Organismes
	*/
	public function setTable($table)
	{
		$this->table = $table;

		return $this;
	}

	/**
	* Get table
	*
	* @return text
	*/
	public function getTable()
	{
		return $this->table;
	}

	/**
	* Set fileName
	*
	* @param text $fileName
	* @return Organismes
	*/
	public function setFileName($fileName)
	{
		$this->fileName = $fileName;

		return $this;
	}

	/**
	* Get fileName
	*
	* @return text
	*/
	public function getFileName()
	{
		return $this->fileName;
	}

  /**
  * Set extension
  *
  * @param text $extension
  * @return Organismes
  */
  public function setExtension($extension)
  {
    $this->extension = $extension;

    return $this;
  }

  /**
  * Get extension
  *
  * @return text
  */
  public function getExtension()
  {
    return $this->extension;
  }

	/**
	* Set dateImport
	*
	* @param text $dateImport
	* @return Organismes
	*/
	public function setDateImport($dateImport)
	{
		$this->dateImport = $dateImport;

		return $this;
	}

	/**
	* Get dateImport
	*
	* @return text
	*/
	public function getDateImport()
	{
		return $this->dateImport;
	}

    /**
    * Set clos
    *
    * @param text $clos
    * @return Organismes
    */
    public function setClos($clos)
    {
        $this->clos = $clos;

        return $this;
    }

    /**
    * Get clos
    *
    * @return text
    */
    public function getClos()
    {
        return $this->clos;
    }

    public function addChamp(FichierChamp $item)
    {
        // Ici, on utilise l'ArrayCollection vraiment comme un tableau
        $this->champs[] = $item;
        
        // On lie le releve au obseur orga
        $item->setFichier($this);

        return $this;
    }

    public function removeChamp(FichierChamp $item)
    {
        // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
        $this->champs->removeElement($item);
        $item->setFichier(null);
    }

    // Notez le pluriel, on récupère une liste de catégories ici !
    public function getChamps()
    {
        return $this->champs;
    }

    /**
     * Set file
     *
     * @param string $file
     * @return Actualites
     */
    public function setFile(UploadedFile $file = null)
    {
        $this->file = $file;

        // On vérifie si on avait déjà un fichier pour cette entité
        if (null !== $this->extension) {
            // On sauvegarde l'extension du fichier pour le supprimer plus tard
            $this->tempFilename = $this->extension;

            // On réinitialise les valeurs des attributs extension et alt
            $this->extension = null;
            $this->fileName = null;
        } else {
            // Le nom du fichier est son id, on doit juste stocker également son extension
            $this->extension = $this->file->getClientOriginalExtension();

            // Et on génère l'attribut alt de la balise <img>, à la valeur du nom du fichier sur le PC de l'internaute
            $this->fileName = $this->file->getClientOriginalName();
        }
        return $this;
    }

    /**
     * Get file
     *
     * @return string 
     */
    public function getFile()
    {
        return $this->file;
    }


    /**
    * @ORM\PrePersist()
    * @ORM\PreUpdate()
    */
    public function preUpload()
    {
        // Si jamais il n'y a pas de fichier (champ facultatif)
        if (null === $this->file) {
            return;
        }

        // Le nom du fichier est son id, on doit juste stocker également son extension
        $this->extension = $this->file->getClientOriginalExtension();

        // Et on génère l'attribut alt de la balise <img>, à la valeur du nom du fichier sur le PC de l'internaute
        $this->fileName = $this->file->getClientOriginalName();
    }

    /**
    * @ORM\PostPersist()
    * @ORM\PostUpdate()
    */
    public function upload()
    {
        // Si jamais il n'y a pas de fichier (champ facultatif)
        if (null === $this->file) {
            return;
        }

        // Si on avait un ancien fichier, on le supprime
        if (null !== $this->tempFilename) {
            $oldFile = $this->getUploadRootDir().'/'.$this->id.'.'.$this->tempFilename;
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
        }    

        // On déplace le fichier envoyé dans le répertoire de notre choix
        $this->file->move(
            $this->getUploadRootDir(), // Le répertoire de destination
            $this->id.'.'.$this->extension   // Le nom du fichier à créer, ici « id.extension »
        );

        //on converti le fichier en UTF-8
        $this->toUTF8($this->getUploadRootDir().'/'.$this->id.'.'.$this->extension);
    }

    /**
    * @ORM\PreRemove()
    */
    public function preRemoveUpload()
    {
        // On sauvegarde temporairement le nom du fichier, car il dépend de l'id
        $this->tempFilename = $this->getUploadRootDir().'/'.$this->id.'.'.$this->extension;
    }

    /**
    * @ORM\PostRemove()
    */
    public function removeUpload()
    {
        // En PostRemove, on n'a pas accès à l'id, on utilise notre nom sauvegardé
        if (file_exists($this->tempFilename)) {
            // On supprime le fichier
            unlink($this->tempFilename);
        }
    }

    public function getUploadDir()
    {
        // On retourne le chemin relatif vers l'image pour un navigateur (relatif au répertoire /web donc)
        return 'files/csv';
    }

    protected function getUploadRootDir()
    {
        // On retourne le chemin relatif vers le fichier pour notre code PHP
        return __DIR__.'/../../../../web/'.$this->getUploadDir();
    }

    public function getWebPath($truePath = false)
    {
        return '/'.$this->getUploadDir().'/'.$this->id.'.'.$this->extension;
    }


    public function getChampObservateur()
    {
        foreach ($this->champs as $champ) {
            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == '__OBSERVERS__' ) {
                return $champ;
            } 
        }

        //si aucun champ du fichier n'a été mappé avec le champs Serena Observateur on est ici et on retourn false
        return false;
    }


   /**
    * @Serializer\VirtualProperty
    * @Serializer\SerializedName("has_localisation")
    * @Serializer\Groups({"fichier"})
    */
    public function hasLocalisation()
    {
        $lat = false; $lon = false; $comm = false;
        foreach ($this->champs as $champ) {
            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == '__LATITUDE__' ) 
                $lat = true;
            
            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == '__LONGITUDE__' ) 
                $lon = true;

            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == '__LIB_AREA__' ) 
                $comm = true;

            if ( ($lat AND $lon) OR $comm) 
                return true;
        }

        //si aucun champ du fichier n'a été mappé avec le champs Serena Observateur on est ici et on retourn false
        return false;
    }

    /**
    * @Serializer\VirtualProperty
    * @Serializer\SerializedName("has_observers")
    * @Serializer\Groups({"fichier"})
    */
    public function hasObservers()
    {
        $lat = false; $lon = false; $comm = false;
        foreach ($this->champs as $champ) {
            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == '__OBSERVERS__' ) 
                return true;
        }

        //si aucun champ du fichier n'a été mappé avec le champs Serena Observateur on est ici et on retourn false
        return false;
    }

    public function hasOnlyOneObserversField()
    {
        $fields = [];
        foreach ($this->champs as $champ) {
            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == '__OBSERVERS__' ) 
                $fields[] = $champ;
        }

        //si aucun champ ou plusieur champs du fichier est mappé avec le champs Observateur on retourne false
        return count($fields) === 1;
    }

    /**
    * @Serializer\VirtualProperty
    * @Serializer\SerializedName("has_dataset")
    * @Serializer\Groups({"fichier"})
    */
    public function hasDataset()
    {
        $lat = false; $lon = false; $comm = false;
        foreach ($this->champs as $champ) {
            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == '__DATASET__' ) 
                return true;
        }

        //si aucun champ du fichier n'a été mappé avec le champs Serena Observateur on est ici et on retourn false
        return false;
    }

    /**
    * @Serializer\VirtualProperty
    * @Serializer\SerializedName("has_taxonomy")
    * @Serializer\Groups({"fichier"})
    */
    public function hasTaxonomy()
    {
        foreach ($this->champs as $champ) {
            if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == 'nom_complet' ) 
                return true;
        }

        //si aucun champ du fichier n'a été mappé avec le champs Serena Observateur on est ici et on retourn false
        return false;
    }

    private function toUTF8($url) {
        if (!file_exists($url))
            return; // Exit la fonction si le fichier n'existe pas
        $contents = file_get_contents($url);
        if (mb_detect_encoding($contents) === 'UTF-8')
            return false;
        if (!mb_check_encoding($url, 'UTF-8')) 
            return false; // Exit la fonction si c'est déjà UTF-8
        $file = fopen($url, 'w+');
        fputs($file, utf8_encode($contents));
        fclose($file);
        return true;
    }


    /**
     * @Serializer\VirtualProperty
     * @Serializer\SerializedName("nb_field_ok")
     * @Serializer\Groups({"fichier"})
     */
    public function nombreChampOk()
    {
        $i = 0;
        foreach ($this->champs as $champ) {
            if ( $champ->getCheck() ) 
                $i++;
        }

        return $i;
    }


    /**
     * @Serializer\VirtualProperty
     * @Serializer\SerializedName("file_path")
     * @Serializer\Groups({"fichier"})
     */
    public function getFilePath() {
        return "coucou";
    }

    public function getFieldByFSD($name) {
      $field = [];
      foreach ($this->champs as $champ) {
        if ( !is_null($champ->getFieldFSD()) and $champ->getFieldFSD()->getChamp() == $name ) {
          $field[] = $champ->getChamp();
        }
      }
      return $field;
    }
} 
