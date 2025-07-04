import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // For now, we'll create a WhatsApp message
    const message = `Bonjour, je vous contacte depuis votre site web.
    
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Sujet: ${formData.subject}

Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Quartier Akpakpa', 'Cotonou, Bénin'],
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+229 97 77 55 22'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@pharmaciedusoleil.bj'],
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun-Sam: 7h00 - 20h00', 'Dim: 8h00 - 18h00'],
    },
  ];

  const subjects = [
    'Information sur un médicament',
    'Demande de prix',
    'Service de livraison',
    'Conseil pharmaceutique',
    'Réclamation',
    'Autre',
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-max section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              et vous accompagner dans vos besoins de santé.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Map and Quick Actions */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Notre localisation
                </h3>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Carte interactive bientôt disponible</p>
                    <p className="text-sm">Quartier Akpakpa, Cotonou</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Contact rapide
                </h3>
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${import.meta.env.VITE_PHARMACY_PHONE || '+22997775522'}`}
                    className="flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Appeler maintenant
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Urgences
                </h3>
                <p className="text-gray-600 mb-4">
                  Pour toute urgence pharmaceutique, nous sommes disponibles 24h/24 et 7j/7.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    +229 97 77 55 22
                  </div>
                  <div className="text-sm text-gray-500">
                    Ligne d'urgence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;