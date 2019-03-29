<?php
// src/OFSA/ReferentielBundle/Entity/Repository/TerritoireRepository.php

namespace Visu\ConsultationBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

use CrEOF\Spatial\ORM\Query\AST\Functions\PostgreSql\STUnion;
use CrEOF\Spatial\ORM\Query\AST\Functions\PostgreSql\STTransform;
use CrEOF\Spatial\ORM\Query\AST\Functions\PostgreSql\STAsGeojson;

class TerritoireRepository extends EntityRepository
{
    public function getSelect()
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('partial e.{id, libelle}')
            ->from($this->_entityName, 'e')
            ->orderBy('e.libelle', 'ASC');

        return $qb
            ->getQuery()
            ->getResult();
    }

    public function getGeomById($id)
    {
        $query = $this->_em->createQuery(
            'SELECT t.id, 
                    t.libelle, 
                    st_asgeojson(st_transform(st_union(c.theGeom), 3857), 0) AS the_geom
            FROM VisuConsultationBundle:Territoire t
            INNER JOIN t.communes tc
            INNER JOIN tc.commune c
            WHERE t.id = :id
            GROUP BY t.id, t.libelle'
        );

        $query->setParameter('id', $id);
          
          // Utilisation de getSingleResult car la requête ne doit retourner qu'un seul résultat
        $result = $query->getScalarResult();
        return $result[0];
    }

    public function getTerritoireByIdWithCommunes($id)
    {
        $query = $this->_em->createQuery(
            'SELECT t, 
                    c
            FROM VisuConsultationBundle:Territoire t
            INNER JOIN t.communes tc
            INNER JOIN tc.commune c
            WHERE t.id = :id'
        );

        $query->setParameter('id', $id);
          
          // Utilisation de getSingleResult car la requête ne doit retourner qu'un seul résultat
        return $query->getScalarResult();
    }

    public function getGeomByIds(array $ids)
    {

        $query = $this->_em->createQuery(
            "SELECT t.id, 
                    t.libelle, 
                    st_asgeojson(st_transform(st_union(c.theGeom), 3857), 0) AS the_geom
            FROM VisuConsultationBundle:Territoire t
            INNER JOIN t.communes tc
            INNER JOIN tc.commune c
            WHERE t.id IN (:ids)
            GROUP BY t.id, t.libelle"
        );

        $query->setParameter('ids', $ids);
          
          // Utilisation de getSingleResult car la requête ne doit retourner qu'un seul résultat
        return $query->getScalarResult();
    }

}