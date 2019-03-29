<?php
// OPNA\PortailBundle\Services\IndicateurService.php
namespace Taxref\TaxrefMatchBundle\Services;

use Doctrine\DBAL\Connection;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Session\Session;

use Taxref\TaxrefMatchBundle\Entity\TaxrefMatch;


class NameCheckerService
{

	/**
    *
    * @var Connection
    */
    protected $connection;
    protected $request;
    protected $session;
    private $taxrefMatch;

    private $taxref = 'taxref.taxref_11';

    public function __construct(Connection $dbalConnection, RequestStack $request, Session $session)
    {
        $this->connection = $dbalConnection;    
        $this->request = $request->getCurrentRequest();   
        $this->session = $session;   

        $this->taxrefMatch = $this->getTaxrefMatch();
    }

    public function check() 
    {
        $this->taxrefMatch->setSource($this->request->request->get('taxons'));
        
        $this->rechercheExacte();
        $this->rechercheLbNom();
        $this->rechercheLbNom('genre_espece');
    //    $this->rechercheLbNom('genre');
        $this->rechercheLevenshtein();
        $this->rechercheLevenshtein('genre_espece');

        $this->saveTaxrefMatch();
        return $this->taxrefMatch;
    }

    public function attribution() 
    {      
        $attributions = $this->request->request->get('rattachement');

        if ( !empty($attributions) )
        {
            foreach ($attributions as $value) {
                if ( !empty($value['cd_nom']) )
                {
                    $this->taxrefMatch->addCdNomValue($value['nom'], $value['cd_nom']);
                }
            }
        }

        $this->saveTaxrefMatch();
        return $this->taxrefMatch;
    }

