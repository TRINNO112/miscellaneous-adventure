// ============================================
// GAME STATE MANAGER (UPDATED FOR SCENE PLAYER)
// Handles all game progress, stats, and Firebase sync
// ============================================

import { authService, userService } from './firebase/firebase-config.js';

class GameState {
    constructor() {
        this.currentUser = null;
        this.progress = {
            chapter1: {
                scenesCompleted: [],
                currentScene: 1,
                choices: {},
                completedAt: null
            },
            chapter2: {
                scenesCompleted: [],
                currentScene: 1,
                choices: {},
                completedAt: null
            },
            chapter3: {
                scenesCompleted: [],
                currentScene: 1,
                choices: {},
                completedAt: null
            }
        };
        
        this.stats = {
            integrity: 100,
            reputation: 50,
            moralPath: 50,
            influence: 10,
            totalPlayTime: 0,
            choicesMade: 0
        };
        
        this.achievements = [];
        this.startTime = Date.now();
        
        // Listen for auth changes
        authService.onAuthStateChange((user) => {
            this.currentUser = user;
            if (user) {
                this.loadProgress();
            }
        });
    }
    
    // ============================================
    // PROGRESS MANAGEMENT
    // ============================================
    
    async loadProgress() {
        try {
            if (!this.currentUser) {
                // Load from localStorage for guest users
                const savedProgress = localStorage.getItem('gameProgress');
                const savedStats = localStorage.getItem('gameStats');
                
                if (savedProgress) {
                    this.progress = JSON.parse(savedProgress);
                }
                if (savedStats) {
                    this.stats = JSON.parse(savedStats);
                }
                
                window.dispatchEvent(new CustomEvent('progressLoaded', { 
                    detail: { progress: this.progress, stats: this.stats } 
                }));
                return;
            }
            
            const userProgress = await userService.getUserProgress(this.currentUser.uid);
            const userStats = await userService.getUserStats(this.currentUser.uid);
            
            if (userProgress) {
                this.progress = { ...this.progress, ...userProgress };
            }
            
            if (userStats) {
                this.stats = { ...this.stats, ...userStats };
            }
            
            window.dispatchEvent(new CustomEvent('progressLoaded', { 
                detail: { progress: this.progress, stats: this.stats } 
            }));
            
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
    
    async saveProgress() {
        try {
            if (!this.currentUser) {
                // Save to localStorage for guest users
                localStorage.setItem('gameProgress', JSON.stringify(this.progress));
                localStorage.setItem('gameStats', JSON.stringify(this.stats));
                return;
            }
            
            await userService.updateUserProgress(this.currentUser.uid, this.progress);
            await userService.updateUserStats(this.currentUser.uid, this.stats);
            
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
    
    // ============================================
    // SCENE MANAGEMENT (NEW FOR SCENE PLAYER)
    // ============================================
    
    /**
     * Mark a scene as completed
     * @param {number} part - Part number (1, 2, 3)
     * @param {number} sceneNumber - Scene number
     */
    completeScene(part, sceneNumber) {
        const chapterKey = `chapter${part}`;
        
        if (!this.progress[chapterKey].scenesCompleted.includes(sceneNumber)) {
            this.progress[chapterKey].scenesCompleted.push(sceneNumber);
            this.progress[chapterKey].currentScene = sceneNumber + 1;
            this.saveProgress();
            
            window.dispatchEvent(new CustomEvent('sceneCompleted', { 
                detail: { part, sceneNumber } 
            }));
        }
    }
    
    /**
     * Check if a scene is unlocked
     * @param {number} part - Part number
     * @param {number} sceneNumber - Scene number
     * @returns {boolean}
     */
    isSceneUnlocked(part, sceneNumber) {
        const chapterKey = `chapter${part}`;
        
        // Scene 1 is always unlocked
        if (sceneNumber === 1) return true;
        
        // Check if previous scene is completed
        const previousScene = sceneNumber - 1;
        return this.progress[chapterKey].scenesCompleted.includes(previousScene);
    }
    
    /**
     * Check if a scene is completed
     * @param {number} part - Part number
     * @param {number} sceneNumber - Scene number
     * @returns {boolean}
     */
    isSceneCompleted(part, sceneNumber) {
        const chapterKey = `chapter${part}`;
        return this.progress[chapterKey].scenesCompleted.includes(sceneNumber);
    }
    
    /**
     * Get current scene for a part
     * @param {number} part - Part number
     * @returns {number}
     */
    getCurrentScene(part) {
        const chapterKey = `chapter${part}`;
        return this.progress[chapterKey].currentScene || 1;
    }
    
    /**
     * Set current scene for a part
     * @param {number} part - Part number
     * @param {number} sceneNumber - Scene number
     */
    setCurrentScene(part, sceneNumber) {
        const chapterKey = `chapter${part}`;
        this.progress[chapterKey].currentScene = sceneNumber;
        this.saveProgress();
    }
    
    /**
     * Get chapter progress
     * @param {number} part - Part number
     * @returns {object}
     */
    getChapterProgress(part) {
        const chapterKey = `chapter${part}`;
        const totalScenes = 8; // Default, can be dynamic from story.json
        const completed = this.progress[chapterKey].scenesCompleted.length;
        return {
            completed,
            total: totalScenes,
            percentage: Math.round((completed / totalScenes) * 100)
        };
    }
    
    // ============================================
    // CHOICE MANAGEMENT (UPDATED)
    // ============================================
    
    /**
     * Record a choice made in a scene
     * @param {number} part - Part number
     * @param {number} sceneNumber - Scene number
     * @param {number} choiceIndex - Index of choice selected
     * @param {string} choiceText - Text of the choice
     */
    recordChoice(part, sceneNumber, choiceIndex, choiceText) {
        const chapterKey = `chapter${part}`;
        const choiceKey = `scene${sceneNumber}`;
        
        if (!this.progress[chapterKey].choices[choiceKey]) {
            this.progress[chapterKey].choices[choiceKey] = [];
        }
        
        this.progress[chapterKey].choices[choiceKey].push({
            index: choiceIndex,
            text: choiceText,
            timestamp: Date.now()
        });
        
        this.stats.choicesMade++;
        this.saveProgress();
        
        window.dispatchEvent(new CustomEvent('choiceMade', { 
            detail: { part, sceneNumber, choiceIndex } 
        }));
    }
    
    /**
     * Get choices made in a scene
     * @param {number} part - Part number
     * @param {number} sceneNumber - Scene number
     * @returns {array}
     */
    getSceneChoices(part, sceneNumber) {
        const chapterKey = `chapter${part}`;
        const choiceKey = `scene${sceneNumber}`;
        return this.progress[chapterKey].choices[choiceKey] || [];
    }
    
    // ============================================
    // STATS MANAGEMENT
    // ============================================
    
    /**
     * Update character stats
     * @param {object} changes - Object with stat changes
     */
    updateStats(changes) {
        Object.keys(changes).forEach(stat => {
            if (this.stats.hasOwnProperty(stat)) {
                this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + changes[stat]));
            }
        });
        
        this.saveProgress();
        
        window.dispatchEvent(new CustomEvent('statsUpdated', { 
            detail: this.stats 
        }));
    }
    
    /**
     * Get stat label based on value
     * @param {string} stat - Stat name
     * @param {number} value - Stat value
     * @returns {string}
     */
    getStatLabel(stat, value) {
        const labels = {
            integrity: [
                { max: 20, label: 'Corrupted' },
                { max: 40, label: 'Compromised' },
                { max: 60, label: 'Wavering' },
                { max: 80, label: 'Strong' },
                { max: 100, label: 'Unwavering' }
            ],
            reputation: [
                { max: 20, label: 'Notorious' },
                { max: 40, label: 'Poor' },
                { max: 60, label: 'Neutral' },
                { max: 80, label: 'Respected' },
                { max: 100, label: 'Renowned' }
            ],
            moralPath: [
                { max: 20, label: 'Corrupt' },
                { max: 40, label: 'Pragmatic' },
                { max: 60, label: 'Undecided' },
                { max: 80, label: 'Principled' },
                { max: 100, label: 'Righteous' }
            ],
            influence: [
                { max: 20, label: 'Minimal' },
                { max: 40, label: 'Growing' },
                { max: 60, label: 'Moderate' },
                { max: 80, label: 'Significant' },
                { max: 100, label: 'Powerful' }
            ]
        };
        
        const statLabels = labels[stat];
        if (!statLabels) return 'Unknown';
        
        for (let i = 0; i < statLabels.length; i++) {
            if (value <= statLabels[i].max) {
                return statLabels[i].label;
            }
        }
        return statLabels[statLabels.length - 1].label;
    }
    
    // ============================================
    // TIME TRACKING
    // ============================================
    
    updatePlayTime() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000 / 60);
        this.stats.totalPlayTime += elapsed;
        this.startTime = Date.now();
        this.saveProgress();
    }
    
