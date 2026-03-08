import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dossier from './pages/Dossier';
import Records from './pages/Records';
import System from './pages/System';
import Auth from './pages/Auth';
import Session from './pages/Session';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();

  // Dynamic Background based on Route
  const getBgClass = () => {
    if (location.pathname === '/') return 'bg-constellation';
    if (['/about', '/records', '/system'].includes(location.pathname)) return 'bg-nebula';
    return 'bg-bureau-900'; // Default / Session
  };

  return (
    <div className={`min-h-screen ${getBgClass()} flex flex-col md:flex-row max-w-[100vw] overflow-x-hidden transition-colors duration-1000`}>
      <Navbar />

      <main className="flex-1 min-h-screen max-w-full border-l border-neutral-800">
        <div className="h-full w-full p-4 sm:p-6 md:p-10 lg:p-12 relative z-10 mx-auto">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/session" element={<Session />} />
            <Route path="/about" element={<Dossier />} />
            <Route path="/records" element={<Records />} />
            <Route path="/system" element={<System />} />
          </Routes>
        </div>
      </main>

      {/* Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-scanlines opacity-20"></div>
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
