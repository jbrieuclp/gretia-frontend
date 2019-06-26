<?php
namespace API\CartoBundle\Services\Cartographie;

use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\ORM\EntityManager;

use \Symfony\Component\Yaml\Parser;

abstract class LayerService
{
   /**
    *
    * @var Connection
    */
    protected $em;
    protected $connection;
    private $context;
    protected $router;
    protected $request;

    /**
    *
    * @var clauses = array()
    * Clauses présentes dans le where
    */
    private $clauses = array();

    /**
    *
    * @var parametres = array()
    * Parametre à sortir dans fichier yml ou autre
    */
    protected $parameters;
    protected $queryBuilder;
    protected $criteres;
    protected $scale;
    protected $projection = 3857;
    protected $geojsonData = [];


    public function __construct(EntityManager $em, AuthorizationChecker $authorization, TokenStorage $context, Router $router, RequestStack $request)  {
        $this->em = $em;    
        $this->connection = $em->getConnection();    
        $this->authorization = $authorization; 
        $this->context = $context; 
        $this->router = $router; 
        $this->request = $request->getCurrentRequest();   
        $this->queryBuilder = $this->newQuery(); 

        $this->setScale();
        $this->setCriteres();
    }
	
    /**
     * Cette fonction recupère les données permettant de generer un geojson pour une echelle spécifié
     * Sortie : tableau associatif des données
     */
    public function getGeoJson($projection = 3857)
    {
        $this->setProjection($projection);

        //verification des droits d'accès aux données
        if ($this->checkScale()) {
            $this->setGeojsonData();
        }
    }

    /**
    * Cette fonction recupère les données attributaire liées à une maille
    * Sortie : tableau associatif des données
    */
    public function getInfoBulle()
	{
        $this->addCriteres('maille', $this->request->get('maille_id'));
    }
	
