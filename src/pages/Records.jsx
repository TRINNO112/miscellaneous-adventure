import { User, Activity, ShieldAlert, Cpu } from 'lucide-react';

export default function Records() {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col pb-20 pt-8">

            {/* Header */}
            <div className="border-b-4 border-neutral-800 pb-6 mb-8 flex items-end gap-4">
                <User className="w-10 h-10 text-neutral-500" />
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight">
                        Personnel <span className="text-accent-amber">Records</span>
                    </h1>
                    <p className="font-mono text-xs text-neutral-500 uppercase mt-1">Metrics & Progression // Subject Evaluation</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Integrity Stat */}
                <div className="border-2 border-neutral-800 bg-bureau-800 p-6 group">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-display font-bold text-xl text-white uppercase flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-blue-500" />
                                Integrity
                            </h3>
                            <p className="font-mono text-xs text-neutral-500 mt-1">Moral adherence to Bureau guidelines.</p>
                        </div>
                        <span className="font-mono text-2xl font-bold text-white">45%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 overflow-hidden relative border border-neutral-700">
                        <div className="absolute top-0 left-0 h-full bg-blue-500 w-[45%] transition-all duration-1000 ease-out group-hover:bg-blue-400"></div>
                    </div>
                    <p className="font-mono text-[10px] text-neutral-500 mt-3 text-right">TREND: DECLINING</p>
                </div>

                {/* Reputation Stat */}
                <div className="border-2 border-neutral-800 bg-bureau-800 p-6 group">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-display font-bold text-xl text-white uppercase flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                Reputation
                            </h3>
                            <p className="font-mono text-xs text-neutral-500 mt-1">Peer perception and social standing.</p>
                        </div>
                        <span className="font-mono text-2xl font-bold text-white">12%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 overflow-hidden relative border border-neutral-700">
                        <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[12%] transition-all duration-1000 ease-out group-hover:bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                    <p className="font-mono text-[10px] text-neutral-500 mt-3 text-right">TREND: CRITICAL</p>
                </div>

                {/* Influence Stat */}
                <div className="border-2 border-neutral-800 bg-bureau-800 p-6 group md:col-span-2">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-display font-bold text-xl text-white uppercase flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-fuchsia-500" />
                                System Influence
                            </h3>
                            <p className="font-mono text-xs text-neutral-500 mt-1">Ability to bypass bureaucratic red tape.</p>
                        </div>
                        <span className="font-mono text-2xl font-bold text-white">0%</span>
                    </div>
                    <div className="w-full h-4 bg-neutral-900 overflow-hidden relative border border-neutral-700">
                        <div className="absolute top-0 left-0 h-full bg-fuchsia-500 w-[0%] transition-all duration-1000 ease-out"></div>
                        {/* Pattern overlay for empty state */}
                        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)]"></div>
                    </div>
                    <p className="font-mono text-xs text-fuchsia-500/50 mt-4 text-center border border-fuchsia-900/30 py-2 bg-fuchsia-950/20">
                        ACCESS DENIED. PROMOTE TO LEVEL 2 TO UNLOCK INFLUENCE ACTIONS.
                    </p>
                </div>

            </div>

            <div className="mt-12 brutalist-panel border-l-neutral-600 p-6">
                <h3 className="font-display font-bold text-lg text-white uppercase mb-4">Recent Audits</h3>
                <table className="w-full font-mono text-sm text-left">
                    <thead className="text-neutral-500 text-[10px] sm:text-xs border-b border-neutral-800">
                        <tr>
                            <th className="pb-2 font-normal">TIMESTAMP</th>
                            <th className="pb-2 font-normal">EVENT</th>
                            <th className="pb-2 font-normal text-right">DELTA</th>
                        </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                        <tr className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                            <td className="py-3 text-neutral-500">08:04:12</td>
                            <td className="py-3">Arrived exactly on time (Suspicious)</td>
                            <td className="py-3 text-right text-red-400">-1 INT</td>
                        </tr>
                        <tr className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                            <td className="py-3 text-neutral-500">09:15:00</td>
                            <td className="py-3">Ignored screaming printer</td>
                            <td className="py-3 text-right text-emerald-400">+2 REP</td>
                        </tr>
                        <tr className="hover:bg-neutral-800/30">
                            <td className="py-3 text-neutral-500">11:30:45</td>
                            <td className="py-3">Drank experimental coffee</td>
                            <td className="py-3 text-right text-neutral-500">0</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
