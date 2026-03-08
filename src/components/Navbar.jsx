import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, User, Settings, LogOut } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-900/80 backdrop-blur-md border-b border-white/10 shadow-lg py-3' : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300">
                            <Shield className="w-5 h-5 text-white" />
                            <div className="absolute inset-0 rounded-xl border border-white/20"></div>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg tracking-tight text-white leading-tight group-hover:text-primary-300 transition-colors">
                                Miscellaneous
                            </h1>
                            <span className="text-[10px] font-semibold tracking-widest text-primary-400 uppercase leading-none block">
                                Adventure
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <Link to="/about" className="hover:text-white transition-colors">About</Link>
                            <Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-surface-700 border border-white/10 flex items-center justify-center overflow-hidden">
                                        <User className="w-4 h-4 text-slate-400" />
                                    </div>
                                </button>

                                {/* Dropdown */}
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel shadow-2xl py-1 transform opacity-100 scale-100 transition-all origin-top-right">
                                        <div className="px-4 py-3 border-b border-white/5">
                                            <p className="text-sm font-medium text-white">Player One</p>
                                            <p className="text-xs text-slate-400">Level 1 Investigator</p>
                                        </div>
                                        <div className="py-1 border-b border-white/5">
                                            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                                                <User className="w-4 h-4" /> Profile
                                            </Link>
                                            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                                                <Settings className="w-4 h-4" /> Settings
                                            </Link>
                                        </div>
                                        <div className="py-1">
                                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5">
                                Play Now
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-300 hover:text-white"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-panel border-t border-white/10 mt-3 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        <Link to="/" className="block px-3 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg">Home</Link>
                        <Link to="/about" className="block px-3 py-3 text-base font-medium text-slate-300 hover:bg-white/5 rounded-lg hover:text-white">About</Link>
                        <Link to="/leaderboard" className="block px-3 py-3 text-base font-medium text-slate-300 hover:bg-white/5 rounded-lg hover:text-white">Leaderboard</Link>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <button className="w-full bg-primary-600 hover:bg-primary-500 text-white px-5 py-3 rounded-lg text-base font-semibold shadow-lg shadow-primary-500/30 transition-all">
                                Play Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
