<?php

namespace API\ProjetBundle\Form;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\ProjetBundle\Entity\Projet;
use API\ProjetBundle\Entity\Personne;
use API\ProjetBundle\Entity\Etat;
use API\ProjetBundle\Entity\Type;

class ProjetType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('libelle')
                ->add('localisation')
                ->add('type', EntityType::class, array(
                                            'class' => Type::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ))
                ->add('objet')
                ->add('milieux')
                ->add('groupes')
                ->add('nbJour')
                ->add('cout')
                ->add('coutTotal')
                ->add('responsable', EntityType::class, array(
                                            'class' => Personne::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ))
                ->add('dateDebut')
                ->add('dateFin')
                ->add('dateRendu')
                ->add('etat', EntityType::class, array(
                                            'class' => Etat::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ));
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Projet::class,
            'csrf_protection' => false
        ));
    }
}
