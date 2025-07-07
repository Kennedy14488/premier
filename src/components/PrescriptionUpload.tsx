import React, { useState, useRef } from 'react';
import { Upload, Camera, FileText, Check, AlertCircle, Clock, User, Calendar } from 'lucide-react';

interface PrescriptionFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'validating' | 'approved' | 'rejected';
  pharmacistNotes?: string;
  uploadDate: Date;
}

const PrescriptionUpload = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPrescription: PrescriptionFile = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file,
            preview: e.target?.result as string,
            status: 'uploading',
            uploadDate: new Date(),
          };
          
          setPrescriptions(prev => [...prev, newPrescription]);
          
          // Simuler le processus de validation
          setTimeout(() => {
            setPrescriptions(prev => 
              prev.map(p => 
                p.id === newPrescription.id 
                  ? { ...p, status: 'validating' }
                  : p
              )
            );
          }, 1000);
          
          setTimeout(() => {
            setPrescriptions(prev => 
              prev.map(p => 
                p.id === newPrescription.id 
                  ? { 
                      ...p, 
                      status: 'approved',
                      pharmacistNotes: 'Ordonnance validée. Médicaments disponibles en stock.'
                    }
                  : p
              )
            );
          }, 3000);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'validating':
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case 'approved':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'Téléchargement...';
      case 'validating':
        return 'En cours de validation';
      case 'approved':
        return 'Validée par le pharmacien';
      case 'rejected':
        return 'Rejetée - Voir les notes';
      default:
        return '';
    }
  };

  const requestPrescription = (prescriptionId: string) => {
    const prescription = prescriptions.find(p => p.id === prescriptionId);
    if (prescription) {
      const message = `Bonjour, je souhaite commander les médicaments de mon ordonnance validée (ID: ${prescriptionId}). Pouvez-vous me confirmer la disponibilité et le prix total ?`;
      const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Gestion des ordonnances</h2>
        <p className="text-gray-600">
          Téléchargez vos ordonnances pour validation et commande de médicaments
        </p>
      </div>

      {/* Zone de téléchargement */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Téléchargez votre ordonnance
            </h3>
            <p className="text-gray-600 mb-4">
              Glissez-déposez vos fichiers ici ou utilisez les boutons ci-dessous
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              Choisir un fichier
            </button>
            
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Camera className="h-5 w-5 mr-2" />
              Prendre une photo
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            Formats acceptés: JPG, PNG, PDF (max 10MB)
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Liste des ordonnances */}
      {prescriptions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Mes ordonnances ({prescriptions.length})
          </h3>
          
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {/* Aperçu */}
                  <div className="flex-shrink-0">
                    {prescription.file.type === 'application/pdf' ? (
                      <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-red-600" />
                      </div>
                    ) : (
                      <img
                        src={prescription.preview}
                        alt="Aperçu ordonnance"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  
                  {/* Informations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 truncate">
                        {prescription.file.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(prescription.status)}
                        <span className={`text-sm font-medium ${
                          prescription.status === 'approved' ? 'text-green-600' :
                          prescription.status === 'rejected' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {getStatusText(prescription.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      Téléchargée le {prescription.uploadDate.toLocaleDateString('fr-FR')}
                      <span className="mx-2">•</span>
                      {(prescription.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    
                    {prescription.pharmacistNotes && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <User className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-green-800">Note du pharmacien:</p>
                            <p className="text-sm text-green-700">{prescription.pharmacistNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {prescription.status === 'approved' && (
                      <button
                        onClick={() => requestPrescription(prescription.id)}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Commander ces médicaments
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informations importantes */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Informations importantes
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Vos ordonnances sont validées par nos pharmaciens qualifiés</li>
          <li>• Le processus de validation prend généralement 2-4 heures</li>
          <li>• Vous recevrez une notification une fois la validation terminée</li>
          <li>• Les ordonnances sont conservées de manière sécurisée et confidentielle</li>
          <li>• Pour les urgences, contactez-nous directement au +229 97 77 55 22</li>
        </ul>
      </div>
    </div>
  );
};

export default PrescriptionUpload;