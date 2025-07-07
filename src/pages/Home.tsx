import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Heart, Users, Award, MapPin, Sparkles, Star, Zap, Phone, MessageCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Médicaments certifiés',
      description: 'Tous nos médicaments sont certifiés et proviennent de laboratoires agréés.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Ouvert 7j/7',
      description: 'Nous sommes ouverts tous les jours pour répondre à vos besoins de santé.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Conseil personnalisé',
      description: 'Notre équipe de pharmaciens vous accompagne avec des conseils adaptés.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Équipe experte',
      description: 'Plus de 10 ans d\'expérience au service de votre santé et bien-être.',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const services = [
    {
      title: 'Pharmacie générale',
      description: 'Large gamme de médicaments génériques et de marque',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Conseil pharmaceutique',
      description: 'Accompagnement personnalisé par nos pharmaciens',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      title: 'Services de santé',
      description: 'Mesure de tension, test de glycémie, vaccination',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-pink-600 to-red-600'
    },
  ];

  const stats = [
    { number: '10+', label: 'Années d\'expérience', icon: Award },
    { number: '5000+', label: 'Clients satisfaits', icon: Users },
    { number: '24/7', label: 'Service d\'urgence', icon: Clock },
    { number: '100%', label: 'Médicaments certifiés', icon: Shield },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section avec décorations */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="decorative-blob-1"></div>
        <div className="decorative-blob-2"></div>
        <div className="absolute inset-0 bg-dots opacity-20"></div>
        
        <div className="relative container-max section-padding py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-6 w-6 text-yellow-300 animate-bounce" />
                  <span className="text-primary-200 font-medium">Pharmacie moderne et innovante</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Votre santé,
                  <span className="block text-gradient bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    notre priorité
                  </span>
                </h1>
                <p className="text-xl text-primary-100 leading-relaxed">
                  Pharmacie moderne au cœur de Cotonou, nous vous accompagnons 
                  avec des médicaments de qualité et des conseils professionnels.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn-magic group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Voir nos produits
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22998916023'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Urgence WhatsApp
                </a>
              </div>

              <div className="flex items-center space-x-6 text-primary-100">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-300" />
                  <span>+10 ans d'expérience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-300" />
                  <span>Cotonou, Bénin</span>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Pharmacie moderne"
                  className="rounded-3xl shadow-2xl border-4 border-white/20"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-3xl blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section avec animations */}
      <section className="py-16 bg-white relative">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-glow">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium group-hover:text-primary-600 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section avec cartes 3D */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        
        <div className="container-max section-padding relative">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-primary-600 font-semibold">Pourquoi nous choisir</span>
              <Star className="h-6 w-6 text-yellow-500 ml-2" />
            </div>
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
                className="card-3d group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-animated">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section avec effets visuels */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="decorative-blob-3"></div>
        
        <div className="container-max section-padding relative">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary-500 mr-2 animate-bounce" />
              <span className="text-primary-600 font-semibold">Nos services</span>
              <Sparkles className="h-6 w-6 text-primary-500 ml-2 animate-bounce" />
            </div>
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
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>
                <div className="p-6 bg-white relative">
                  <div className="absolute -top-6 left-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group-hover:translate-x-2 transform duration-300"
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

      {/* CTA Section avec design futuriste */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container-max section-padding text-center relative">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-yellow-300 mr-3 animate-pulse" />
              <h2 className="text-3xl lg:text-4xl font-bold">
                Besoin d'aide ou de conseils ?
              </h2>
              <Zap className="h-8 w-8 text-yellow-300 ml-3 animate-pulse" />
            </div>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Notre équipe de pharmaciens expérimentés est là pour vous accompagner. 
              N'hésitez pas à nous contacter pour toute question.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-magic group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous contacter
                </span>
              </Link>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22998916023'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 pulse-glow"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp direct
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;