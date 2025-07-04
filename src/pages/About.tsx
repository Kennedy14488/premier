import React from 'react';
import { Users, Award, Heart, Target, Clock, MapPin } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '10+', label: 'Années d\'expérience' },
    { number: '5000+', label: 'Clients satisfaits' },
    { number: '24/7', label: 'Service d\'urgence' },
    { number: '100%', label: 'Médicaments certifiés' },
  ];

  const team = [
    {
      name: 'Dr. Marie ADJOVI',
      role: 'Pharmacienne titulaire',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Diplômée de l\'Université d\'Abomey-Calavi, spécialisée en pharmacie clinique.',
    },
    {
      name: 'Jean-Baptiste KOUDOU',
      role: 'Pharmacien adjoint',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Expert en conseil pharmaceutique et gestion des stocks.',
    },
    {
      name: 'Fatima IBRAHIM',
      role: 'Préparatrice en pharmacie',
      image: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Spécialisée dans la préparation magistrale et l\'accueil client.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Bienveillance',
      description: 'Nous plaçons l\'humain au cœur de notre démarche avec empathie et respect.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous nous engageons à fournir des produits et services de la plus haute qualité.',
    },
    {
      icon: Target,
      title: 'Professionnalisme',
      description: 'Notre expertise pharmaceutique garantit des conseils fiables et personnalisés.',
    },
    {
      icon: Users,
      title: 'Proximité',
      description: 'Nous cultivons une relation de confiance durable avec nos patients.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                À propos de la Pharmacie du Soleil
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed mb-8">
                Depuis plus de 10 ans, nous sommes votre partenaire santé de confiance 
                au cœur de Cotonou, alliant tradition pharmaceutique et innovation moderne.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Ouvert 7j/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Quartier Akpakpa</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Notre pharmacie"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fondée en 2013 par Dr. Marie ADJOVI, la Pharmacie du Soleil est née 
                  d'une vision simple : rendre les soins de santé accessibles à tous 
                  les habitants de Cotonou et ses environs.
                </p>
                <p>
                  Située stratégiquement dans le quartier d'Akpakpa, notre pharmacie 
                  s'est rapidement imposée comme un acteur incontournable de la santé 
                  communautaire, grâce à notre approche humaine et notre expertise 
                  pharmaceutique reconnue.
                </p>
                <p>
                  Aujourd'hui, nous continuons d'évoluer en intégrant les dernières 
                  innovations tout en préservant nos valeurs fondamentales de proximité 
                  et de bienveillance.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Histoire de la pharmacie"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ces principes guident chacune de nos actions et définissent 
              notre engagement envers vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Notre équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés et expérimentés, dédiés à votre bien-être.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Notre mission
          </h2>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
            Être votre partenaire santé de référence en vous offrant des médicaments 
            de qualité, des conseils experts et un service personnalisé, dans un 
            environnement chaleureux et professionnel. Nous nous engageons à 
            contribuer activement au bien-être de notre communauté.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;