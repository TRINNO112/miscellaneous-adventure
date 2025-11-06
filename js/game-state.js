// ============================================
// GAME STATE MANAGER
// Handles all game progress, stats, and Firebase sync
// ============================================

import { authService } from './firebase/auth-service.js';
import { userService } from './firebase/user-service.js';

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
            moralPath: 50, // 0 = corrupt, 100 = righteous
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
            if (!this.currentUser) return;
            
            const userProgress = await userService.getUserProgress(this.currentUser.uid);
            const userStats = await userService.getUserStats(this.currentUser.uid);
            
            if (userProgress) {
                this.progress = { ...this.progress, ...userProgress };
            }
            
            if (userStats) {
                this.stats = { ...this.stats, ...userStats };
            }
            
            console.log('Progress loaded:', this.progress);
            console.log('Stats loaded:', this.stats);
            
            // Dispatch event for UI to update
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
                console.warn('No user logged in, saving to localStorage');
                localStorage.setItem('gameProgress', JSON.stringify(this.progress));
                localStorage.setItem('gameStats', JSON.stringify(this.stats));
                return;
            }
            
            await userService.updateUserProgress(this.currentUser.uid, this.progress);
            console.log('Progress saved to Firebase');
            
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
    
    // ============================================
    // SCENE MANAGEMENT
    // ============================================
    
    completeScene(chapter, sceneNumber) {
        const chapterKey = `chapter${chapter}`;
        
        if (!this.progress[chapterKey].scenesCompleted.includes(sceneNumber)) {
            this.progress[chapterKey].scenesCompleted.push(sceneNumber);
            this.progress[chapterKey].currentScene = sceneNumber + 1;
            this.saveProgress();
            
            // Dispatch event
            window.dispatchEvent(new CustomEvent('sceneCompleted', { 
                detail: { chapter, sceneNumber } 
            }));
        }
    }
    
    isSceneUnlocked(chapter, sceneNumber) {
        const chapterKey = `chapter${chapter}`;
        
        // Scene 1 is always unlocked
        if (sceneNumber === 1) return true;
        
        // Check if previous scene is completed
        const previousScene = sceneNumber - 1;
        return this.progress[chapterKey].scenesCompleted.includes(previousScene);
    }
    
    isSceneCompleted(chapter, sceneNumber) {
        const chapterKey = `chapter${chapter}`;
        return this.progress[chapterKey].scenesCompleted.includes(sceneNumber);
    }
    
    getChapterProgress(chapter) {
        const chapterKey = `chapter${chapter}`;
        const totalScenes = 8; // Each chapter has 8 scenes
        const completed = this.progress[chapterKey].scenesCompleted.length;
        return {
            completed,
            total: totalScenes,
            percentage: Math.round((completed / totalScenes) * 100)
        };
    }
    
    // ============================================
    // CHOICE MANAGEMENT
    // ============================================
    
    recordChoice(chapter, sceneNumber, choiceId, choiceText) {
        const chapterKey = `chapter${chapter}`;
        const choiceKey = `scene${sceneNumber}`;
        
        if (!this.progress[chapterKey].choices[choiceKey]) {
            this.progress[chapterKey].choices[choiceKey] = [];
        }
        
        this.progress[chapterKey].choices[choiceKey].push({
            id: choiceId,
            text: choiceText,
            timestamp: Date.now()
        });
        
        this.stats.choicesMade++;
        this.saveProgress();
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('choiceMade', { 
            detail: { chapter, sceneNumber, choiceId } 
        }));
    }
    
    getSceneChoices(chapter, sceneNumber) {
        const chapterKey = `chapter${chapter}`;
        const choiceKey = `scene${sceneNumber}`;
        return this.progress[chapterKey].choices[choiceKey] || [];
    }
    
    // ============================================
    // STATS MANAGEMENT
    // ============================================
    
    updateStats(changes) {
        // changes = { integrity: -10, reputation: 5, moralPath: -5, influence: 2 }
        
        Object.keys(changes).forEach(stat => {
            if (this.stats.hasOwnProperty(stat)) {
                this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + changes[stat]));
            }
        });
        
        this.saveProgress();
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('statsUpdated', { 
            detail: this.stats 
        }));
    }
    
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
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000 / 60); // minutes
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
            
            // Show achievement notification
            this.showAchievementNotification(title, description);
            
            // Dispatch event
            window.dispatchEvent(new CustomEvent('achievementUnlocked', { 
                detail: { id: achievementId, title, description } 
            }));
        }
    }
    
    showAchievementNotification(title, description) {
        // This will be called by the UI
        window.dispatchEvent(new CustomEvent('showToast', {
            detail: {
                type: 'success',
                title: '🏆 Achievement Unlocked!',
                message: `${title}: ${description}`,
                duration: 5000
            }
        }));
    }
    
    // ============================================
    // CHAPTER COMPLETION
    // ============================================
    
    async completeChapter(chapter) {
        const chapterKey = `chapter${chapter}`;
        this.progress[chapterKey].completedAt = Date.now();
        
        if (this.currentUser) {
            await userService.completeChapter(this.currentUser.uid, chapterKey);
        }
        
        this.saveProgress();
        
        // Check for chapter completion achievements
        const chapterNames = {
            1: 'Office Chaos Master',
            2: 'Field Operations Expert',
            3: 'Final Confrontation Victor'
        };
        
        if (chapterNames[chapter]) {
            this.unlockAchievement(
                `chapter${chapter}_complete`,
                chapterNames[chapter],
                `Completed Chapter ${chapter}`
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
    
    // Debug method to unlock all scenes
    unlockAllScenes() {
        this.progress.chapter1.scenesCompleted = [1, 2, 3, 4, 5, 6, 7];
        this.saveProgress();
        window.location.reload();
    }
}

// Create global instance
const gameState = new GameState();

// Expose to window for debugging
window.gameState = gameState;

export default gameState;