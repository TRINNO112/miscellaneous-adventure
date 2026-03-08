import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, ChevronRight, Terminal, User, BookOpen, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    const navLinks = [
        { name: 'INDEX', path: '/', icon: Terminal },
        { name: 'DOSSIER', path: '/about', icon: BookOpen },
        { name: 'RECORDS', path: '/records', icon: User },
        { name: 'SYSTEM', path: '/system', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Toggle Bar */}
            <div className="md:hidden fixed top-0 w-full bg-bureau-900 border-b-2 border-neutral-800 p-4 z-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent-amber" />
                    <span className="font-display font-bold tracking-tight uppercase">Misc.Adv</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-neutral-400 hover:text-white border border-neutral-800 p-1"
                >
                    <span className="font-mono text-xs uppercase px-2">Menu // {isOpen ? 'X' : '='}</span>
                </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-bureau-900 border-r-2 border-neutral-800 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                } flex flex-col pt-16 md:pt-0`}>

                {/* Branding header */}
                <div className="p-4 border-b-2 border-neutral-800 bg-neutral-900/50">
                    <div className="flex items-start gap-3">
                        <div className="bg-accent-amber p-1.5 shadow-[2px_2px_0px_#fff] shrink-0 mt-1">
                            <Shield className="w-5 h-5 text-black" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-display font-black text-sm uppercase tracking-tight text-white leading-tight">
                                Miscellaneous<br />Adventure
                            </h1>
                            <span className="font-mono text-[9px] text-accent-amber mt-1 bg-accent-amber/10 px-1 py-0.5 inline-block border border-accent-amber/30 w-fit whitespace-nowrap">
                                SYS. VER. 2.0.4
                            </span>
                        </div>
                    </div>
                </div>

                {/* User Identity Block */}
                <div className="p-6 border-b-2 border-neutral-800 font-mono text-xs text-neutral-400 space-y-2">
                    <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="text-white">{user ? `ENTITY ${user.uid.substring(0, 4)}` : 'GUEST_01'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>STATUS:</span>
                        <span className={`${user ? 'text-accent-amber' : 'text-neutral-600'} animate-pulse`}>
                            {user ? 'ACTIVE' : 'UNVERIFIED'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>CLEARANCE:</span>
                        <span>{user ? 'LEVEL 1' : 'RESTRICTED'}</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
                    <span className="font-mono text-[10px] text-neutral-600 mb-2 uppercase tracking-widest pl-2">Directory</span>

                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`group flex items-center justify-between p-3 transition-colors border-2 ${isActive
                                    ? 'bg-neutral-800 border-neutral-600 text-white shadow-[4px_4px_0px_#ff5500]'
                                    : 'border-transparent text-neutral-400 hover:border-neutral-800 hover:bg-neutral-800/50 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent-amber' : ''}`} />
                                    <span className="font-mono font-medium tracking-wide text-sm">{link.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 text-accent-amber" />}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer actions */}
                <div className="p-6 border-t-2 border-neutral-800">
                    {user ? (
                        <button
                            onClick={logout}
                            className="w-full bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs py-3 border border-red-400 shadow-[2px_2px_0px_#fff] transition-all active:shadow-[0px_0px_0px_#fff] active:translate-y-0.5 active:translate-x-0.5 uppercase tracking-widest"
                        >
                            Logout [Exit]
                        </button>
                    ) : (
                        <Link
                            to="/auth"
                            className="w-full bg-accent-amber hover:bg-white text-black font-mono font-bold text-xs py-3 border border-orange-400 shadow-[2px_2px_0px_#fff] transition-all flex items-center justify-center uppercase tracking-widest"
                        >
                            Authorize [Login]
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
