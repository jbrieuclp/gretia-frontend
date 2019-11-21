<?php
// src/API/BiblioBundle/Entity/UserGeoNatureRepository.php

namespace API\CoreBundle\Entity\Repository;

use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use API\CoreBundle\Entity\UserGeoNature;

class UserAppRepository extends EntityRepository implements UserLoaderInterface
{
		public function loadUserByUsername($username)
    {

    	$rsm = new ResultSetMapping;
			$rsm->addEntityResult('APICoreBundle:UserApp', 'u');
			$rsm->addFieldResult('u', 'id_role', 'id');
			$rsm->addFieldResult('u', 'uuid_role', 'uuid');
			$rsm->addFieldResult('u', 'identifiant', 'username');
			$rsm->addFieldResult('u', 'nom_role', 'nom');
			$rsm->addFieldResult('u', 'prenom_role', 'prenom');
			$rsm->addFieldResult('u', 'desc_role', 'description');
			$rsm->addFieldResult('u', 'pass', 'md5');
			$rsm->addFieldResult('u', 'pass_plus', 'password');
			$rsm->addFieldResult('u', 'email', 'email');
			$rsm->addFieldResult('u', 'roles', 'roles');

			$sql = "SELECT roles.id_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email, array_to_json(array_agg(DISTINCT app.code_application)::character varying[]) as roles
				FROM utilisateurs.v_roleslist_forall_applications roles
				INNER JOIN utilisateurs.t_applications app ON roles.id_application = app.id_application
				WHERE roles.identifiant = ?
				GROUP BY roles.id_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email";

			$query = $this->_em->createNativeQuery($sql, $rsm);
			$query->setParameter(1, $username);

			return $query->getOneOrNullResult();
    }


    public function find($id, $lockMode = NULL, $lockVersion = NULL)
    {

    	$rsm = new ResultSetMapping;
			$rsm->addEntityResult('APICoreBundle:UserApp', 'u');
			$rsm->addFieldResult('u', 'id_role', 'id');
			$rsm->addFieldResult('u', 'identifiant', 'username');
			$rsm->addFieldResult('u', 'nom_role', 'nom');
			$rsm->addFieldResult('u', 'prenom_role', 'prenom');
			$rsm->addFieldResult('u', 'desc_role', 'description');
			$rsm->addFieldResult('u', 'pass', 'md5');
			$rsm->addFieldResult('u', 'pass_plus', 'password');
			$rsm->addFieldResult('u', 'email', 'email');
			$rsm->addFieldResult('u', 'roles', 'roles');

			$sql = "SELECT roles.id_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email, array_to_json(array_agg(DISTINCT app.code_application)::character varying[]) as roles
				FROM utilisateurs.v_roleslist_forall_applications roles
				INNER JOIN utilisateurs.t_applications app ON roles.id_application = app.id_application
				WHERE roles.id_role = :id
				GROUP BY roles.id_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email";

			$query = $this->_em->createNativeQuery($sql, $rsm);
			$query->setParameter('id', $id);

			return $query->getOneOrNullResult();
    }

}