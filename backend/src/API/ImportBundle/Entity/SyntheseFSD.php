<?php
// src/API/ImportBundle/Entity/SerenaFSD.php 

namespace API\ImportBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 
use JMS\Serializer\Annotation as Serializer; 


/**
* @ORM\Entity(repositoryClass="API\ImportBundle\Entity\Repository\SyntheseFSDRepository")
* @ORM\Table(name="gn_imports.t_synthese_fsd")
*/
class SyntheseFSD
{

	/**
   * @var integer
   *
   * @ORM\Column(name="id", type="integer", nullable=false)
   * @ORM\Id
   * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="gn_imports.t_synthese_fsd_id_seq", allocationSize=1, initialValue=1)
   *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $id;

	/**
	 * @ORM\Column(name="champ", type="text", nullable=true, length=255)
	 *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $champ;

	/**
	 * @ORM\Column(name="description", type="text", nullable=true)
	 *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $description;

	/**
	 * @ORM\Column(name="regexp", type="text", nullable=true)
	 *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $regexp;

	/**
	 * @ORM\Column(name="sql", type="json_array", nullable=true)
	 *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $sql;

	/**
	 * @ORM\Column(name="type_element", type="text", nullable=true)
	 *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $type;

	/**
	 * @ORM\Column(name="doublon", type="boolean", nullable=true)
	 *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $doublon;

	/**
	 * @ORM\Column(name="obligatoire", type="boolean", nullable=true)
	 *
   * @Serializer\Groups({"fsd", "champ"})
	 */
	private $obligatoire;


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
	* Set regexp
	*
	* @param text $regexp
	* @return Organismes
	*/
	public function setRegexp($regexp)
	{
		$this->regexp = $regexp;

		return $this;
	}

	/**
	* Get regexp
	*
	* @return text
	*/
	public function getRegexp()
	{
		return $this->regexp;
	}
	
	/**
	* Set sql
	*
	* @param text $sql
	* @return Organismes
	*/
	public function setSql($sql)
	{
		$this->sql = $sql;

		return $this;
	}

	/**
	* Get sql
	*
	* @return text
	*/
	public function getSql()
	{
		return $this->sql;
	}

	/**
	* Set type
	*
	* @param text $type
	* @return Organismes
	*/
	public function setType($type)
	{
		$this->type = $type;

		return $this;
	}

	/**
	* Get type
	*
	* @return text
	*/
	public function getType()
	{
		return $this->type;
	}

	/**
	* Set doublon
	*
	* @param text $doublon
	* @return Organismes
	*/
	public function setDoublon($doublon)
	{
		$this->doublon = $doublon;

		return $this;
	}

	/**
	* Get doublon
	*
	* @return text
	*/
	public function getDoublon()
	{
		return $this->doublon;
	}

	/**
	* Set obligatoire
	*
	* @param text $obligatoire
	* @return Organismes
	*/
	public function setObligatoire($obligatoire)
	{
		$this->obligatoire = $obligatoire;

		return $this;
	}

	/**
	* Get obligatoire
	*
	* @return text
	*/
	public function getObligatoire()
	{
		return $this->obligatoire;
	}


	/**
	* Get longueur
	*
	* @return text
	*/
	public function getLibelle()
	{
		return $this->description.' ('.$this->champ.')';
	}
} 
