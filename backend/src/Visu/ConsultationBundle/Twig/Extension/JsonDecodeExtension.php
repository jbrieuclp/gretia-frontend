<?php

namespace Visu\ConsultationBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\ContainerInterface;  
use \Twig_Extension;

class JsonDecodeExtension extends Twig_Extension
{
    protected $container;

    public function __construct(ContainerInterface $container) 
    {
        $this->container = $container;
    }

    public function getName() 
    {
        return 'json_decode.extension';
    }

    public function getFilters() {
        return array(
            new \Twig_SimpleFilter('json_decode', array($this, 'jsonDecode')),
        );
    }

    public function jsonDecode($str, $assoc = false) {
        return json_decode($str, $assoc);
    }
}