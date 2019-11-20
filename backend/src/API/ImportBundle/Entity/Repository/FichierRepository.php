<?php
// src/API/ImportBundle/Entity/Repository/FichierRepository.php

namespace API\ImportBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class FichierRepository extends EntityRepository
{
    /**
     *   Import un fichier présent sur le serveur dans Postgres en commande SQL COPY
     **/
    public function getFields($id)
    {
        $qb = $this->_em->getConnection()->createQueryBuilder();
        $qb->select("info.column_name")
           ->from('information_schema.columns', 'info')
           ->innerJoin('info', 'gn_imports.t_fichiers', 'f', 'concat_ws(\'.\', info.table_schema, info.table_name) = f.table_nom')
           ->where('f.id = :id')
           ->andWhere('NOT info.column_name like \'init_data_%\'')
           ->andWhere('info.column_name NOT like \'adm_%\'')
           ->setParameter('id', $id);

        return $qb->execute()->fetchAll(\PDO::FETCH_COLUMN, 0);

    }


    /**
    *   Import un fichier présent sur le serveur dans Postgres en commande SQL COPY
    **/
    public function importToPostgres($fichier)
    {
        $file = __DIR__.'/../../../../../web/'.$fichier->getUploadDir().'/'.$fichier->getId().'.'.$fichier->getExtension();

        //on ouvre le fichier pour recuperer les entete de colonne
        if (($handle = fopen($file, "r")) !== FALSE) {
            $content = stream_get_contents($handle);
            //test de l'encodage si = UTF-8
            if ( mb_detect_encoding($content, 'UTF-8, ISO-8859-1') === 'ISO-8859-1' ) {
                return array('error' => true, 'message' => 'Le fichier n\'est pas encodé en UTF-8.');
            }
            rewind ($handle); //retour au debut du fichier

            $entete = fgetcsv($handle, 0, ";");
        //    $entete = array_map("utf8_encode", $entete);
            fclose($handle);
        }

        $colonne_a_modifier = array();
        $colonne_d_archive = array();

        $colonnes = []; //liste les colonne du doc
        foreach ($entete as $key => $value) {
            $colonne = $this->wd_remove_accents($value);
            //si une colonne existe deja on lève une erreur
            if ( in_array($colonne, $colonnes) ) {
                return array('error' => true, 'message' => 'La colonne "'.$value.'" modifiée en "'.$colonne.'" existe déjà');
            }
            if ( $colonne == '' ) {
                return array('error' => true, 'message' => 'La rectification de la colonne "'.$value.'" retourne une chaîne vide.');
            }
            $colonne_a_modifier[] = '"'.$colonne.'" character varying';
            $colonne_d_archive[] = '"init_data_'.$colonne.'" character varying';

            $colonnes[] = $colonne;
        }

        try{
            //creation de la table
            $sql = "CREATE TABLE ".$fichier->getTable()." (adm_id_import serial PRIMARY KEY, adm_uuid_auto uuid DEFAULT uuid_generate_v4(), adm_doublon_fichier boolean DEFAULT FALSE, adm_doublon_serena boolean DEFAULT FALSE, adm_doublon_serena_id character varying DEFAULT '[]', adm_import_exclude boolean DEFAULT FALSE, adm_geom geometry(Geometry,2154), adm_observers jsonb, adm_counting jsonb, ".implode(', ',$colonne_a_modifier).", ".implode(', ',$colonne_d_archive).")";
            $this->_em->getConnection()->query($sql);
        }
        catch(\Exception $e){
            return array('error' => true, 'message' => 'Une table existe dejà sous le nom d\'import "'.$fichier->getTable().'"');
        }

        //enregistrement de la table
        try{
            $sql = "COPY ".$fichier->getTable()." (".str_replace(' character varying', '', implode(', ',$colonne_a_modifier)).") FROM '".$file."' WITH csv HEADER DELIMITER ';' ESCAPE '\"' ";
            $this->_em->getConnection()->query($sql);
        } 
        catch(\Exception $e){
            return array('error' => true, 'message' => 'Erreur lors de la lecture du fichier, il ne doit pas être correctement structuré. ('.$e->getMessage().')');
        }

        //duplication des valeurs dans les colonne d'archivage
        $sqlSET = array();
        foreach ($colonne_d_archive as $key => $value) {
            $col = str_replace(' character varying', '', $value);
            $sqlSET[] = $col." = ".str_replace('init_data_', '', $col); //"init_data_col" = "col"
        }
        $sql = "UPDATE  ".$fichier->getTable()." SET ".implode(', ',$sqlSET);
        $this->_em->getConnection()->query($sql);
        return array('error' => false);
    }






