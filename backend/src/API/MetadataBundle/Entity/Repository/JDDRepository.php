<?php
// src/API/MetadataBundle/Entity/Repository/JDDRepository.php

namespace API\MetadataBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class JDDRepository extends EntityRepository
{
    /**
    *   Import un fichier présent sur le serveur dans Postgres en commande SQL COPY
    **/
    public function getList($pattern = null)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('partial j.{id, nom, description, cadre, integre, public, diffusable}, partial c.{id, nom, territoire, avancement}, partial t.{id, libelle}, partial a.{id, libelle}')
            ->from($this->_entityName, 'j')
            ->join('j.cadre', 'c')
            ->join('c.territoire', 't')
            ->join('c.avancement', 'a')
            ->orderBy('j.id');

        return $qb
            ->getQuery()
            ->getResult();

    }
    
}