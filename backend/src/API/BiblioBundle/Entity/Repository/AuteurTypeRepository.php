<?php
// src/API/BiblioBundle/Entity/AuteurTypeRepository.php

namespace API\BiblioBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class AuteurTypeRepository extends EntityRepository
{
    public function findBy(array $criteria, array $orderBy = NULL, $limit = NULL, $offset = NULL) {
      $qb = $this->_em->createQueryBuilder();
      $qb->select('e')
         ->from($this->_entityName, 'e');

      foreach ($criteria as $field => $value) {
        $qb->andWhere('lower(e.'.$field.') LIKE :'.$field)
           ->setParameter($field, '%'.strtolower($value).'%');
      }

      return $qb->getQuery()->getResult();
    }

}