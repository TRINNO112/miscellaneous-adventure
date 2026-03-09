import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import storyData from '../data/story.json';
import { ChevronRight, ArrowRight, User, Terminal } from 'lucide-react';

export default function StoryEngine({ onSceneData }) {
    const { user, userData, updateUserData } = useAuth();
    const [currentSceneId, setCurrentSceneId] = useState(userData?.currentScene || 'chapter_1_start');
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [playerNameInput, setPlayerNameInput] = useState('');
    const [history, setHistory] = useState([]); // Array of { sceneId, stats }

    const currentScene = storyData.scenes[currentSceneId];
    const currentDialogue = currentScene?.dialogue[dialogueIndex];

    const replacePlaceholders = React.useCallback((text) => {
        if (!text) return '';
        return text.replace(/{playerName}/g, userData?.playerName || 'ENTITY_X');
    }, [userData?.playerName]);

    // Scene Recovery: If currentSceneId is invalid, reset to start
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

    // Emit scene assets to parent whenever scene or speaker changes
    useEffect(() => {
        if (!currentScene) return;

        const assets = {
            background: currentScene.background || '',
            characters: []
        };

        // If there's a speaker, add their sprite
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

    // Typing effect
    useEffect(() => {
        if (!currentDialogue) return;

        setIsTyping(true);
        let i = 0;
        setDisplayedText('');

        const interval = setInterval(() => {
            const rawText = replacePlaceholders(currentDialogue.text);
            setDisplayedText(rawText.substring(0, i + 1));
            i++;
            if (i >= rawText.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 20);

        return () => clearInterval(interval);
    }, [currentDialogue, replacePlaceholders]);

    if (!currentScene) return <div className="p-10 font-mono text-red-500">ERROR: SCENE [{currentSceneId}] NOT FOUND.</div>;

    const handleNextDialogue = () => {
        if (isTyping) {
            // Skip typing
            setDisplayedText(replacePlaceholders(currentDialogue.text));
            setIsTyping(false);
            return;
        }

        if (dialogueIndex < currentScene.dialogue.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        }
    };

    const handleChoice = async (choice) => {
        const nextSceneId = choice.nextScene;

        // Save current state to history before moving forward
        setHistory(prev => [...prev, {
            sceneId: currentSceneId,
            stats: { ...userData.stats }
        }]);

        // Update local state first for responsiveness
        setCurrentSceneId(nextSceneId);
        setDialogueIndex(0);

        const newStats = { ...userData.stats };
        if (choice.statChanges) {
            Object.keys(choice.statChanges).forEach(stat => {
                newStats[stat] = (newStats[stat] || 0) + choice.statChanges[stat];
            });
        }

        // Centralized Sync using AuthContext helper
        await updateUserData({
            currentScene: nextSceneId,
            stats: newStats
        });
    };

    const handleRewind = async () => {
        if (history.length === 0) return;

        const lastState = history[history.length - 1];
        const newHistory = history.slice(0, -1);

        setHistory(newHistory);
        setCurrentSceneId(lastState.sceneId);
        setDialogueIndex(0);
        setDisplayedText('');

        await updateUserData({
            currentScene: lastState.sceneId,
            stats: lastState.stats
        });
    };

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        if (!playerNameInput.trim()) return;

        await updateUserData({
            playerName: playerNameInput.trim(),
            currentScene: currentScene.nextScene
        });
        setCurrentSceneId(currentScene.nextScene);
        setDialogueIndex(0);
    };

    const isDialogueFinished = dialogueIndex === currentScene.dialogue.length - 1;

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Sync Status Warning for Guests */}
            {!user && (
                <div className="flex items-center gap-3 bg-accent-amber/10 border border-accent-amber/30 p-3 mb-2">
                    <div className="animate-pulse bg-accent-amber w-1.5 h-1.5 rounded-full shrink-0"></div>
                    <p className="font-mono text-[10px] text-accent-amber uppercase tracking-tighter">
                        UNAUTHENTICATED_GUEST_ACCESS: Cloud sync disabled. Progress saved to local terminal buffer.
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
                    {history.length > 0 && !currentScene.disableRewind && (
                        <button
                            onClick={handleRewind}
                            className="ml-4 font-mono text-[9px] text-white bg-accent-amber/80 hover:bg-accent-amber px-3 py-1 uppercase tracking-tighter transition-all font-bold shadow-[2px_2px_0px_#fff] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                        >
                            [BACK_PROTOCOL // UNDO]
                        </button>
                    )}
                </div>
                <span className="font-mono text-[10px] text-neutral-700">SCENE_ID: {currentSceneId}</span>
            </div>

            {/* Box for Dialogue */}
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

                    <p className="font-mono text-lg text-white leading-relaxed min-h-[120px]">
                        {displayedText}
                        {isTyping && <span className="inline-block w-2 h-5 bg-accent-amber ml-1 animate-pulse"></span>}
                    </p>
                </div>

                <div className="flex justify-end pt-4">
                    {(!isDialogueFinished || isTyping) && (
                        <div className="flex items-center gap-2 text-neutral-500 group-hover:text-white transition-colors animate-pulse">
                            <span className="font-mono text-[10px] uppercase">Click to continue</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>

            {/* Name Entry Area */}
            {
                currentScene.type === 'name_entry' && !isTyping && (
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
                )
            }

            {/* Choices Area */}
            {
                isDialogueFinished && !isTyping && currentScene.type !== 'name_entry' && currentScene.choices && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {currentScene.choices.map((choice, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleChoice(choice)}
                                className="brutalist-button flex items-center justify-between group py-4 px-6 text-left"
                            >
                                <span className="font-display font-bold uppercase tracking-tight pr-4">
                                    {replacePlaceholders(choice.label)}
                                </span>
                                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ))}
                    </div>
                )
            }

            {/* Auto-advance for scenes without choices */}
            {isDialogueFinished && !isTyping && !currentScene.choices && currentScene.nextScene && (
                <div className="flex justify-center animate-in fade-in duration-700">
                    <button
                        onClick={() => {
                            setCurrentSceneId(currentScene.nextScene);
                            setDialogueIndex(0);
                            setDisplayedText('');
                        }}
                        className="brutalist-button flex items-center gap-3 px-12"
                    >
                        Continue Protocol
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div >
    );
}
