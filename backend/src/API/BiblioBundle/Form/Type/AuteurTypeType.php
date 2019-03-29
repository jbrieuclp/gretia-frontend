<?php

namespace API\BiblioBundle\Form\Type;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

use API\BiblioBundle\Entity\AuteurType;

class AuteurTypeType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        //reconstitution de l'entité auteurType
        $auteurType = $builder->getData();

        $builder
            ->add('libelle', TextType::class, array(
                                                'required' => true,
                                                'constraints' => array(
                                                    new Length(array('max' => 255, 
                                                                    'maxMessage' => 'Le numéro de relevé ne doit pas faire plus de {{ limit }} caractères')),
                                                    new NotNull(array('message' => 'Le type d\'auteur ne peut être vide.'))
                                                )
                                                ))
        ;

    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => AuteurType::class,
        ));
    }
}
