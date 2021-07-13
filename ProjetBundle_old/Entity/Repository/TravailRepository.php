<?php
// src/API/BiblioBundle/Entity/AuteurTypeRepository.php

namespace API\ProjetBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use API\ProjetBundle\Entity\Personne;
use API\ProjetBundle\Entity\Projet;

class TravailRepository extends EntityRepository
{
    public function findByPersonne(Personne $personne, $options) {

      $qb = $this->_em->createQueryBuilder();
      $qb->select('e')
         ->from($this->_entityName, 'e')
         ->where('e.personne = :personne')
         ->setParameter('personne', $personne)
         ->orderBy('e.date', 'desc');

      if (!is_null($options['startAt'])) {
        $qb->andWhere('e.date >= :startAt')
           ->setParameter('startAt', $options['startAt']);
      }

      if (!is_null($options['endAt'])) {
        $qb->andWhere('e.date <= :endAt')
           ->setParameter('endAt', $options['endAt']);
      }

      if (!is_null($options['limit'])) {
        $qb->limit($options['limit']);
      }

      return $qb->getQuery()->getResult();
    }

    public function getSynthese(Personne $personne, $options) {

      $qb = $this->_em->createQueryBuilder();
      $qb->select('e.date as date, sum(e.duree) as duree, count(e.id) as nb_mission')
         ->from($this->_entityName, 'e')
         ->where('e.personne = :personne')
         ->setParameter('personne', $personne)
         ->orderBy('e.date', 'desc')
         ->groupBy('e.date');

      if (!is_null($options['startAt'])) {
        $qb->andWhere('e.date >= :startAt')
           ->setParameter('startAt', $options['startAt']);
      }

      if (!is_null($options['endAt'])) {
        $qb->andWhere('e.date <= :endAt')
           ->setParameter('endAt', $options['endAt']);
      }

      if (!is_null($options['limit'])) {
        $qb->limit($options['limit']);
      }

      return $qb->getQuery()->getResult();
    }

}