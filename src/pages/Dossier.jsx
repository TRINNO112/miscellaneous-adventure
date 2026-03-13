import { User, ShieldAlert, Award, FileText, Activity, Lock, AlertCircle, Package, Brain, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ITEM_LABELS = {
    pete_receipt: { name: "Pete's Tax Receipt", desc: "Proof of successful collection from Greasy Pete." },
    maya_number: { name: "Maya's Phone Number", desc: "Emergency contact for Officer Maya Chen." },
    dirty_cash: { name: "Dirty Cash ($50K)", desc: "Bribe money from Sal Moretti. Highly incriminating." },
    sal_ledger: { name: "Sal's Ledger", desc: "Financial records proving money laundering at The Velvet Noose." },
    rathore_intel: { name: "Rathore's Redacted File", desc: "Intelligence about Director Rathore's mysterious 3-year gap." }
};

export default function Dossier() {
    const { userData } = useAuth();
    const navigate = useNavigate();

    const stats = userData?.stats || { integrity: 50, reputation: 50, influence: 0 };
    const name = userData?.playerName || 'UNIDENTIFIED_ENTITY';
    const inventory = userData?.inventory || [];
    const currentScene = userData?.currentScene || 'chapter_1_start';

    // Mental profile unlocks at chapter 4+ or influence > 10
    const isChapter4Plus = currentScene.startsWith('chapter_4') || currentScene.startsWith('chapter_5') || currentScene.startsWith('ending_');
    const mentalProfileUnlocked = isChapter4Plus || stats.influence > 10;

    const getMentalProfile = () => {
        const lines = [];
        if (stats.integrity >= 60) {
            lines.push("Subject demonstrates strong moral compass. Resistant to external pressure and bribery. Recommended for sensitive operations requiring ethical judgment.");
            lines.push("Psychological resilience: HIGH. Risk of burnout from moral rigidity: MODERATE.");
        } else if (stats.integrity >= 30) {
            lines.push("Subject exhibits pragmatic moral flexibility. Capable of bending rules when circumstances demand it, but retains baseline ethical standards.");
            lines.push("Adaptability index: ABOVE AVERAGE. Monitor for gradual value erosion.");
        } else {
            lines.push("Subject exhibits concerning disregard for Bureau protocol and ethical guidelines. Pattern of self-serving decisions detected.");
            lines.push("WARNING: Corruption risk assessment — ELEVATED. Recommend increased surveillance and mandatory ethics retraining.");
        }

        if (stats.reputation >= 60) {
            lines.push("Well-regarded among peers and superiors. Department standing: COMMENDABLE. Promotion trajectory: ACCELERATED.");
        } else if (stats.reputation >= 30) {
            lines.push("Mixed departmental feedback. Subject is functional but unremarkable in peer assessments. Promotion trajectory: STANDARD.");
        } else {
            lines.push("Poor departmental standing. Multiple complaints filed. Subject is regarded as either incompetent or untrustworthy by colleagues.");
        }

        if (stats.influence > 10) {
            lines.push("CLASSIFIED: Subject has begun accumulating informal power networks. This development requires close observation by Internal Affairs.");
        }

        return lines;
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col pb-20 pt-8 px-4 animate-boot">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit font-mono text-sm uppercase mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Return</span>
            </button>

            {/* Main Header */}
            <div className="border-b-8 border-white pb-6 mb-12 min-w-0 overflow-hidden">
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black uppercase text-white tracking-tighter leading-none break-all sm:break-words">
                    Dossier <span className="text-accent-amber">//</span> {name}
                </h1>
                <p className="font-mono text-xs uppercase tracking-[0.5em] text-neutral-500 mt-4">
                    Bureau of Digital Regulation // Personnel File #88-24-X
                </p>
                <div className="mt-4 p-2 border border-white/5 bg-white/5 w-fit">
                    <p className="font-mono text-[11px] text-system-cold uppercase tracking-widest leading-none text-glow-cold">
                        LEXICON_ENTRY: [Dossier] — A comprehensive collection of documents/records concerning a specific person or subject.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">

                {/* ID CARD */}
                <div className="lg:col-span-4 lg:sticky lg:top-24">
                    <div className="bg-[#1a1a1a] border-4 border-white p-1 shadow-[8px_8px_0px_#fff]">
                        <div className="border border-white/20 p-6 space-y-6">
                            <div className="aspect-square bg-neutral-900 border-2 border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-accent-amber/5 mix-blend-overlay"></div>
                                <img src="/logo.png" className="w-full h-full object-contain p-8 grayscale contrast-125 brightness-75" alt="ID" />
                                <div className="absolute top-2 right-2 bg-red-600 text-[10px] font-bold px-1.5 py-0.5 text-white animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                                    PROBATION
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h2 className="font-display font-black text-3xl text-white uppercase leading-none truncate">{name}</h2>
                                    <p className="font-mono text-[11px] text-accent-amber uppercase tracking-widest mt-1 text-glow-amber">Junior Data Analyst</p>
                                </div>
                                <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-[11px] text-neutral-400">
                                    <div className="flex justify-between"><span>HIRE_DATE</span><span className="text-white">ERR_CORRUPT</span></div>
                                    <div className="flex justify-between"><span>CLEARANCE</span><span className="text-white font-bold text-glow-cold text-system-cold">{mentalProfileUnlocked ? 'LEVEL_04' : 'LEVEL_01'}</span></div>
                                    <div className="flex justify-between"><span>DEPT_CODE</span><span className="text-white">SEC_7G_TAX</span></div>
                                    <div className="flex justify-between"><span>STATUS</span><span className="text-red-500 text-glow-red">MONITORED</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATS & DETAILS */}
                <div className="lg:col-span-8 space-y-12 min-w-0">

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="brutalist-panel bg-neutral-900/80 border-white/20 p-6 space-y-6">
                            <h3 className="font-display font-bold text-white uppercase flex items-center gap-2 text-sm border-b border-white/10 pb-2">
                                <ShieldAlert className="w-4 h-4 text-accent-amber" /> Integrity Metrics
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-[11px]">
                                    <span className="text-neutral-500">COMPLIANCE_INDEX</span>
                                    <span className={stats.integrity < 30 ? 'text-red-500 animate-pulse font-bold' : 'text-emerald-500'}>{stats.integrity}%</span>
                                </div>
                                <div className="h-4 bg-black border border-white/10 p-0.5">
                                    <div className="h-full bg-accent-amber transition-all duration-1000" style={{ width: `${stats.integrity}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="brutalist-panel bg-neutral-900/80 border-white/20 p-6 space-y-6">
                            <h3 className="font-display font-bold text-white uppercase flex items-center gap-2 text-sm border-b border-white/10 pb-2">
                                <Award className="w-4 h-4 text-accent-amber" /> Department Standing
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="font-mono text-[11px] text-neutral-500">REPUTATION</span>
                                    <span className="font-display font-black text-2xl text-white">{stats.reputation}<span className="text-xs font-mono text-neutral-600 underline ml-1">PT</span></span>
                                </div>
                                <div className="flex justify-between items-end border-t border-white/5 pt-2">
                                    <span className="font-mono text-[11px] text-neutral-500">INFLUENCE</span>
                                    <span className="font-mono text-xs font-bold text-white uppercase">{stats.influence > 10 ? 'ESTABLISHED' : 'UNRANKED'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory / Confiscated Items */}
                    <div className="brutalist-panel border-l-emerald-500 p-6 sm:p-8 space-y-6 overflow-hidden">
                        <div className="flex items-center gap-3">
                            <Package className="w-6 h-6 text-emerald-500" />
                            <h3 className="font-display font-black text-2xl text-white uppercase italic">Confiscated_Items</h3>
                        </div>
                        {inventory.length === 0 ? (
                            <p className="font-mono text-xs text-neutral-600 uppercase">NO ITEMS IN POSSESSION.</p>
                        ) : (
                            <div className="space-y-3">
                                {inventory.map((itemId, idx) => {
                                    const item = ITEM_LABELS[itemId] || { name: itemId.replace(/_/g, ' '), desc: 'Unknown item.' };
                                    return (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-950/20 border border-emerald-900/30">
                                            <Package className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="font-mono text-xs text-emerald-400 font-bold uppercase">{item.name}</p>
                                                <p className="font-mono text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Background Summary */}
                    <div className="space-y-6 min-w-0">
                        <div className="brutalist-panel border-l-white p-6 sm:p-8 space-y-6 overflow-hidden">
                            <div className="flex items-start gap-3 flex-col sm:flex-row sm:items-center">
                                <FileText className="w-6 h-6 text-white shrink-0" />
                                <h3 className="font-display font-black text-2xl text-white uppercase italic break-all sm:break-normal">Background_Summary</h3>
                            </div>
                            <div className="font-mono text-[11px] text-neutral-400 space-y-4 leading-relaxed break-words hyphen-auto">
                                <p>Subject identified as a high-potential recruit following the Bureau exams. Psychological profile indicates a strong desire for "Independence" and "Solitary Living"—traits frequently correlated with high productivity but potential for non-compliance.</p>
                                <p>Mandatory psychological supervision recommended if Integrity Index falls below threshold.</p>
                            </div>
                        </div>

                        <div className="brutalist-panel border-l-red-600 p-6 sm:p-8 space-y-6 overflow-hidden">
                            <div className="flex items-center gap-3 text-red-600">
                                <AlertCircle className="w-6 h-6" />
                                <h3 className="font-display font-black text-2xl uppercase italic">Incident_Log</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-red-950/20 border border-red-900/30">
                                    <div className="font-mono text-xs text-red-500 font-bold">ENTRY_04.84</div>
                                    <div className="md:col-span-3 font-mono text-xs text-neutral-400">
                                        Caught attempting to bypass Director Rathore's private archive. Subject claimed "optimization." Warning issued.
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-neutral-900 border border-white/10">
                                    <div className="font-mono text-xs text-neutral-500">ENTRY_12.84</div>
                                    <div className="md:col-span-3 font-mono text-xs text-neutral-400">
                                        Subject rebooted sentient lift system. Required 48-hour mandatory silence training.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mental Profile — Locked or Unlocked */}
                    {mentalProfileUnlocked ? (
                        <div className="border-2 border-system-cold/30 bg-system-cold/5 p-6 sm:p-8 space-y-6 transition-all">
                            <div className="flex items-center gap-3">
                                <Brain className="w-6 h-6 text-system-cold" />
                                <h3 className="font-display font-black text-2xl text-system-cold uppercase italic text-glow-cold">Mental_Profile</h3>
                            </div>
                            <div className="font-mono text-[11px] text-neutral-400 space-y-4 leading-relaxed">
                                {getMentalProfile().map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-system-cold/20">
                                <p className="font-mono text-[10px] text-system-cold/50 uppercase tracking-widest">
                                    CLASSIFIED // LEVEL 4 ACCESS GRANTED // AUTO-GENERATED PSYCHOLOGICAL ASSESSMENT
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-white/10 p-12 text-center opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all">
                            <Lock className="w-12 h-12 mx-auto mb-4 text-system-cold" />
                            <h4 className="font-display font-bold text-system-cold text-glow-cold uppercase mb-2">Mental Profile Locked</h4>
                            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-neutral-500">Level 4 Clearance Required for Subject: {name}</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
