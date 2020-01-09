<?php
// src/Serena/ImportBundle/Entity/FichierChamp.php 

namespace API\ImportBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer; 


/**
* @ORM\Entity(repositoryClass="API\ImportBundle\Entity\Repository\FichierChampRepository")
* @ORM\Table(name="gn_imports.t_fichier_champs")
* @ORM\HasLifecycleCallbacks
*/
class FichierChamp
{

	/**
   * @var integer
   *
   * @ORM\Column(name="id", type="integer", nullable=false)
   * @ORM\Id
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="gn_imports.t_fichier_champs_id_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"champ", "fichier"})
	 */
	private $id;

	/**
	 * @ORM\Column(name="champ", type="text", nullable=true, length=255)
	 *
   * @Serializer\Groups({"champ"})
	 */
	private $champ;

	/**
	 * @ORM\Column(name="description", type="text", nullable=true)
	 *
   * @Serializer\Groups({"champ"})
	 */
	private $description;

	/**
   * @var \API\ImportBundle\Entity\Fichier
   *
   * @ORM\ManyToOne(targetEntity="API\ImportBundle\Entity\Fichier", inversedBy="champs")
   * @ORM\JoinColumn(name="fichier_id", referencedColumnName="id", nullable=true)
   *
   * @Serializer\Groups({"champ"})
	 */
	private $fichier;

	/**
   * @var \API\ImportBundle\Entity\SerenaFSD
   *
   * @ORM\ManyToOne(targetEntity="API\ImportBundle\Entity\SyntheseFSD", fetch="EAGER")
   * @ORM\JoinColumn(name="field_fsd_id", referencedColumnName="id", nullable=true)
   *
   * @Serializer\Groups({"champ"})
	 */
	private $fieldFSD;

	/**
	 * @ORM\Column(name="is_good", type="boolean", nullable=true)
	 *
   * @Serializer\Groups({"champ"})
	 */
	private $check;



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
	* Set champ
	*
	* @param text $champ
	* @return Organismes
	*/
	public function setChamp($champ)
	{
		$this->champ = $champ;

		return $this;
	}

	/**
	* Get champ
	*
	* @return text
	*/
	public function getChamp()
	{
		return $this->champ;
	}

	/**
	* Set description
	*
	* @param text $description
	* @return Organismes
	*/
	public function setDescription($description)
	{
		$this->description = $description;

		return $this;
	}

	/**
	* Get description
	*
	* @return text
	*/
	public function getDescription()
	{
		return $this->description;
	}

	/**
	* Set fichier
	*
	* @param text $fichier
	* @return Organismes
	*/
	public function setFichier($fichier)
	{
		$this->fichier = $fichier;

		return $this;
	}

	/**
	* Get fichier
	*
	* @return text
	*/
	public function getFichier()
	{
		return $this->fichier;
	}

	/**
	* Set fieldFSD
	*
	* @param text $fieldFSD
	* @return Organismes
	*/
	public function setFieldFSD($fieldFSD)
	{
		$this->fieldFSD = $fieldFSD;

		return $this;
	}

	/**
	* Get fieldFSD
	*
	* @return text
	*/
	public function getFieldFSD()
	{
		return $this->fieldFSD;
	}

	/**
	* Set check
	*
	* @param text $check
	* @return Organismes
	*/
	public function setCheck($check)
	{
		$this->check = $check;

		return $this;
	}

	/**
	* Get check
	*
	* @return text
	*/
	public function getCheck()
	{
		return $this->check;
	}


	/**
    * @ORM\PrePersist()
    * @ORM\PreUpdate()
    */
    public function checkChamps()
    {
        if ($this->fieldFSD === null) {
        	$this->fichier->removeChamp($this);
        }
    }

} 
