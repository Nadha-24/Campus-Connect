import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { clubAPI, registrationAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ClubDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await clubAPI.getById(id);
        if (response.data.success) {
          setClub(response.data.club);
        }
      } catch (error) {
        console.error('Error fetching club details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id]);

  const handleRegisterForEvent = async (eventId) => {
    if (!currentUser) {
      alert('Please login to register for events');
      return;
    }

    try {
      const response = await registrationAPI.registerForEvent(eventId);
      if (response.data.success) {
        alert('Successfully registered for the event!');
        setRegisteredEvents([...registeredEvents, eventId]);
        
        // Update the event's current participants count
        if (club) {
          const updatedEvents = club.Events.map(event => 
            event.id === eventId 
              ? { ...event, currentParticipants: event.currentParticipants + 1 }
              : event
          );
          setClub({ ...club, Events: updatedEvents });
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      alert(message);
    }
  };

  const isRegisteredForEvent = (eventId) => {
    return registeredEvents.includes(eventId);
  };

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
          <p className="text-gray-600">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Club not found</h2>
          <Link to="/clubs" className="btn-primary">
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  const upcomingEvents = club.Events?.filter(event => event.type === 'upcoming') || [];
  const recentEvents = club.Events?.filter(event => event.type === 'recent') || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/clubs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Clubs
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={club.image}
              alt={club.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getColorClasses(club.color)}`}>
                {club.category}
              </div>
              <h1 className="text-4xl font-bold mb-2">{club.name}</h1>
              <div className="flex items-center text-white/90">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                {club.members} members
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              {club.description}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === 'recent'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Recent Events ({recentEvents.length})
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(activeTab === 'upcoming' ? upcomingEvents : recentEvents).map(event => (
              <div key={event.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {event.type === 'upcoming' && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Upcoming
                    </div>
                  )}
                  {event.type === 'recent' && (
                    <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{event.currentParticipants}</span> / {event.maxParticipants} participants
                    </div>
                    
                    {event.type === 'upcoming' && (
                      <button
                        onClick={() => handleRegisterForEvent(event.id)}
                        disabled={isRegisteredForEvent(event.id) || event.currentParticipants >= event.maxParticipants}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          isRegisteredForEvent(event.id)
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : event.currentParticipants >= event.maxParticipants
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'btn-primary hover:shadow-lg transform hover:scale-105'
                        }`}
                      >
                        {isRegisteredForEvent(event.id) ? 'Registered' : 
                         event.currentParticipants >= event.maxParticipants ? 'Full' : 'Register'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(activeTab === 'upcoming' ? upcomingEvents : recentEvents).length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                {activeTab === 'upcoming' ? '📅' : '🎉'}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No {activeTab} events
              </h3>
              <p className="text-gray-500">
                {activeTab === 'upcoming' 
                  ? 'Check back later for upcoming events!' 
                  : 'No recent events to show.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
