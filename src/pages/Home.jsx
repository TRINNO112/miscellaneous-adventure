import { FileTerminal, TriangleAlert, Database, ShieldAlert, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React, { useState } from 'react';

export default function Home() {
    const { user, userData, updateUserData } = useAuth();
    const [glitch, setGlitch] = useState(false);

    const handleIntegrityTest = async () => {
        if (!userData || glitch) return;
        setGlitch(true);
        setTimeout(() => setGlitch(false), 1500);

        const newIntegrity = Math.max(0, (userData.stats?.integrity || 50) - 5);
        await updateUserData({
            stats: {
                ...userData.stats,
                integrity: newIntegrity
            }
        });
    };

    return (
        <div className={`w-full flex flex-col pb-20 pt-16 md:pt-8 min-h-[calc(100vh-80px)] transition-all duration-75 animate-boot ${glitch ? 'animate-[glitch-shake_0.15s_ease-in-out_infinite]' : ''}`}>

            {/* Glitch Overlay */}
            {glitch && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    <div className="absolute inset-0 bg-red-900/30 mix-blend-multiply animate-pulse" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,0,0.08)_2px,rgba(255,0,0,0.08)_4px)]" />
                    <div className="absolute inset-0 opacity-60" style={{ background: 'linear-gradient(transparent 50%, rgba(255,0,0,0.15) 50%)', backgroundSize: '100% 4px' }} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none">
                        <div className="bg-red-950/90 border-2 border-red-500 px-8 py-6 shadow-[0_0_40px_rgba(239,68,68,0.5),8px_8px_0px_#000] animate-[glitch-shake_0.1s_ease-in-out_infinite]">
                            <p className="font-display text-3xl md:text-5xl font-black text-red-500 text-glow-red uppercase tracking-tighter text-center">-5 Integrity</p>
                            <p className="font-mono text-sm text-red-400/80 mt-3 text-center uppercase tracking-widest text-glow-red">Compliance Violation Logged</p>
                        </div>
                    </div>
                </div>
            )}


            {/* Bureaucratic Header */}
            <div className="border-b-4 border-neutral-800 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="font-mono text-accent-amber text-glow-amber text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-accent-amber animate-pulse"></span>
                        WARNING: UNAUTHORIZED ACCESS ATTEMPT LOGGED
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase text-white tracking-tight leading-[0.9] mb-4 w-full">
                        System <br />
                        <span className="text-neutral-500 line-through decoration-red-500 decoration-8">Failure</span>
                        <span className="text-accent-amber block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Override</span>
                    </h1>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-4 font-mono text-xs text-neutral-400 max-w-xs md:text-right">
                    <p>DEPARTMENT OF DIGITAL REGULATION</p>
                    <p>IDENTITY: {user?.uid?.substring(0, 10) || 'GUEST_ENTITY'}</p>
                    <p className="mt-2 text-white">"Obedience is Efficiency."</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Content Area */}
                <div className="lg:col-span-8 flex flex-col gap-8">

                    {/* Immersive Game Mode Portal */}
                    <div className="brutalist-panel relative overflow-hidden group p-10 bg-neutral-900 border-2 border-neutral-800 hover:border-accent-amber transition-all duration-500 h-[400px] flex flex-col justify-center">
                        <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-neutral-700">SESSION_ISOLATION_v3</div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-accent-amber p-3 shadow-[4px_4px_0px_#fff]">
                                    <Play className="w-8 h-8 text-black" />
                                </div>
                                <div>
                                    <h2 className="font-display text-4xl font-black text-white uppercase tracking-tighter">
                                        Active <span className="text-accent-amber text-glow-amber">Protocol</span>
                                    </h2>
                                    <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                                        Enter the Narrative Core
                                    </p>
                                </div>
                            </div>
                            <p className="font-mono text-sm text-neutral-400 max-w-xl leading-relaxed">
                                Experience the simulation in full visual mode. Backgrounds, characters, and real-time system diagnostics enabled.
                            </p>
                            <Link
                                to="/session"
                                className="brutalist-button w-fit flex items-center gap-4 py-4 px-10 group mt-4"
                            >
                                <span className="text-xl font-black uppercase">Initiate Session</span>
                                <Play className="w-5 h-5 fill-current" />
                            </Link>
                        </div>
                        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-[0.03] select-none pointer-events-none rotate-12">
                            <ShieldAlert className="w-96 h-96 text-white" />
                        </div>
                    </div>

                    {/* Warning Banner */}
                    <div className="bg-red-950/30 border border-red-900 p-4 flex items-start gap-4">
                        <TriangleAlert className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Notice of Liability</h4>
                            <p className="font-mono text-xs text-red-200/70">
                                The Bureau is not responsible for spontaneous existential dread, loss of integrity, or injuries sustained from sentient office equipment. All choices are final and immediately reported to your superiors.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Aside Stats/Info */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* INTERGRITY TEST WIDGET */}
                    <div className="brutalist-panel bg-neutral-900 border-neutral-800 p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-mono text-[10px] text-neutral-500 uppercase">Interactive Widget</span>
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-white uppercase leading-tight">Integrity Compliance Test</h3>
                        <p className="font-mono text-[10px] text-neutral-500 uppercase leading-relaxed">
                            Press the button to verify your absolute loyalty to the Bureau's core directives.
                        </p>
                        <button
                            onClick={handleIntegrityTest}
                            className="bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs py-4 border-2 border-red-400 shadow-[4px_4px_0px_#fff] transition-all active:shadow-[0px_0px_0px_#fff] active:translate-y-1 active:translate-x-1 uppercase"
                        >
                            Execute Compliance [DO NOT PRESS]
                        </button>
                    </div>

                    {/* Info Card 1 */}
                    <div className="border-2 border-neutral-800 bg-neutral-900 p-5 group hover:border-neutral-600 transition-colors">
                        <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                            <span className="font-mono text-xs text-neutral-500 uppercase">SYS.REQ 01</span>
                            <Database className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-white mb-2 uppercase">Consequences</h3>
                        <p className="font-mono text-sm text-neutral-400">
                            Every dialogue option is logged. Your Integrity, Reputation, and Influence metrics will determine your survival in the bureau.
                        </p>
                    </div>

                    {/* Info Card 2 */}
                    <div className="border-2 border-neutral-800 bg-neutral-900 p-5 group hover:border-neutral-600 transition-colors">
                        <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                            <span className="font-mono text-xs text-neutral-500 uppercase">SYS.REQ 02</span>
                            <FileTerminal className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-white mb-2 uppercase">Dossier Access</h3>
                        <p className="font-mono text-sm text-neutral-400">
                            The Dossier page contains your permanent record. It is updated in real-time based on your actions within the terminal.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
