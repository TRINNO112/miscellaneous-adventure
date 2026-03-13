import { GitBranch, ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function History() {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const history = userData?.choiceHistory || [];

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col pb-20 pt-8 px-4 animate-boot">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit font-mono text-sm uppercase mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Return</span>
            </button>

            {/* Header */}
            <div className="border-b-4 border-neutral-800 pb-6 mb-8 flex items-end gap-4">
                <GitBranch className="w-10 h-10 text-neutral-500" />
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight">
                        Choice <span className="text-accent-amber">History</span>
                    </h1>
                    <p className="font-mono text-xs text-neutral-500 uppercase mt-1">Decision Audit Trail // All Branches Logged</p>
                </div>
            </div>

            {history.length === 0 ? (
                <div className="brutalist-panel p-12 text-center">
                    <GitBranch className="w-12 h-12 mx-auto mb-4 text-neutral-600" />
                    <h3 className="font-display font-bold text-xl text-neutral-500 uppercase mb-2">No Decisions Logged</h3>
                    <p className="font-mono text-xs text-neutral-600 uppercase">Begin a session to record your choices.</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-800"></div>

                    <div className="flex flex-col gap-0">
                        {history.map((entry, idx) => {
                            const hasIntegrity = entry.statChanges?.integrity;
                            const hasReputation = entry.statChanges?.reputation;
                            const hasInfluence = entry.statChanges?.influence;

                            // Color based on dominant stat change
                            let dotColor = 'bg-neutral-600';
                            let borderColor = 'border-neutral-800';
                            if (hasIntegrity && hasIntegrity > 0) { dotColor = 'bg-emerald-500'; borderColor = 'border-emerald-900/50'; }
                            else if (hasIntegrity && hasIntegrity < 0) { dotColor = 'bg-red-500'; borderColor = 'border-red-900/50'; }
                            else if (hasReputation && hasReputation > 0) { dotColor = 'bg-accent-amber'; borderColor = 'border-accent-amber/20'; }
                            else if (hasReputation && hasReputation < 0) { dotColor = 'bg-red-500'; borderColor = 'border-red-900/50'; }

                            return (
                                <div key={idx} className="relative pl-16 pb-8 group">
                                    {/* Timeline dot */}
                                    <div className={`absolute left-[18px] top-2 w-3 h-3 rounded-full ${dotColor} ring-4 ring-bureau-900 z-10 group-hover:scale-125 transition-transform`}></div>

                                    <div className={`border ${borderColor} bg-neutral-900/50 p-4 hover:bg-neutral-900 transition-colors`}>
                                        {/* Scene info */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                                                {entry.sceneTitle || entry.sceneId}
                                            </span>
                                            <span className="font-mono text-[10px] text-neutral-700">
                                                #{idx + 1}
                                            </span>
                                        </div>

                                        {/* Choice made */}
                                        <p className="font-display font-bold text-sm text-white uppercase leading-snug mb-3">
                                            {entry.choiceLabel}
                                        </p>

                                        {/* Stat changes */}
                                        <div className="flex flex-wrap gap-3">
                                            {hasIntegrity && (
                                                <span className={`flex items-center gap-1 font-mono text-[11px] ${hasIntegrity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {hasIntegrity > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                    INT {hasIntegrity > 0 ? '+' : ''}{hasIntegrity}
                                                </span>
                                            )}
                                            {hasReputation && (
                                                <span className={`flex items-center gap-1 font-mono text-[11px] ${hasReputation > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                                                    {hasReputation > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                    REP {hasReputation > 0 ? '+' : ''}{hasReputation}
                                                </span>
                                            )}
                                            {hasInfluence && (
                                                <span className={`flex items-center gap-1 font-mono text-[11px] text-fuchsia-400`}>
                                                    <TrendingUp className="w-3 h-3" />
                                                    INF {hasInfluence > 0 ? '+' : ''}{hasInfluence}
                                                </span>
                                            )}
                                            {!hasIntegrity && !hasReputation && !hasInfluence && (
                                                <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-600">
                                                    <Minus className="w-3 h-3" /> NO STAT CHANGE
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Timeline end cap */}
                    <div className="relative pl-16">
                        <div className="absolute left-[18px] top-0 w-3 h-3 rounded-full bg-accent-amber ring-4 ring-bureau-900 z-10 animate-pulse"></div>
                        <p className="font-mono text-[10px] text-accent-amber uppercase tracking-widest pt-0.5">PRESENT — AWAITING NEXT DECISION</p>
                    </div>
                </div>
            )}
        </div>
    );
}
