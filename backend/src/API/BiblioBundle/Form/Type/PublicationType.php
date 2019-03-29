<?php

namespace API\BiblioBundle\Form\Type;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\BiblioBundle\Entity\Publication;
use API\BiblioBundle\Entity\Territoire;
use API\BiblioBundle\Entity\GuildeFonctionnelle;
use API\BiblioBundle\Entity\Taxon;
use API\BiblioBundle\Entity\Contenu;
use API\BiblioBundle\Entity\Langue;
use API\BiblioBundle\Form\Type\PublicationAuteurType;

class PublicationType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('titre')
                ->add('resume')
                ->add('anneeParution')
                ->add('collection')
                ->add('volume')
                ->add('tome')
                ->add('fascicule')
                ->add('numero')
                ->add('noSerie')
                ->add('imagePath')
                ->add('commentaires')
                ->add('inZotero')
                ->add('statutSaisie')
                ->add('statutIntegration')
                ->add('exemplaires')
                ->add('territoires', EntityType::class, array(
                                            'class' => Territoire::class,
                                            'em' => 'bibliodb',
                                            'multiple' => true,
                                        ))
                ->add('guildeFonctionnelles', EntityType::class, array(
                                            'class' => GuildeFonctionnelle::class,
                                            'em' => 'bibliodb',
                                            'multiple' => true
                                        ))
                ->add('taxons', EntityType::class, array(
                                            'class' => Taxon::class,
                                            'em' => 'bibliodb',
                                            'multiple' => true
                                        ))
                ->add('contenus', EntityType::class, array(
                                            'class' => Contenu::class,
                                            'em' => 'bibliodb',
                                            'multiple' => true
                                        ))
                ->add('langues', EntityType::class, array(
                                            'class' => Langue::class,
                                            'em' => 'bibliodb',
                                            'multiple' => true
                                        ))
                ->add('livre')
                ->add('article')
                ->add('litteratureGrise')
                ->add('document')
                ->add('chapitre')
                ->add('revue')
                ->add('auteurs', CollectionType::class, array(
                                                    // each entry in the array will be an "email" field
                                                    'entry_type'   => PublicationAuteurType::class,
                                                    'allow_add' => true,
                                                    'allow_delete' => true,
                                                    'by_reference' => false,
                                                    'entry_options' => array(
                                                        'required' => false
                                                    )
                                                ));

    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Publication::class,
            'csrf_protection' => false
        ));
    }
}
