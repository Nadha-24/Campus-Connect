import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { clubAPI } from '../services/api';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Academic', 'Arts', 'Sports'];

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await clubAPI.getAll();
        if (response.data.success) {
          setClubs(response.data.clubs);
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = useMemo(() => {
    return clubs.filter(club => {
      const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           club.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [clubs, searchTerm, selectedCategory]);

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Clubs</h1>
          <p className="text-gray-600">Discover and join exciting clubs at Crescent University</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <Link
              key={club.id}
              to={`/clubs/${club.id}`}
              className="group block"
            >
              <div className="card h-full hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium ${getColorClasses(club.color)}`}>
                    {club.category}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {club.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {club.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {club.members} members
                  </div>
                  <div className="text-blue-600 font-medium group-hover:text-blue-700">
                    View Details →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No clubs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clubs;