    getFormattedPlayTime() {
        const minutes = this.stats.totalPlayTime;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins} mins`;
    }
    
    // ============================================
    // ACHIEVEMENTS
    // ============================================
    
    unlockAchievement(achievementId, title, description) {
        if (!this.achievements.includes(achievementId)) {
            this.achievements.push(achievementId);
            this.saveProgress();
            
            window.dispatchEvent(new CustomEvent('showToast', {
                detail: {
                    type: 'success',
                    title: '🏆 Achievement Unlocked!',
                    message: `${title}: ${description}`,
                    duration: 5000
                }
            }));
            
            window.dispatchEvent(new CustomEvent('achievementUnlocked', { 
                detail: { id: achievementId, title, description } 
            }));
        }
    }
    
    // ============================================
    // CHAPTER COMPLETION
    // ============================================
    
    async completeChapter(part) {
        const chapterKey = `chapter${part}`;
        this.progress[chapterKey].completedAt = Date.now();
        
        if (this.currentUser) {
            await userService.completeChapter(this.currentUser.uid, chapterKey);
        }
        
        this.saveProgress();
        
        const chapterNames = {
            1: 'Office Chaos Master',
            2: 'Field Operations Expert',
            3: 'Final Confrontation Victor'
        };
        
        if (chapterNames[part]) {
            this.unlockAchievement(
                `chapter${part}_complete`,
                chapterNames[part],
                `Completed Chapter ${part}`
            );
        }
    }
    
    // ============================================
    // RESET & DEBUG
    // ============================================
    
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            this.progress = {
                chapter1: { scenesCompleted: [], currentScene: 1, choices: {}, completedAt: null },
                chapter2: { scenesCompleted: [], currentScene: 1, choices: {}, completedAt: null },
                chapter3: { scenesCompleted: [], currentScene: 1, choices: {}, completedAt: null }
            };
            
            this.stats = {
                integrity: 100,
                reputation: 50,
                moralPath: 50,
                influence: 10,
                totalPlayTime: 0,
                choicesMade: 0
            };
            
            this.achievements = [];
            this.saveProgress();
            
            window.location.reload();
        }
    }
    
    unlockAllScenes() {
        this.progress.chapter1.scenesCompleted = [1, 2, 3, 4, 5, 6, 7, 8];
        this.saveProgress();
        window.location.reload();
    }
}

// Create global instance
const gameState = new GameState();

// Expose to window for debugging
window.gameState = gameState;

export default gameState;