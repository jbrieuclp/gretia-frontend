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

			$sql = "SELECT roles.id_role, roles.uuid_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email,
				array_to_json(array_remove(array_cat(array_agg(DISTINCT app.nom_application)::character varying[], array_agg(DISTINCT concat_ws('_', app.nom_application, ta.tag_code, tob.tag_code))::character varying[]), null)) as roles
				FROM utilisateurs.t_roles roles
				LEFT JOIN utilisateurs.cor_roles ON roles.id_role = cor_roles.id_role_utilisateur
				LEFT JOIN utilisateurs.t_roles groupes ON groupes.id_role = cor_roles.id_role_groupe
				LEFT JOIN utilisateurs.cor_app_privileges droits ON roles.id_role = droits.id_role OR groupes.id_role = droits.id_role
				LEFT JOIN utilisateurs.t_tags ta ON droits.id_tag_action = ta.id_tag  
				LEFT JOIN utilisateurs.t_tags tob ON droits.id_tag_object = tob.id_tag
				LEFT JOIN utilisateurs.t_applications app ON droits.id_application = app.id_application
				WHERE roles.identifiant = ?
				GROUP BY roles.id_role, roles.uuid_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email";

			$query = $this->_em->createNativeQuery($sql, $rsm);
			$query->setParameter(1, $username);

			return $query->getOneOrNullResult();
    }


    public function find($id)
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

			$sql = "SELECT roles.id_role, roles.uuid_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email,
				array_to_json(array_remove(array_cat(array_agg(DISTINCT app.nom_application)::character varying[], array_agg(DISTINCT concat_ws('_', app.nom_application, ta.tag_code, tob.tag_code))::character varying[]), null)) as roles
				FROM utilisateurs.t_roles roles
				LEFT JOIN utilisateurs.cor_roles ON roles.id_role = cor_roles.id_role_utilisateur
				LEFT JOIN utilisateurs.t_roles groupes ON groupes.id_role = cor_roles.id_role_groupe
				LEFT JOIN utilisateurs.cor_app_privileges droits ON roles.id_role = droits.id_role OR groupes.id_role = droits.id_role
				LEFT JOIN utilisateurs.t_tags ta ON droits.id_tag_action = ta.id_tag  
				LEFT JOIN utilisateurs.t_tags tob ON droits.id_tag_object = tob.id_tag
				LEFT JOIN utilisateurs.t_applications app ON droits.id_application = app.id_application
				WHERE roles.id_role = :id
				GROUP BY roles.id_role, roles.uuid_role, roles.identifiant, roles.nom_role, roles.prenom_role, roles.desc_role, roles.pass, roles.pass_plus, roles.email";

			$query = $this->_em->createNativeQuery($sql, $rsm);
			$query->setParameter('id', $id);

			return $query->getOneOrNullResult();
    }

}