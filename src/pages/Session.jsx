import React, { useState, useEffect } from 'react';
import StoryEngine from '../components/StoryEngine';
import { Terminal, ShieldAlert, Wifi, Battery, Clock, Cpu, HardDrive } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Session() {
    const { user } = useAuth();
    const [now, setNow] = useState(new Date());
    const [stats, setStats] = useState({
        memory: '0.00 GB',
        battery: '100%',
        cpu: '2.4%',
        uptime: '00:00:00'
    });
    const [sceneAssets, setSceneAssets] = useState({
        background: '',
        characters: []
    });

    // System Stats Simulation & Real APIs
    useEffect(() => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            setNow(new Date());

            // Uptime calculation
            const diff = Math.floor((Date.now() - startTime) / 1000);
            const h = Math.floor(diff / 3600).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');

            // Resource simulation (CPU)
            const cpuVal = (Math.random() * 5 + 1).toFixed(1) + '%';

            // Real Memory (Chrome/Edge only)
            let memVal = '0.42 GB';
            if (window.performance && window.performance.memory) {
                memVal = (window.performance.memory.usedJSHeapSize / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
            }

            setStats(prev => ({
                ...prev,
                uptime: `${h}:${m}:${s}`,
                cpu: cpuVal,
                memory: memVal
            }));
        }, 1000);

        // Real Battery
        if ('getBattery' in navigator) {
            navigator.getBattery().then(bat => {
                const updateBat = () => setStats(prev => ({ ...prev, battery: Math.floor(bat.level * 100) + '%' }));
                updateBat();
                bat.addEventListener('levelchange', updateBat);
            });
        }

        return () => clearInterval(timer);
    }, []);

    // Callback from StoryEngine to update assets
    const onSceneChange = (assets) => {
        setSceneAssets(assets);
    };

    return (
        <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-4 max-w-[1600px] mx-auto py-2">

            {/* Top Diagnostic Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 brutalist-panel bg-neutral-900 border-neutral-800 px-4 py-2 flex items-center justify-between overflow-hidden">
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-800"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-accent-amber" />
                            <span className="font-mono text-[10px] text-white uppercase tracking-widest hidden sm:inline">
                                SESSION_ID: {user?.uid?.substring(0, 12) || 'GUEST_PROTO'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-[9px] text-neutral-500 uppercase overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <Cpu className="w-3 h-3 text-blue-500" />
                            <span>CPU: <span className="text-white">{stats.cpu}</span></span>
                        </div>
                        <div className="flex items-center gap-2 whitespace-nowrap border-l border-neutral-800 pl-4">
                            <HardDrive className="w-3 h-3 text-emerald-500" />
                            <span>MEM: <span className="text-white">{stats.memory}</span></span>
                        </div>
                        <div className="flex items-center gap-2 whitespace-nowrap border-l border-neutral-800 pl-4">
                            <Battery className="w-3 h-3 text-accent-amber" />
                            <span>PWR: <span className="text-white">{stats.battery}</span></span>
                        </div>
                        <div className="flex items-center gap-2 whitespace-nowrap border-l border-neutral-800 pl-4">
                            <Clock className="w-3 h-3" />
                            <span>TIME: <span className="text-white">{now.toLocaleTimeString()}</span></span>
                        </div>
                        <div className="flex items-center gap-2 whitespace-nowrap border-l border-neutral-800 pl-4">
                            <ShieldAlert className="w-3 h-3 text-red-500" />
                            <span>UPTIME: <span className="text-white">{stats.uptime}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Visual Stage & Dialogue Area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">

                {/* Visual Stage (The Game Screen) */}
                <div className="flex-1 brutalist-panel bg-black border-neutral-800 relative overflow-hidden flex flex-col items-center justify-end">

                    {/* Background Layer */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-40 grayscale-[0.5]"
                        style={{
                            backgroundImage: sceneAssets.background ? `url(${sceneAssets.background})` : 'none',
                            backgroundColor: '#050505'
                        }}
                    >
                        {/* Static/Noise overlay for immersion */}
                        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
                    </div>

                    {/* Character Layer - Centered for now, can be expanded to positional rendering */}
                    <div className="relative z-10 w-full h-full flex items-end justify-center px-10 gap-8">
                        {sceneAssets.characters.map((char, idx) => (
                            <div key={idx} className="relative h-[80%] flex flex-col justify-end transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
                                <img
                                    src={char.sprite}
                                    alt={char.name}
                                    className="h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,165,0,0.3)] contrast-125 saturate-50"
                                />
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 whitespace-nowrap">
                                    <span className="bg-black border border-accent-amber text-accent-amber px-2 py-0.5 font-mono text-[10px] uppercase">
                                        Entity // {char.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Corner Status Accents */}
                    <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 uppercase transition-all">
                        Rendering_Core_v4.2 // Active
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <Wifi className="w-3 h-3 text-emerald-500 animate-pulse" />
                        <span className="font-mono text-[9px] text-neutral-600 uppercase">Live_Feed_Encrypted</span>
                    </div>
                </div>

                {/* Right Side: Dialogue & Protocol Panel */}
                <div className="w-full lg:w-96 flex flex-col gap-4 shrink-0 overflow-y-auto">

                    <div className="brutalist-panel bg-neutral-900 border-neutral-800 p-6 flex-1 flex flex-col">
                        <div className="mb-4 border-b border-neutral-800 pb-2 flex justify-between items-center">
                            <h3 className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-accent-amber" />
                                Protocol Control
                            </h3>
                            <div className="w-2 h-2 bg-accent-amber animate-pulse"></div>
                        </div>

                        {/* Story Engine integrated here */}
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <StoryEngine onSceneData={onSceneChange} />
                        </div>
                    </div>

                    <div className="brutalist-panel bg-black border-neutral-800 p-4 font-mono text-[9px] text-neutral-500 space-y-2 uppercase leading-relaxed">
                        <p className="text-white border-b border-neutral-800 pb-1 mb-2">Operational Guidelines:</p>
                        <p>1. Dialogue represents binding input.</p>
                        <p>2. Simulation variance: <span className="text-accent-amber">0.0042%</span></p>
                        <p>3. Do not attempt to bypass security layers.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
