import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Bell, 
  Gift, 
  Pill, 
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit,
  Star,
  Award,
  Activity
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: string;
  allergies: string[];
  chronicConditions: string[];
  memberSince: string;
  loyaltyPoints: number;
  totalOrders: number;
}

interface HealthRecord {
  id: string;
  type: 'tension' | 'glycemie' | 'poids' | 'temperature';
  value: string;
  date: Date;
  notes?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  reminderTimes: string[];
  taken: boolean[];
}

interface Order {
  id: string;
  date: Date;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Données simulées
  const [userProfile] = useState<UserProfile>({
    id: '1',
    name: 'Marie ADJOVI',
    email: 'marie.adjovi@email.com',
    phone: '+229 97 12 34 56',
    address: 'Quartier Fidjrossè, Cotonou',
    dateOfBirth: '1985-03-15',
    emergencyContact: '+229 97 65 43 21',
    allergies: ['Pénicilline', 'Aspirine'],
    chronicConditions: ['Hypertension', 'Diabète type 2'],
    memberSince: '2022-01-15',
    loyaltyPoints: 2450,
    totalOrders: 28
  });

  const [healthRecords] = useState<HealthRecord[]>([
    { id: '1', type: 'tension', value: '130/85', date: new Date('2024-01-15'), notes: 'Légèrement élevée' },
    { id: '2', type: 'glycemie', value: '110 mg/dL', date: new Date('2024-01-14'), notes: 'À jeun' },
    { id: '3', type: 'poids', value: '68 kg', date: new Date('2024-01-13') },
    { id: '4', type: 'tension', value: '125/80', date: new Date('2024-01-10'), notes: 'Normale' },
  ]);

  const [medications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformine 500mg',
      dosage: '1 comprimé',
      frequency: '2 fois par jour',
      startDate: new Date('2024-01-01'),
      reminderTimes: ['08:00', '20:00'],
      taken: [true, false]
    },
    {
      id: '2',
      name: 'Lisinopril 10mg',
      dosage: '1 comprimé',
      frequency: '1 fois par jour',
      startDate: new Date('2024-01-01'),
      reminderTimes: ['08:00'],
      taken: [true]
    }
  ]);

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: new Date('2024-01-12'),
      items: ['Metformine 500mg x2', 'Tensomètre digital'],
      total: 25000,
      status: 'delivered'
    },
    {
      id: 'ORD-002',
      date: new Date('2024-01-08'),
      items: ['Paracétamol 500mg', 'Vitamine D3'],
      total: 8500,
      status: 'delivered'
    }
  ]);

  const getHealthIcon = (type: string) => {
    switch (type) {
      case 'tension': return <Activity className="h-4 w-4" />;
      case 'glycemie': return <TrendingUp className="h-4 w-4" />;
      case 'poids': return <User className="h-4 w-4" />;
      case 'temperature': return <Heart className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: User },
    { id: 'health', name: 'Carnet de santé', icon: Heart },
    { id: 'medications', name: 'Mes médicaments', icon: Pill },
    { id: 'orders', name: 'Mes commandes', icon: ShoppingBag },
    { id: 'loyalty', name: 'Fidélité', icon: Gift },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl text-white p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Bonjour, {userProfile.name}</h1>
              <p className="text-primary-100">Membre depuis {new Date(userProfile.memberSince).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userProfile.loyaltyPoints}</div>
            <div className="text-primary-100">Points fidélité</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Statistiques rapides */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commandes totales</p>
                  <p className="text-2xl font-bold text-gray-900">{userProfile.totalOrders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Points fidélité</p>
                  <p className="text-2xl font-bold text-gray-900">{userProfile.loyaltyPoints}</p>
                </div>
                <Gift className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Médicaments actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{medications.length}</p>
                </div>
                <Pill className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Profil utilisateur */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Mon profil</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary-600 hover:text-primary-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{userProfile.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{userProfile.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{userProfile.address}</span>
              </div>
            </div>

            {userProfile.allergies.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800 mb-1">Allergies:</p>
                <p className="text-sm text-red-700">{userProfile.allergies.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'health' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dernières mesures */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dernières mesures</h3>
            <div className="space-y-4">
              {healthRecords.slice(0, 4).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getHealthIcon(record.type)}
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{record.type}</p>
                      <p className="text-sm text-gray-600">{record.date.toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{record.value}</p>
                    {record.notes && (
                      <p className="text-xs text-gray-500">{record.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions chroniques */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditions médicales</h3>
            <div className="space-y-3">
              {userProfile.chronicConditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">{condition}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Ajouter une mesure
            </button>
          </div>
        </div>
      )}

      {activeTab === 'medications' && (
        <div className="space-y-6">
          {medications.map((medication) => (
            <div key={medication.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{medication.name}</h3>
                  <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary-600" />
                  <span className="text-sm text-gray-600">Rappels actifs</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Horaires de prise:</p>
                  <div className="flex space-x-2">
                    {medication.reminderTimes.map((time, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Prise d'aujourd'hui:</p>
                  <div className="flex space-x-2">
                    {medication.taken.map((taken, index) => (
                      <div key={index} className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        taken ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {taken ? '✓' : '○'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Commande {order.id}</h3>
                  <p className="text-gray-600">{order.date.toLocaleDateString('fr-FR')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status === 'delivered' ? 'Livrée' : 
                   order.status === 'confirmed' ? 'Confirmée' :
                   order.status === 'pending' ? 'En attente' : 'Annulée'}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Articles:</p>
                <ul className="space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{order.total.toLocaleString()} FCFA</span>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'loyalty' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Points et niveau */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Programme de fidélité</h3>
              <Award className="h-8 w-8" />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span>Niveau: Membre Gold</span>
                <span>{userProfile.loyaltyPoints} points</span>
              </div>
              <div className="w-full bg-primary-500 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-primary-100 mt-2">550 points pour le niveau Platine</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">5%</div>
                <div className="text-sm text-primary-100">Réduction actuelle</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">28</div>
                <div className="text-sm text-primary-100">Commandes</div>
              </div>
            </div>
          </div>

          {/* Récompenses disponibles */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Récompenses disponibles</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Réduction 10%</p>
                  <p className="text-sm text-gray-600">Sur votre prochaine commande</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">500 pts</p>
                  <button className="text-sm text-primary-600 hover:text-primary-700">Échanger</button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Livraison gratuite</p>
                  <p className="text-sm text-gray-600">Pour 3 commandes</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">800 pts</p>
                  <button className="text-sm text-primary-600 hover:text-primary-700">Échanger</button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-50">
                <div>
                  <p className="font-medium text-gray-900">Consultation gratuite</p>
                  <p className="text-sm text-gray-600">Avec un pharmacien</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-600">1200 pts</p>
                  <p className="text-sm text-gray-500">Insuffisant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;