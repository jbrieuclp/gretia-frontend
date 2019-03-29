<?php

namespace API\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
* @ORM\Entity
* @ORM\Table(name="projet.personne")
*/
class Personne
{
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id_personne", type="integer")
	 * @ORM\GeneratedValue(strategy="SEQUENCE")
   * @ORM\SequenceGenerator(sequenceName="projet.personne_id_personne_seq", allocationSize=1, initialValue=1)
	 *
	 * @Serializer\Groups({"personne"})
	 */
	private $id;

	/**
   * @ORM\Column(name="nom", type="string", nullable=true)
   *
   * @Serializer\Groups({"personne"})
   */
  private $nom;

  /**
   * @ORM\Column(name="prenom", type="string", nullable=true)
   *
   * @Serializer\Groups({"personne"})
   */
  private $prenom;

  /**
   * @ORM\Column(name="surnom", type="string", nullable=true)
   *
   * @Serializer\Groups({"personne"})
   */
  private $surnom;

  /**
   * @ORM\Column(name="compte_id", type="string", nullable=true)
   *
   * @Serializer\Groups({"personne"})
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

  /**
   * Set surnom
   *
   * @param string $surnom
   * @return string
   */
  public function setSurnom($surnom)
  {
    $this->surnom = $surnom;

    return $this;
  }

  /**
   * Get surnom
   *
   * @return integer 
   */
  public function getSurnom()
  {
    return $this->surnom;
  }

  /**
   * Set compte
   *
   * @param string $compte
   * @return string
   */
  public function setCompte($compte)
  {
    $this->compte = $compte;

    return $this;
  }

  /**
   * Get compte
   *
   * @return integer 
   */
  public function getCompte()
  {
    return $this->compte;
  }

}