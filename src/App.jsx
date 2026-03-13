import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dossier from './pages/Dossier';
import Records from './pages/Records';
import System from './pages/System';
import Auth from './pages/Auth';
import Session from './pages/Session';
import History from './pages/History';
import { useAuth } from './hooks/useAuth';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const { userData, updateUserData } = useAuth();
  
  const settings = userData?.settings || { crtEnabled: true, readabilityMode: false };

  // Testing helper: Reset memory shortcut
  useEffect(() => {
    const handleKeyDown = async (e) => {
      // Use Alt+R to clear local storage and restart
      if (e.altKey && e.key.toLowerCase() === 'r') {
        localStorage.clear();
        const initialData = {
          stats: { integrity: 45, reputation: 12, influence: 0 },
          currentScene: 'chapter_1_start',
          inventory: []
        };
        if (updateUserData) {
          try {
            await updateUserData(initialData);
          } catch (e) {
            console.error(e);
          }
        }
        window.location.reload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [updateUserData]);

  // Dynamic Background based on Route
  const getBgClass = () => {
    if (location.pathname === '/') return 'bg-constellation';
    if (location.pathname === '/about') return 'bg-nebula-dossier';
    if (location.pathname === '/records') return 'bg-nebula-records';
    if (location.pathname === '/system') return 'bg-nebula-system';
    if (location.pathname === '/history') return 'bg-nebula-records';
    return 'bg-bureau-900'; // Default / Session
  };

  return (
    <div className={`min-h-screen ${getBgClass()} flex flex-col md:flex-row max-w-[100vw] overflow-x-hidden transition-colors duration-1000 ${settings.readabilityMode ? 'font-sans text-neutral-200' : ''}`}>
      {location.pathname !== '/session' && <Navbar />}

      <main className={`flex-1 min-h-screen max-w-full ${location.pathname !== '/session' ? 'border-l border-neutral-800' : ''}`}>
        <div className={`h-full w-full relative z-10 mx-auto ${location.pathname !== '/session' ? 'p-4 sm:p-6 md:p-10 lg:p-12' : ''}`}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/session" element={<Session />} />
            <Route path="/about" element={<Dossier />} />
            <Route path="/records" element={<Records />} />
            <Route path="/system" element={<System />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </main>

      {/* Screen Effects based on Settings */}
      {settings.crtEnabled && (
        <>
          <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-scanlines opacity-20"></div>
          <div className="crt-vignette pointer-events-none"></div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
