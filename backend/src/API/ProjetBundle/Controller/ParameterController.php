<?php

namespace API\ProjetBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use API\ProjetBundle\Entity\Categorie;
use API\ProjetBundle\Entity\Etat;
use API\ProjetBundle\Entity\Type;

use API\ProjetBundle\Form\CategorieType;
use API\ProjetBundle\Form\EtatType;
use API\ProjetBundle\Form\TypeType;

/**
    //PARAM
    GET /types : retourne la liste des types de projets
    GET /type/id : retourne le type de projet id
    POST /type : create le type de projet id
    PUT /type/id : update le type de projet id
    DELETE /type/id : delete le type de projet id
    GET /etats : retourne la liste des etats de projets
    GET /etat/id : retourne le etat de projet id
    POST /etat : create le etat de projet id
    PUT /etat/id : update le etat de projet id
    DELETE /etat/id : delete le etat de projet id
    GET /categories : retourne la liste des categories de travail
    GET /categorie/id : retourne le categorie de projet id
    POST /categorie : create le categorie de projet id
    PUT /categorie/id : update le categorie de projet id
    DELETE /categorie/id : delete le categorie de projet id
**/

class ParameterController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/{element}", requirements={"element"="categories|etats|types"})
    */
    public function getAllAction(Request $request, $element)
    {
        //On transforme le parametre pour enlever le S terminal
        $element = substr($element, 0, -1);
        //parametrage de la serialization de retour
        $request->attributes->get('_template')->setSerializerGroups(array($element));
        
        $em = $this->getDoctrine()->getManager('gretiadb');
        $items = $em->getRepository('APIProjetBundle:'.ucfirst($element))->findAll();
        return $items;
    }

    /**
    * @Rest\View(serializerGroups = {"projet"})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Get("/{element}/{id}", requirements={"element"="categorie|etat|type"})
    */
    public function getAction(Request $request, $element, $id)
    {
        //parametrage de la serialization de retour
        $request->attributes->get('_template')->setSerializerGroups(array($element));
        
        $em = $this->getDoctrine()->getManager('gretiadb');
        $item = $em->getRepository('APIProjetBundle:'.ucfirst($element))->find($id);
        return $item;
    }

    /**
    * @Rest\View(serializerGroups = {})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Post("/{element}", requirements={"element"="categorie|etat|type"})
    */
    public function postAction(Request $request, $element)
    {
        //transformation en classe d'entité et de form
        $entity = 'API\ProjetBundle\Entity\\'.ucfirst($element);
        $formType = 'API\ProjetBundle\Form\\'.ucfirst($element).'Type';
        //parametrage de la serialization de retour
        $request->attributes->get('_template')->setSerializerGroups(array($element));

        $item = new $entity();
        $form = $this->createForm($formType, $item);

        $form->submit(json_decode($request->getContent(), true)); // Validation des données

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('gretiadb');
            $em->persist($item);
            $em->flush();
            return $item;
        } else {
            return $form;
        }

    }

    /**
    * @Rest\View(serializerGroups = {})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Put("/{element}/{id}", requirements={"element"="categorie|etat|type"})
    */
    public function putAction(Request $request, $element, $id)
    {
        $formType = 'API\ProjetBundle\Form\\'.ucfirst($element).'Type';
        //parametrage de la serialization de retour
        $request->attributes->get('_template')->setSerializerGroups(array($element));

        $em = $this->getDoctrine()->getManager('gretiadb');
        $item = $em->getRepository('APIProjetBundle:'.ucfirst($element))->find($id);

        if ($item === null) {
            return new NotFoundHttpException(ucfirst($element)." non trouvée", 1);   
        }

        $form = $this->createForm($formType, $item);
        $form->submit(json_decode($request->getContent(), true)); // Validation des données

        if ($form->isValid()) {
            $em->persist($item);
            $em->flush();
            return $item;
        } else {
            return $form;
        }
    }

    /**
    * @Rest\View(serializerGroups = {})
    * @Security("has_role('GESTION_PROJET')")
    *
    * @Rest\Delete("/{element}/{id}", requirements={"element"="categorie|etat|type"})
    */
    public function deleteAction(Request $request, $element, $id)
    {
        //parametrage de la serialization de retour
        $request->attributes->get('_template')->setSerializerGroups(array($element));

        try {
            $em = $this->getDoctrine()->getManager('gretiadb');
            $item = $em->getRepository('APIProjetBundle:'.ucfirst($element))->find($id);
            $em->remove($item);
            $em->flush();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }



}