    /**
    *   Retourne les champs du fichier non encore mappés
    **/
    public function _getFields($fichier, $all = false)
    {
        $sql = "SELECT column_name AS column FROM information_schema.columns WHERE table_schema = :schema AND table_name = :table";

        if (!$all) //si all est vrai alors on demande d'afficher tous les champs, par defaut la suite est ajoutée
            $sql .= " AND NOT column_name like 'init_data_%' AND column_name NOT IN ('id_import', 'doublon_fichier' ,'doublon_serena', 'doublon_serena_id', 'import_exclude')";

        $sql .= " ORDER BY column_name";

        list($schema, $table) = explode('.', $fichier->getTable());

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->bindValue(':schema', $schema);
        $requete->bindValue(':table', $table);
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_COLUMN);
        
        $requete->closeCursor();
        
        return $data;

    }

    /**
    *   Retourne les champs du fichier non encore mappés
    **/
    //public function getDatas($fichier, $champ, $valeur)
    public function getDatas($fichier, $conditions)
    {

        $qb = $this->_em->getConnection()->createQueryBuilder();

        $qb->select('id_import, "'.implode('","', $this->getFields($fichier)).'"')
           ->from($fichier->getTable(), 'f')
           ->orderBy('id_import');

        foreach ($conditions as $champ => $valeur) {
            $qb->andWhere('COALESCE("'.$champ.'", \'\') = :'.$champ)
               ->setParameter($champ, $valeur);
        }

        return $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);

  /*      $sql = "SELECT id_import, \"".implode('","', $this->getFields($fichier))."\"
                FROM ".$fichier->getTable()." 
                WHERE \"".$champ."\" = :valeur
                ORDER BY id_import";

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->bindValue(':valeur', $valeur);
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        */
     //   return $data;

    }

    /**
    *   Retourne les champs du fichier non encore mappés
    **/
    public function getDatasByLoc($fichier, $params, $lat, $lon, $ld)
    {

        $col_latitude = $this->getColumnBySpecificField($fichier, $params['latitude']); 
        $col_longitude = $this->getColumnBySpecificField($fichier, $params['longitude']); 
        $col_commune_ld = $this->getColumnBySpecificField($fichier, $params['commune_lieu_dit']); 

        $qb = $this->_em->getConnection()->createQueryBuilder();

        $qb->select("id_import, \"".implode('","', $this->getFields($fichier))."\"")
            ->from($fichier->getTable(), 'f')
            ->where('COALESCE("'.$col_latitude.'", \'\') = :latitude')
            ->andWhere('COALESCE("'.$col_longitude.'", \'\') = :longitude')
            ->andWhere('COALESCE("'.$col_commune_ld.'", \'\') = :lieu_dit')
            ->setParameter('latitude', $lat)
            ->setParameter('longitude', $lon)
            ->setParameter('lieu_dit', $ld);

        return $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
    *   Retourne les champs du fichier non encore mappés
    **/
    public function getForExport($fichier)
    {

        $sql = "SELECT id_import, \"".implode('","', $this->getFields($fichier))."\"
                FROM ".$fichier->getTable()." 
                ORDER BY id_import";

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        
        return $data;

    }


    /**
    *   Retourne les champs du fichier mappé et corrigé pour créer le fichier d'import Serena
    **/
    public function getForSerenaExport($fichier)
    {
        $qb1 = $this->_em->getConnection()->createQueryBuilder();

        $qb1->addSelect('\'SERENA_SHEET_IMPORT\' AS "OBSE_ID", NULL AS "OBSE_NOM"');
        foreach ($fichier->getChamps() as $champ) {
            if ( !is_null($champ->getFieldFSD()) ) {
                $qb1->addSelect('NULL AS "'.$champ->getFieldFSD()->getChamp().'"');
            }
        }
        

        $qb2 = $this->_em->getConnection()->createQueryBuilder();

        $qb2->addSelect('\'OBSE\' AS "OBSE_ID", NULL AS "OBSE_NOM"');
        foreach ($fichier->getChamps() as $champ) {
            if ( !is_null($champ->getFieldFSD()) ) {
                $qb2->addSelect('NULL AS "'.$champ->getFieldFSD()->getChamp().'"');
            }
        }

        $qb3 = $this->_em->getConnection()->createQueryBuilder();

        $qb3->addSelect('\'Essai d\'\'importation par tableau\' AS "OBSE_ID", NULL AS "OBSE_NOM"');
        foreach ($fichier->getChamps() as $champ) {
            if ( !is_null($champ->getFieldFSD()) ) {
                $qb3->addSelect('NULL AS "'.$champ->getFieldFSD()->getChamp().'"');
            }
        }

        $qb4 = $this->_em->getConnection()->createQueryBuilder();

        $qb4->addSelect('\'OBSE_ID\' AS "OBSE_ID", \'OBSE_NOM\' AS "OBSE_NOM"');
        foreach ($fichier->getChamps() as $champ) {
            if ( !is_null($champ->getFieldFSD()) ) {
                $qb4->addSelect('\''.str_replace("'", "''", $champ->getFieldFSD()->getChamp()).'\' AS "'.$champ->getFieldFSD()->getChamp().'"');
            }
        }

        $qb4_b = $this->_em->getConnection()->createQueryBuilder();

        $qb4_b->addSelect('\'OBSE_ID\' AS "OBSE_ID", \'OBSE_NOM\' AS "OBSE_NOM"');
        foreach ($fichier->getChamps() as $champ) {
            if ( !is_null($champ->getFieldFSD()) ) {
                $qb4_b->addSelect('\''.str_replace("'", "''", $champ->getFieldFSD()->getChamp()).'\' AS "'.$champ->getFieldFSD()->getChamp().'"');
            }
        }

        $qb5 = $this->_em->getConnection()->createQueryBuilder();

        $qb5->addSelect('NULL AS "OBSE_ID", NULL AS "OBSE_NOM"');
        foreach ($fichier->getChamps() as $champ) {
            if ( !is_null($champ->getFieldFSD()) ) {
                $qb5->addSelect('"'.$champ->getChamp().'" AS "'.$champ->getFieldFSD()->getChamp().'"');
            }
        }

        $qb5->from($fichier->getTable(), 'f')
            ->where('NOT "doublon_fichier"')
            ->andWhere('NOT "doublon_serena"')
            ->andWhere('NOT "import_exclude"');


        $qb = $qb1->getSQl().' UNION ALL '.$qb2->getSQl().' UNION ALL '.$qb3->getSQl().' UNION ALL '.$qb4->getSQl().' UNION ALL '.$qb4_b->getSQl().' UNION ALL '.$qb5->getSQl();

        return $qb;
        //return $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }


    /**
    *   Retourne les champs du fichier mappé et corrigé pour créer le fichier d'import Serena
    **/
    public function getDoublonDatas($fichier)
    {
        $qb = $this->_em->getConnection()->createQueryBuilder();

        $qb->addSelect('id_import AS "id_import"');
        $qb->addSelect('doublon_serena_id AS "doublon_serena_id"');
        foreach ($fichier->getChamps() as $champ) {
            if ( !is_null($champ->getFieldFSD()) ) {
                $qb->addSelect('"'.$champ->getChamp().'" AS "'.$champ->getFieldFSD()->getChamp().'"');
            }
        }

        $qb->from($fichier->getTable(), 'f')
            ->where('NOT COALESCE("doublon_fichier", false)')
            ->andWhere('NULLIF("doublon_serena_id", \'\') IS NOT NULL')
            ->andWhere('NULLIF("doublon_serena_id", \'[]\') IS NOT NULL')
            ->andWhere('NOT COALESCE("doublon_serena", false) OR "doublon_serena_id" like \'%,%\'')
            ->andWhere('NOT COALESCE("import_exclude", false)')
            ->orderBy('id_import', 'ASC')
            ->setMaxResults(300);

        return $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }


    private function wd_remove_accents($str, $charset='utf-8')
    {
        $str = mb_strtolower($str, 'UTF-8');
        $str = strip_tags($str);//on enlève les balises HTML

        $str = htmlentities($str, ENT_NOQUOTES, $charset);
        
        $str = preg_replace('#&([A-Za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml|lt|gt);#', '\1', $str);
        $str = preg_replace('#&([A-Za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
        $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères
        $str = preg_replace('#^([0-9])#', 'n\1', $str); // si le premier char est un chiffre le prefixe

        $str = html_entity_decode($str);

        $str = preg_replace("/([^a-zA-Z0-9])/", "_", $str);
        $str = preg_replace("/([_]{2,})/", "_", $str);
        $str = preg_replace("/(^[_]+|[_]+$)/", "", $str);

        return $str;
    }


    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function updateData($table, $champ, $id, $valeur)
    {
        $sql = 'UPDATE '.$table.' SET "'.$champ.'" = :valeur WHERE id_import = :id';

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->bindValue(':valeur', $valeur);
        $requete->bindValue(':id', $id);
        $requete->execute();

        return $requete->execute();

    }

    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function updateObservateur($table, $champ, $oldValue, $newValue)
    {
        $sql = 'UPDATE '.$table.' SET "'.$champ->getChamp().'" = replace("'.$champ->getChamp().'", :oldValue, :newValue) WHERE "'.$champ->getChamp().'" ilike \'%'.str_replace("'", "''", $oldValue).'%\'';

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->bindValue(':oldValue', $oldValue);
        $requete->bindValue(':newValue', $newValue);
        $requete->execute();

        return $requete->execute();

    }

    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function addField($table, $champ)
    {
        $sql = 'ALTER TABLE '.$table->getTable().' ADD COLUMN "'.$champ.'" character varying';
        return $this->_em->getConnection()->query($sql);
    }

    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function getLocalisation($fichier, $params)
    {
        $col_latitude = $this->getColumnBySpecificField($fichier, $params['latitude']); 
        $col_longitude = $this->getColumnBySpecificField($fichier, $params['longitude']); 
        $col_commune_ld = $this->getColumnBySpecificField($fichier, $params['commune_lieu_dit']); 


        $sql = "WITH 
                data as (
                    SELECT \"".$col_commune_ld."\" as localisation, ST_Transform(ST_setsrid(st_makepoint(NULLIF(\"".$col_longitude."\", '')::double precision, NULLIF(\"".$col_latitude."\", '')::double precision), 4326), 2154) as the_geom, \"".$col_longitude."\" as longitude, \"".$col_latitude."\" as latitude
                    FROM ".$fichier->getTable()."
                    GROUP BY \"".$col_commune_ld."\", \"".$col_latitude."\", \"".$col_longitude."\"
                )


                SELECT localisation, s.nom as ld_rattache, round(ST_Distance(data.the_geom, s.the_geom)) as dist_ld_rattache, s2.nom as ld_croise, longitude, latitude
                FROM data
                LEFT JOIN site_geom s ON data.localisation = s.nom
                LEFT JOIN site_geom s2 ON ST_Intersects(data.the_geom, s2.voronoi)
                ORDER BY localisation";
        
        $requete = $this->_em->getConnection()->query($sql);
        $requete->execute();

        $data = $requete->fetchAll(\PDO::FETCH_ASSOC);
        
        $requete->closeCursor();
        
        return $data;
    }

    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function getLocalisationForVerification($fichier, $params)
    {
        $col_latitude = $this->getColumnBySpecificField($fichier, $params['latitude']); 
        $col_longitude = $this->getColumnBySpecificField($fichier, $params['longitude']); 
        $col_commune = $this->getColumnBySpecificField($fichier, $params['commune']); 

        $sql = 'SELECT DISTINCT "'.$col_latitude.'" latitude, "'.$col_longitude.'" longitude, ST_AsGeoJSON(ST_Transform(ST_SetSRID((ST_MakePoint("'.$col_longitude.'"::integer, "'.$col_latitude.'"::integer)),4326), 3857)) geojson, "'.$col_commune.'" commune FROM '.$fichier->getTable();

        return $this->_em->getConnection()->query($sql);
    }

    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function getColumnBySpecificField($fichier, $field)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('c.champ')
            ->from($this->_entityName, 'f')
            ->innerJoin('f.champs', 'c')
            ->innerJoin('c.fieldFSD', 'fsd')
            ->where('f = :fichier')
            ->andWhere('fsd.champ = :champ')
            ->orderBy('c.champ')
            ->setParameter('fichier', $fichier)
            ->setParameter('champ', $field);

        return $qb
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function updateLocalisation($fichier, $params, $update)
    {
        $col_latitude = $this->getColumnBySpecificField($fichier, $params['latitude']); 
        $col_longitude = $this->getColumnBySpecificField($fichier, $params['longitude']); 
        $col_ld = $this->getColumnBySpecificField($fichier, $params['commune_lieu_dit']); 

        $sql = 'UPDATE '.$fichier->getTable().' SET "'.$col_latitude.'" = :new_lat, "'.$col_longitude.'" = :new_lon, "'.$col_ld.'" = :new_ld WHERE COALESCE("'.$col_latitude.'", \'\') = :old_lat AND COALESCE("'.$col_longitude.'", \'\') = :old_lon AND COALESCE("'.$col_ld.'", \'\') = :old_ld';

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->bindValue(':old_lat', $update['old_lat']);
        $requete->bindValue(':old_lon', $update['old_lon']);
        $requete->bindValue(':old_ld', $update['old_ld']);
        $requete->bindValue(':new_lat', $update['new_lat']);
        $requete->bindValue(':new_lon', $update['new_lon']);
        $requete->bindValue(':new_ld', $update['new_ld']);

        return $requete->execute();

    }


    /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function testLesDoublons($fichier, $fields)
    {
        $subQueryBuilder = $this->_em->getConnection()->createQueryBuilder(); //sous requete qui pointe vers la BD
        
        $exists = $this->_em->getConnection()->createQueryBuilder();

        $subQueryBuilder->select('null')
                        ->from('public.v_serena_data', 'd')
                        ->andWhere('NOT "doublon_serena"')
                        ->andWhere('"doublon_serena_id" IS NOT NULL');

        $exists->from($fichier->getTable(), 'f');

        foreach ($fichier->getChamps() as $champ) {
            if ( array_key_exists($champ->getId(), $fields) and $fields[$champ->getId()] === true) {
                $subQueryBuilder->andWhere('f."'.$champ->getChamp().'" = d."'.$champ->getFieldFSD()->getChamp().'"');
                $exists->addSelect('"'.$champ->getChamp().'"');
            }
        }

        $exists->where('EXISTS('.$subQueryBuilder->getSQL().')');

        $retour = array('doublon' => $exists->execute()->fetchAll(\PDO::FETCH_ASSOC));

        return $retour;
    }

        /**
    *   Charge fichier, champs et champs du FSD liés
    **/
    public function marqueLesDoublons($fichier, $fields)
    {
        $reinit_qb = $this->_em->getConnection()->createQueryBuilder();

        $reinit_qb->update($fichier->getTable(), 'f')
                ->set('doublon_serena', ':doublon')
                ->set('doublon_serena_id', ':ids')
                ->setParameter('doublon', 'false')
                ->setParameter('ids', '[]')
                ->execute();
        
        $select = ['f.id_import AS id_import', 'json_agg(DISTINCT d.id) as id_serena']; $on = []; $groupby = ['f.id_import'];

        foreach ($fichier->getChamps() as $champ) {
            if ( array_key_exists($champ->getId(), $fields) and $fields[$champ->getId()] === true) {
                $select[] = 'f."'.$champ->getChamp().'"';
                $on[] = '(f."'.$champ->getChamp().'" = d."'.$champ->getFieldFSD()->getChamp().'")';
                $groupby[] = 'f."'.$champ->getChamp().'"';
            }
        }

        $sql = 'WITH id AS (SELECT '.implode(', ', $select).'
                FROM '.$fichier->getTable().' f 
                INNER JOIN public.v_serena_data d ON '.implode(' AND ', $on).'
                WHERE (NOT "doublon_serena") 
                GROUP BY '.implode(', ', $groupby).')

                UPDATE '.$fichier->getTable().' f SET doublon_serena_id = id_serena FROM id WHERE f.id_import = id.id_import';

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->execute();

        return true;
    }

    /**
    *   Charge fichier, champs et champs du FSD liés
    *   $fields => champs du formulaire
    **/
    public function testLesDoublonsInterne($fichier, $fields) 
    {
        $qb = $this->_em->getConnection()->createQueryBuilder();

        $qb->select('count(*) AS nb_doublon')
           ->from($fichier->getTable(), 'f')
           ->where('NOT "doublon_fichier"');

        foreach ($fichier->getChamps() as $champ) {
            if ( array_key_exists($champ->getId(), $fields) and $fields[$champ->getId()] === true) {
                $qb->addSelect('NULLIF("'.$champ->getChamp().'", \'\') AS "'.$champ->getChamp().'"')
                   ->addGroupBy('NULLIF("'.$champ->getChamp().'", \'\')');
            }
        }

        $qb->having('count(*) > 1');
        $qb->orderBy('nb_doublon', 'DESC');

        $retour['doublon'] = $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);

/*        $qb->resetQueryPart('having')
           ->having('count(*) = 1');

        $retour['pas_doublon'] = $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);*/

        return $retour;
    }


    /**
    *   Charge fichier, champs et champs du FSD liés
    *   $fields => champs du formulaire
    **/
    public function marqueLesDoublonsInterne($fichier, $fields) 
    {
        $qb = $this->_em->getConnection()->createQueryBuilder();

        $qb->select('array_remove(array_agg(id_import), min(id_import)) as doublon')
           ->from($fichier->getTable(), 'f')
           ->where('NOT "doublon_fichier"');

        foreach ($fichier->getChamps() as $champ) {
            if ( array_key_exists($champ->getId(), $fields) and $fields[$champ->getId()] === true) {
                $qb->addGroupBy('NULLIF("'.$champ->getChamp().'", \'\')');
            }
        }

        $qb->having('count(*) > 1');

        $doublons = $qb->execute()->fetchAll(\PDO::FETCH_ASSOC);

        $id_doublons = [];
        foreach ($doublons as $row) {
            $id_doublons = array_merge($id_doublons, json_decode(str_replace(array('{','}'), array('[',']'), $row['doublon'])));
        }

        $reinit_qb = $this->_em->getConnection()->createQueryBuilder();

        $reinit_qb->update($fichier->getTable(), 'f')
                ->set('doublon_fichier', ':doublon')
                ->setParameter('doublon', 'false')
                ->execute();

        $update_qb = $this->_em->getConnection()->createQueryBuilder();

        $update_qb->update($fichier->getTable(), 'f')
                ->set('doublon_fichier', ':doublon')
                ->where($update_qb->expr()->in( 'id_import', $id_doublons ))
                ->setParameter('doublon', true);
        
        $update_qb->execute();

        return true;
    }

}