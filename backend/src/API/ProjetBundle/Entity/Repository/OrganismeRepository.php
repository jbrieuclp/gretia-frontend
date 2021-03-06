<?php
// src/API/BiblioBundle/Entity/AuteurTypeRepository.php

namespace API\ProjetBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class OrganismeRepository extends EntityRepository
{
    public function search($term) {

      $qb = $this->_em->createQueryBuilder();
      $qb->select('e')
         ->from($this->_entityName, 'e');

      if (!is_null($term)) {
        foreach (explode(' ', $term) as $value) {
          $qb->andWhere('(lower(e.nom) LIKE :nom OR lower(e.sigle) LIKE :sigle)')
             ->setParameter('nom', '%'.strtolower($value).'%')
             ->setParameter('sigle', '%'.strtolower($value).'%');
        }
      }

      return $qb->getQuery()->getResult();
    }

    public function findByProjetsFinances($projet) {

      $qb = $this->_em->createQueryBuilder();
      $qb->select('e')
         ->from($this->_entityName, 'e')
         ->join('e.projetsFinances', 'p')
         ->where('p = :projet')
         ->setParameter('projet', $projet);

      return $qb->getQuery()->getResult();
    }

    public function findByProjetsTechniques($projet) {

      $qb = $this->_em->createQueryBuilder();
      $qb->select('e')
         ->from($this->_entityName, 'e')
         ->join('e.projetsTechniques', 'p')
         ->where('p = :projet')
         ->setParameter('projet', $projet);

      return $qb->getQuery()->getResult();
    }

}