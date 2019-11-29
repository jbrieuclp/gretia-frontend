<?php

namespace API\ImportBundle\Form;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Regex;

use API\ImportBundle\Entity\Fichier;

class FichierType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('table', TextType::class, array(
                                    'required' => true,
                                    'constraints' => array(
                                        new NotBlank(array('message' => 'Veuillez renseigner un nom court de fichier')),
                                        new Regex(
                                            array('pattern' => '/^gn_imports\.[a-z][a-z1-9_]*$/', 
                                                    'htmlPattern' => '^gn_imports\.[a-z][a-z1-9_]*$',
                                                    'message' => 'Le nom de la table doit commencer par "gn_imports." une lettre minuscule doit suivre, la suite ne peut que contenir lettres en minucule, chiffre ou "_". Les espaces sont interdits"'))
                                    )))
                ->add('file', FileType::class, array(
                                    'constraints' => array(
                                        new File(array(  'maxSize' => '20M', 
                                                    'mimeTypes' => array('text/csv', 'text/plain'),
                                                    'maxSizeMessage' => 'Le fichier importé est trop gros ({{ size }} {{ suffix }}). La taille maximum autorisée est de {{ limit }} {{ suffix }}',
                                                    'mimeTypesMessage' => 'Le fichier importé est de type invalide ({{ type }}). Les type autorisés sont {{ types }}',
                                                 )),
                                        )));
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Fichier::class,
            'csrf_protection' => false
        ));
    }
}
