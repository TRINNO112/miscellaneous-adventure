import { useState } from 'react';
import { Settings as SettingsIcon, Monitor, Volume2, Save, PowerOff, ShieldAlert, LogOut, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function System() {
    const { logout, user, userData, updateUserData, setUserData } = useAuth();
    const [showWipeConfirm, setShowWipeConfirm] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);

    const settings = userData?.settings || { crtEnabled: true, readabilityMode: false, typingSounds: true, volume: 74 };

    const updateSetting = async (key, value) => {
        await updateUserData({
            settings: { ...settings, [key]: value }
        });
    };

    const handleVolumeClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        let percentage = Math.round((x / width) * 100);
        percentage = Math.max(0, Math.min(100, Math.round(percentage / 5) * 5));
        updateSetting('volume', percentage);
    };

    // Save Slots
    const getSaveSlots = () => {
        try {
            const raw = localStorage.getItem('save_slots');
            return raw ? JSON.parse(raw) : [null, null, null];
        } catch { return [null, null, null]; }
    };

    const [saveSlots, setSaveSlots] = useState(getSaveSlots);

    const saveToSlot = (slotIdx) => {
        if (!userData) return;
        const slotData = {
            currentScene: userData.currentScene,
            stats: { ...userData.stats },
            inventory: [...(userData.inventory || [])],
            playerName: userData.playerName || 'UNKNOWN',
            choiceHistory: [...(userData.choiceHistory || [])],
            timestamp: new Date().toISOString()
        };
        const slots = [...saveSlots];
        slots[slotIdx] = slotData;
        localStorage.setItem('save_slots', JSON.stringify(slots));
        setSaveSlots(slots);
        setSaveMessage(`SLOT ${slotIdx + 1}: DATA SAVED`);
        setTimeout(() => setSaveMessage(null), 2000);
    };

    const loadFromSlot = async (slotIdx) => {
        const slot = saveSlots[slotIdx];
        if (!slot) return;
        await updateUserData({
            currentScene: slot.currentScene,
            stats: slot.stats,
            inventory: slot.inventory,
            playerName: slot.playerName,
            choiceHistory: slot.choiceHistory || []
        });
        setSaveMessage(`SLOT ${slotIdx + 1}: DATA LOADED`);
        setTimeout(() => setSaveMessage(null), 2000);
    };

    const handleWipeData = async () => {
        const initialData = {
            stats: { integrity: 50, reputation: 50, influence: 0 },
            settings: { crtEnabled: true, readabilityMode: false, typingSounds: true, volume: 74 },
            currentScene: 'chapter_1_start',
            inventory: [],
            choiceHistory: [],
            playerName: null
        };

        localStorage.removeItem('guest_progress');
        localStorage.removeItem('save_slots');
        setSaveSlots([null, null, null]);

        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), { ...initialData, createdAt: new Date().toISOString() });
            } catch (err) {
                console.error("Wipe sync failed:", err);
            }
        }

        setUserData(initialData);
        setShowWipeConfirm(false);
        setSaveMessage('ALL DATA WIPED. ENTITY RESET.');
        setTimeout(() => setSaveMessage(null), 3000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col pb-20 pt-8 animate-boot">

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

            {/* Save/Load Message */}
            {saveMessage && (
                <div className="mb-6 p-3 border border-accent-amber/50 bg-accent-amber/10 font-mono text-xs text-accent-amber uppercase tracking-widest animate-in fade-in duration-300">
                    {saveMessage}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Settings Panel */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Display Settings */}
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
                                <button
                                    onClick={() => updateSetting('crtEnabled', !settings.crtEnabled)}
                                    className={`brutalist-button px-4 py-2 text-xs ${settings.crtEnabled ? 'bg-accent-amber text-black border-accent-amber hover:bg-transparent hover:text-accent-amber active:shadow-none' : 'text-neutral-500 border-neutral-700 hover:text-white'}`}
                                >
                                    {settings.crtEnabled ? 'ENABLD' : 'DISBLD'}
                                </button>
                            </div>
                            <div className="flex justify-between items-center border-t border-neutral-800 pt-6">
                                <div className="font-mono text-sm text-neutral-400">
                                    <span className="text-white block mb-1">Text Readability Mode</span>
                                    Increases contrast, removes atmospheric glitches.
                                </div>
                                <button
                                    onClick={() => updateSetting('readabilityMode', !settings.readabilityMode)}
                                    className={`brutalist-button px-4 py-2 text-xs ${settings.readabilityMode ? 'bg-accent-amber text-black border-accent-amber hover:bg-transparent hover:text-accent-amber active:shadow-none' : 'text-neutral-500 border-neutral-700 hover:text-white'}`}
                                >
                                    {settings.readabilityMode ? 'ENABLD' : 'DISBLD'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Audio Settings */}
                    <div className="border border-neutral-800 bg-neutral-900 overflow-hidden group hover:border-neutral-600 transition-colors">
                        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-3 border-b border-neutral-700">
                            <Volume2 className="w-4 h-4 text-white" />
                            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Audio Interface</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center font-mono text-sm text-neutral-400">
                                    <span className="text-white">Master Volume</span>
                                    <span className="text-accent-amber">{settings.volume}%</span>
                                </div>
                                <div
                                    className="w-full h-8 bg-neutral-800 border-2 border-neutral-700 flex cursor-pointer"
                                    onClick={handleVolumeClick}
                                >
                                    <div className="h-full bg-[repeating-linear-gradient(90deg,#ff5500_0px,#ff5500_4px,transparent_4px,transparent_6px)] transition-all duration-150" style={{ width: `${settings.volume}%` }}></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-neutral-800 pt-6">
                                <div className="font-mono text-sm text-neutral-400">
                                    <span className="text-white block mb-1">Typing Sounds</span>
                                    Mechanical keyboard acoustics during dialogue.
                                </div>
                                <button
                                    onClick={() => updateSetting('typingSounds', !settings.typingSounds)}
                                    className={`brutalist-button px-4 py-2 text-xs ${settings.typingSounds ? 'bg-accent-amber text-black border-accent-amber hover:bg-transparent hover:text-accent-amber active:shadow-none' : 'text-neutral-500 border-neutral-700 hover:text-white'}`}
                                >
                                    {settings.typingSounds ? 'ENABLD' : 'DISBLD'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Save Slots */}
                    <div className="border border-neutral-800 bg-neutral-900 overflow-hidden hover:border-neutral-600 transition-colors">
                        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-3 border-b border-neutral-700">
                            <Save className="w-4 h-4 text-white" />
                            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Save Slots</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {[0, 1, 2].map(idx => {
                                const slot = saveSlots[idx];
                                return (
                                    <div key={idx} className="border border-neutral-800 bg-black p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono text-xs text-accent-amber font-bold">SLOT_{idx + 1}</span>
                                                {slot && <span className="font-mono text-[10px] text-neutral-600">{new Date(slot.timestamp).toLocaleString()}</span>}
                                            </div>
                                            {slot ? (
                                                <div className="font-mono text-[11px] text-neutral-400 space-y-0.5">
                                                    <p>ENTITY: <span className="text-white">{slot.playerName}</span></p>
                                                    <p>SCENE: <span className="text-white">{slot.currentScene}</span></p>
                                                    <p>INT: <span className="text-blue-400">{slot.stats.integrity}</span> / REP: <span className="text-emerald-400">{slot.stats.reputation}</span> / INF: <span className="text-fuchsia-400">{slot.stats.influence}</span></p>
                                                </div>
                                            ) : (
                                                <p className="font-mono text-[11px] text-neutral-600 uppercase">— EMPTY —</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => saveToSlot(idx)}
                                                className="font-mono text-[10px] px-3 py-2 border border-accent-amber/50 text-accent-amber hover:bg-accent-amber hover:text-black transition-colors flex items-center gap-1.5"
                                            >
                                                <Download className="w-3 h-3" /> SAVE
                                            </button>
                                            <button
                                                onClick={() => loadFromSlot(idx)}
                                                disabled={!slot}
                                                className="font-mono text-[10px] px-3 py-2 border border-neutral-700 text-neutral-400 hover:text-white hover:border-white transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <Upload className="w-3 h-3" /> LOAD
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Aside Panel */}
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
                        <button
                            className="w-full brutalist-button flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black shadow-[4px_4px_0px_#ef4444]"
                            onClick={() => {
                                updateUserData({ savedAt: new Date().toISOString() });
                                setSaveMessage('FORCE SAVE: DATA TRANSMITTED.');
                                setTimeout(() => setSaveMessage(null), 2000);
                            }}
                        >
                            <Save className="w-4 h-4" />
                            Force Save State
                        </button>
                    </div>

                    {/* Wipe Data */}
                    {!showWipeConfirm ? (
                        <button
                            className="brutalist-button flex justify-between items-center w-full px-6 py-4 bg-transparent border-neutral-800 text-neutral-500 hover:border-red-500 hover:text-red-500 group shadow-none"
                            onClick={() => setShowWipeConfirm(true)}
                        >
                            <span className="font-mono uppercase text-sm font-bold tracking-widest">Wipe Data</span>
                            <PowerOff className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        </button>
                    ) : (
                        <div className="border-2 border-red-600 bg-red-950/30 p-6 space-y-4 animate-in fade-in duration-300">
                            <div className="flex items-center gap-3 text-red-500">
                                <AlertTriangle className="w-6 h-6" />
                                <h3 className="font-display font-bold text-lg uppercase">Confirm Wipe</h3>
                            </div>
                            <p className="font-mono text-xs text-red-300/80 leading-relaxed">
                                This will permanently delete ALL progress, stats, inventory, choice history, and save slots. This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleWipeData}
                                    className="flex-1 brutalist-button border-red-500 text-red-500 hover:bg-red-500 hover:text-black shadow-[4px_4px_0px_#ef4444] flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" /> WIPE ALL
                                </button>
                                <button
                                    onClick={() => setShowWipeConfirm(false)}
                                    className="flex-1 brutalist-button border-neutral-700 text-neutral-500 hover:text-white shadow-none flex items-center justify-center"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
