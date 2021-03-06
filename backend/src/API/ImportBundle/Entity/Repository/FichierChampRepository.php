<?php
// src/API/ImportBundle/Entity/Repository/FichierRepository.php

namespace API\ImportBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class FichierChampRepository extends EntityRepository
{
    /**
    *   Retourne la liste distinct des valeur du champ
    **/
    public function getFieldValues($field)
    {
        
        $sql = "SELECT ".$field->getChamp()." AS value, true as ok, string_agg(DISTINCT adm_import_exclude::text, '-') AS ban FROM ".$field->getFichier()->getTable()." GROUP BY ".$field->getChamp()." ORDER BY ".$field->getChamp();

        $requete = $this->_em->getConnection()->prepare($sql);
        
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        
        return $data;

    }

    /**
    *   Retourne la liste distinct des valeur du champ
    **/
    public function getFieldsValues($fields, $latlon)
    {
        $select = [];
        foreach ($fields as $field) {
            $select[] = $field->getChamp();
        }

        $sql = "SELECT ".implode(', ', $select);
        $sql .= " FROM ".$field->getFichier()->getTable();
        $sql .= " WHERE adm_geom IS NULL";
        if (!is_null($latlon)) {
            $sql .= " AND ".$latlon['lat']." IS NULL";
            $sql .= " AND ".$latlon['lon']." IS NULL";
        }   
        $sql .= " GROUP BY ".implode(', ', $select);
        $sql .= " ORDER BY ".implode(', ', $select);

        $requete = $this->_em->getConnection()->prepare($sql);
        
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        
        return $data;

    }

    /**
    *   Mise à jour d'une valeur d'un champ dans un tableau importé
    **/
    public function updateValue($champ, $oldValue, $newValue)
    {
        
        $sql = "UPDATE ".$champ->getFichier()->getTable()." SET ".$champ->getChamp()." = :newValue WHERE COALESCE(".$champ->getChamp().", '') = COALESCE(:oldValue, '')";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->bindValue(':oldValue', $oldValue);
        $requete->bindValue(':newValue', $newValue);
        
        $requete->execute();
        
        return true;

    }

    /**
    *   Mise à jour d'une valeur d'un champ dans un tableau importé
    **/
    public function updateValues($champ, $data)
    {
        $sql = "WITH data (old, new) as (VALUES";

        $i = 0;
        foreach ($data as $key => $value) {
            if (array_key_exists('old', $value) and array_key_exists('new', $value)) {
                if ($i) 
                    $sql .= ",";
                $sql .= "('".str_replace("'", "''", $value['old'])."', '".str_replace("'", "''", $value['new'])."')";
                $i++;
            }
        }

        $sql .= ") ";
        try {
            $sql .= "UPDATE ".$champ->getFichier()->getTable()." SET ".$champ->getChamp()." = data.new FROM data WHERE ".$champ->getChamp()." = data.old";
            $requete = $this->_em->getConnection()->prepare($sql);
            $requete->execute();
        } catch (Exception $e) {
            return false;
        }
        
        return true;

    }

    /**
    *   Remplace toutes les occurrences d'un champs par une autre chaine
    **/
    public function replaceElement($champ, $search, $replace)
    {
        
        $sql = "UPDATE ".$champ->getFichier()->getTable()." SET ".$champ->getChamp()." = replace(".$champ->getChamp().", :search, :replace)";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->bindValue(':search', $search);
        $requete->bindValue(':replace', is_null($replace) ? '' : $replace);
        
        $requete->execute();
        
        return true;

    }

    /**
    *   Remplace toutes les occurrences d'un champs par une autre chaine
    **/
    public function regexpReplaceElement($champ, $search, $replace)
    {
        
        $sql = "UPDATE ".$champ->getFichier()->getTable()." SET ".$champ->getChamp()." = regexp_replace(".$champ->getChamp().", :search, :replace, 'g')";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->bindValue(':search', $search);
        $requete->bindValue(':replace', is_null($replace) ? '' : $replace);
        
        $requete->execute();
        
        return true;

    }

    /**
    *   Remplace toutes les occurrences d'un champs par une autre chaine
    **/
    public function replaceEmptyByField($field_to_replace, $replacement_field)
    {
        
        $sql = "UPDATE ".$field_to_replace->getFichier()->getTable()." SET ".$field_to_replace->getChamp()." = ".$replacement_field->getChamp()." WHERE NULLIF(".$field_to_replace->getChamp().", '') IS NULL";

        $requete = $this->_em->getConnection()->prepare($sql);
        
        $requete->execute();
        
        return true;
    }

    /**
    *   retourne le champ d'un fichier depuis son association FSD
    **/
    public function getFieldFromFSD($fichier, $champFSD)
    {
        
        $qb = $this->_em->createQueryBuilder();
        $qb->select('c')
            ->from($this->_entityName, 'c')
            ->innerJoin('c.fichier', 'f')
            ->innerJoin('c.fieldFSD', 'fsd')
            ->where('fsd.champ = :champFSD')
            ->andWhere('f.id = :fichier')
            ->setParameter('champFSD', $champFSD)
            ->setParameter('fichier', $fichier);

        return $qb
            ->getQuery()
            ->getResult();

    }

