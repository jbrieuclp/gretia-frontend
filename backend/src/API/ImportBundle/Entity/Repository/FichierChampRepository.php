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
            WITH observer (observer) as (
                SELECT DISTINCT trim(unnest(string_to_array({$champ}, '|')))
                FROM {$table}
            )

            SELECT 
                observer, 
                presence.id_role IS NOT NULL as ok, 
                jsonb_agg(DISTINCT jsonb_build_object('id', presence.id_role, 'nom', presence.nom_role, 'prenom', presence.prenom_role)) as observers_bd,
                COALESCE(jsonb_agg(DISTINCT CONCAT_WS(' ', NULLIF(leven.nom_role, ''), NULLIF(leven.prenom_role, ''))) FILTER ( WHERE CONCAT_WS(' ', NULLIF(leven.nom_role, ''), NULLIF(leven.prenom_role, '')) <> ''), '[]'::jsonb) ||
                COALESCE(jsonb_agg(DISTINCT CONCAT_WS(' ', NULLIF(nom.nom_role, ''), NULLIF(nom.prenom_role, ''))) FILTER ( WHERE CONCAT_WS(' ', NULLIF(nom.nom_role, ''), NULLIF(nom.prenom_role, '')) <> ''), '[]'::jsonb) as propositions
            FROM observer
            LEFT JOIN utilisateurs.t_roles presence ON CONCAT_WS(' ', NULLIF(presence.nom_role, ''), NULLIF(presence.prenom_role, '')) = observer AND presence.active
            LEFT JOIN utilisateurs.t_roles leven ON levenshtein(lower(unaccent(observer)), lower(unaccent(CONCAT_WS(' ', NULLIF(leven.nom_role, ''), NULLIF(leven.prenom_role, ''))))) < 3 AND leven.active
            LEFT JOIN utilisateurs.t_roles nom ON lower(unaccent(substring(observer from '^(.+?)\s'))) = lower(unaccent(nom.nom_role)) AND nom.active
            GROUP BY observer, presence.id_role
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