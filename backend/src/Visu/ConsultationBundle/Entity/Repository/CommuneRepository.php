<?php
// src/OFSA/ReferentielBundle/Entity/Repository/CommuneRepository.php

namespace Visu\ConsultationBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class CommuneRepository extends EntityRepository
{
    public function getAutocomplete($patterns)
    {
        $sql = "SELECT nom_commun, insee_comm, initcap(nom_commun) || ' (' || code_dep || ')' as label, ST_AsGeoJSON(ST_Transform(ST_Simplify(the_geom, 100), 3857), 0) as geojson
                FROM public.communes_2013 ";
          
        $where = NULL;
        foreach ($patterns as $term) {
            $where .= is_null($where) ? "WHERE nom_commun LIKE '".$term."%' " : " AND nom_commun LIKE '%".$term."%' ";
        }

        $sql .= $where;

        $sql .= " ORDER BY label ";

        $requete = $this->_em->getConnection()->prepare($sql);

        $requete->execute();

        $result = $requete->fetchAll(\PDO::FETCH_ASSOC);
        $requete->closeCursor();

        return $result;
    }
}