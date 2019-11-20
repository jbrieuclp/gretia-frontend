<?php

namespace API\ImportBundle\Form;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\ImportBundle\Entity\FichierChamp;
use API\ImportBundle\Entity\SyntheseFSD;

class FichierChampType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('champ')
                ->add('fieldFSD', EntityType::class, array(
                                    'class' => SyntheseFSD::class,
                                    'em' => 'geonature_db',
                                    'multiple' => false
                                ));
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => FichierChamp::class,
            'csrf_protection' => false
        ));
    }
}
