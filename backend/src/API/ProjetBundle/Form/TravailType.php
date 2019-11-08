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
                /*->add('duree', DateIntervalType::class, [
                        // ...
                        'invalid_message' => 'You entered an invalid value, it should include %num% letters',
                        'invalid_message_parameters' => ['%num%' => 6],
                    ])*/
                    ->add('duree')
                    ->add('detail');

        $builder->get('duree')
                ->addModelTransformer(new CallbackTransformer(
                    function ($dureeAsInterval) {
                        return $dureeAsInterval;
                        return is_null($dureeAsInterval) ? '0' : $dureeAsInterval->days*1440 + $dureeAsInterval->h.".".$dureeAsInterval->i;
                    },
                    function ($dureeAsFloat) {
                        //transform float number to DateInterval
                        $h = floor($dureeAsFloat);
                        $m = ceil(($dureeAsFloat-$h) * 60);
                        return $h." hours ".$m." minutes";
                    }
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
