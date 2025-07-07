import React, { useState } from 'react';
import { User, FileText, Pill, Bell } from 'lucide-react';
import UserDashboard from '../components/UserDashboard';
import PrescriptionUpload from '../components/PrescriptionUpload';
import MedicationReminder from '../components/MedicationReminder';

const UserAccount = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sections = [
    { id: 'dashboard', name: 'Tableau de bord', icon: User, component: UserDashboard },
    { id: 'prescriptions', name: 'Mes ordonnances', icon: FileText, component: PrescriptionUpload },
    { id: 'reminders', name: 'Rappels médicaments', icon: Bell, component: MedicationReminder },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || UserDashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-max section-padding">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <section.icon className="h-5 w-5" />
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="py-8">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default UserAccount;