<?php

namespace API\CoreBundle\Form\Type;

use Doctrine\ORM\EntityRepository;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\CallbackTransformer;
use API\CoreBundle\Entity\UserGeoNature;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\EqualTo;

class UserGeoNatureType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, array('label' => 'Identifiant (login) * :',
                                                'required' => true,
                                                'constraints' => array(
                                                        new NotBlank(array('message' => 'Le renseignement d\'un login est obligatoire')),
                                                        ),
                                                'attr' => array(
                                                    'class' => 'validate',
                                                    'autocomplete' => 'off',
                                                )))
            ->add('email', EmailType::class, array('label' => 'Courriel * :',
                                                'required' => true,
                                                'constraints' => array(
                                                        new NotBlank(array('message' => 'Le renseignement d\'une adresse email est obligatoire')),
                                                        new Email(array('message' => 'Votre adresse email ne semble pas correcte. Si le problème persiste, veuillez contacter l\'administrateur : webmaster@gretia.org', 'checkMX' => true)),
                                                        ),
                                                'attr' => array(
                                                    'class' => 'validate',
                                                    'autocomplete' => 'off',
                                                )))
            ->add('password', PasswordType::class, array('label' => 'Mot de passe * :',
                                                      'required' => true,
                                                      'constraints' => new NotBlank(array('message' => 'Veuillez renseigner un mot de passe')),
                                                      'attr' => array(
                                                            'class' => 'validate',
                                                            'autocomplete' => 'off',
                                                        )))
            ->add('nom', TextType::class, array('label' => 'Nom * :',
                                             'required' => true,
                                             'constraints' => new NotBlank(array('message' => 'Veuillez renseigner votre nom')),
                                             'attr' => array(
                                                    'class' => 'validate',
                                                )))
            ->add('prenom', TextType::class, array('label' => 'Prénom * :',
                                                'required' => true,
                                                'constraints' => new NotBlank(array('message' => 'Veuillez renseigner votre prenom')),
                                                'attr' => array(
                                                    'class' => 'validate',
                                                )))
            ->add('description', TextareaType::class, array('label' => 'Information complémentaire :',
                                                      'required' => false,
                                                      'attr' => array(
                                                            'class' => 'materialize-textarea',
                                                        )));
            

        $builder->get('password')
            ->addModelTransformer(new CallbackTransformer(
                // transform <br/> to \n so the textarea reads easier
                function ($originalPwd) {
                    //transformation
                    return null;
                },
                function ($submittedPwd) {
                    //valeur soumise > se retrouve cryptée 
                    return password_hash($submittedPwd, PASSWORD_BCRYPT, ['cost' => 13]);
                }
            ));
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => UserGeoNature::class
        ));
    }
}
