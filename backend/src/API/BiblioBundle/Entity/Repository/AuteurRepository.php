<?php
// src/API/BiblioBundle/Entity/AuteurTypeRepository.php

namespace API\BiblioBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class AuteurRepository extends EntityRepository
{
    public function search($term) {

      $qb = $this->_em->createQueryBuilder();
      $qb->select('e')
         ->from($this->_entityName, 'e');

      if (!is_null($term)) {
        foreach (explode(' ', $term) as $value) {
          $qb->andWhere('(lower(e.nom) LIKE :nom OR lower(e.prenom) LIKE :prenom)')
             ->setParameter('nom', '%'.strtolower($value).'%')
             ->setParameter('prenom', '%'.strtolower($value).'%');
        }
      }

      return $qb->getQuery()->getResult();
    }

}