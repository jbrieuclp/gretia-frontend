SET search_path TO projet, public, pg_catalog;

CREATE SCHEMA projet;

CREATE TABLE type_projet_ref (
	id_type_projet_ref serial PRIMARY KEY NOT NULL,
	libelle character varying(255) NOT NULL,
	description character varying,
	ordre integer
);

CREATE TABLE type_projet (
	id_type_projet serial PRIMARY KEY NOT NULL,
	type_projet_ref_id integer REFERENCES type_projet_ref(id_type_projet_ref) NOT NULL,
	application_debut date NOT NULL,
	application_fin date NOT NULL,
	cout_jour double precision NOT NULL,
	CONSTRAINT cout_jour_chk CHECK (cout_jour >= 0),
	CONSTRAINT application_chk CHECK (application_debut <= application_fin)
);

CREATE TABLE fonction_salarie (
	id_fonction_salarie serial PRIMARY KEY NOT NULL,
	libelle character varying(255) NOT NULL,
	ordre integer
);

CREATE TABLE antenne (
	id_antenne serial PRIMARY KEY NOT NULL,
	nom character varying(255) NOT NULL
);

CREATE TABLE personne (
	id_personne serial PRIMARY KEY NOT NULL,
	nom character varying(255) NOT NULL,
	prenom character varying(255) NOT NULL,
	alias character varying(255) UNIQUE NOT NULL,
	compte_id integer UNIQUE
);

CREATE TABLE salarie (
	id_salarie serial PRIMARY KEY NOT NULL,
	personne_id integer REFERENCES personne(id_personne) NOT NULL,
	fonction_salarie_id integer REFERENCES fonction_salarie(id_fonction_salarie) NOT NULL,
	antenne_id integer REFERENCES antenne(id_antenne) NOT NULL,
	date_debut date NOT NULL,
	date_fin date NOT NULL,
	taux double precision NOT NULL DEFAULT 1,
	CONSTRAINT taux_chk CHECK (taux BETWEEN 0 AND 1),
	CONSTRAINT date_chk CHECK (date_debut <= date_fin)
);
COMMENT ON COLUMN salarie.taux IS 'Temps plein ou temps partiel';

CREATE TABLE conge_paye (
	id_conge_paye serial PRIMARY KEY NOT NULL,
	salarie_id integer REFERENCES salarie(id_salarie) NOT NULL,
	date_cp date NOT NULL,
	quantite double precision NOT NULL DEFAULT 1,
	CONSTRAINT quantite_chk CHECK (quantite > 0)
);
COMMENT ON COLUMN conge_paye.quantite IS 'Quantite en jour';

CREATE TABLE recup (
	id_recup serial PRIMARY KEY NOT NULL,
	salarie_id integer REFERENCES salarie(id_salarie) NOT NULL,
	date_r date NOT NULL,
	quantite double precision NOT NULL DEFAULT 1,
	CHECK (quantite > 0)
);
COMMENT ON COLUMN recup.quantite IS 'Quantite en minute';

CREATE TABLE localisation (
	id_localisation serial PRIMARY KEY NOT NULL,
	nom character varying NOT NULL
);

/*
CREATE TABLE categorie_projet (
	id serial PRIMARY KEY NOT NULL,
	libelle character varying(255) NOT NULL,
	ordre integer
);
*/

CREATE TABLE projet (
	id_projet serial PRIMARY KEY NOT NULL,
	--categorie_id integer REFERENCES categorie_projet(categorie_id)
	projet_parent_id integer REFERENCES projet(id_projet),
	type_projet_id integer REFERENCES type_projet(id_type_projet),
	code character varying(50) NOT NULL,
	intitule character varying(500) NOT NULL,
	objectif character varying,
	date_debut date,
	date_fin date
);

CREATE TABLE projet_localisation (
	projet_id integer REFERENCES projet(id_projet) NOT NULL,
	localisation_id integer REFERENCES localisation(id_localisation) NOT NULL,
	PRIMARY KEY (projet_id, localisation_id)
);


CREATE TABLE projet_responsable (
	projet_id integer REFERENCES projet(id_projet) NOT NULL,
	salarie_id integer REFERENCES salarie(id_salarie) NOT NULL,
	PRIMARY KEY (projet_id, salarie_id)
);


CREATE TABLE action (
	id_action serial PRIMARY KEY NOT NULL,
	libelle character varying(255) UNIQUE NOT NULL,
	description character varying,
	ordre integer
);

CREATE TABLE etat_avancement (
	id_etat_avancement serial PRIMARY KEY NOT NULL,
	libelle character varying(255) UNIQUE NOT NULL,
	description character varying,
	ordre integer
);

CREATE TABLE tache (
	id_tache serial PRIMARY KEY NOT NULL,
	action_id integer REFERENCES action(id_action) NOT NULL,
	etat_avancement_id integer REFERENCES etat_avancement(id_etat_avancement) NOT NULL,
	intitule character varying(500) NOT NULL,
	objectif character varying,
	nb_jours double precision,
	CONSTRAINT nb_jours_chk CHECK (nb_jours > 0)
);