    /**
    *   Retourne la liste distinct des valeur du champ
    **/
    public function getListObservers($field)
    {
        $champ = $field->getChamp();
        $table = $field->getFichier()->getTable();

        $sql = "
            WITH observer (observer, init_value) as (
                SELECT trim(unnest(string_to_array({$champ}, '|'))), jsonb_agg(DISTINCT {$champ}) as init_value
                FROM {$table}
                GROUP BY 1
            )

            SELECT 
                observer,
                init_value, 
                presence.id_role IS NOT NULL as ok, 
                jsonb_agg(DISTINCT jsonb_build_object('id', presence.id_role, 'nom', presence.nom_role, 'prenom', presence.prenom_role)) as observers_bd,
                COALESCE(jsonb_agg(DISTINCT CONCAT_WS(' ', NULLIF(leven.nom_role, ''), NULLIF(leven.prenom_role, ''))) FILTER ( WHERE CONCAT_WS(' ', NULLIF(leven.nom_role, ''), NULLIF(leven.prenom_role, '')) <> ''), '[]'::jsonb) ||
                COALESCE(jsonb_agg(DISTINCT CONCAT_WS(' ', NULLIF(nom.nom_role, ''), NULLIF(nom.prenom_role, ''))) FILTER ( WHERE CONCAT_WS(' ', NULLIF(nom.nom_role, ''), NULLIF(nom.prenom_role, '')) <> ''), '[]'::jsonb) as propositions
            FROM observer
            LEFT JOIN utilisateurs.t_roles presence ON CONCAT_WS(' ', NULLIF(presence.nom_role, ''), NULLIF(presence.prenom_role, '')) = observer AND presence.active
            LEFT JOIN utilisateurs.t_roles leven ON levenshtein(lower(unaccent(observer)), lower(unaccent(CONCAT_WS(' ', NULLIF(leven.nom_role, ''), NULLIF(leven.prenom_role, ''))))) < 3 AND leven.active
            LEFT JOIN utilisateurs.t_roles nom ON lower(unaccent(substring(observer from '^(.+?)\s'))) = lower(unaccent(nom.nom_role)) AND nom.active
            GROUP BY observer, init_value, presence.id_role
            ORDER BY observer
        ";


        /*$sql = "SELECT ".$field->getChamp()." AS value, true as ok, string_agg(DISTINCT adm_import_exclude::text, '-') AS ban FROM ".$field->getFichier()->getTable()." GROUP BY ".$field->getChamp()." ORDER BY ".$field->getChamp();*/

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        
        return $data;

    }





    /**
    *   Donne les champs qui contiennent les informations de rattachement taxref
    **/
    public function getTaxonomicField() 
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('f, c, fsd')
            ->from($this->_entityName, 'c')
            ->innerJoin('c.fichier', 'f')
            ->innerJoin('c.fieldFSD', 'fsd')
            ->where('fsd.champ = :champ')
            ->andWhere('NULLIF(f.clos, false) IS NULL')
            ->andWhere('NULLIF(c.check, false) IS NULL')
            ->setParameter('champ', 'OBSE_TAXO_ID');

        return $qb
            ->getQuery()
            ->getResult();
    }

    /**
    *   Recupere les données des champs mappé à taxref de l'ensemble des tables en cours de travail
    **/
    public function getTaxonomicStatusField(){
        $fields = $this->getTaxonomicField();

        $sqls = [];
        foreach ($fields as $field) {
            $refSerena = json_decode($field->getFieldFSD()->getRegexp());
            $sqls[] = "SELECT '".$field->getFichier()->getTable()."' AS table, '".$field->getChamp()."' AS champ, CASE WHEN \"".$refSerena->colonne."\" IS NULL THEN 'pas_taxref' ELSE 'taxref' END AS status, count(DISTINCT ".$field->getChamp().") FROM ".$field->getFichier()->getTable()." LEFT JOIN \"".$refSerena->table."\" ON \"".$refSerena->colonne."\" = \"".$field->getChamp()."\" GROUP BY 1, 2, 3";
        }

        $requete = $this->_em->getConnection()->prepare(implode(" UNION ALL ", $sqls));
        
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        
        return $data;
    }

    public function getTaxonomicProblemValuesField(){
        $fields = $this->getTaxonomicField();

        $sqls = [];
        foreach ($fields as $field) {
            $refSerena = json_decode($field->getFieldFSD()->getRegexp());
            $sqls[] = "SELECT DISTINCT '".$field->getFichier()->getTable()."' AS table, '".$field->getId()."' AS id, '".$field->getChamp()."' AS champ, ".$field->getChamp()." AS value FROM ".$field->getFichier()->getTable()." 
                LEFT JOIN \"".$refSerena->table."\" ON \"".$refSerena->colonne."\" = \"".$field->getChamp()."\" 
                WHERE \"".$refSerena->colonne."\" IS NULL AND ".$field->getFichier()->getTable().".import_exclude = false";
        }

        $requete = $this->_em->getConnection()->prepare(implode(" UNION ALL ", $sqls));
        
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        
        return $data;
    }

}