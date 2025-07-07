import React, { useState, useEffect } from 'react';
import { Bell, Clock, Pill, Check, X, Plus, Calendar, AlertCircle } from 'lucide-react';

interface Reminder {
  id: string;
  medicationName: string;
  dosage: string;
  time: string;
  frequency: string;
  isActive: boolean;
  lastTaken?: Date;
  nextDue: Date;
  instructions?: string;
}

interface ReminderNotification {
  id: string;
  reminder: Reminder;
  timestamp: Date;
  status: 'pending' | 'taken' | 'missed' | 'snoozed';
}

const MedicationReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      medicationName: 'Metformine 500mg',
      dosage: '1 comprimé',
      time: '08:00',
      frequency: 'Matin et soir',
      isActive: true,
      nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000), // Dans 2 heures
      instructions: 'À prendre avec un repas'
    },
    {
      id: '2',
      medicationName: 'Lisinopril 10mg',
      dosage: '1 comprimé',
      time: '20:00',
      frequency: 'Une fois par jour',
      isActive: true,
      nextDue: new Date(Date.now() + 8 * 60 * 60 * 1000), // Dans 8 heures
      instructions: 'À prendre le soir'
    }
  ]);

  const [notifications, setNotifications] = useState<ReminderNotification[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medicationName: '',
    dosage: '',
    time: '',
    frequency: '',
    instructions: ''
  });

  // Simuler les notifications en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (reminder.isActive && reminder.nextDue <= now) {
          // Créer une notification si elle n'existe pas déjà
          const existingNotification = notifications.find(
            n => n.reminder.id === reminder.id && n.status === 'pending'
          );
          
          if (!existingNotification) {
            const notification: ReminderNotification = {
              id: Date.now().toString(),
              reminder,
              timestamp: now,
              status: 'pending'
            };
            setNotifications(prev => [...prev, notification]);
          }
        }
      });
    }, 60000); // Vérifier chaque minute

    return () => clearInterval(interval);
  }, [reminders, notifications]);

  const markAsTaken = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, status: 'taken' as const }
          : n
      )
    );

    // Mettre à jour le prochain rappel
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      setReminders(prev =>
        prev.map(r =>
          r.id === notification.reminder.id
            ? {
                ...r,
                lastTaken: new Date(),
                nextDue: getNextDueDate(r.time, r.frequency)
              }
            : r
        )
      );
    }
  };

  const snoozeReminder = (notificationId: string, minutes: number = 15) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, status: 'snoozed' as const }
          : n
      )
    );

    // Programmer un nouveau rappel
    setTimeout(() => {
      const notification = notifications.find(n => n.id === notificationId);
      if (notification) {
        const newNotification: ReminderNotification = {
          id: Date.now().toString(),
          reminder: notification.reminder,
          timestamp: new Date(),
          status: 'pending'
        };
        setNotifications(prev => [...prev, newNotification]);
      }
    }, minutes * 60 * 1000);
  };

  const getNextDueDate = (time: string, frequency: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const nextDue = new Date();
    nextDue.setHours(hours, minutes, 0, 0);
    
    // Si l'heure est déjà passée aujourd'hui, programmer pour demain
    if (nextDue <= new Date()) {
      nextDue.setDate(nextDue.getDate() + 1);
    }
    
    return nextDue;
  };

  const addReminder = () => {
    if (newReminder.medicationName && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        medicationName: newReminder.medicationName,
        dosage: newReminder.dosage,
        time: newReminder.time,
        frequency: newReminder.frequency,
        isActive: true,
        nextDue: getNextDueDate(newReminder.time, newReminder.frequency),
        instructions: newReminder.instructions
      };
      
      setReminders(prev => [...prev, reminder]);
      setNewReminder({
        medicationName: '',
        dosage: '',
        time: '',
        frequency: '',
        instructions: ''
      });
      setShowAddForm(false);
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      )
    );
  };

  const pendingNotifications = notifications.filter(n => n.status === 'pending');
  const todayReminders = reminders.filter(r => r.isActive);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Notifications actives */}
      {pendingNotifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="h-6 w-6 mr-2 text-red-500" />
            Rappels en cours ({pendingNotifications.length})
          </h2>
          
          <div className="space-y-4">
            {pendingNotifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Pill className="h-6 w-6 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-red-900">
                        {notification.reminder.medicationName}
                      </h3>
                      <p className="text-red-700">
                        {notification.reminder.dosage} - {notification.reminder.time}
                      </p>
                      {notification.reminder.instructions && (
                        <p className="text-sm text-red-600 mt-1">
                          {notification.reminder.instructions}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => markAsTaken(notification.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      <span>Pris</span>
                    </button>
                    
                    <button
                      onClick={() => snoozeReminder(notification.id)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Clock className="h-4 w-4" />
                      <span>Reporter</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rappels de médicaments</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos prises de médicaments et ne manquez jamais une dose
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Ajouter un rappel</span>
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nouveau rappel de médicament
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du médicament *
              </label>
              <input
                type="text"
                value={newReminder.medicationName}
                onChange={(e) => setNewReminder(prev => ({ ...prev, medicationName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Paracétamol 500mg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosage
              </label>
              <input
                type="text"
                value={newReminder.dosage}
                onChange={(e) => setNewReminder(prev => ({ ...prev, dosage: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: 1 comprimé"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heure *
              </label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fréquence
              </label>
              <select
                value={newReminder.frequency}
                onChange={(e) => setNewReminder(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Sélectionner</option>
                <option value="Une fois par jour">Une fois par jour</option>
                <option value="Deux fois par jour">Deux fois par jour</option>
                <option value="Trois fois par jour">Trois fois par jour</option>
                <option value="Selon besoin">Selon besoin</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions spéciales
            </label>
            <textarea
              value={newReminder.instructions}
              onChange={(e) => setNewReminder(prev => ({ ...prev, instructions: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={2}
              placeholder="Ex: À prendre avec un repas"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={addReminder}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Ajouter le rappel
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste des rappels */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Mes rappels ({todayReminders.length})
        </h2>
        
        {todayReminders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun rappel configuré
            </h3>
            <p className="text-gray-600 mb-4">
              Ajoutez vos premiers rappels de médicaments pour ne jamais oublier une prise.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Ajouter un rappel
            </button>
          </div>
        ) : (
          todayReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`bg-white border rounded-xl p-6 transition-all ${
                reminder.isActive ? 'border-gray-200' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    reminder.isActive ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    <Pill className={`h-6 w-6 ${
                      reminder.isActive ? 'text-primary-600' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {reminder.medicationName}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{reminder.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{reminder.frequency}</span>
                      </span>
                      {reminder.dosage && (
                        <span>{reminder.dosage}</span>
                      )}
                    </div>
                    {reminder.instructions && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{reminder.instructions}</span>
                      </p>
                    )}
                    {reminder.lastTaken && (
                      <p className="text-sm text-green-600 mt-1">
                        Dernière prise: {reminder.lastTaken.toLocaleString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right text-sm">
                    <p className="text-gray-600">Prochain rappel:</p>
                    <p className="font-medium text-gray-900">
                      {reminder.nextDue.toLocaleString('fr-FR')}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      reminder.isActive
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {reminder.isActive ? 'Actif' : 'Inactif'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Conseils */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Conseils pour une meilleure observance
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Prenez vos médicaments à heures fixes pour créer une routine</li>
          <li>• Activez les notifications sur votre appareil</li>
          <li>• Préparez vos médicaments à l'avance dans un pilulier</li>
          <li>• N'arrêtez jamais un traitement sans consulter votre médecin</li>
          <li>• Contactez-nous en cas de doute sur votre traitement</li>
        </ul>
      </div>
    </div>
  );
};

export default MedicationReminder;