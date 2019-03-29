<?php
// Core\ToolsBundle\Services\SpatialService.php
namespace Visu\ConsultationBundle\Services;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SpatialService
{

	/**
    *
    * @var Connection
    */
    protected $connection;
    private $context;


    public function __construct(Connection $dbalConnection, AuthorizationChecker $authorization, TokenStorage $context)  {
        $this->connection = $dbalConnection;    
        $this->context = $context;    
        $this->authorization = $authorization;    
    }
	

	public function isNotNull($geom)
    {
        if(!is_object($geom)) {
            $geom = trim($geom);
            if(empty($geom)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Cette fonction recupère les données permettant de generer un geojson pour une echelle spécifié
     * Sortie : tableau associatif des données
     */
    public function getGeomFromGeoJSON($geojson, $sridInit = 3857, $sridTarget = 4326)
    {
        if (!$this->isNotNull($geojson)) {
            return null;
        }

        $requete = $this->connection->prepare("SELECT ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON(:geojson), :sridInit), :sridTarget) as geom");

        $requete->bindValue(':geojson', json_encode($geojson), \PDO::PARAM_STR);
        $requete->bindValue(':sridInit', $sridInit, \PDO::PARAM_INT);
        $requete->bindValue(':sridTarget', $sridTarget, \PDO::PARAM_INT);
        $requete->execute();

        $result = $requete->fetch();

        return $result['geom'];
    }

    public function getGeomFromEWKT($ewkt, $sridTarget = 4326)
    {
        if (!$this->isNotNull($ewkt)) {
            return null;
        }

        $requete = $this->connection->prepare("SELECT ST_Transform(ST_GeomFromEWKT(:ewkt), :sridTarget) as geom");

        $requete->bindValue(':ewkt', $ewkt, \PDO::PARAM_STR);
        $requete->bindValue(':sridTarget', $sridTarget, \PDO::PARAM_INT);

        $requete->execute();

        $result = $requete->fetch();

        return $result['geom'];
    }

    public function isGeomValid($geom)
    {

        if (!$this->isNotNull($geom)) {
            return true;
        }

        $requete = $this->connection->prepare("SELECT ST_IsValid(:geom::geometry) as valid");

        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();

        $result = $requete->fetch();

        return $result['valid'];
    }

    public function getType($geom)
    {
        if (!$this->isNotNull($geom)) {
            return null;
        }

        $requete = $this->connection->prepare("SELECT ST_GeometryType(:geom::geometry) as type");

        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();

        $result = $requete->fetch();

        return $result['type'];
    }

    public function getIntersectCommune($geom)
    {
        if (!$this->isNotNull($geom)) {
            return array();
        }

        $requete = $this->connection->prepare("SELECT insee_comm, nom_comm||' ('||insee_dept||')' as libelle FROM referentiel.communes_fr WHERE ST_Intersects(the_geom_full, ST_Transform(:geom::geometry, 2154))");

        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();

        $result = $requete->fetchAll();

        $requete->closeCursor();

        return $result;
    }

    public function isCommuneUnique($geom)
    {
        if (!$this->isNotNull($geom)) {
            return false;
        }

        $geom = $this->getGeomFromGeoJSON($geom);

        $requete = $this->connection->prepare("SELECT insee_comm 
              FROM referentiel.communes_fr 
              WHERE ST_Intersects(the_geom_full, ST_Transform(:geom::geometry, 2154))");

        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();

        return ($requete->rowCount() > 1) ? false : true;
    }

    public function getArea($geom)
    {
        if (!$this->isNotNull($geom)) {
            return 0;
        }

        $requete = $this->connection->prepare("SELECT ST_Area(st_transform(:geom::geometry, 2154)) AS surface");

        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();

        $result = $requete->fetch();

        return round($result['surface']);
    }

    public function getLength($geom)
    {
        if (!$this->isNotNull($geom)) {
            return 0;
        }

        $requete = $this->connection->prepare("SELECT ST_Length(ST_Transform(:geom::geometry, 2154)) AS longueur");

        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();

        $result = $requete->fetch();

        return round($result['longueur']);
    }

    public function getBuffer($geom)
    {
        if (!$this->isNotNull($geom)) {
            return 0;
        }

        $requete = $this->connection->prepare("SELECT ST_Buffer(:geom::geometry, 0) as geom");

        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);

        $requete->execute();

        $result = $requete->fetch();

        return $result['geom'];
    }

    public function getPointOnSurface($geom)
    {
        if (!$this->isNotNull($geom)) {
            return null;
        }

        $requete = $this->connection->prepare("SELECT ST_Transform(ST_PointOnSurface(:geom::geometry), 4326) as point");
        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();
        $result = $requete->fetch();

        return $result['point'];
    }

    public function getKMLToGeom($geom)
    {
        if (!$this->isNotNull($geom)) {
            return null;
        }

        $requete = $this->connection->prepare("SELECT ST_AsKML(ST_Transform(:geom::geometry, 4326)) as geom");
        $requete->bindValue(':geom', $geom, \PDO::PARAM_STR);
        $requete->execute();
        $result = $requete->fetch();

        return $result['geom'];
    }
    
    public function toGeoJson(array $datas=null, $epsg='3857', $the_geom='the_geom' ) {

        $features = array();

        foreach ($datas as &$data) {
            $geometry = '"geometry": '.$data[$the_geom];
            unset($data[$the_geom]);
            $features[] = '{"type": "Feature", '.$geometry.', "properties": '.json_encode($data).'}';    
        }

        return  '{"type": "FeatureCollection", "crs": {"type": "name", "properties":{"name":"EPSG:'.$epsg.'"}}, "features": ['.implode(', ', $features).']}';
    }

    private function getUser()
    {
        return $this->context->getToken()->getUser();
    }


}
