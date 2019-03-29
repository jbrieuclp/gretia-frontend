<?php

namespace API\BiblioBundle\Form\Type;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\BiblioBundle\Entity\PublicationAuteur;
use API\BiblioBundle\Entity\Auteur;
use API\BiblioBundle\Entity\AuteurType;

class PublicationAuteurType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('auteur', EntityType::class, array(
                                            'class' => Auteur::class,
                                            'em' => 'bibliodb'
                                        ))
                ->add('type', EntityType::class, array(
                                            'class' => AuteurType::class,
                                            'em' => 'bibliodb'
                                        ))
                ->add('ordre');

    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => PublicationAuteur::class,
            'csrf_protection' => false
        ));
    }
}
