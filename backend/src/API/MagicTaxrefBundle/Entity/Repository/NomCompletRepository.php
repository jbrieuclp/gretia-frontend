<?php
// src/Serena/ImportBundle/Entity/Repository/FichierRepository.php

namespace API\MagicTaxrefBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class NomCompletRepository extends EntityRepository
{
    /**
    *   Import un fichier présent sur le serveur dans Postgres en commande SQL COPY
    **/
    public function getListByPattern($pattern)
    {
        
        $tab = explode(' ' , str_replace("'", "''", $pattern));

        $firstData = array_shift($tab);

        $sql = "SELECT cd_nom, nom_complet
            FROM taxref.nom_complet
            WHERE nom_complet ILIKE :firstData ";

        if ( count($tab) ) {
            foreach ($tab as $value) {
                if (strlen($value) > 2)
                    $sql .= " AND nom_complet ILIKE '%".$value."%'";
            }
        }

        $sql .= " ORDER BY nom_complet ASC";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->bindValue(':firstData', '%'.$firstData.'%');

        $requete->execute();

        $result = $requete->fetchAll();

        $requete->closeCursor();

        return $result;

    }


    /**
    *   Import un fichier présent sur le serveur dans Postgres en commande SQL COPY
    **/
    public function getListByPattern_mod($pattern)
    {
        
        $tab = explode(' ' , str_replace("'", "''", $pattern));

        $firstData = array_shift($tab);

        $sql = "SELECT cd_nom, nom_complet
            FROM taxref.nom_complet
            WHERE nom_complet ILIKE :firstData ";

        if ( count($tab) ) {
            foreach ($tab as $value) {
                if (strlen($value) > 2)
                    $sql .= " AND nom_complet ILIKE '%".$value."%'";
            }
        }

        $sql .= " ORDER BY nom_complet ASC";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->bindValue(':firstData', '%'.$firstData.'%');

        $requete->execute();

        $result = $requete->fetchAll();

        $requete->closeCursor();

        return $result;

    }

    
}