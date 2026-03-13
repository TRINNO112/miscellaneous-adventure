import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import storyData from '../data/story/index.js';
import { ChevronRight, ArrowRight, ArrowLeft, Terminal, Lock, Package, Skull } from 'lucide-react';

// Web Audio API typing sound generator
function createTypingSound(volume = 0.3) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 800 + Math.random() * 600;
        gain.gain.value = volume * 0.08;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
        // Audio not supported, silent fail
    }
}

export default function StoryEngine({ onSceneData, onGameOver }) {
    const { user, userData, updateUserData } = useAuth();
    const [currentSceneId, setCurrentSceneId] = useState(userData?.currentScene || 'chapter_1_start');
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [playerNameInput, setPlayerNameInput] = useState('');
    const [transitioning, setTransitioning] = useState(false);
    const [itemNotification, setItemNotification] = useState(null);
    const intervalRef = useRef(null);
    const typingSoundCounter = useRef(0);

    const currentScene = storyData.scenes[currentSceneId];
    const currentDialogue = currentScene?.dialogue[dialogueIndex];
    const settings = userData?.settings || { typingSounds: true, volume: 74 };

    const replacePlaceholders = useCallback((text) => {
        if (!text) return '';
        return text.replace(/{playerName}/g, userData?.playerName || 'ENTITY_X');
    }, [userData?.playerName]);

    // Scene Recovery
    useEffect(() => {
        const checkScene = async () => {
            if (userData?.currentScene && !storyData.scenes[userData.currentScene]) {
                console.warn(`CRITICAL_FAILURE: Scene [${userData.currentScene}] not found. Resetting to CHAPTER_1_START.`);
                setCurrentSceneId('chapter_1_start');
                await updateUserData({ currentScene: 'chapter_1_start' });
            }
        };
        checkScene();
    }, [userData?.currentScene, updateUserData]);

    // Emit scene assets to parent
    useEffect(() => {
        if (!currentScene) return;
        const assets = {
            background: currentScene.background || '',
            characters: []
        };
        const speakerId = currentDialogue?.speaker;
        const speaker = storyData.characters[speakerId];
        if (speaker && speaker.image) {
            assets.characters.push({
                name: speakerId === 'player' ? (userData?.playerName || 'YOU') : speaker.name,
                sprite: speaker.image
            });
        }
        if (onSceneData) onSceneData(assets);
    }, [currentSceneId, dialogueIndex, onSceneData, currentDialogue, currentScene, userData?.playerName]);

    // Notify parent of game over
    useEffect(() => {
        if (currentScene?.type === 'game_over' && onGameOver) {
            onGameOver({
                reason: currentScene.reason || 'TERMINATED.',
                restartScene: currentScene.restartScene || 'chapter_1_start'
            });
        }
    }, [currentSceneId, currentScene, onGameOver]);

    // Typing scramble effect with sound
    useEffect(() => {
        if (!currentDialogue) return;
        setIsTyping(true);
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
        const rawText = replacePlaceholders(currentDialogue.text);
        let frame = 0;
        setDisplayedText('');
        typingSoundCounter.current = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            let tempText = '';
            for (let i = 0; i < rawText.length; i++) {
                if (frame >= i * 2) {
                    tempText += rawText[i];
                } else if (frame >= (i * 2) - 8) {
                    tempText += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            setDisplayedText(tempText);

            // Play typing sound every few frames
            typingSoundCounter.current++;
            if (settings.typingSounds && typingSoundCounter.current % 3 === 0) {
                createTypingSound((settings.volume || 74) / 100);
            }

            if (frame >= rawText.length * 2) {
                clearInterval(intervalRef.current);
                setDisplayedText(rawText);
                setIsTyping(false);
            }
            frame++;
        }, 15);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [currentDialogue, replacePlaceholders, settings.typingSounds, settings.volume]);

    if (!currentScene) return <div className="p-10 font-mono text-red-500">ERROR: SCENE [{currentSceneId}] NOT FOUND.</div>;

    const handleNextDialogue = () => {
        if (isTyping) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setDisplayedText(replacePlaceholders(currentDialogue.text));
            setIsTyping(false);
            return;
        }
        if (dialogueIndex < currentScene.dialogue.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        }
    };

    const handlePrevDialogue = (e) => {
        e.stopPropagation();
        if (dialogueIndex > 0) {
            if (isTyping) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setIsTyping(false);
            }
            setDialogueIndex(dialogueIndex - 1);
        }
    };

    const transitionToScene = (nextSceneId) => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentSceneId(nextSceneId);
            setDialogueIndex(0);
            setDisplayedText('');
            setTimeout(() => setTransitioning(false), 50);
        }, 300);
    };

    const handleChoice = async (choice) => {
        const nextSceneId = choice.nextScene;

        // Record choice in history
        const historyEntry = {
            sceneId: currentSceneId,
            sceneTitle: currentScene.title,
            choiceLabel: choice.label,
            timestamp: new Date().toISOString(),
            statChanges: choice.statChanges || {}
        };

        const newStats = { ...userData.stats };
        if (choice.statChanges) {
            Object.keys(choice.statChanges).forEach(stat => {
                newStats[stat] = Math.max(0, Math.min(100, (newStats[stat] || 0) + choice.statChanges[stat]));
            });
        }

        // Handle inventory
        const newInventory = [...(userData.inventory || [])];
        if (choice.addItem && !newInventory.includes(choice.addItem)) {
            newInventory.push(choice.addItem);
            setItemNotification(choice.addItem);
            setTimeout(() => setItemNotification(null), 3000);
        }
        if (choice.removeItem) {
            const idx = newInventory.indexOf(choice.removeItem);
            if (idx > -1) newInventory.splice(idx, 1);
        }

        const newHistory = [...(userData.choiceHistory || []), historyEntry];

        // Transition with animation
        transitionToScene(nextSceneId);

        await updateUserData({
            currentScene: nextSceneId,
            stats: newStats,
            inventory: newInventory,
            choiceHistory: newHistory
        });
    };

    // Handle scene-level addItem/removeItem (for scenes without choices)
    const handleContinue = async (nextSceneId) => {
        const newInventory = [...(userData.inventory || [])];
        let inventoryChanged = false;

        if (currentScene.addItem && !newInventory.includes(currentScene.addItem)) {
            newInventory.push(currentScene.addItem);
            setItemNotification(currentScene.addItem);
            setTimeout(() => setItemNotification(null), 3000);
            inventoryChanged = true;
        }
        if (currentScene.removeItem) {
            const idx = newInventory.indexOf(currentScene.removeItem);
            if (idx > -1) {
                newInventory.splice(idx, 1);
                inventoryChanged = true;
            }
        }

        transitionToScene(nextSceneId);

        const updates = { currentScene: nextSceneId };
        if (inventoryChanged) updates.inventory = newInventory;
        await updateUserData(updates);
    };

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        if (!playerNameInput.trim()) return;
        await updateUserData({
            playerName: playerNameInput.trim(),
            currentScene: currentScene.nextScene
        });
        transitionToScene(currentScene.nextScene);
    };

    // Check if a choice's stat requirements are met
    const isChoiceAvailable = (choice) => {
        if (choice.requires) {
            const statValue = userData?.stats?.[choice.requires.stat] || 0;
            if (statValue < choice.requires.min) return false;
        }
        if (choice.requiresStatBelow) {
            const statValue = userData?.stats?.[choice.requiresStatBelow.stat] || 0;
            if (statValue > choice.requiresStatBelow.max) return false;
        }
        if (choice.requiresItem) {
            if (!(userData?.inventory || []).includes(choice.requiresItem)) return false;
        }
        return true;
    };

    const handleGameOverRestart = async () => {
        const restartScene = currentScene.restartScene || 'chapter_1_start';
        transitionToScene(restartScene);
        await updateUserData({ currentScene: restartScene });
    };

    const isDialogueFinished = dialogueIndex === currentScene.dialogue.length - 1;

    // Filter choices: show available ones + locked stat-gated ones, hide inventory-gated ones that don't match
    const getVisibleChoices = () => {
        if (!currentScene.choices) return [];
        return currentScene.choices.filter(choice => {
            // Hide choices that require an item the player doesn't have (except FALLBACK)
            if (choice.requiresItem && !(userData?.inventory || []).includes(choice.requiresItem)) {
                return false;
            }
            return true;
        });
    };

    return (
        <div className={`w-full flex flex-col gap-6 transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
            {/* Guest Warning */}
            {!user && (
                <div className="flex items-center gap-3 bg-accent-amber/10 border border-accent-amber/30 p-3 mb-2">
                    <div className="animate-pulse bg-accent-amber w-1.5 h-1.5 rounded-full shrink-0"></div>
                    <p className="font-mono text-[10px] text-accent-amber uppercase tracking-tighter">
                        UNAUTHENTICATED_GUEST_ACCESS: Cloud sync disabled. Progress saved to local terminal buffer.
                    </p>
                </div>
            )}

            {/* Item Notification Toast */}
            {itemNotification && (
                <div className="flex items-center gap-3 bg-emerald-950/80 border border-emerald-500/50 p-3 animate-in fade-in slide-in-from-top-4 duration-500">
                    <Package className="w-4 h-4 text-emerald-400" />
                    <p className="font-mono text-xs text-emerald-400 uppercase tracking-wider">
                        ITEM ACQUIRED: {itemNotification.replace(/_/g, ' ')}
                    </p>
                </div>
            )}

            {/* Scene Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent-amber" />
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                        Location: {currentScene.title}
                    </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-700">SCENE_ID: {currentSceneId}</span>
            </div>

            {/* Game Over Scene */}
            {currentScene.type === 'game_over' && (
                <div className="brutalist-panel border-l-red-600 bg-red-950/30 min-h-[300px] flex flex-col items-center justify-center gap-6 p-8">
                    <Skull className="w-16 h-16 text-red-500 animate-pulse" />
                    <h2 className="font-display font-black text-4xl text-red-500 uppercase tracking-tighter text-center text-glow-red">
                        TERMINATED
                    </h2>
                    <p className="font-mono text-sm text-red-300/80 text-center max-w-md leading-relaxed">
                        {replacePlaceholders(currentScene.reason || 'Your journey ends here.')}
                    </p>
                    <button
                        onClick={handleGameOverRestart}
                        className="brutalist-button border-red-500 text-red-500 hover:bg-red-500 hover:text-black shadow-[4px_4px_0px_#ef4444] mt-4"
                    >
                        RESTART FROM CHECKPOINT
                    </button>
                </div>
            )}

            {/* Dialogue Box (not shown during game over) */}
            {currentScene.type !== 'game_over' && (
                <div
                    className="brutalist-panel min-h-[200px] flex flex-col justify-between cursor-pointer group"
                    onClick={!isDialogueFinished || isTyping ? handleNextDialogue : undefined}
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span
                                className="font-display font-bold text-xs uppercase px-2 py-0.5"
                                style={{
                                    backgroundColor: storyData.characters[currentDialogue?.speaker]?.color || '#555',
                                    color: '#000'
                                }}
                            >
                                {replacePlaceholders(storyData.characters[currentDialogue?.speaker]?.name || 'UNKNOWN')}
                            </span>
                        </div>
                        <p className="font-mono text-lg text-white leading-relaxed min-h-[120px] relative">
                            {displayedText}
                            <span className="inline-block w-2.5 h-[1.1em] bg-accent-amber ml-1 align-middle animate-blink"></span>
                        </p>
                    </div>
                    <div className="flex justify-between pt-4">
                        <div className="flex items-center">
                            {dialogueIndex > 0 && !isTyping && (
                                <button
                                    onClick={handlePrevDialogue}
                                    className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors py-1 z-10 relative"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="font-mono text-[10px] uppercase">Previous</span>
                                </button>
                            )}
                        </div>
                        {(!isDialogueFinished || isTyping) && (
                            <div className="flex items-center gap-2 text-neutral-500 group-hover:text-white transition-colors animate-pulse">
                                <span className="font-mono text-[10px] uppercase">Click to continue</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Name Entry */}
            {currentScene.type === 'name_entry' && !isTyping && (
                <form onSubmit={handleNameSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="brutalist-panel bg-neutral-900 border-neutral-800 p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="font-mono text-[10px] text-accent-amber uppercase tracking-widest block">
                                Identification Required // Input Name
                            </label>
                            <input
                                type="text"
                                value={playerNameInput}
                                onChange={(e) => setPlayerNameInput(e.target.value)}
                                placeholder="E.G. DASH_K"
                                maxLength={20}
                                className="w-full bg-black border-2 border-neutral-800 p-4 font-mono text-white focus:border-accent-amber outline-none uppercase transition-colors shadow-[4px_4px_0px_#000]"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!playerNameInput.trim()}
                            className="brutalist-button w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                        >
                            Confirm Identity
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            )}

            {/* Choices with stat-gating */}
            {isDialogueFinished && !isTyping && currentScene.type !== 'name_entry' && currentScene.type !== 'game_over' && currentScene.choices && (
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {getVisibleChoices().map((choice, idx) => {
                        const available = isChoiceAvailable(choice);
                        return (
                            <button
                                key={idx}
                                onClick={() => available && handleChoice(choice)}
                                disabled={!available}
                                className={`brutalist-button flex items-center justify-between group py-4 px-6 text-left ${
                                    !available
                                        ? 'opacity-40 grayscale cursor-not-allowed border-neutral-700 text-neutral-600 shadow-none hover:bg-neutral-100 hover:text-bureau-900'
                                        : ''
                                }`}
                            >
                                <span className="font-display font-bold uppercase tracking-tight pr-4 transition-colors group-hover:text-accent-amber flex items-center gap-2">
                                    {!available && <Lock className="w-4 h-4 text-neutral-600 shrink-0" />}
                                    <span className={`opacity-0 ${available ? 'group-hover:opacity-100' : ''} transition-opacity text-accent-amber mr-1 font-mono`}>{'>'}</span>
                                    {replacePlaceholders(choice.label)}
                                </span>
                                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Continue button for scenes without choices */}
            {isDialogueFinished && !isTyping && !currentScene.choices && currentScene.nextScene && currentScene.type !== 'game_over' && (
                <div className="flex justify-center animate-in fade-in duration-700">
                    <button
                        onClick={() => handleContinue(currentScene.nextScene)}
                        className="brutalist-button flex items-center gap-3 px-12"
                    >
                        Continue Protocol
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Ending scene — no continue button, show completion */}
            {isDialogueFinished && !isTyping && currentScene.type === 'ending' && (
                <div className="flex flex-col items-center gap-4 animate-in fade-in duration-1000">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-amber to-transparent"></div>
                    <p className="font-mono text-[10px] text-accent-amber uppercase tracking-[0.5em]">End of Transmission</p>
                    <button
                        onClick={async () => {
                            transitionToScene('chapter_1_start');
                            await updateUserData({ currentScene: 'chapter_1_start' });
                        }}
                        className="brutalist-button flex items-center gap-3 px-8 mt-4 border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black shadow-[4px_4px_0px_#ff5500]"
                    >
                        NEW GAME
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
