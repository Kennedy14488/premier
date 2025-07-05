import { 
  Pill, 
  Stethoscope, 
  Heart, 
  Thermometer, 
  Syringe, 
  Truck, 
  Clock, 
  Shield,
  Users,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      icon: Pill,
      title: 'Vente de médicaments',
      description: 'Large gamme de médicaments génériques et de marque, disponibles sur ordonnance et en vente libre.',
      features: ['Médicaments certifiés', 'Stock permanent', 'Conseil personnalisé', 'Prix compétitifs'],
    },
    {
      icon: Stethoscope,
      title: 'Conseil pharmaceutique',
      description: 'Accompagnement personnalisé par nos pharmaciens expérimentés pour optimiser vos traitements.',
      features: ['Analyse d\'ordonnance', 'Interactions médicamenteuses', 'Posologie adaptée', 'Suivi thérapeutique'],
    },
    {
      icon: Heart,
      title: 'Mesure de tension',
      description: 'Service de mesure de tension artérielle avec interprétation et conseils préventifs.',
      features: ['Mesure précise', 'Interprétation professionnelle', 'Conseils préventifs', 'Suivi régulier'],
    },
    {
      icon: Thermometer,
      title: 'Test de glycémie',
      description: 'Contrôle rapide du taux de sucre dans le sang avec conseils nutritionnels adaptés.',
      features: ['Test rapide', 'Résultats immédiats', 'Conseils nutritionnels', 'Suivi diabétique'],
    },
    {
      icon: Syringe,
      title: 'Vaccination',
      description: 'Service de vaccination pour enfants et adultes selon le calendrier vaccinal.',
      features: ['Vaccins certifiés', 'Personnel qualifié', 'Suivi vaccinal', 'Conseils post-vaccination'],
    },
    {
      icon: Truck,
      title: 'Livraison à domicile',
      description: 'Service de livraison rapide dans Cotonou et environs pour votre confort.',
      features: ['Livraison rapide', 'Zone étendue', 'Horaires flexibles', 'Service sécurisé'],
    },
  ];

  const additionalServices = [
    {
      icon: Clock,
      title: 'Service d\'urgence 24h/24',
      description: 'Disponibilité permanente pour les urgences pharmaceutiques.',
    },
    {
      icon: Shield,
      title: 'Préparations magistrales',
      description: 'Préparation de médicaments sur mesure selon prescriptions spécifiques.',
    },
    {
      icon: Users,
      title: 'Formation et sensibilisation',
      description: 'Sessions d\'information sur l\'usage correct des médicaments.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Accueil personnalisé',
      description: 'Notre équipe vous accueille et analyse vos besoins spécifiques.',
    },
    {
      step: '02',
      title: 'Conseil expert',
      description: 'Nos pharmaciens vous conseillent et vérifient les interactions.',
    },
    {
      step: '03',
      title: 'Service adapté',
      description: 'Nous vous proposons le service le plus adapté à votre situation.',
    },
    {
      step: '04',
      title: 'Suivi continu',
      description: 'Nous assurons un suivi pour garantir l\'efficacité de votre traitement.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-max section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nos services pharmaceutiques
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Une gamme complète de services de santé pour vous accompagner 
              au quotidien avec professionnalisme et bienveillance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Services principaux
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des services pharmaceutiques complets pour répondre à tous vos besoins de santé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Notre processus de service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche structurée pour vous garantir le meilleur service pharmaceutique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Services complémentaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des services additionnels pour une prise en charge complète de votre santé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Horaires d'ouverture
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Nous sommes ouverts 7 jours sur 7 pour répondre à vos besoins de santé.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-primary-500">
                  <span className="font-medium">Lundi - Samedi</span>
                  <span className="text-primary-100">7h00 - 20h00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary-500">
                  <span className="font-medium">Dimanche</span>
                  <span className="text-primary-100">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Urgences</span>
                  <span className="text-primary-100">24h/24 - 7j/7</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8">
                <Clock className="h-16 w-16 text-primary-200 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Service d'urgence</h3>
                <p className="text-primary-100 mb-6">
                  Pour toute urgence pharmaceutique, contactez-nous immédiatement.
                </p>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  Urgence WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;