CREATE TABLE tache_periode (
	id_tache_periode serial PRIMARY KEY NOT NULL,
	tache_id integer REFERENCES tache(id_tache) NOT NULL,
	date_debut date NOT NULL,
	date_fin date NOT NULL,
	CONSTRAINT date_chk CHECK (date_debut <= date_fin)
);

CREATE TABLE tache_attribution (
	tache_id integer REFERENCES tache(id_tache) NOT NULL,
	salarie_id integer REFERENCES salarie(id_salarie) NOT NULL,
	nb_jours double precision NOT NULL,
	date_debut date,
	date_fin date,
	CONSTRAINT nb_jours_chk CHECK (nb_jours > 0)
);

CREATE TABLE travail (
	id_travail serial PRIMARY KEY NOT NULL,
	tache_id integer REFERENCES tache(id_tache) NOT NULL,
	salarie_id integer REFERENCES salarie(id_salarie) NOT NULL,
	date_travail date NOT NULL,
	temps integer NOT NULL,
	detail character varying,
	est_nuit boolean NOT NULL DEFAULT false,
	est_we boolean NOT NULL DEFAULT false
);

CREATE TABLE deplacement (
	id_deplacement serial PRIMARY KEY NOT NULL,
	duree integer NOT NULL,
	km integer NOT NULL,
	covoiturage boolean DEFAULT false NOT NULL
);

CREATE TABLE type_frais_ref (
	id_type_frais_ref serial PRIMARY KEY NOT NULL,
	libelle character varying(255) UNIQUE NOT NULL,
	description character varying,
	ordre integer
);

CREATE TABLE type_frais (
	id_type_frais serial PRIMARY KEY NOT NULL,
	type_frais_ref_id integer REFERENCES type_frais_ref(id_type_frais_ref) NOT NULL,
	application_debut date NOT NULL,
	application_fin date,
	CONSTRAINT date_chk CHECK (application_debut <= COALESCE(application_fin, now()))
);

CREATE TABLE organisme (
	id_organisme serial PRIMARY KEY NOT NULL,
	nom character varying UNIQUE NOT NULL,
	est_public boolean DEFAULT false NOT NULL
);

CREATE TABLE type_echeance (
	id_type_echeance serial PRIMARY KEY NOT NULL,
	libelle character varying(255) UNIQUE NOT NULL,
	descriptif character varying,
	ordre integer
);

CREATE TABLE type_versement (
	id_type_versement serial PRIMARY KEY NOT NULL,
	libelle character varying(255) UNIQUE NOT NULL,
	descriptif character varying,
	ordre integer
);

CREATE TABLE convention (
	id_convention serial PRIMARY KEY NOT NULL,
	intitule character varying,
	descriptif character varying
);

CREATE TABLE convention_signataire (
	convention_id integer REFERENCES convention(id_convention),
	organisme_id integer REFERENCES organisme (id_organisme),
	PRIMARY KEY (convention_id, organisme_id)
);

CREATE TABLE convention_financeur (
	convention_id integer REFERENCES convention(id_convention),
	organisme_id integer REFERENCES organisme (id_organisme),
	financement double precision,
	PRIMARY KEY (convention_id, organisme_id)
);

CREATE TABLE convention_echeance (
	convention_id integer NOT NULL REFERENCES convention(id_convention),
	type_echeance_id integer NOT NULL REFERENCES type_echeance(id_type_echeance),
	date_echeance date NOT NULL,
	remarque character varying,
	est_report boolean NOT NULL DEFAULT false,
	est_caduque boolean NOT NULL DEFAULT false,
	PRIMARY KEY (convention_id, type_echeance_id)
);

CREATE TABLE versement (
	id_versement serial PRIMARY KEY NOT NULL,
	convention_id integer NOT NULL REFERENCES convention(id_convention),
	type_versement_id integer NOT NULL REFERENCES type_versement(id_type_versement),
	date_demande date NOT NULL,
	date_realisation date
);

CREATE TABLE justificatif (
	id_justificatif serial PRIMARY KEY NOT NULL,
	versement_id integer NOT NULL REFERENCES versement (id_versement),
	libelle character varying(500) NOT NULL,
	descriptif character varying,
	date_justificatif date,
	piece_jointe character varying
);

CREATE TABLE projet_convention (
	projet_id integer NOT NULL REFERENCES projet (id_projet),
	convention_id integer NOT NULL REFERENCES convention (id_convention),
	type_frais_id integer NOT NULL REFERENCES type_frais (id_type_frais),
	descriptif character varying,
	cout_unitaire_applique double precision NOT NULL,
	quant_previsionnelle double precision NOT NULL,
	quant_eligible double precision,
	PRIMARY KEY (projet_id, convention_id, type_frais_id)
);