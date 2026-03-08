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

    const currentScene = storyData.scenes[currentSceneId];
    const currentDialogue = currentScene?.dialogue[dialogueIndex];

    // Emit scene assets to parent whenever scene or speaker changes
    useEffect(() => {
        if (!currentScene) return;

        const assets = {
            background: currentScene.background || '',
            characters: []
        };

        // If there's a speaker, add their sprite
        const speaker = storyData.characters[currentDialogue?.speaker];
        if (speaker && speaker.image) {
            assets.characters.push({
                name: speaker.name,
                sprite: speaker.image
            });
        }

        if (onSceneData) onSceneData(assets);
    }, [currentSceneId, dialogueIndex, onSceneData, currentDialogue, currentScene]);

    // Typing effect
    useEffect(() => {
        if (!currentDialogue) return;

        setIsTyping(true);
        let i = 0;
        setDisplayedText('');

        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + currentDialogue.text.charAt(i));
            i++;
            if (i >= currentDialogue.text.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 20);

        return () => clearInterval(interval);
    }, [currentDialogue]);

    if (!currentScene) return <div className="p-10 font-mono text-red-500">ERROR: SCENE [{currentSceneId}] NOT FOUND.</div>;

    const handleNextDialogue = () => {
        if (isTyping) {
            // Skip typing
            setDisplayedText(currentDialogue.text);
            setIsTyping(false);
            return;
        }

        if (dialogueIndex < currentScene.dialogue.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        }
    };

    const handleChoice = async (choice) => {
        const nextSceneId = choice.nextScene;

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
                                backgroundColor: storyData.characters[currentDialogue.speaker]?.color || '#555',
                                color: '#000'
                            }}
                        >
                            {storyData.characters[currentDialogue.speaker]?.name || 'UNKNOWN'}
                        </span>
                    </div>

                    <p className="font-mono text-lg text-white leading-relaxed">
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

            {/* Choices Area */}
            {isDialogueFinished && !isTyping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {currentScene.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoice(choice)}
                            className="brutalist-button flex items-center justify-between group py-4 px-6 text-left"
                        >
                            <span className="font-display font-bold uppercase tracking-tight pr-4">
                                {choice.label}
                            </span>
                            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
