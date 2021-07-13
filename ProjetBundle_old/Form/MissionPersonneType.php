<?php

namespace API\ProjetBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\ProjetBundle\entity\Personne;
use API\ProjetBundle\entity\MissionPersonne;

class MissionPersonneType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('personne', EntityType::class, array(
                                            'class' => Personne::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ))
            ->add('temps')
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => MissionPersonne::class,
            'csrf_protection' => false
        ));
    }
}
