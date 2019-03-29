<?php

namespace API\CoreBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;

use API\CoreBundle\Entity\UserGeoNature;

class UserController extends FOSRestController implements ClassResourceInterface
{
    
    /**
    * @Rest\View(serializerGroups = {"user_get"})
    * @ Security("has_role('GESTION_DROIT')")
    *
    * @Rest\Get("/users")
    */
    public function getAllUsersActions()
    {

      $em = $this->getDoctrine()->getManager('geonature_db');
      $users = $em->getRepository('APICoreBundle:UserGeoNature')->findAll();
      return $users;
    }

    /**
    * @Rest\View(serializerGroups = {"user_get"})
    *
    * @Rest\Post("/inscription")
    * @ParamConverter("user", converter="fos_rest.request_body")
    */
    public function registerAction(UserGeoNature $user)
    {

      $errors = $this->get('validator')->validate($user);

      if (count($errors)) {
          return $this->view($errors, Response::HTTP_BAD_REQUEST);
      }

      $em = $this->getDoctrine()->getManager('geonature_db');
      $uuid = $this->get('api_core_uuid');

      $user->setDateCreation(new \Datetime());
	    $user->setDateUpdate(new \Datetime());
	    $user->setGroupe(false);
      $user->setUuid($uuid->v5($uuid->v4(), 'gretia.org'));
      $user->setPassword(password_hash($user->getPassword(), PASSWORD_BCRYPT, ['cost' => 13]));
      $user->setUnite(-1);
      $user->setOrganisme(-1);
      $user->setOrganismeTxt('Autre');

      $em->persist($user);
      $em->flush();

      return $user;
    }

    /*public function inscriptionAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager('geonature_db');
        $uuid = $this->get('api_core_uuid');

		    $user = new UserGeoNature();
		    $user->setDateCreation(new \Datetime());
		    $user->setDateUpdate(new \Datetime());
		    $user->setGroupe(false);

		    $form = $this->createForm(UserGeoNatureType::class, $user);
	  	  
	  	  if ($form->handleRequest($request)->isValid()) {
		    	$user->setUuid($uuid->v5($uuid->v4(), 'gretia.org'));
					//$em->persist($user);
        	//$em->flush();

					$request->getSession()->getFlashBag()->add('information', 'Votre inscription a bien été faite.');
				//	return $this->redirect($this->generateUrl('app_index'));
				}

				// À ce stade :
				// - Soit la requête est de type GET, donc le visiteur vient d'arriver sur la page et veut voir le formulaire
				// - Soit la requête est de type POST, mais le formulaire n'est pas valide, donc on l'affiche de nouveau

		    return $this->render('APICoreBundle:User:inscription.html.twig', array(
		      'form'   => $form->createView(),
		      'user'   => $user,
		    ));
    }*/
}
