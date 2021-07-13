<?php

namespace API\ProjetBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\DateType;

use API\ProjetBundle\Entity\FonctionSalarie;
use API\ProjetBundle\Entity\Antenne;
use API\ProjetBundle\Entity\Salarie;

class SalarieType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('fonction', EntityType::class, array(
                                            'class' => FonctionSalarie::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ))
                ->add('antenne', EntityType::class, array(
                                            'class' => Antenne::class,
                                            'em' => 'gretiadb',
                                            'multiple' => false
                                        ))
                ->add('dateDebut', DateType::class, [
                                            'widget' => 'single_text',
                                            'format' => 'yyyy-MM-dd'
                                        ])
                ->add('dateFin', DateType::class, [
                                            'widget' => 'single_text',
                                            'format' => 'yyyy-MM-dd'
                                        ])
                ->add('taux');
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Salarie::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ));
    }
}