import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Clubs from './components/Clubs';
import ClubDetails from './components/ClubDetails';
import Registrations from './components/Registrations';
import Profile from './components/Profile';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/clubs" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/" element={<Navigate to="/clubs" />} />
            <Route path="/clubs" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Clubs />
                </>
              </ProtectedRoute>
            } />
            <Route path="/clubs/:id" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <ClubDetails />
                </>
              </ProtectedRoute>
            } />
            <Route path="/registrations" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Registrations />
                </>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Profile />
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
