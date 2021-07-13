<?php

namespace API\ProjetBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

use API\ProjetBundle\Entity\TypeProjetRef;
use API\ProjetBundle\Form\TypeProjetType;

class TypeProjetRefType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('libelle')
                ->add('description')
                ->add('ordre');

        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
            $typeProjetRef = $event->getData();
            $form = $event->getForm();

            // checks if the Personne object is "new"
            if ( !$typeProjetRef || $typeProjetRef->getId() === null ) {
                $form->add('typesProjet', CollectionType::class, array(
                        // each entry in the array will be an "email" field
                        'entry_type'   => TypeProjetType::class,
                        'allow_add' => true,
                        'allow_delete' => true,
                        'by_reference' => false
                    ));
            }
        });
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => TypeProjetRef::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ));
    }
}