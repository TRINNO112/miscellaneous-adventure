import { ArrowRight, ShieldAlert, Sparkles, Binary } from 'lucide-react';

export default function Home() {
    return (
        <div className="pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">

            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8 animate-fade-in-up">
                <Sparkles className="w-4 h-4" />
                <span>A Choice-Driven IRS Thriller</span>
            </div>

            {/* Hero Title */}
            <div className="text-center max-w-4xl mx-auto space-y-6 mb-12 animate-fade-in-up animation-delay-100">
                <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                    Survive the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-cyan-400">
                        Bureaucratic Nightmare
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Step into the shoes of Dash, a junior data analyst in the Department of Digital Regulation. Make choices, uncover corruption, and decide whether to break the system or let it break you.
                </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-200">
                <button className="group flex items-center justify-center gap-2 bg-white text-surface-900 px-8 py-4 rounded-xl text-lg font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all hover:scale-105">
                    Start Adventure
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-center gap-2 bg-surface-800/50 hover:bg-surface-700/50 border border-white/10 text-white px-8 py-4 rounded-xl text-lg font-medium backdrop-blur-md transition-all">
                    <Binary className="w-5 h-5 text-primary-400" />
                    Load Save
                </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl animate-fade-in-up animation-delay-300">

                <div className="glass-panel p-6 rounded-2xl hover:bg-surface-800/80 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                        <ShieldAlert className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Meaningful Choices</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Every dialogue option shapes your reputation, integrity, and influence within the Bureau.
                    </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl hover:bg-surface-800/80 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                        <Binary className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Multiple Endings</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Will you expose the corrupt directors, or become the very thing you swore to destroy?
                    </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl hover:bg-surface-800/80 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Dynamic World</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Experience a rich narrative where even the coffee machine might be plotting against you.
                    </p>
                </div>

            </div>
        </div>
    );
}
