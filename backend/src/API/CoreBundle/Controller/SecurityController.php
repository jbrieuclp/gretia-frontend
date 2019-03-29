<?php

namespace API\CoreBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SecurityController extends FOSRestController implements ClassResourceInterface
{

  /**
   * @Rest\View()
   */
  public function registerAction(Request $request)
  {
      $userManager = $this->get('fos_user.user_manager');
      $entityManager = $this->get('doctrine')->getManager('gretiadb');

      $data = $this->get('jms_serializer')->deserialize($request->getContent(), 'array', 'json');

      if ( empty($data['username']) )
        throw new HttpException(400, "Un login est obligatoire");

      if ( empty($data['email']) )
        throw new HttpException(400, "Une adresse email est obligatoire");

      if ( empty($data['password']) )
        throw new HttpException(400, "Un mot de passe est obligatoire");

      // Do a check for existing user with userManager->findUserByUsername
      if ( count($userManager->findUserByUsername($data['username'])) )
        throw new HttpException(400, "Login déjà utilisé");

      // Do a check for existing user with userManager->findUserByEmail
      if ( count($userManager->findUserByEmail($data['email'])) )
        throw new HttpException(400, "Adresse mail déjà utilisée");

      if ( $data['password'] !== $data['password_confirmation'] )
        throw new HttpException(400, "Erreur de confirmation de mot de passe");
        
      //Do check password
      $user = $userManager->createUser();
      $user->setUsername($data['username']);
      $user->setEmail($data['email']);
      $user->setPlainPassword($data['password']);
      $user->setEnabled(true);

      $userManager->updateUser($user);

      return $this->generateToken($user);
  }


  protected function generateToken($user)
  {
    $time_to_expire = $this->container->getParameter('jwt_token_ttl');
    // Generate the token
    $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($user);
    $response = array(
        'token' => $token,
        'id'  => $user->getId(),
        'username'  => $user->getUsername(), 
        'lastLogin'  => $user->getLastLogin(), 
        'expires_at'  => date('c', time() + $time_to_expire),
    );

    return $response; 
  }

}

