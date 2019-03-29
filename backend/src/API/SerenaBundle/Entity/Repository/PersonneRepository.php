<?php
// src/OFSA/ContributionBundle/Entity/Repository/ReleveRepository.php

namespace API\SerenaBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class PersonneRepository extends EntityRepository
{
/*    public function findBy($where = array(), $orderBy = array()) {
      $qb = $this->_em->createQueryBuilder();
      $qb->select('p')
         ->from($this->_entityName, 'p');

      if (count($where)) {
        foreach ($where as $key => $value) {
          $qb->addWhere('lower(:key) LIKE :value')
             ->setParameter('key', $key)
             ->setParameter('value', '%'.strtolower($value).'%');
        }
      }

      return $qb
            ->getQuery()
            ->getResult();
    }

  */  

    /*public function getAuthorisation($rel_id, $obs_id)
    {
        $sql = 'SELECT DISTINCT(r.rel_id) 
                FROM releves r 
                LEFT JOIN rel_obseur_sec_asso ra ON r.rel_id = ra.rel_id 
                WHERE r.rel_id = :rel_id 
                    AND (rel_obs_id = :obs_id 
                    OR ra.obs_id = :obs_id 
                    OR rel_saisi_obs_id = :obs_id
                    OR 0 < (SELECT count(*) as count
                            FROM comptes c
                            INNER JOIN cpt_grp_assoc cg ON c.cpt_id = cg.cpt_id
                            INNER JOIN groupes grp ON cg.grp_id = grp.grp_id 
                            INNER JOIN grp_droit_asso grp_asso ON grp_asso.grp_id = grp.grp_id
                            WHERE grp_asso.droit_id = 20 AND cpt_obs_id = :obs_id))';

        $requete = $this->_em->getConnection()->prepare($sql);
        $requete->bindValue(':obs_id', (int) $obs_id, \PDO::PARAM_INT);
        $requete->bindValue(':rel_id', (int) $rel_id, \PDO::PARAM_INT);
        $requete->execute();
        
        return $requete->fetch() ? true : false;
    }

    public function getReleveByIdWithPointage($id)
    {

        $query = $this->_em->createQuery(
            'SELECT r, 
                    partial commune.{inseeComm, nomComm, inseeDept}, 
                    partial programme.{id, libelle}, 
                    partial typeReleve.{id, libelle},
                    partial origine.{id, libelle},
                    partial commanditaire.{id, nom},
                    partial tempsPasse.{id, libelle},
                    partial qualite.{id, libelle},
                    partial qualitePhyto.{id, libelle},
                    partial solNu.{id, libelle},
                    partial exposition.{id, libelle},
                    partial pente.{id, libelle},
                    partial ombrage.{id, libelle}, 
                    partial salinite.{id, libelle},
                    partial pH.{id, libelle},
                    partial niveauTrophique.{id, libelle},
                    partial humidite.{id, libelle},
                    partial typeHumus.{id, libelle},
                    partial typeSol.{id, libelle},
                    partial hydromorphie.{id, libelle},
                    partial freqImmersion.{id, libelle},
                    partial ecoulementEau.{id, libelle},
                    partial physionomie.{id, libelle},
                    partial typeBiologique.{id, libelle},
                    partial typiciteFloristique.{id, libelle},
                    partial typiciteStructurale.{id, libelle},
                    partial rocheMere.{id, libelle},
                    partial codeEur.{code, nom},
                    partial codeCahab.{code, nom},
                    partial codeEunis.{code, nom},
                    partial codeCb.{code, nom},
                    saisie,
                    syntaxon,
                    fiabiliteSyntaxon,
                    syntaxonDeterminateurs,
                    partial obsDetermSyntax.{id, nom, prenom},
                    partial orgDetermSyntax.{id, nom},
                    syntaxonValidateurs,
                    partial obsValidSyntax.{id, nom, prenom},
                    partial orgValidSyntax.{id, nom},
                    coalesce(st_asgeojson(st_transform(poly.geom, 3857), 0), st_asgeojson(st_transform(ligne.geom, 3857),0), st_asgeojson(st_transform(point.geom, 3857), 0), \'\') as pointage
            FROM OFSAContributionBundle:Releve r
            LEFT JOIN r.commune commune
            LEFT JOIN r.programme programme
            LEFT JOIN r.typeReleve typeReleve
            LEFT JOIN r.origine origine
            LEFT JOIN r.commanditaire commanditaire
            LEFT JOIN r.tempsPasse tempsPasse
            LEFT JOIN r.qualite qualite
            LEFT JOIN r.qualitePhyto qualitePhyto
            LEFT JOIN r.solNu solNu
            LEFT JOIN r.exposition exposition
            LEFT JOIN r.pente pente
            LEFT JOIN r.ombrage ombrage
            LEFT JOIN r.salinite salinite
            LEFT JOIN r.pH pH
            LEFT JOIN r.niveauTrophique niveauTrophique
            LEFT JOIN r.humidite humidite
            LEFT JOIN r.typeHumus typeHumus
            LEFT JOIN r.typeSol typeSol
            LEFT JOIN r.hydromorphie hydromorphie
            LEFT JOIN r.freqImmersion freqImmersion
            LEFT JOIN r.ecoulementEau ecoulementEau
            LEFT JOIN r.physionomie physionomie
            LEFT JOIN r.typeBiologique typeBiologique
            LEFT JOIN r.typiciteFloristique typiciteFloristique
            LEFT JOIN r.typiciteStructurale typiciteStructurale
            LEFT JOIN r.rocheMere rocheMere
            LEFT JOIN r.codeEur codeEur
            LEFT JOIN r.codeCahab codeCahab
            LEFT JOIN r.codeEunis codeEunis
            LEFT JOIN r.codeCb codeCb
            LEFT JOIN r.saisie saisie
            LEFT JOIN r.syntaxon syntaxon
            LEFT JOIN syntaxon.fiabiliteSyntaxon fiabiliteSyntaxon
            LEFT JOIN syntaxon.syntaxonDeterminateurs syntaxonDeterminateurs
            LEFT JOIN syntaxonDeterminateurs.observateur obsDetermSyntax
            LEFT JOIN syntaxonDeterminateurs.organisme orgDetermSyntax
            LEFT JOIN syntaxon.syntaxonValidateurs syntaxonValidateurs
            LEFT JOIN syntaxonDeterminateurs.observateur obsValidSyntax
            LEFT JOIN syntaxonDeterminateurs.organisme orgValidSyntax
            LEFT JOIN r.polygone poly
            LEFT JOIN r.ligne ligne
            LEFT JOIN r.point point
            WHERE r.id = :id'
        );

        $query->setParameter('id', $id);

        $result = $query->getSingleResult();
        $releveHydrate = $result[0];
        $releveHydrate->setPointage($result['pointage']);

        //$query->getResult();

        return $releveHydrate;
    }


    public function getRelevesByObservateurWithPointage($observateur)
    {

        $query = $this->_em->createQuery(
            'SELECT r, coalesce(st_asewkt(st_transform(poly.geom, 3857)), st_asewkt(st_transform(ligne.geom, 3857)), st_asewkt(st_transform(point.geom, 3857)), \'\') as pointage
            FROM OFSAContributionBundle:Releve r
            JOIN OFSAContributionBundle:ReleveObservateur o
            LEFT JOIN r.polygone poly
            LEFT JOIN r.ligne ligne
            LEFT JOIN r.point point
            WHERE o.observateur = :observateur'
        );

        $query->setParameter('observateur', $observateur);

        $results = $query->getResult();

        $releveHydrate = $result[0];
        $releveHydrate->setPointage($result['pointage']);

        //$query->getResult();

        return $releveHydrate;
    }


    public function getRelevesByObservateur($observateur)
    {
        $query = $this->_em->createQuery(
            'SELECT r.id AS relId, r.relNum, c.nomComm, p.libelle AS programme, r.dateObservation AS date, r.codePointage, count(DISTINCT obs.id) AS nbObs
                FROM OFSAContributionBundle:Releve r 
                LEFT JOIN r.observations obs
                LEFT JOIN r.commune c
                LEFT JOIN r.programme p
                JOIN r.releveObservateurs obseur
                WHERE obseur.observateur = :observateur
                GROUP BY r.id, r.relNum, c.nomComm, p.libelle, r.dateObservation, r.codePointage
                ORDER BY r.dateObservation DESC'
        );

// NULLS LAST

        $query->setParameter('observateur', $observateur);

        $results = $query->getResult();
        
        return $results;
    }

    public function getPointagesByObservateur($observateur, $srid = 3857)
    {
        $query = $this->_em->createQuery(
            'SELECT r.id, coalesce(st_asgeojson(st_transform(poly.geom, :srid)), st_asgeojson(st_transform(ligne.geom, :srid)), st_asgeojson(st_transform(point.geom, :srid)), \'\') as pointage, r.id as url
                FROM OFSAContributionBundle:Releve r
                LEFT JOIN r.polygone poly
                LEFT JOIN r.ligne ligne
                LEFT JOIN r.point point 
                JOIN r.releveObservateurs obseur
                WHERE obseur.observateur = :observateur
                AND point.geom IS NOT NULL'
        );
        
        $query->setParameter('observateur', $observateur);
        $query->setParameter('srid', $srid);

        $results = $query->getResult();
        
        return $results;
    }

    public function getRelevesBySaisie($observateur)
    {
        $query = $this->_em->createQuery(
            "SELECT r, obseur
            FROM OFSAContributionBundle:Releve r 
            JOIN (SELECT DISTINCT concat(obseur.nom, ' ', obseur.prenom)
            FROM OFSAContributionBundle:ReleveObservateur rel_obs
            JOIN rel_obs.observateur obseur) AS obseur
            WHERE r.id = 213579"
        );
//SELECT r.rel_id, rel_num, prg_libelle, string_agg(DISTINCT(COALESCE(obseur.obs_nom, '')||' '||COALESCE(obseur.obs_prenom, '')), ', ') as observateur, nom_comm, to_char(rel_date, 'DD/MM/YYYY') as date, count(DISTINCT(obs_rel_id)) nb_obs

//partial rel_obs.{releve, observateur}, partial obseur.{id, nom, prenom}, , partial obs.{id}
        //$query->setParameter('observateur', $observateur);
//213579
        $results = $query->getResult();
        
        return $results;



/*

SELECT partial r.{id, relNum, dateCreation}, partial p.{id, libelle}, partial c.{inseeComm, nomComm}, string_agg(concat(obseur.nom, ' ', obseur.prenom), ', '), count(DISTINCT obs.id)
                FROM OFSAContributionBundle:Releve r 
                JOIN (SELECT DISTINCT concat(obseur.nom, ' ', obseur.prenom)
                    FROM r.releveObservateurs rel_obs
                    JOIN rel_obs.observateur obseur)
                LEFT JOIN r.observations obs
                LEFT JOIN r.commune c
                LEFT JOIN r.programme p
                WHERE r.id = 207053
                GROUP BY r.id, r.relNum, r.dateCreation, p.id, p.libelle, c.inseeComm, c.nomComm
                ORDER BY r.dateCreation DESC

      
    }

   public function getReleveWithObservations($id)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('partial r.{id}, o, partial t.{cdNom, nomComplet, cdRef, nomValide}, partial stat.{taxon, statut, libelle}')
            ->from($this->_entityName, 'r')
            ->innerJoin('r.observations', 'o')
            ->leftJoin('o.taxon', 't')
            ->leftJoin('t.statuts', 'stat')
            ->where('r.id = :id')
            ->orderBy('t.nomValide', 'ASC')
            ->setParameter('id', $id);

        return $qb
            ->getQuery()
            ->getSingleResult();
      
    }

    public function findByIdForConsultation($ids)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('partial r.{id, relNum, codePointage, dateObservation, periodeDebut, periodeFin, lieuDit}, partial dept.{inseeDept}, partial comm.{inseeComm, nomComm, inseeDept}, partial obsion.{id}, r_obs, partial obseur.{id, nom, prenom}, partial orga.{id, nom}')
            ->from($this->_entityName, 'r')
            ->innerJoin('r.observations', 'obsion')
            ->leftJoin('r.releveObservateurs', 'r_obs')
            ->leftJoin('r_obs.observateur', 'obseur')
            ->leftJoin('r_obs.organisme', 'orga')
            ->leftJoin('r.commune', 'comm')
            ->leftJoin('r.departement', 'dept')
            ->where('r.id in (:ids)')
            ->setParameter('ids', $ids);

        return $qb
            ->getQuery()
            ->getResult();
      
    }

    public function getInfoForCarnetTerrainIB($releve)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('partial r.{id, relNum, codePointage, dateObservation, periodeDebut, periodeFin, lieuDit}, partial dept.{inseeDept}, partial comm.{inseeComm, nomComm, inseeDept}, partial obsion.{id, taxonCite, taxon, validation}, validation, partial taxon.{cdNom, cdRef, nomValide}, partial statut.{taxon, statut, libelle, categorie}, r_obs, partial obseur.{id, nom, prenom}, partial orga.{id, nom}')
            ->from($this->_entityName, 'r')
            ->leftJoin('r.observations', 'obsion')
            ->leftJoin('obsion.taxon', 'taxon')
            ->leftJoin('obsion.validation', 'validation')
            ->leftJoin('taxon.statuts', 'statut')
            ->leftJoin('r.releveObservateurs', 'r_obs')
            ->leftJoin('r_obs.observateur', 'obseur')
            ->leftJoin('r_obs.organisme', 'orga')
            ->leftJoin('r.commune', 'comm')
            ->leftJoin('r.departement', 'dept')
            ->where('r.id = :releve')
            ->orderBy('taxon.nomValide')
            ->setParameter('releve', $releve);

        return $qb
            ->getQuery()
            ->getSingleResult();
      
    }


    public function findByIdOrCode($exp)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('r.id')
            ->from($this->_entityName, 'r')
            ->where("r.relNum = :exp")
            ->orWhere('r.codePointage = :exp');
        if ( is_numeric($exp) ) //si la saisie est de type entier on peut tester l'ID sinon ca plante (erreur SQL de type)
            $qb->orWhere('r.id = :exp');
        $qb->setParameter('exp', $exp);

        return $qb
            ->getQuery()
            ->getScalarResult();
    }
*/
}