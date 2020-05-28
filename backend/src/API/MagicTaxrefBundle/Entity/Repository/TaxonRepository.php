<?php
// src/Serena/ImportBundle/Entity/Repository/FichierRepository.php

namespace API\MagicTaxrefBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class TaxonRepository extends EntityRepository
{
    public function findWithTaxrefVersion($cd_nom)
    {
        
        $qb = $this->_em->createQueryBuilder();
        $qb->select('t, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13')
            ->from($this->_entityName, 't')
            ->leftJoin('t.taxref2', 't2')
            ->leftJoin('t.taxref3', 't3')
            ->leftJoin('t.taxref4', 't4')
            ->leftJoin('t.taxref5', 't5')
            ->leftJoin('t.taxref6', 't6')
            ->leftJoin('t.taxref7', 't7')
            ->leftJoin('t.taxref8', 't8')
            ->leftJoin('t.taxref9', 't9')
            ->leftJoin('t.taxref10', 't10')
            ->leftJoin('t.taxref11', 't11')
            ->leftJoin('t.taxref12', 't12')
            ->leftJoin('t.taxref13', 't13')
            ->where('t.cdNom = :cd_nom')
            ->setParameter('cd_nom', $cd_nom);

        return $qb
            ->getQuery()
            ->getSingleResult();

    }

    /**
    *   Import un fichier présent sur le serveur dans Postgres en commande SQL COPY
    **/
    public function getChange($taxref, $taxon)
    {
        
        $table = 'taxref_'.$taxref;

        $sql = "SELECT cd_nom, num_version_init, num_version_final, champ, valeur_init, valeur_final, type_change
            FROM change.".$table."
            WHERE cd_nom = :cd_nom OR (champ = 'CD_REF' AND valeur_init = :valeur_init)";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->bindValue(':cd_nom', $taxon);
        $requete->bindValue(':valeur_init', $taxon);

        $requete->execute();

        $result = $requete->fetchAll();

        $requete->closeCursor();

        return $result;

    }
}