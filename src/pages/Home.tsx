import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Heart, Users, Award, MapPin } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Médicaments certifiés',
      description: 'Tous nos médicaments sont certifiés et proviennent de laboratoires agréés.',
    },
    {
      icon: Clock,
      title: 'Ouvert 7j/7',
      description: 'Nous sommes ouverts tous les jours pour répondre à vos besoins de santé.',
    },
    {
      icon: Heart,
      title: 'Conseil personnalisé',
      description: 'Notre équipe de pharmaciens vous accompagne avec des conseils adaptés.',
    },
    {
      icon: Users,
      title: 'Équipe experte',
      description: 'Plus de 10 ans d\'expérience au service de votre santé et bien-être.',
    },
  ];

  const services = [
    {
      title: 'Pharmacie générale',
      description: 'Large gamme de médicaments génériques et de marque',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Conseil pharmaceutique',
      description: 'Accompagnement personnalisé par nos pharmaciens',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Services de santé',
      description: 'Mesure de tension, test de glycémie, vaccination',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max section-padding py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Votre santé,
                  <span className="block text-primary-200">notre priorité</span>
                </h1>
                <p className="text-xl text-primary-100 leading-relaxed">
                  Pharmacie moderne au cœur de Cotonou, nous vous accompagnons 
                  avec des médicaments de qualité et des conseils professionnels.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  Voir nos produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
                >
                  Urgence WhatsApp
                </a>
              </div>

              <div className="flex items-center space-x-6 text-primary-100">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>+10 ans d'expérience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Cotonou, Bénin</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Pharmacie moderne"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary-400/30 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir la Pharmacie du Soleil ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous nous engageons à vous offrir le meilleur service pharmaceutique 
              avec une approche humaine et professionnelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète de services pharmaceutiques pour prendre soin 
              de votre santé au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                  >
                    En savoir plus
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Besoin d'aide ou de conseils ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Notre équipe de pharmaciens expérimentés est là pour vous accompagner. 
            N'hésitez pas à nous contacter pour toute question.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              Nous contacter
            </Link>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              WhatsApp direct
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;