    protected function setGeojsonData() {
        $this->setGeojsonQuery();
        $this->setWhere();
        $this->geojsonData = $this->queryBuilder->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected function getGeojsonData() {
        return $this->geojsonData;
    }
    
    protected function setCriteres(/*$maille_id = null*/) {
        $this->criteres = array(
                    //'maille_id' => $maille_id,
                    'departements' => $this->request->request->get('departements'),
                    'date_min' => $this->request->request->get('date_min'),
                    'date_max' => $this->request->request->get('date_max'),
                    'type_date' => $this->request->request->get('type_date'),
                    'origine' => $this->request->request->get('origine'),
                    'type_releve' => $this->request->request->get('type_releve'),
                    'organisme' => $this->request->request->get('organisme'),
                    'territoire' => $this->request->request->get('territoire'),
                    'suivi' => $this->request->request->get('suivi'),
                  );

        $this->setScalefilter();
    }

    protected function addCriteres($critere, $value) {

        if ( empty($critere) )
            throw new \Exception('variable $critere non renseignée', 1);
            
        $this->criteres[$critere] = $value;
    }

    protected function critereExist($critere) {
        //pour palier au bug de PHP < 5.4
        $criteres = $this->criteres;
        return (array_key_exists('filtre', $criteres) && !empty($criteres['filtre']));
    }

    protected function removeCriteres($critere) {
        if ( empty($critere) )
            throw new \Exception('variable $critere non renseignée', 1);

        if ( !in_array($critere, $this->criteres) )
            throw new \Exception('$critere inexistant dans le tableau', 1);
            
        unset($this->criteres[$critere]);
    }

    /**
     * Cette fonction permet de vérifier si l'utilisateur possède les droits d'accès à la données
     * Sortie : l'echelle autorisée
     */
    protected function checkScale()
    {
        return $this->getScale() !== null;
    }

    protected function setScale() {
        $this->scale = null;
        $scales = $this->em->getRepository('APICartoBundle:Scale')->getScaleForUser($this->context->getToken()->getUser()->getId());
        foreach ($scales as $scale) {
            if ($scale === $this->em->getRepository('APICartoBundle:Scale')->findOneByType($this->request->request->get('scale'))) {
                $this->scale = $scale;
            }
        }
    }

    protected function getScale() {
        return $this->scale;
    }
	
    /**
     * Cette fonction recupère les données permettant de générer un geojson pour une echelle spécifiée
     * Sortie : tableau associatif des données
     */
    public function setWhere()
    {
        foreach ($this->criteres as $key => $value) {
            if ( $this->__empty($value) ) {
                $fonction = 'set'.str_replace(' ', '', ucwords(str_replace('_', ' ', $key)));
                $this->$fonction($value);
            }
        }
    }
	
    protected function setProjection($projection) 
    {   
        $this->projection = $projection;
    }

    private function __empty($data) {
        return !empty($data);
    }

    protected function newQuery() {
        return $this->connection->createQueryBuilder();
    }
	
    /**
     * Cette fonction permet de retourner un tableau asso formatant le geojson correctement
     * Sortie : array('header' => $header, 'features' => $features, 'footer' => $footer);
     */
    public function makeGeoJson($projection = 3857)
    {
        $features = array();

        $rows = $this->getGeojsonData();
        foreach ($rows as &$data) {
            $pointage = $data['the_geom'];
            unset($data['the_geom']);
            $features[] = '{"type":"Feature","geometry":'.$pointage.',"properties":'.json_encode($data).'}';
            unset($data);
        }

        return '{"type": "FeatureCollection", "crs": {"type": "name", "properties": {"name": "EPSG:'.$this->projection.'"}}, "features": ['.implode(',', $features).']}';
    }


    /**
     * Cette fonction permet de retourner un tableau asso formatant le geojson correctement
     * Sortie : array('header' => $header, 'features' => $features, 'footer' => $footer);
     */
    public function makeInfoBulle()
    {
        $this->setInformationQuery();
        $this->setWhere();
        return $this->queryBuilder->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }

    


    /**
     * Fonctions internes nécessaires aux indicateurs 
     *
     */
	
    private function setDepartements($departements)
    {
        if (!is_array($departements)) return;
		
        $val_ok = array();
        //recuperation des données directos de la requete issues des input name="departements[]"
        foreach ($departements as $valeur) {
            if ( ctype_digit($valeur) ) {
                $val_ok[] = "'".(int) $valeur."'";
            }
        }
        
        if (count($val_ok) ) {
            $this->queryBuilder->andWhere("(departement IN (:departement))")
                               ->setParameter('departement', implode(',',$val_ok));
        }
    }

    private function getMailleId($maille_id)
    {
		$sql = " (id_unique = '".str_replace("'", "''", $maille_id)."') ";
        
        return $sql;
    }

    private function setDateMin($dateMin)
    {
        $date = null;
        if ( preg_match('/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/', $dateMin, $matches) ) {
            $date = $matches[0];
        } elseif ( preg_match('/^([0-9]{4})-([0-9]{2})$/', $dateMin, $matches) ) {
            $date = $matches[0].'-01';
        } elseif ( preg_match('/^([0-9]{4})$/', $dateMin, $matches) ) {
            $date = $matches[0].'-01-01';
        } elseif ( preg_match('/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/', $dateMin, $matches) ) {
            $date = $matches[3].'-'.$matches[2].'-'.$matches[1];
        } elseif ( preg_match('/^([0-9]{2})\/([0-9]{4})$/', $dateMin, $matches) ) {
            $date = $matches[2].'-'.$matches[1].'-01';
        } else {
            return;
        }

        $this->queryBuilder->andWhere("(date >= :datemin)")
                           ->setParameter('datemin', $date);
    }

    private function setDateMax($dateMax)
    {
        $date = null;
        if ( preg_match('/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/', $dateMax, $matches) ) {
            $date = $matches[0];
        } elseif ( preg_match('/^([0-9]{4})-([0-9]{2})$/', $dateMax, $matches) ) {
            $date = $matches[0].'-01';
        } elseif ( preg_match('/^([0-9]{4})$/', $dateMax, $matches) ) {
            $date = $matches[0].'-12-01';
        } elseif ( preg_match('/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/', $dateMax, $matches) ) {
            $date = $matches[3].'-'.$matches[2].'-'.$matches[1];
        } elseif ( preg_match('/^([0-9]{2})\/([0-9]{4})$/', $dateMax, $matches) ) {
            $date = $matches[2].'-'.$matches[1].'-01';
        } else {
            return;
        }

        $this->queryBuilder->andWhere("(date <= :datemax)")
                           ->setParameter('datemax', date("Y-m-t", strtotime($date)));
    }

    private function setTypeDate($typeDate)
    {
        if (!is_array($typeDate)) return;
		            
        $sqlDate = array();
        if (in_array('historique', $typeDate)) {
            $sqlDate[] = "(date < '1950-01-01' OR date IS NULL)";
        }

        if (in_array('ancienne', $typeDate)) {
            $sqlDate[] = "(date >= '1950-01-01' AND date < '2000-01-01')";
        }

        if (in_array('recente', $typeDate)) {
            $sqlDate[] = "(date >= '2000-01-01')";
        }
        
        // S'il y a des éléments dans le tableau on les sépare avec des OR sinon on retourne du vide
        if ( count($sqlDate) ) 
            $this->queryBuilder->andWhere('('.implode(' OR ', $sqlDate).')');
    }

    private function setOrigine($origine)
    {
        if (!is_array($origine)) return;
		
		$val_ok = array();
		
        // Récuperation des données directos de la requête issues des input name="departements[]"
        foreach ($origine as $valeur) {
            if ( ctype_digit($valeur) ) {
                $val_ok[] = (int) $valeur;
            }
        }
        
        if (count($val_ok) ) {
            $this->queryBuilder->andWhere("(origine IN (:origine))")
                               ->setParameter('origine', implode(',',$val_ok));
        }
    }

    private function setTypeReleve($typeReleve)
    {
        if (!is_array($typeReleve)) return;
		
        $val_ok = array();
		
		// Récuperation des données directos de la requête issues des input name="departements[]"
        foreach ($typeReleve as $valeur) {
            if ( ctype_digit($valeur) ) {
                $val_ok[] = (int) $valeur;
            }
        }
        
        if (count($val_ok) ) {
            $this->queryBuilder->andWhere("(type_releve IN (:typeReleve))")
                               ->setParameter('typeReleve', implode(',',$val_ok));
		}
	}

    private function setOrganisme($organisme)
    {
        if (!is_array($organisme)) return;
		
		$val_ok = array();
        foreach ($organisme as $valeur) {
            if ( ctype_digit($valeur) ) {
                $val_ok[] = (int) $valeur;
            } else if ( count($valeurs = preg_split("/[^0-9]/", $valeur, -1, PREG_SPLIT_NO_EMPTY)) ) { //organisme composé : on check si des valeurs respectent le pattern
                $val_ok = array_merge($val_ok, $valeurs);
            }
        }

        if (count($val_ok) ) {
            $this->queryBuilder->andWhere("(ARRAY[".implode(',',$val_ok)."]::integer[] && organisme)");
        }
    }

    private function setTerritoire($territoire)
    {
        if (!is_array($territoire)) return;
		
		$val_ok = array();
        foreach ($territoire as $valeur) {
            if ( ctype_digit($valeur) ) {
                $val_ok[] = "'".(int) $valeur."'";
            }
        }

        if (count($val_ok) ) {
            $qb = $this->queryBuilder;
            $qb->innerJoin('d', 'territoire_commune', 'TERRI', 'd.insee = TERRI.insee_com')
               ->andWhere("TERRI.terri_id IN (".implode(',',$val_ok).")");
        }
    }

    private function setGeometry($geom)
    {
        if ($geom == '{}') return;
		
		$qb = $this->queryBuilder;
        $qb->andWhere("ST_Intersects(d.the_geom, ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('".$geom."'), 3857), 2154))");
    }

    private function setMaille($maille)
    {
        if (is_null($maille)) return;
    		
    	// Problème pour passer l'id de la maille pour avoir l'info-bulle de la richesse taxonomique
    	//$this->queryBuilder->andWhere("d.id_unique = :maille")
    	//                   ->setParameter("maille", $maille);
    	$this->queryBuilder->andWhere("d.id_unique = '".$maille."'");
    }

    private function setScaleFilter()
    {
        $max = $this->em->getRepository('APICartoBundle:Scale')->getMaxRightForUser($this->getScale()->getType(), $this->context->getToken()->getUser()->getId());
        switch ($max) {
            case 2: //mes données
                $this->setMyData($this->context->getToken()->getUser()->getId());
                break;
            case 3: //mes données + organisme
                $this->setMyOrgData($this->context->getToken()->getUser()->getOrganisme());
                break;
        }
    }

    private function setMyData($id) {
        $this->queryBuilder->join('s', 'pr_occtax.v_cor_counting_role_org', 'mydata', 's.entity_source_pk_value = mydata.id_counting_occtax AND ARRAY['.$id.']::integer[] && mydata.roles');
    }

    private function setMyOrgData($id) {
        $this->queryBuilder
        ->join('s', 'pr_occtax.v_cor_counting_role_org', 'mydata', 's.entity_source_pk_value = mydata.id_counting_occtax')
        ->join('s', 'pr_occtax.v_cor_counting_role_org', 'myorgdata', 's.entity_source_pk_value = myorgdata.id_counting_occtax')
        ->addWhere('(ARRAY['.$id.']::integer[] && mydata.roles OR ARRAY['.$id.']::integer[] && myorgdata.organismes)');
    }
}