    public function export() 
    {      
        if ( !count($this->taxrefMatch->getCdNomValues()) )
            return array();

        $sql = "WITH 
                elements (nom, cd_nom) AS (VALUES ";

        $numItems = count($this->taxrefMatch->getCdNomValues());
        $i = 0;
        foreach ($this->taxrefMatch->getCdNomValues() as $nom => $cd_nom) {
            $sql .= "('".str_replace("'", "''", $nom)."', ".$cd_nom.")";
            if(++$i !== $numItems) {
               $sql .= ", ";
            }
        }

        $sql .= ") ";

        $sql .= "SELECT e.nom, taxref.cd_nom, taxref.nom_complet, taxref.cd_ref, taxref.nom_valide
                 FROM elements e
                 INNER JOIN ".$this->taxref." taxref ON e.cd_nom = taxref.cd_nom";

        $requete = $this->connection->prepare($sql);

        $requete->execute();

        $retour = [];
        foreach ($requete->fetchAll() as $data) {
            $retour[$data['nom']] = array('cd_nom' => $data['cd_nom'], 'nom_complet' => $data['nom_complet'], 'cd_ref' => $data['cd_ref'], 'nom_valide' => $data['nom_valide']);
        }

        return $retour;
    }


    private function rechercheExacte() 
    {
        $elements = [];
        foreach ($this->taxrefMatch->getCleanValues() as $value => $taxref) 
        {
            //si c'est un tableau, la valeur est déjà rattachée à taxrerf
            if ( !is_array($taxref) ) 
            {
                $elements[] = $value;
            }
        }

        //si aucun element on sort
        if ( !count($elements) )
            return;

        $sql = "WITH 
                elements (nom) AS (VALUES 
                    ('".implode('\'), (\'', str_replace("'", "''", $elements))."')
                ) ";

        $sql .= "SELECT e.nom, taxref.cd_nom, taxref.nom_complet, taxref.cd_ref, taxref.nom_valide
                 FROM elements e
                 INNER JOIN ".$this->taxref." taxref ON lower(e.nom) = lower(taxref.nom_complet)";

        $requete = $this->connection->prepare($sql);

        $requete->execute();

        foreach ($requete->fetchAll() as $data) 
        {
            $this->taxrefMatch->addTaxrefToValue(
                                    $data['nom'], 
                                    array('cd_nom' => $data['cd_nom'], 
                                          'nom_complet' => $data['nom_complet'],
                                          'cd_ref' => $data['cd_ref'],
                                          'nom_valide' => $data['nom_valide'],
                                    ));
        }

    }

    private function rechercheLbNom($case = null) 
    {
        $elements = [];
        foreach ($this->taxrefMatch->getCleanValues() as $value => $taxref) 
        {
            //si c'est un tableau, la valeur est déjà rattachée à taxrerf
            if ( !is_array($taxref) ) 
            {
                if ( $case === 'genre_espece')
                {
                    if ( preg_match('/(.[^\s]+\s.[^\s]+)\s?.*/', $value, $matches) )
                    {
                        $elements[] = str_replace("'", "''", $value)."', '".str_replace("'", "''", trim($matches[1]));
                    }
                } 
                elseif ( $case === 'genre' )
                {
                    if ( preg_match('/(.[^\s]+)\s?.*/', $value, $matches) )
                    {
                        $elements[] = str_replace("'", "''", $value)."', '".str_replace("'", "''", trim($matches[1]));
                    }
                } 
                else
                {
                    if ( preg_match('/(.*) (sp\.?|ssp\.?|gr\.?|cf\.?)( |$)/', $value, $matches) )
                    {
                        $elements[] = str_replace("'", "''", $value)."', '".str_replace("'", "''", trim($matches[1]));
                    } else {
                        $elements[] = str_replace("'", "''", $value)."', '".str_replace("'", "''", trim($value));
                    }
                } 
            }
        }

        //si aucun element on sort
        if ( !count($elements) )
            return;
        $sql = "WITH 
                elements (nom, recherche) AS (VALUES 
                    ('".implode('\'), (\'', $elements)."')
                ) ";

        $sql .= "SELECT e.nom, taxref.cd_nom, taxref.nom_complet, taxref.cd_ref, taxref.nom_valide
                 FROM elements e
                 INNER JOIN ".$this->taxref." taxref ON lower(e.recherche) = lower(taxref.lb_nom)";

        $requete = $this->connection->prepare($sql);

        $requete->execute();

        foreach ($requete->fetchAll() as $data) 
        {
            $this->taxrefMatch->addTaxrefToValue(
                                    $data['nom'], 
                                    array('cd_nom' => $data['cd_nom'], 
                                          'nom_complet' => $data['nom_complet'],
                                          'cd_ref' => $data['cd_ref'],
                                          'nom_valide' => $data['nom_valide'],
                                    ));
        }

    }


    private function rechercheLevenshtein($case = null) 
    {
        foreach ($this->taxrefMatch->getCleanValues() as $value => $taxref) 
        {
            //si c'est un tableau, la valeur est déjà rattachée à taxrerf
            if ( !is_array($taxref) ) 
            {
                if ( $case === 'genre_espece')
                {
                    if ( preg_match('/(.[^\s]+\s.[^\s]+)\s?.*/', $value, $matches) )
                    {
                        $recherche = array('nom' => $value, 'recherche' => trim($matches[1]));
                    }
                } 
                else
                {
                    if ( preg_match('/(.*) (sp\.?|ssp\.?|gr\.?|cf\.?)( |$)/', $value, $matches) )
                    {
                        $recherche = array('nom' => $value, 'recherche' => trim($matches[1]));
                    } else {
                        $recherche = array('nom' => $value, 'recherche' => trim($value));
                    }
                } 



                $sql = "SELECT '".str_replace("'", "''", $recherche['nom'])."'::text as nom, taxref.cd_nom, taxref.nom_complet, taxref.cd_ref, taxref.nom_valide
                        FROM ".$this->taxref." taxref
                        WHERE levenshtein(lb_nom, '".str_replace("'", "''", $recherche['recherche'])."') < 3";

                $requete = $this->connection->prepare($sql);

                $requete->execute();

                foreach ($requete->fetchAll() as $data) 
                {
                    $this->taxrefMatch->addTaxrefToValue(
                                            $data['nom'], 
                                            array('cd_nom' => $data['cd_nom'], 
                                                  'nom_complet' => $data['nom_complet'],
                                                  'cd_ref' => $data['cd_ref'],
                                                  'nom_valide' => $data['nom_valide'],
                                            ));
                }




            }

        }        

    }


    private function execute()
    {
        $this->saisieArray = preg_split('/\n|\r\n?/', $this->saisie);

        foreach (array_unique($this->saisieArray) as $value) {
            //on netoit le texte
            $textCorrige = $this->textClean($value);

            //on génère un tableau des valeurs saisie (dédoublonnée) en associant les clée initiales (doublons), le texte cleané et plus tard la valeir taxref
            $this->saisieUniq[$value] = array(
                                                'keys_saisie_array' => array_key($this->saisieArray, $value),
                                                'textCorrige' => $textCorrige, 
                                                'taxref' => null);
            $this->addCorrectData($textCorrige);
        }

        //Faire la comparaison à taxref

    }

    

    private function addCorrectData($data)
    {
        $this->data_corrige[$textCorrige] = $textCorrige;

        return $this;
    }


    private function taxrefJoin()
    {
        $sql =  "WITH elements (nom) AS (VALUES (".implode('), (', array_keys($this->data_corrige)).")) ";

    }


    private function saveTaxrefMatch()
    {
        $this->session->set('taxrefMatch', $this->taxrefMatch->serialize());
    }

    public function getTaxrefMatch()
    {
        $this->taxrefMatch = new TaxrefMatch();

        //si une session existe deja on la peuple
        if ( $this->session->get('taxrefMatch') !== null ) {
            $this->taxrefMatch = $this->taxrefMatch->unserialize($this->session->get('taxrefMatch'));
        } 

        return $this->taxrefMatch;
    }

}
