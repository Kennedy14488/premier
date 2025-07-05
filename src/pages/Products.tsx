import { useState } from 'react';
import { Search, Filter, Pill, Heart, Baby, Leaf, Shield, Eye } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les produits', icon: Pill },
    { id: 'prescription', name: 'Médicaments sur ordonnance', icon: Shield },
    { id: 'otc', name: 'Médicaments sans ordonnance', icon: Heart },
    { id: 'baby', name: 'Produits bébé', icon: Baby },
    { id: 'natural', name: 'Produits naturels', icon: Leaf },
    { id: 'vision', name: 'Soins des yeux', icon: Eye },
  ];

  const products = [
    {
      id: 1,
      name: 'Paracétamol 500mg',
      category: 'otc',
      description: 'Antalgique et antipyrétique pour douleurs et fièvre',
      price: '2,500 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
    },
    {
      id: 2,
      name: 'Amoxicilline 500mg',
      category: 'prescription',
      description: 'Antibiotique à large spectre sur ordonnance',
      price: '8,500 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
    },
    {
      id: 3,
      name: 'Lait infantile Bio',
      category: 'baby',
      description: 'Lait de croissance pour bébés de 6 à 12 mois',
      price: '15,000 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
    },
    {
      id: 4,
      name: 'Vitamine C 1000mg',
      category: 'natural',
      description: 'Complément alimentaire pour renforcer l\'immunité',
      price: '12,000 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: false,
    },
    {
      id: 5,
      name: 'Collyre hydratant',
      category: 'vision',
      description: 'Solution pour yeux secs et irrités',
      price: '6,500 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
    },
    {
      id: 6,
      name: 'Ibuprofène 400mg',
      category: 'otc',
      description: 'Anti-inflammatoire non stéroïdien',
      price: '3,500 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
    },
    {
      id: 7,
      name: 'Couches bébé T3',
      category: 'baby',
      description: 'Couches ultra-absorbantes pour bébés 4-9kg',
      price: '18,000 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
    },
    {
      id: 8,
      name: 'Tisane digestive',
      category: 'natural',
      description: 'Mélange de plantes pour faciliter la digestion',
      price: '4,500 FCFA',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductRequest = (productName: string) => {
    const message = `Bonjour, je suis intéressé(e) par le produit : ${productName}. Pouvez-vous me donner plus d'informations sur sa disponibilité et son prix ?`;
    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-max section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nos produits pharmaceutiques
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Découvrez notre large gamme de médicaments et produits de santé, 
              tous certifiés et disponibles avec conseil personnalisé.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-max section-padding">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <category.icon className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </h2>
            <p className="text-gray-600">
              {selectedCategory !== 'all' && 
                `Catégorie: ${categories.find(cat => cat.id === selectedCategory)?.name}`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {product.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'En stock' : 'Rupture'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      {product.price}
                    </span>
                    <button
                      onClick={() => handleProductRequest(product.name)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        product.inStock
                          ? 'bg-primary-600 hover:bg-primary-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Demander' : 'Indisponible'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche ou contactez-nous 
                pour vérifier la disponibilité d'un produit spécifique.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Produit non trouvé ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Notre stock évolue constamment. Contactez-nous pour vérifier 
            la disponibilité d'un médicament ou produit spécifique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '22997775522'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              Demander via WhatsApp
            </a>
            <a
              href={`tel:${import.meta.env.VITE_PHARMACY_PHONE || '+22997775522'}`}
              className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Appeler directement
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;