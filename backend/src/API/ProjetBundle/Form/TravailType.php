<?php

namespace API\ProjetBundle\Form;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\DateIntervalType;
use Symfony\Component\Form\CallbackTransformer;

use API\ProjetBundle\Entity\Travail;
use API\ProjetBundle\Entity\Categorie;
use API\ProjetBundle\Entity\Mission;
use API\ProjetBundle\Entity\Personne;

class TravailType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('mission', EntityType::class, array(
                        'class' => Mission::class,
                        'em' => 'gretiadb',
                        'multiple' => false
                    ))
                ->add('date')
                ->add('categorie', EntityType::class, array(
                        'class' => Categorie::class,
                        'em' => 'gretiadb',
                        'multiple' => false
                    ))
                ->add('duree')
                ->add('detail')
                ->add('personne', EntityType::class, array(
                        'class' => Personne::class,
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
            'data_class' => Travail::class,
            'csrf_protection' => false
        ));
    }
}
