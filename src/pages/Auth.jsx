import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Shield, Key, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, signup, googleLogin } = useAuth();
    const navigate = useNavigate();

    async function handleGoogleLogin() {
        setError('');
        setLoading(true);
        try {
            await googleLogin();
            navigate('/');
        } catch (err) {
            setError(err.message.replace('Firebase:', 'SYSTEM ERROR:'));
        } finally {
            setLoading(false);
        }
    }

    const handleGuestMode = () => {
        navigate('/');
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message.replace('Firebase:', 'SYSTEM ERROR:'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md brutalist-panel bg-bureau-900 border-2 border-neutral-800 p-8 relative overflow-hidden">
                {/* Background Glitch Effect */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)]"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8 border-b-2 border-neutral-800 pb-4">
                        <Shield className="w-8 h-8 text-accent-amber" />
                        <div>
                            <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-white">
                                Entity <span className="text-accent-amber">Verification</span>
                            </h2>
                            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                                Bureau of Digital Regulation // Auth Terminal
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-950/30 border border-red-900 p-4 mb-6 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="font-mono text-xs text-red-400 uppercase leading-tight">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-mono text-xs text-neutral-500 uppercase block pl-1">
                                Entity Email (ID)
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full bg-neutral-900 border-2 border-neutral-800 p-3 font-mono text-sm text-white focus:outline-none focus:border-accent-amber transition-colors"
                                placeholder="USER@BUREAU.GOV"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-mono text-xs text-neutral-500 uppercase block pl-1">
                                Access Code (Password)
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-neutral-900 border-2 border-neutral-800 p-3 font-mono text-sm text-white focus:outline-none focus:border-accent-amber transition-colors"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700" />
                            </div>
                        </div>

                        <div className="pt-2 space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full brutalist-button flex items-center justify-center gap-3 py-4"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span className="uppercase">{isLogin ? 'Authorize Access' : 'Register New Entity'}</span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center gap-4 my-4">
                                <div className="h-[1px] flex-1 bg-neutral-800"></div>
                                <span className="font-mono text-[10px] text-neutral-600">OR</span>
                                <div className="h-[1px] flex-1 bg-neutral-800"></div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full border-2 border-neutral-800 hover:border-black bg-transparent hover:bg-white text-neutral-400 hover:text-black font-mono text-xs py-3 px-4 flex items-center justify-center gap-3 transition-all active:scale-95"
                            >
                                <div className="bg-accent-amber p-1 shadow-[1px_1px_0px_#000]">
                                    <Shield className="w-3 h-3 text-black" strokeWidth={3} />
                                </div>
                                SIGN_IN_WITH_GLOBAL_ID (GOOGLE)
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="w-full font-mono text-[10px] uppercase text-neutral-500 hover:text-white transition-colors text-center"
                            >
                                {isLogin ? "[ Create New Record ]" : "[ Return to Login ]"}
                            </button>

                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={handleGuestMode}
                                    className="font-mono text-[10px] uppercase text-accent-amber/70 hover:text-accent-amber underline decoration-accent-amber/30 underline-offset-4"
                                >
                                    Proceed as Unauthorized Guest (Entity_Guest_01)
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 border-t border-neutral-800 pt-4">
                        <p className="font-mono text-[9px] text-neutral-700 uppercase leading-tight text-center">
                            Guest access does not support cloud-sync record persistence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
