import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dossier from './pages/Dossier';
import Records from './pages/Records';
import System from './pages/System';

function App() {
  return (
    <div className="min-h-screen bg-bureau-900 bg-dot-pattern flex flex-col md:flex-row max-w-[100vw] overflow-x-hidden">
      <Navbar />

      <main className="flex-1 min-h-screen max-w-full border-l border-neutral-800">
        <div className="h-full w-full p-4 sm:p-6 md:p-10 lg:p-12 relative z-10 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Dossier />} />
            <Route path="/records" element={<Records />} />
            <Route path="/system" element={<System />} />
          </Routes>
        </div>
      </main>

      {/* Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
    </div>
  );
}

export default App;
