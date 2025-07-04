import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de la Pharmacie du Soleil. Comment puis-je vous aider aujourd\'hui ?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    horaires: 'Nos horaires d\'ouverture sont :\n• Lundi à Samedi : 7h00 - 20h00\n• Dimanche : 8h00 - 18h00',
    adresse: 'Nous sommes situés au Quartier Akpakpa, Cotonou, Bénin. Vous pouvez nous joindre au +229 97 77 55 22.',
    services: 'Nos services incluent :\n• Vente de médicaments\n• Conseil pharmaceutique\n• Mesure de tension artérielle\n• Test de glycémie\n• Vaccination\n• Livraison à domicile',
    urgence: 'Pour les urgences, contactez-nous immédiatement au +229 97 77 55 22 ou via WhatsApp. Nous sommes là pour vous aider 24h/24 pour les urgences.',
    medicaments: 'Nous disposons d\'un large stock de médicaments génériques et de marque. Pour vérifier la disponibilité d\'un médicament spécifique, n\'hésitez pas à nous appeler.',
    livraison: 'Nous proposons un service de livraison à domicile dans Cotonou et ses environs. Les frais de livraison varient selon la distance. Contactez-nous pour plus d\'informations.',
    default: 'Je ne suis pas sûr de comprendre votre question. Vous pouvez me demander des informations sur nos horaires, services, médicaments, ou nous contacter directement au +229 97 77 55 22.',
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('horaire') || message.includes('heure') || message.includes('ouvert')) {
      return botResponses.horaires;
    }
    if (message.includes('adresse') || message.includes('où') || message.includes('localisation')) {
      return botResponses.adresse;
    }
    if (message.includes('service') || message.includes('que faites')) {
      return botResponses.services;
    }
    if (message.includes('urgence') || message.includes('urgent')) {
      return botResponses.urgence;
    }
    if (message.includes('médicament') || message.includes('medicament') || message.includes('disponible')) {
      return botResponses.medicaments;
    }
    if (message.includes('livraison') || message.includes('domicile')) {
      return botResponses.livraison;
    }
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
    }
    if (message.includes('merci')) {
      return 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions.';
    }
    
    return botResponses.default;
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
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Ouvrir le chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Assistant Pharmacie</h3>
              <p className="text-xs text-primary-100">En ligne</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Fermer le chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot ? 'bg-primary-100' : 'bg-gray-100'
                }`}>
                  {message.isBot ? (
                    <Bot className="h-4 w-4 text-primary-600" />
                  ) : (
                    <User className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-primary-600 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
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
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              aria-label="Envoyer le message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;