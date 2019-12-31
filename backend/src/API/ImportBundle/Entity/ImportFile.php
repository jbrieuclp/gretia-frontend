<?php
// src/API/ImportBundle/Entity/Fichier.php 

namespace API\ImportBundle\Entity; 

use Doctrine\ORM\Mapping as ORM; 
use Doctrine\Common\Collections\ArrayCollection; 


/**
* (repositoryClass="API\ImportBundle\Entity\Repository\OrganismeRepository")
* @ORM\Entity 
* @ORM\Table(name="gn_imports.fichier")
*/
class ImportFile
{

	/**
     * @ORM\Id
     * @ORM\Column(name="nom_table", type="text")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
	private $table;


	/**
	* Get id
	*
	* @return integer
	*/
	public function getTable()
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

} 
