<?php
// src/OFSA/ContributionBundle/Entity/Repository/ReleveRepository.php

namespace API\BiblioBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

use Core\ToolsBundle\Query\Postgresql\STAsEWKT;
use Core\ToolsBundle\Query\Postgresql\STAsGeoJSON;
use CrEOF\Spatial\ORM\Query\AST\Functions\PostgreSql\STTransform;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class PublicationRepository extends EntityRepository
{
    public function findBy(array $criteria, array $orderBy = NULL, $limit = NULL, $offset = NULL) {
      $qb = $this->_em->createQueryBuilder();
      $qb->select('p, livre, article, lg, document, chapitre, revue, editeur, auteurs, auteur')
         ->from($this->_entityName, 'p')
         ->leftJoin('p.livre', 'livre')
         ->leftJoin('p.article', 'article')
         ->leftJoin('p.litteratureGrise', 'lg')
         ->leftJoin('p.document', 'document')
         ->leftJoin('p.chapitre', 'chapitre')
         ->leftJoin('p.revue', 'revue')
         ->leftJoin('livre.editeur', 'editeur')
         ->leftJoin('p.aut_eurs', 'auteurs')
         ->leftJoin('auteurs.auteur', 'auteur');

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