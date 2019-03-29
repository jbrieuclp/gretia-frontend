<?php
/**
 *
 *	Modification JBLP pour prise en compte de la fonction postgis ST_AsEWKT
 *
 *	Réalisée le 29/03/2015
 *
 */


namespace Visu\ConsultationBundle\Query\Postgresql;

use CrEOF\Spatial\ORM\Query\AST\Functions\AbstractSpatialDQLFunction;
use CrEOF\Spatial\ORM\Query\AST\Functions\ReturnsGeometryInterface;

/**
 * ST_AsEWKT DQL function
 *
 * @author  Derek J. Lambert <dlambert@dereklambert.com>
 * @license http://dlambert.mit-license.org MIT
 */
class STAsEWKT extends AbstractSpatialDQLFunction implements ReturnsGeometryInterface
{
    protected $platforms = array('postgresql');

    protected $functionName = 'ST_AsEWKT';

    protected $minGeomExpr = 1;

    protected $maxGeomExpr = 1;
}
