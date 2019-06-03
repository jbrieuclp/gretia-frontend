<?php

namespace API\ProjetBundle\Form;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\ProjetBundle\Entity\Mission;
use API\ProjetBundle\Entity\Projet;

class MissionType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('libelle')
                ->add('detail')
                ->add('projet', EntityType::class, array(
                                            'class' => Projet::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ))
                ->add('nbJour')
                ->add('etat');
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Mission::class,
            'csrf_protection' => false
        ));
    }
}
