<?php
// src/OFSA/ContributionBundle/Entity/Repository/ReleveRepository.php

namespace API\BiblioBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class LivreRepository extends EntityRepository
{
    public function findBy(array $criteria, array $orderBy = NULL, $limit = NULL, $offset = NULL) {
      $qb = $this->_em->createQueryBuilder();
      $qb->select('l, p, a, r, d, t, ed, paut, aut')
         ->from($this->_entityName, 'l')
         ->innerJoin('l.publication', 'p')
         ->leftJoin('p.article', 'a')
         ->leftJoin('p.rapport', 'r')
         ->leftJoin('p.these', 't')
         ->leftJoin('p.document', 'd')
         ->leftJoin('l.editeur', 'ed')
         ->leftJoin('p.publicationAuteursClassiques', 'paut')
         ->leftJoin('paut.auteur', 'aut');

      if ( !empty($criteria['titre']) ) {
        $qb->andWhere('lower(p.titre) LIKE :titre')
           ->setParameter('titre', '%'.strtolower($criteria['titre']).'%');
      }

      if ( !empty($criteria['isbn']) ) {
        $qb->andWhere('lower(l.isbn) LIKE :isbn')
           ->setParameter('isbn', '%'.strtolower($criteria['isbn']).'%');
      }

      return $qb
            ->getQuery()
            ->getResult();
    }
}
