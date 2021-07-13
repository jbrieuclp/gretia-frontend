<?php

namespace API\ProjetBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\ProjetBundle\Entity\Projet;
use API\ProjetBundle\Entity\TypeProjet;
use API\ProjetBundle\Entity\Tache;
use API\ProjetBundle\Entity\Salarie;
use API\ProjetBundle\Entity\Localisation;

class ProjetType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('code')
                ->add('intitule')
                ->add('objectif')
                ->add('dateDebut', DateType::class, [
                                            'widget' => 'single_text',
                                            'format' => 'yyyy-MM-dd'
                                        ])
                ->add('dateFin', DateType::class, [
                                            'widget' => 'single_text',
                                            'format' => 'yyyy-MM-dd'
                                        ])
                ->add('typeProjet', EntityType::class, array(
                                            'class' => TypeProjet::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ))
                ->add('localisations', EntityType::class, array(
                                            'class' => Localisation::class,
                                            'em' => 'gretiadb',
                                            'multiple' => true
                                        ))
                ->add('responsables', EntityType::class, array(
                                            'class' => Salarie::class,
                                            'em' => 'gretiadb',
                                            'multiple' => true
                                        ))
                ->add('taches', EntityType::class, array(
                                            'class' => Tache::class,
                                            'em' => 'gretiadb',
                                            'multiple' => true
                                        ));
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Projet::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ));
    }
}