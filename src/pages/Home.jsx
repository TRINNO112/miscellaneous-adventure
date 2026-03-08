import { useState } from 'react';
import { FileTerminal, TriangleAlert, Database, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Home() {
    const [integrityPenalty, setIntegrityPenalty] = useState(0);

    return (
        <div className="w-full flex flex-col pb-20 pt-16 md:pt-8 min-h-[calc(100vh-80px)]">

            {/* Bureaucratic Header */}
            <div className="border-b-4 border-neutral-800 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="font-mono text-accent-amber text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
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
                    <p>SECTION 4, DIV 9, CUBICLE 13B</p>
                    <p className="mt-2 text-white">"Obedience is Efficiency."</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Content Area */}
                <div className="lg:col-span-8 flex flex-col gap-8">

                    {/* Hero Description Box */}
                    <div className="brutalist-panel relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-dim rounded-full blur-[50px] group-hover:bg-accent-amber/30 transition-colors"></div>

                        <h2 className="font-display text-3xl font-bold text-white mb-6 uppercase tracking-tight relative z-10">
                            Your Tax Officer Story Awaits
                        </h2>

                        <div className="space-y-4 font-mono text-sm leading-relaxed text-neutral-300 relative z-10 border-l border-neutral-700 pl-4">
                            <p>
                                &gt; INITIALIZING SIMULATION...<br />
                                &gt; LOADING PROFILE: <strong>DASH (ENTITY 7734)</strong><br />
                                &gt; STATUS: EXPENDABLE JUNIOR DATA ANALYST
                            </p>
                            <p className="text-neutral-400">
                                You work at the Central Tax Department. It's soul-crushing. The coffee machines are hostile. Your boss thrives on sarcasm. And worst of all, there are 9,847 unread emails waiting for you.
                            </p>
                            <p className="text-white font-semibold">
                                Will you uncover the deep-rooted corruption, or will you become another cog in the machine? Choose wisely.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
                            <button className="brutalist-button flex items-center justify-center gap-3">
                                <FileTerminal className="w-5 h-5" />
                                Initiate Sequence
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="font-mono text-sm uppercase tracking-wider px-6 py-3 border-2 border-neutral-700 text-neutral-400 hover:border-accent-amber hover:text-accent-amber transition-colors shadow-[4px_4px_0px_#222] hover:shadow-[4px_4px_0px_#ff5500]">
                                Load Previous
                            </button>
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
                            <div className="border border-neutral-800 bg-neutral-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-red-900/50 transition-colors">
                                <div>
                                    <h3 className="font-display font-bold text-lg text-white uppercase mb-1 flex items-center gap-2">
                                        <ShieldAlert className="w-5 h-5 text-red-500" />
                                        Integrity Compliance Test
                                    </h3>
                                    <p className="font-mono text-xs text-neutral-400">
                                        Do not push the red button under any circumstances. It is a violation of protocol 8A.
                                    </p>
                                    {integrityPenalty > 0 && (
                                        <p className="font-mono text-xs text-red-500 mt-2 font-bold animate-pulse">
                                            INTEGRITY PENALTY LOGGED: -{integrityPenalty}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIntegrityPenalty(p => p + 1)}
                                    className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 border-4 border-red-900 shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center shrink-0 transition-transform active:scale-90 active:shadow-none"
                                >
                                    <div className="w-12 h-12 rounded-full border border-red-400 bg-red-500"></div>
                                </button>
                            </div>

                        </div>

                        {/* Aside Stats/Info */}
                        <div className="lg:col-span-4 flex flex-col gap-6">

                            {/* Info Card 1 */}
                            <div className="border-2 border-neutral-800 bg-neutral-900 p-5 group hover:border-neutral-600 transition-colors">
                                <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                                    <span className="font-mono text-[10px] text-neutral-500 uppercase">SYS.REQ 01</span>
                                    <Database className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-white mb-2 uppercase">Consequences</h3>
                                <p className="font-mono text-xs text-neutral-400 h-20">
                                    Every dialogue option is logged. Your Integrity, Reputation, and Influence metrics will determine your survival in the bureau.
                                </p>
                            </div>

                            {/* Info Card 2 */}
                            <div className="border-2 border-neutral-800 bg-neutral-900 p-5 group hover:border-neutral-600 transition-colors">
                                <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                                    <span className="font-mono text-[10px] text-neutral-500 uppercase">SYS.REQ 02</span>
                                    <FileTerminal className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-white mb-2 uppercase">Multiple Endings</h3>
                                <p className="font-mono text-xs text-neutral-400 h-20">
                                    Bring down Director Rathore or take his place. Your moral compass is the only guide in a sea of red tape.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
                );
}
