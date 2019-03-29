<?php

namespace API\MetadataBundle\Form\Type;

use Doctrine\ORM\EntityRepository;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType ;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

use API\MetadataBundle\Entity\CadreAcquisition;

class CadreAcquisitionType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        //reconstitution de l'entité auteurType
        $auteurType = $builder->getData();

        $builder
            ->add('nom', TextType::class, array(
                                                'required' => true,
                                                'constraints' => array(
                                                    new Length(array('max' => 512, 
                                                                    'maxMessage' => 'Le nom du cadre d\'acquisition ne doit pas faire plus de {{ limit }} caractères')),
                                                    new NotBlank(array('message' => 'Le nom du cadre d\'acquisition ne peut être vide.'))
                                                )
                                                ))
            ->add('description', TextareaType::class, array('required' => false,))
            ->add('dateDebut', DateType::class, array('required' => false, 'widget' => 'single_text', 'format' => 'dd/MM/yyyy',))
            ->add('dateFin', DateType::class, array('required' => false, 'widget' => 'single_text', 'format' => 'dd/MM/yyyy',))
            ->add('acteurs', TextType::class, array('required' => false,))
            ->add('territoire', EntityType::class, array(
                                                    'class' => 'APIMetadataBundle:Territoire',
                                                    'query_builder' => function (EntityRepository $er) {
                                                        return $er->createQueryBuilder('e') 
                                                                    ->select('partial e.{id, libelle, ordre}')   
                                                                    ->orderBy('e.ordre', 'ASC');
                                                    },
                                                    'required' => false,
                                                ))
            ->add('territoireCom', TextareaType::class, array('required' => false,))
            ->add('referents', TextType::class, array('required' => false,))
            ->add('avancement', TextType::class, array('required' => false,))
            ->add('public', CheckboxType::class, array('required' => false,))
            ->add('diffusable', CheckboxType::class, array('required' => false,))
        ;

    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => CadreAcquisition::class,
        ));
    }
}
