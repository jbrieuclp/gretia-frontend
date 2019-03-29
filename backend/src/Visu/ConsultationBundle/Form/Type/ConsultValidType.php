<?php

namespace OFSA\ConsultationBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;

use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

use Core\ToolsBundle\Form\DataTransformer\StringToArrayTransformer;

use OFSA\ContributionBundle\Validator\IsDatePossible;
use Symfony\Component\Validator\Constraints\Length;
use OFSA\ConsultationBundle\Form\Type\TaxonType;
use OFSA\ConsultationBundle\Form\Type\CommuneType;

class ConsultValidType extends AbstractType
{

    private $em;

    function __construct(EntityManager $em) {
        $this->em = $em;
    }


    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('saisie', 'entity', array(
                                    'label'    => 'Saisie par...',
                                    'class' => 'OFSAUserBundle:Observateur',
                                    'query_builder' => function (EntityRepository $er) {
                                        $qb = $er->createQueryBuilder('o');
                                        return $qb->select('partial o.{id, nom, prenom}')   
                                                    ->where($qb->expr()->exists('SELECT 1 FROM OFSAContributionBundle:Releve r WHERE r.saisie = o'))
                                                    ->orderBy('o.nom', 'ASC')
                                                    ->addOrderBy('o.prenom', 'ASC');
                                    },
                                    'choice_label' => function ($observateur) {
                                            return $observateur->getNomPrenom();
                                        },
                                    'placeholder' => '',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Saisie par...',
                                    )
                                ))
            ->add('observateur', 'entity', array(
                                    'label'    => 'Observateur :',
                                    'class' => 'OFSAUserBundle:Observateur',
                                    'query_builder' => function (EntityRepository $er) {
                                        return $er->createQueryBuilder('o') 
                                                    ->select('partial o.{id, nom, prenom}')   
                                                    ->orderBy('o.nom', 'ASC')
                                                    ->addOrderBy('o.prenom', 'ASC');
                                    },
                                    'choice_label' => function ($observateur) {
                                            return $observateur->getNomPrenom();
                                        },
                                    'placeholder' => '',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Observateur',
                                    )
                                ))
            ->add('programme', 'entity', array(
                                    'label' => 'Programme :',
                                    'class' => 'OFSAProgrammeBundle:Programme',
                                    'query_builder' => function (EntityRepository $er) {
                                        return $er->createQueryBuilder('e') 
                                                    ->select('partial e.{id, libelle}')   
                                                    ->orderBy('e.libelle', 'ASC');
                                    },
                                    'choice_label' => 'libelle',
                                    'placeholder' => '',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Programme',
                                    )
                                ))
            ->add('producteur', 'entity', array(
                                    'label'    => 'Organisme producteur :',
                                    'class' => 'OFSAOrganismeBundle:Organisme',
                                    'query_builder' => function (EntityRepository $er) {
                                        $qb = $er->createQueryBuilder('o');
                                        return $qb->select('partial o.{id, nom}')  
                                                  ->where($qb->expr()->exists('SELECT 1 FROM OFSAContributionBundle:ReleveObservateur r WHERE r.organisme = o')) 
                                                  ->orderBy('o.nom', 'ASC');
                                    },
                                    'choice_label' => 'nom',
                                    'placeholder' => '',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Org. producteur',
                                    )
                                ))
            ->add('commanditaire', 'entity', array(
                                    'label'    => 'Organisme commanditaire :',
                                    'class' => 'OFSAOrganismeBundle:Organisme',
                                    'query_builder' => function (EntityRepository $er) {
                                        $qb = $er->createQueryBuilder('o');
                                        return $qb->select('partial o.{id, nom}')  
                                                  ->where($qb->expr()->exists('SELECT 1 FROM OFSAContributionBundle:Releve r WHERE r.commanditaire = o'))
                                                  ->orderBy('o.nom', 'ASC');
                                    },
                                    'choice_label' => 'nom',
                                    'placeholder' => '',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Org. commanditaire',
                                    )
                                ))
            ->add('communes', new CollectionType(), array(
                                    // each entry in the array will be an "email" field
                                    'entry_type'   => new CommuneType,
                                    'cascade_validation' => true,
                                    'allow_add' => true,
                                    'allow_delete' => true,
                                    'by_reference' => false,
                                ))
            ->add('departement', new HiddenType(), array(
                                    'label' => 'Département :',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control',
                                        'placeholder' => 'Département',
                                    )))
            ->add('territoire', 'entity', array(
                                    'label'    => 'Territoire :',
                                    'class' => 'OFSAReferentielBundle:Territoire',
                                    'query_builder' => function (EntityRepository $er) {
                                        return $er->createQueryBuilder('e') 
                                                    ->select('partial e.{id, libelle}')   
                                                    ->orderBy('e.libelle', 'ASC');
                                    },
                                    'choice_label' => 'libelle',
                                    'placeholder' => '',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Territoire',
                                    )
                                ))
            ->add('geom', new HiddenType(), array('required' => false,))
            ->add('dateDebut', new DateType, array(
                                    'label' => 'Date début :',
                                    'constraints' => array(
                                        new IsDatePossible('Veuillez renseigner une date de début de période d\'observations valide')),
                                    'widget' => 'single_text',
                                    'format' => 'dd/MM/yyyy',
                                    'required'  =>  false,
                                    'attr' => array(
                                            'class' => 'form-control',
                                            'placeholder' => 'JJ/MM/AAAA',
                                        )
                                ))
            ->add('dateFin', new DateType, array(
                                    'label' => 'Date fin :',
                                    'constraints' => array(
                                        new IsDatePossible('Veuillez renseigner une date de fin de période d\'observations valide')),
                                    'widget' => 'single_text',
                                    'format' => 'dd/MM/yyyy',
                                    'required'  =>  false,
                                    'attr' => array(
                                            'class' => 'form-control',
                                            'placeholder' => 'JJ/MM/AAAA',
                                        )
                                ))
            ->add('origine', 'entity', array(
                                    'label'    => 'Origine du relevé :',
                                    'class' => 'OFSAContributionBundle:OrigineReleve',
                                    'query_builder' => function (EntityRepository $er) {
                                        return $er->createQueryBuilder('e') 
                                                    ->select('partial e.{id, libelle}')   
                                                    ->orderBy('e.libelle', 'ASC');
                                    },
                                    'choice_label' => 'libelle',
                                    'placeholder' => '',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Origine du relevé',
                                    )
                                ))
            ->add('type', new HiddenType(), array(
                                    'label' => 'Type de relevé :',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control',
                                        'placeholder' => 'Type de relevé',
                                    )))
            //recherche sur id releve et numero releve
            ->add('relId', new TextType, array(
                                    'label' => 'Identifiant de relevé :',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control',
                                        'placeholder' => 'ID relevé',
                                    )
                                    ))
            ->add('relNum', new TextType, array(
                                    'label' => 'Numero de relevé :',
                                    'required' => false,
                                    'constraints' => new Length(array('max' => 30, 
                                                                'maxMessage' => 'Le numéro de relevé ne doit pas faire plus de {{ limit }} caractères')),
                                    'attr' => array(
                                        'class' => 'form-control',
                                        'placeholder' => 'Ex : 20140321-AB-001',
                                    )
                                    ))
            //FIN recherche sur id releve et numero releve
            ->add('taxons', new CollectionType(), array(
                                    // each entry in the array will be an "email" field
                                    'entry_type'   => new TaxonType,
                                    'cascade_validation' => true,
                                    'allow_add' => true,
                                    'allow_delete' => true,
                                    'by_reference' => false,
                                ))
            ->add('note', new HiddenType(), array(
                                    'label' => 'Note de validitée :',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control',
                                        'placeholder' => 'Note',
                                    )))
            ->add('protection', new HiddenType(), array(
                                    'label' => 'Statut de protection :',
                                    'required' => false,
                                    'attr' => array(
                                        'class' => 'form-control',
                                        'placeholder' => 'Statut de protection',
                                    )))
            ->add('groupe', new ChoiceType, array(
                                    'label' => 'Groupe taxonomique :',
                                    'choices' => $this->em->getRepository('OFSATaxonBundle:Taxref')->getGroupeSelect(),
                                    'required' => false,
                                    'expanded' => false,
                                    'multiple' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Groupe taxonomique'
                                    )
                                ))
            ->add('famille', new ChoiceType, array(
                                    'label' => 'Famille taxonomique :',
                                    'choices' => $this->em->getRepository('OFSATaxonBundle:Taxref')->getFamilleSelect(),
                                    'required' => false,
                                    'expanded' => false,
                                    'multiple' => false,
                                    'attr' => array(
                                        'class' => 'form-control select2',
                                        'placeholder' => 'Famille taxonomique'
                                    )
                                ))
        ;

        $builder->get('departement')
                    ->addModelTransformer(new StringToArrayTransformer());
        $builder->get('note')
                    ->addModelTransformer(new StringToArrayTransformer());
        $builder->get('protection')
                    ->addModelTransformer(new StringToArrayTransformer());
        $builder->get('type')
                    ->addModelTransformer(new StringToArrayTransformer());
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array());
    }

    public function getName()
    {
        return 'consult_valid';
    }

}
