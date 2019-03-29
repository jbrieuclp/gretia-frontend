<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="projet.travail")
*/
class Travail
{
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id_personne", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.personne_id_personne_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"travail"})
	 */
	private $id;

	/**
   * @ORM\Column(name="nom", type="string", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $nom;

  /**
   * @ORM\Column(name="prenom", type="string", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $prenom;

  /**
   * @ORM\Column(name="surnom", type="string", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $surnom;

  /**
   * @ORM\Column(name="compte_id", type="string", nullable=true)
   *
   * @Serializer\Groups({"travail"})
   */
  private $compte;

  /**
   * Get id
   *
   * @return integer 
   */
  public function getId()
  {
    return $this->id;
  }

}