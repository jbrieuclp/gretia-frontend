<?php
// src/Serena/ImportBundle/Entity/Repository/FichierRepository.php

namespace API\ImportBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class SyntheseFSDRepository extends EntityRepository
{
    public function compareValues($fsd_sql, $values)
    {
        $sql = "WITH data (term, state) AS (VALUES";

        $i = 0;
        foreach ($values as $key => $value) {
          $string = str_replace("'", "''", $value['value']);
          $state = $value['ban'];
          $sql .= ($i++ === 0) ? '(\''.$string.'\', \''.$state.'\')' : ',(\''.$string.'\', \''.$state.'\')';
        }

        $sql .= ') ';

        $sql .= "SELECT data.term as value, data.state, ".$fsd_sql['comparator']." IS NOT NULL as ok
            FROM data
            LEFT JOIN ".$fsd_sql['from']." ON data.term::text = ".$fsd_sql['comparator']."::text";

        if ( !empty($fsd_sql['where']) ) {
          $sql .= " AND ".$fsd_sql['where'];
        }

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->execute();
        $result = $requete->fetchAll();
        $requete->closeCursor();
        return $result;
    }

    public function listValues($fsd_sql)
    {
        $sql = "SELECT ".$fsd_sql['comparator']." as value
            FROM ".$fsd_sql['from'];

        if ( !empty($fsd_sql['where']) ) {
          $sql .= " WHERE ".$fsd_sql['where'];
        }

        $sql .= " ORDER BY ".$fsd_sql['comparator'];

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->execute();
        $result = $requete->fetchAll(\PDO::FETCH_COLUMN, 0);
        $requete->closeCursor();
        return $result;
    }

    /**
    *   Import un fichier présent sur le serveur dans Postgres en commande SQL COPY
    **/
    public function search($champ, $text)
    {
        
        $tab = explode(' ' , str_replace("'", "''", str_replace(",", "", $text)));

        $firstData = array_shift($tab);

        $sql = "SELECT ".$champ['comparator']." as value
            FROM ".$champ['from']."
            WHERE unaccent(".$champ['comparator'].") ILIKE unaccent(:firstData) ";

        if ( count($tab) ) {
            foreach ($tab as $value) {
                if (strlen($value) > 2)
                    $sql .= " AND unaccent(".$champ['comparator'].") ILIKE unaccent('%".$value."%')";
            }
        }

        $sql .= " ORDER BY ".$champ['comparator']." ASC";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->bindValue(':firstData', '%'.$firstData.'%');

        $requete->execute();

        $result = $requete->fetchAll(\PDO::FETCH_COLUMN, 0);

        $requete->closeCursor();

        return $result;

    }






}