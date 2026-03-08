import { Settings as SettingsIcon, Monitor, Volume2, Save, PowerOff, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function System() {
    const { logout, user } = useAuth();

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col pb-20 pt-8">

            {/* Header */}
            <div className="border-b-4 border-neutral-800 pb-6 mb-8 flex items-end justify-between gap-4">
                <div className="flex items-end gap-4">
                    <SettingsIcon className="w-10 h-10 text-neutral-500 animate-[spin_10s_linear_infinite]" />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight">
                            System <span className="text-accent-amber">Control</span>
                        </h1>
                        <p className="font-mono text-xs text-neutral-500 uppercase mt-1">Terminal Preferences // Save Management</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="font-mono text-[10px] text-red-500 hover:text-white flex items-center gap-2 border border-red-900 px-3 py-1 hover:bg-red-950 transition-colors"
                >
                    <LogOut className="w-3 h-3" />
                    DISCONNECT_SESSION
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Settings Panel */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    <div className="border border-neutral-800 bg-neutral-900 overflow-hidden group hover:border-neutral-600 transition-colors">
                        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-3 border-b border-neutral-700">
                            <Monitor className="w-4 h-4 text-white" />
                            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Display Parameters</h3>
                        </div>
                        <div className="p-6 space-y-6">

                            <div className="flex justify-between items-center">
                                <div className="font-mono text-sm text-neutral-400">
                                    <span className="text-white block mb-1">CRT Scanlines</span>
                                    Toggle visual interference overlay.
                                </div>
                                <button className="brutalist-button px-4 py-2 text-xs bg-accent-amber text-black border-accent-amber hover:bg-transparent hover:text-accent-amber active:shadow-none">ENABLD</button>
                            </div>

                            <div className="flex justify-between items-center border-t border-neutral-800 pt-6">
                                <div className="font-mono text-sm text-neutral-400">
                                    <span className="text-white block mb-1">Text Readability Mode</span>
                                    Increases contrast, removes atmospheric glitches.
                                </div>
                                <button className="brutalist-button px-4 py-2 text-xs text-neutral-500 border-neutral-700 hover:text-white">DISBLD</button>
                            </div>

                        </div>
                    </div>

                    <div className="border border-neutral-800 bg-neutral-900 overflow-hidden group hover:border-neutral-600 transition-colors">
                        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-3 border-b border-neutral-700">
                            <Volume2 className="w-4 h-4 text-white" />
                            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Audio Interface</h3>
                        </div>
                        <div className="p-6 space-y-6">

                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center font-mono text-sm text-neutral-400">
                                    <span className="text-white">Master Volume</span>
                                    <span className="text-accent-amber">74%</span>
                                </div>
                                <div className="w-full h-8 bg-neutral-800 border-2 border-neutral-700 flex">
                                    <div className="h-full w-[74%] bg-[repeating-linear-gradient(90deg,#ff5500_0px,#ff5500_4px,transparent_4px,transparent_6px)]"></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-neutral-800 pt-6">
                                <div className="font-mono text-sm text-neutral-400">
                                    <span className="text-white block mb-1">Typing Sounds</span>
                                    Mechanical keyboard acoustics.
                                </div>
                                <button className="brutalist-button px-4 py-2 text-xs bg-accent-amber text-black border-accent-amber hover:bg-transparent hover:text-accent-amber">ENABLD</button>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Aside Threat / Save Panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    <div className="brutalist-panel border-l-red-500 p-6 space-y-6">
                        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                            <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
                            <h3 className="font-display font-bold text-lg text-white uppercase">Threat Level</h3>
                        </div>

                        <div className="flex items-center justify-between font-mono text-sm">
                            <span className="text-neutral-400">Detection Risk:</span>
                            <span className="text-red-500 font-bold">ELEVATED</span>
                        </div>

                        <p className="font-mono text-xs text-neutral-500 leading-relaxed">
                            Caution: Saving state creates a detectable log entry (Entity ID: {user?.uid?.substring(0, 8) || 'GUEST_PROTO'}...). Do not leave the terminal unattended.
                        </p>

                        <button className="w-full brutalist-button flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black shadow-[4px_4px_0px_#ef4444]">
                            <Save className="w-4 h-4" />
                            Force Save State
                        </button>
                    </div>

                    <button
                        className="brutalist-button flex justify-between items-center w-full px-6 py-4 bg-transparent border-neutral-800 text-neutral-500 hover:border-red-500 hover:text-red-500 group shadow-none"
                        onClick={() => alert("WIPE_READY: Access Restricted.")}
                    >
                        <span className="font-mono uppercase text-sm font-bold tracking-widest">Wipe Data</span>
                        <PowerOff className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    </button>

                </div>

            </div>

        </div>
    );
}
