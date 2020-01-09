<?php
// src/API/CartoBundle/Entity/Repository/ScaleRepository.php

namespace API\CartoBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;

class ScaleRepository extends EntityRepository
{
		
		public function getScaleForUser($user_id)
    {

    	$rsm = new ResultSetMapping;
			$rsm->addEntityResult($this->_entityName, 'e');
			$rsm->addFieldResult('e', 'id_restitution_level', 'id');
			$rsm->addFieldResult('e', 'id_type', 'type');
			$rsm->addFieldResult('e', 'label', 'label');
			$rsm->addFieldResult('e', 'priority', 'priority');

			$sql = "SELECT e.id_restitution_level, e.id_type, e.label, e.priority, max(ra.id_filter) as droit
							FROM pr_atlas.t_restitution_level e
							INNER JOIN pr_atlas.cor_role_action ra ON e.id_restitution_level = ra.id_restitution_level
							LEFT JOIN utilisateurs.cor_roles g ON g.id_role_groupe = ra.id_role
							LEFT JOIN utilisateurs.t_roles r ON r.id_role = ra.id_role
							WHERE (r.id_role = :role OR g.id_role_utilisateur = :role) AND ra.id_filter > 1
							GROUP BY e.id_restitution_level, e.id_type, e.label, e.priority
							ORDER BY e.priority ASC";

			$query = $this->_em->createNativeQuery($sql, $rsm);
			$query->setParameter('role', $user_id);

			return $query->getResult();
    }


    public function getMaxRightForUser($type, $user_id)
    {
    	$sql = 'SELECT max(ra.id_filter) as droit
							FROM pr_atlas.t_restitution_level e
							INNER JOIN pr_atlas.cor_role_action ra ON e.id_restitution_level = ra.id_restitution_level
							LEFT JOIN utilisateurs.cor_roles g ON g.id_role_groupe = ra.id_role
							LEFT JOIN utilisateurs.t_roles r ON r.id_role = ra.id_role
							WHERE (r.id_role = :role1 OR g.id_role_utilisateur = :role2) AND ra.id_filter > 1
							AND e.id_type = :type
							GROUP BY e.id_restitution_level, e.id_type, e.label, e.priority';

				$requete = $this->_em->getConnection()->prepare($sql);

				$requete->bindValue(':role1', (int) $user_id, \PDO::PARAM_INT);
				$requete->bindValue(':role2', (int) $user_id, \PDO::PARAM_INT);
				$requete->bindValue(':type', (int) $type, \PDO::PARAM_INT);
        $requete->execute();
        
        return $requete->fetch()['droit'];
    }
}