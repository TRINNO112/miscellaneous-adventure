import { BookOpen, AlertCircle, FileText, Lock } from 'lucide-react';

export default function Dossier() {
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col pb-20 pt-8">

            {/* Header */}
            <div className="border-b-4 border-neutral-800 pb-6 mb-8 flex items-end gap-4">
                <BookOpen className="w-10 h-10 text-neutral-500" />
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight">
                        Personal <span className="text-accent-amber">Dossier</span>
                    </h1>
                    <p className="font-mono text-xs text-neutral-500 uppercase mt-1">Classified: Eyes Only // Entity 7734</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Col: Employee ID */}
                <div className="md:col-span-1 space-y-6">
                    <div className="border-2 border-neutral-800 p-1 relative group">
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-amber m-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img
                            src="/logo.png"
                            alt="Bureau ID Photo"
                            className="w-full aspect-square object-cover bg-neutral-900 border border-neutral-800 filter grayscale contrast-125"
                        />
                        <div className="bg-neutral-900 p-4 mt-1 border border-neutral-800">
                            <h3 className="font-display font-bold text-white uppercase text-lg">Dash</h3>
                            <p className="font-mono text-xs text-accent-amber">Junior Data Analyst</p>
                            <div className="mt-4 pt-4 border-t border-neutral-800 font-mono text-xs text-neutral-500 space-y-1">
                                <div className="flex justify-between"><span>Hire Date</span><span className="text-white">ERR_CORRUPT</span></div>
                                <div className="flex justify-between"><span>Clearance</span><span className="text-white">Level 1</span></div>
                                <div className="flex justify-between"><span>Status</span><span className="text-red-400">Probation</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Details */}
                <div className="md:col-span-2 space-y-8">

                    <div className="brutalist-panel border-l-neutral-500 p-6 space-y-4">
                        <h3 className="font-display font-bold text-xl text-white uppercase flex items-center gap-2">
                            <FileText className="w-5 h-5 text-neutral-500" />
                            Background Summary
                        </h3>
                        <div className="font-mono text-sm text-neutral-400 space-y-4">
                            <p>Subject {"[REDACTED]"} transferred to Digital Regulation after the incident at Sector 4. Displays severe insubordination tendencies but maintains a 94.2% audit efficiency rate.</p>
                            <p>Known associates: None. Coffee preference: Black, heavily caffeinated, preferably from the 3rd-floor machine that doesn't scream.</p>
                        </div>
                    </div>

                    <div className="brutalist-panel border-l-red-500 p-6">
                        <h3 className="font-display font-bold text-xl text-white uppercase flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            Disciplinary Record
                        </h3>
                        <ul className="space-y-3 font-mono text-sm text-neutral-400">
                            <li className="flex gap-4 border-b border-neutral-800 pb-2">
                                <span className="text-red-500 shrink-0">11.04.84</span>
                                <span>Caught attempting to optimize the payroll algorithm to bypass Director Rathore's offshore accounts. Warning issued.</span>
                            </li>
                            <li className="flex gap-4 border-b border-neutral-800 pb-2">
                                <span className="text-red-500 shrink-0">08.12.84</span>
                                <span>Rebooted sentient elevator during its mandatory union mandated designated cry-break. Required psychological evaluation.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="border border-neutral-800 bg-neutral-900/50 p-6 flex flex-col items-center justify-center py-12 text-center text-neutral-600">
                        <Lock className="w-8 h-8 mb-3 opacity-50" />
                        <p className="font-mono text-xs uppercase tracking-widest">Further records require Level 4 Clearance</p>
                    </div>

                </div>

            </div>
        </div>
    );
}
