import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Home, Info, ShoppingBag, Phone, FileText, Bell, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: 'navigate' | 'contact' | 'info';
  value: string;
  icon?: React.ComponentType<any>;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🌟 Bonjour ! Je suis votre assistant intelligent de la Pharmacie du Soleil ! ✨\n\nJe peux vous aider à :\n• 🧭 Naviguer sur le site\n• 💊 Trouver des médicaments\n• 📋 Gérer vos ordonnances\n• ⏰ Configurer des rappels\n• 📞 Vous mettre en contact\n\nComment puis-je vous aider aujourd\'hui ?',
      isBot: true,
      timestamp: new Date(),
      quickActions: [
        { label: '🏠 Accueil', action: 'navigate', value: '/', icon: Home },
        { label: '💊 Produits', action: 'navigate', value: '/products', icon: ShoppingBag },
        { label: '📞 Contact', action: 'navigate', value: '/contact', icon: Phone },
        { label: '👤 Mon compte', action: 'navigate', value: '/account', icon: User }
      ]
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState({
    currentPage: '/',
    hasVisitedPages: [] as string[],
    searchHistory: [] as string[],
    preferredLanguage: 'fr'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Détection de la page actuelle
  useEffect(() => {
    const currentPath = window.location.pathname;
    setUserContext(prev => ({
      ...prev,
      currentPage: currentPath,
      hasVisitedPages: [...new Set([...prev.hasVisitedPages, currentPath])]
    }));
  }, []);

  const navigationGuide = {
    '/': {
      description: 'Vous êtes sur la page d\'accueil',
      suggestions: ['Voir nos services', 'Découvrir nos produits', 'En savoir plus sur nous'],
      nextSteps: [
        { label: '🔍 Voir nos produits', action: 'navigate', value: '/products' },
        { label: '🏥 Nos services', action: 'navigate', value: '/services' },
        { label: '📞 Nous contacter', action: 'navigate', value: '/contact' }
      ]
    },
    '/products': {
      description: 'Vous consultez notre catalogue de produits',
      suggestions: ['Rechercher un médicament', 'Filtrer par catégorie', 'Demander conseil'],
      nextSteps: [
        { label: '📋 Télécharger ordonnance', action: 'navigate', value: '/account' },
        { label: '💬 Conseil personnalisé', action: 'contact', value: 'conseil' }
      ]
    },
    '/services': {
      description: 'Vous découvrez nos services',
      suggestions: ['Prendre rendez-vous', 'Service livraison', 'Urgences'],
      nextSteps: [
        { label: '📞 Prendre RDV', action: 'contact', value: 'rdv' },
        { label: '🚚 Info livraison', action: 'info', value: 'livraison' }
      ]
    },
    '/contact': {
      description: 'Vous êtes sur notre page contact',
      suggestions: ['Appeler maintenant', 'Envoyer message', 'Localisation'],
      nextSteps: [
        { label: '📞 Appeler', action: 'contact', value: 'phone' },
        { label: '💬 WhatsApp', action: 'contact', value: 'whatsapp' }
      ]
    },
    '/account': {
      description: 'Vous êtes dans votre espace personnel',
      suggestions: ['Télécharger ordonnance', 'Configurer rappels', 'Voir historique'],
      nextSteps: [
        { label: '📋 Nouvelle ordonnance', action: 'info', value: 'ordonnance' },
        { label: '⏰ Rappels médicaments', action: 'info', value: 'rappels' }
      ]
    }
  };

  const intelligentResponses = {
    // Navigation et orientation
    perdu: () => {
      const currentPageInfo = navigationGuide[userContext.currentPage as keyof typeof navigationGuide];
      return {
        text: `🧭 Pas de souci ! Je vais vous aider à vous orienter.\n\n${currentPageInfo?.description || 'Vous naviguez sur notre site'}.\n\n🎯 Voici ce que vous pouvez faire ici :`,
        quickActions: currentPageInfo?.nextSteps || [
          { label: '🏠 Retour accueil', action: 'navigate', value: '/' },
          { label: '📞 Aide directe', action: 'contact', value: 'phone' }
        ]
      };
    },

    // Recherche de médicaments
    medicament: (query: string) => {
      const commonMeds = ['paracétamol', 'ibuprofène', 'amoxicilline', 'metformine', 'aspirine'];
      const found = commonMeds.find(med => query.toLowerCase().includes(med));
      
      if (found) {
        return {
          text: `💊 Excellent ! Je vois que vous cherchez du ${found}.\n\n✅ Nous avons ce médicament en stock !\n\n🔍 Voulez-vous :\n• Voir tous nos produits similaires\n• Vérifier les interactions\n• Commander directement`,
          quickActions: [
            { label: '🛒 Voir produits', action: 'navigate', value: '/products' },
            { label: '💬 Conseil pharmacien', action: 'contact', value: 'conseil' },
            { label: '📞 Commander', action: 'contact', value: 'whatsapp' }
          ]
        };
      }
      
      return {
        text: `🔍 Je vais vous aider à trouver "${query}".\n\n📋 Pour mieux vous conseiller :\n• Avez-vous une ordonnance ?\n• Est-ce pour un traitement chronique ?\n• Souhaitez-vous un générique ?\n\n💡 Je peux aussi vous mettre en contact avec notre pharmacien !`,
        quickActions: [
          { label: '📋 J\'ai une ordonnance', action: 'navigate', value: '/account' },
          { label: '💬 Parler au pharmacien', action: 'contact', value: 'conseil' },
          { label: '🔍 Voir tous les produits', action: 'navigate', value: '/products' }
        ]
      };
    },

    // Gestion des ordonnances
    ordonnance: () => ({
      text: `📋 Parfait ! Notre système d'ordonnances numériques est très simple :\n\n✨ **3 étapes faciles :**\n1️⃣ Prenez une photo ou scannez\n2️⃣ Notre pharmacien valide (2-4h)\n3️⃣ Commandez en 1 clic !\n\n🔒 **100% sécurisé et confidentiel**\n\n🚀 Voulez-vous commencer maintenant ?`,
      quickActions: [
        { label: '📸 Télécharger ordonnance', action: 'navigate', value: '/account' },
        { label: '❓ Comment ça marche', action: 'info', value: 'ordonnance-help' },
        { label: '📞 Aide personnalisée', action: 'contact', value: 'whatsapp' }
      ]
    }),

    // Services et horaires
    horaires: () => ({
      text: `🕐 **Nos horaires d'ouverture :**\n\n📅 **Lundi à Samedi :** 7h00 - 20h00\n📅 **Dimanche :** 8h00 - 18h00\n\n🚨 **Urgences :** 24h/24 - 7j/7\n📞 **Ligne directe :** +229 01 92 41 19 37\n💬 **WhatsApp :** +229 98 91 60 23\n\n⏰ Nous sommes actuellement ${new Date().getHours() >= 7 && new Date().getHours() <= 20 ? '🟢 OUVERTS' : '🔴 FERMÉS'}`,
      quickActions: [
        { label: '📞 Appeler maintenant', action: 'contact', value: 'phone' },
        { label: '💬 WhatsApp', action: 'contact', value: 'whatsapp' },
        { label: '📍 Nous localiser', action: 'navigate', value: '/contact' }
      ]
    }),

    // Livraison
    livraison: () => ({
      text: `🚚 **Service de livraison rapide !**\n\n⚡ **Délais :**\n• Cotonou centre : 30-45 min\n• Périphérie : 1-2h\n• Urgences : 15-30 min\n\n💰 **Tarifs :**\n• Gratuit dès 15 000 FCFA\n• Sinon : 1 000-2 000 FCFA\n\n📦 **On livre :** Médicaments, matériel médical, produits bébé`,
      quickActions: [
        { label: '🛒 Commander maintenant', action: 'navigate', value: '/products' },
        { label: '📞 Livraison urgente', action: 'contact', value: 'whatsapp' },
        { label: '📍 Zone de livraison', action: 'navigate', value: '/contact' }
      ]
    }),

    // Conseils santé
    conseil: () => ({
      text: `👨‍⚕️ **Nos pharmaciens experts à votre service !**\n\n🎯 **Nous vous conseillons sur :**\n• Interactions médicamenteuses\n• Posologie et effets secondaires\n• Automédication sécurisée\n• Prévention et hygiène\n\n📞 **Consultation gratuite :**\n• En pharmacie\n• Par téléphone\n• Via WhatsApp`,
      quickActions: [
        { label: '📞 Conseil immédiat', action: 'contact', value: 'phone' },
        { label: '💬 Chat pharmacien', action: 'contact', value: 'whatsapp' },
        { label: '🏥 Venir en pharmacie', action: 'navigate', value: '/contact' }
      ]
    }),

    // Urgences
    urgence: () => ({
      text: `🚨 **URGENCE PHARMACEUTIQUE**\n\n⚡ **Contactez-nous IMMÉDIATEMENT :**\n📞 **Téléphone :** +229 01 92 41 19 37\n💬 **WhatsApp :** +229 98 91 60 23\n\n🏥 **Nous sommes disponibles 24h/24 pour :**\n• Médicaments d'urgence\n• Conseils d'urgence\n• Orientation médicale\n\n⏱️ **Réponse garantie en moins de 5 minutes !**`,
      quickActions: [
        { label: '📞 APPELER MAINTENANT', action: 'contact', value: 'phone' },
        { label: '💬 WhatsApp URGENT', action: 'contact', value: 'whatsapp' }
      ]
    }),

    // Aide générale
    aide: () => {
      const visitedPages = userContext.hasVisitedPages;
      const suggestions = [];
      
      if (!visitedPages.includes('/products')) {
        suggestions.push({ label: '💊 Découvrir nos produits', action: 'navigate', value: '/products' });
      }
      if (!visitedPages.includes('/account')) {
        suggestions.push({ label: '👤 Créer mon compte', action: 'navigate', value: '/account' });
      }
      if (!visitedPages.includes('/services')) {
        suggestions.push({ label: '🏥 Voir nos services', action: 'navigate', value: '/services' });
      }
      
      return {
        text: `🤖 **Je suis votre assistant intelligent !**\n\n✨ **Je peux vous aider à :**\n• 🧭 Naviguer sur le site\n• 🔍 Trouver des médicaments\n• 📋 Gérer vos ordonnances\n• ⏰ Configurer des rappels\n• 📞 Vous mettre en contact\n\n🎯 **Que souhaitez-vous faire ?**`,
        quickActions: suggestions.length > 0 ? suggestions : [
          { label: '💊 Chercher médicament', action: 'navigate', value: '/products' },
          { label: '📞 Parler à un humain', action: 'contact', value: 'phone' }
        ]
      };
    }
  };

  const getBotResponse = (userMessage: string): { text: string; quickActions?: QuickAction[]; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    // Détection d'intention intelligente
    if (message.includes('perdu') || message.includes('aide') || message.includes('comment') || message.includes('où')) {
      return intelligentResponses.perdu();
    }
    
    if (message.includes('médicament') || message.includes('medicament') || message.includes('pilule') || message.includes('comprimé')) {
      return intelligentResponses.medicament(userMessage);
    }
    
    if (message.includes('ordonnance') || message.includes('prescription') || message.includes('télécharger')) {
      return intelligentResponses.ordonnance();
    }
    
    if (message.includes('horaire') || message.includes('heure') || message.includes('ouvert') || message.includes('fermé')) {
      return intelligentResponses.horaires();
    }
    
    if (message.includes('livraison') || message.includes('domicile') || message.includes('livrer')) {
      return intelligentResponses.livraison();
    }
    
    if (message.includes('conseil') || message.includes('pharmacien') || message.includes('avis')) {
      return intelligentResponses.conseil();
    }
    
    if (message.includes('urgence') || message.includes('urgent') || message.includes('emergency')) {
      return intelligentResponses.urgence();
    }
    
    if (message.includes('aide') || message.includes('help') || message.includes('assistance')) {
      return intelligentResponses.aide();
    }
    
    // Réponses contextuelles basées sur la page
    const currentPageInfo = navigationGuide[userContext.currentPage as keyof typeof navigationGuide];
    if (currentPageInfo) {
      return {
        text: `🎯 Je vois que vous êtes sur ${currentPageInfo.description}.\n\n💡 **Suggestions pour cette page :**\n${currentPageInfo.suggestions.map(s => `• ${s}`).join('\n')}\n\n🤔 Avez-vous besoin d'aide spécifique ?`,
        quickActions: currentPageInfo.nextSteps
      };
    }
    
    // Réponse par défaut intelligente
    return {
      text: `🤔 Je comprends que vous cherchez des informations.\n\n🎯 **Voici ce que je peux faire pour vous :**\n• 🔍 Vous aider à trouver un produit\n• 📋 Gérer vos ordonnances\n• 📞 Vous mettre en contact\n• 🧭 Vous guider sur le site\n\n💬 Posez-moi une question plus précise ou choisissez une option !`,
      quickActions: [
        { label: '🔍 Chercher produit', action: 'navigate', value: '/products' },
        { label: '📋 Mes ordonnances', action: 'navigate', value: '/account' },
        { label: '📞 Contact direct', action: 'contact', value: 'phone' },
        { label: '🏠 Page d\'accueil', action: 'navigate', value: '/' }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setUserContext(prev => ({
      ...prev,
      searchHistory: [...prev.searchHistory, inputText].slice(-10)
    }));
    setInputText('');
    setIsTyping(true);

    // Délai de réponse réaliste
    setTimeout(() => {
      const response = getBotResponse(inputText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        quickActions: response.quickActions,
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleQuickAction = (action: QuickAction) => {
    switch (action.action) {
      case 'navigate':
        window.location.href = action.value;
        break;
      case 'contact':
        if (action.value === 'phone') {
          window.open(`tel:${import.meta.env.VITE_PHARMACY_PHONE || '+22901924119'}`, '_blank');
        } else if (action.value === 'whatsapp') {
          window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22998916023'}`, '_blank');
        }
        break;
      case 'info':
        setInputText(action.label);
        handleSendMessage();
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button avec animation */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Ouvrir le chat intelligent"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <Sparkles className="absolute -top-2 -left-2 h-4 w-4 text-yellow-300 animate-bounce" />
        </div>
      </button>

      {/* Chat Window avec design amélioré */}
      <div className={`fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
              <Bot className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold">Assistant Intelligent</h3>
              <p className="text-xs text-primary-100 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Propulsé par IA
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
            aria-label="Fermer le chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages avec scroll amélioré */}
        <div className="flex-1 p-4 h-96 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'bg-gradient-to-r from-primary-100 to-primary-200' : 'bg-gradient-to-r from-gray-100 to-gray-200'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-primary-600" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                      : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.isBot ? 'text-gray-500' : 'text-primary-100'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Actions rapides */}
              {message.quickActions && (
                <div className="mt-3 ml-10 flex flex-wrap gap-2">
                  {message.quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 text-primary-700 text-xs px-3 py-2 rounded-full border border-primary-200 transition-all duration-200 hover:shadow-md transform hover:scale-105"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-600" />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input avec design amélioré */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message... 💬"
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 transition-all duration-200"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-md"
              aria-label="Envoyer le message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            ✨ Assistant IA • Réponse instantanée • 24h/7j
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;