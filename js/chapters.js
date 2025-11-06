// ============================================
// CHAPTERS.JS - Chapter Hub Page Controller
// Handles UI updates, navigation, and interactions
// ============================================

import gameState from './game-state.js';
import { authService } from './firebase/auth-service.js';

class ChapterController {
    constructor() {
        this.currentChapter = this.getChapterNumber();
        this.loadingProgress = 0;
        this.playTimeInterval = null;
        
        this.init();
    }
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    init() {
        // Show loading screen
        this.showLoadingScreen();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }
    
    onDOMReady() {
        console.log('Chapter Controller initialized for Chapter', this.currentChapter);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start play time tracking
        this.startPlayTimeTracking();
        
        // Simulate loading progress
        this.simulateLoading();
    }
    
    // ============================================
    // LOADING SCREEN
    // ============================================
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }
    
    simulateLoading() {
        const progressBar = document.getElementById('loadingProgressBar');
        
        const interval = setInterval(() => {
            this.loadingProgress += Math.random() * 30;
            
            if (this.loadingProgress >= 100) {
                this.loadingProgress = 100;
                clearInterval(interval);
                
                // Wait for progress to load, then hide loading screen
                setTimeout(() => {
                    this.updateUI();
                    this.hideLoadingScreen();
                }, 500);
            }
            
            if (progressBar) {
                progressBar.style.width = `${this.loadingProgress}%`;
            }
        }, 200);
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    setupEventListeners() {
        // Navigation
        this.setupNavigationListeners();
        
        // User menu
        this.setupUserMenuListeners();
        
        // Game state events
        window.addEventListener('progressLoaded', () => this.updateUI());
        window.addEventListener('sceneCompleted', () => this.updateUI());
        window.addEventListener('statsUpdated', (e) => this.updateStats(e.detail));
        window.addEventListener('showToast', (e) => this.showToast(e.detail));
        
        // Scene card clicks
        this.setupSceneCardListeners();
    }
    
    setupNavigationListeners() {
        // Mobile menu toggle
        const menuToggle = document.getElementById('navMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuClose = document.getElementById('mobileMenuClose');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
        
        if (menuClose && mobileMenu) {
            menuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            });
        }
    }
    
    setupUserMenuListeners() {
        const userMenu = document.getElementById('navUserMenu');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenu && userDropdown) {
            userMenu.addEventListener('click', () => {
                userDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.remove('active');
                }
            });
        }
        
        // Sign out
        const signOutLinks = [
            document.getElementById('signOutLink'),
            document.getElementById('mobileSignOutLink')
        ];
        
        signOutLinks.forEach(link => {
            if (link) {
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await this.handleSignOut();
                });
            }
        });
        
        // Update user info
        authService.onAuthStateChange((user) => {
            this.updateUserInfo(user);
        });
    }
    
    setupSceneCardListeners() {
        const sceneCards = document.querySelectorAll('.scene-card');
        
        sceneCards.forEach(card => {
            const sceneNumber = parseInt(card.dataset.scene);
            const playButton = card.querySelector('.play-button');
            
            if (playButton) {
                playButton.addEventListener('click', () => {
                    this.navigateToScene(sceneNumber);
                });
            }
        });
    }
    
    // ============================================
    // UI UPDATES
    // ============================================
    
    updateUI() {
        this.updateProgress();
        this.updateSceneCards();
        this.updateStats(gameState.stats);
        this.updateAchievements();
    }
    
    updateProgress() {
        const progress = gameState.getChapterProgress(this.currentChapter);
        
        // Update progress percentage
        const progressPercentage = document.getElementById('progressPercentage');
        if (progressPercentage) {
            progressPercentage.textContent = `${progress.percentage}%`;
        }
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${progress.percentage}%`;
        }
        
        // Update scenes completed
        const scenesCompleted = document.getElementById('scenesCompleted');
        if (scenesCompleted) {
            scenesCompleted.textContent = `${progress.completed} / ${progress.total}`;
        }
        
        // Update choices made
        const choicesMade = document.getElementById('choicesMade');
        if (choicesMade) {
            choicesMade.textContent = gameState.stats.choicesMade;
        }
    }
    
    updateSceneCards() {
        const sceneCards = document.querySelectorAll('.scene-card');
        
        sceneCards.forEach(card => {
            const sceneNumber = parseInt(card.dataset.scene);
            const isUnlocked = gameState.isSceneUnlocked(this.currentChapter, sceneNumber);
            const isCompleted = gameState.isSceneCompleted(this.currentChapter, sceneNumber);
            
            // Update lock status
            if (isUnlocked) {
                card.classList.remove('locked');
                card.dataset.status = 'available';
                
                const button = card.querySelector('.status-button');
                if (button) {
                    button.classList.remove('locked-button');
                    button.classList.add('play-button');
                    button.disabled = false;
                    button.innerHTML = '<i class="fas fa-play"></i><span>Start Scene</span>';
                }
            } else {
                card.classList.add('locked');
                card.dataset.status = 'locked';
            }
            
            // Update completion status
            if (isCompleted) {
                card.classList.add('completed');
                card.dataset.status = 'completed';
                
                const button = card.querySelector('.status-button');
                if (button) {
                    button.classList.remove('play-button');
                    button.classList.add('completed-button');
                    button.innerHTML = '<i class="fas fa-check"></i><span>Replay Scene</span>';
                }
            }
        });
    }
    
    updateStats(stats) {
        // Integrity
        const integrityValue = document.getElementById('integrityValue');
        const integrityBar = document.getElementById('integrityBar');
        if (integrityValue && integrityBar) {
            integrityValue.textContent = `${stats.integrity}%`;
            integrityBar.style.width = `${stats.integrity}%`;
        }
        
        // Reputation
        const reputationValue = document.getElementById('reputationValue');
        const reputationBar = document.getElementById('reputationBar');
        if (reputationValue && reputationBar) {
            const repLabel = gameState.getStatLabel('reputation', stats.reputation);
            reputationValue.textContent = repLabel;
            reputationBar.style.width = `${stats.reputation}%`;
        }
        
        // Moral Path
        const moralPathValue = document.getElementById('moralPathValue');
        const moralBar = document.getElementById('moralBar');
        if (moralPathValue && moralBar) {
            const moralLabel = gameState.getStatLabel('moralPath', stats.moralPath);
            moralPathValue.textContent = moralLabel;
            moralBar.style.width = `${stats.moralPath}%`;
        }
        
        // Influence
        const influenceValue = document.getElementById('influenceValue');
        const influenceBar = document.getElementById('influenceBar');
        if (influenceValue && influenceBar) {
            const influenceLabel = gameState.getStatLabel('influence', stats.influence);
            influenceValue.textContent = influenceLabel;
            influenceBar.style.width = `${stats.influence}%`;
        }
    }
    
    updateAchievements() {
        const achievementsList = document.getElementById('achievementsList');
        if (!achievementsList) return;
        
        if (gameState.achievements.length === 0) {
            achievementsList.innerHTML = `
                <div class="achievement-item locked">
                    <i class="fas fa-lock"></i>
                    <span>Complete Chapter ${this.currentChapter} to unlock</span>
                </div>
            `;
        } else {
            // Show recent achievements
            achievementsList.innerHTML = gameState.achievements
                .slice(-3)
                .map(id => `
                    <div class="achievement-item">
                        <i class="fas fa-trophy"></i>
                        <span>${this.getAchievementTitle(id)}</span>
                    </div>
                `)
                .join('');
        }
    }
    
    updateUserInfo(user) {
        const userName = document.getElementById('userName');
        const userDisplayName = document.getElementById('userDisplayName');
        const userEmail = document.getElementById('userEmail');
        
        if (user) {
            const displayName = user.displayName || 'Player';
            const email = user.email || 'Anonymous';
            
            if (userName) userName.textContent = displayName;
            if (userDisplayName) userDisplayName.textContent = displayName;
            if (userEmail) userEmail.textContent = email;
        } else {
            if (userName) userName.textContent = 'Guest';
            if (userDisplayName) userDisplayName.textContent = 'Guest Player';
            if (userEmail) userEmail.textContent = 'Not logged in';
        }
    }
    
    // ============================================
    // NAVIGATION
    // ============================================
    
    navigateToScene(sceneNumber) {
        const isUnlocked = gameState.isSceneUnlocked(this.currentChapter, sceneNumber);
        
        if (!isUnlocked) {
            this.showToast({
                type: 'warning',
                title: 'Scene Locked',
                message: 'Complete the previous scene first!',
                duration: 3000
            });
            return;
        }
        
        // Navigate to scene page
        window.location.href = `./scenes/scene-${sceneNumber}.html`;
    }
    
    // ============================================
    // UTILITIES
    // ============================================
    
    getChapterNumber() {
        // Extract chapter number from URL or page
        const path = window.location.pathname;
        const match = path.match(/chapter-(\d+)/);
        return match ? parseInt(match[1]) : 1;
    }
    
    getAchievementTitle(id) {
        const achievements = {
            'chapter1_complete': 'Office Chaos Master',
            'chapter2_complete': 'Field Operations Expert',
            'chapter3_complete': 'Final Confrontation Victor',
            'first_choice': 'Decision Maker',
            'integrity_high': 'Unwavering Integrity',
            'reputation_high': 'Well Respected'
        };
        return achievements[id] || 'Achievement Unlocked';
    }
    
    // ============================================
    // PLAY TIME TRACKING
    // ============================================
    
    startPlayTimeTracking() {
        this.updatePlayTimeDisplay();
        
        // Update every minute
        this.playTimeInterval = setInterval(() => {
            gameState.updatePlayTime();
            this.updatePlayTimeDisplay();
        }, 60000);
        
        // Update on page unload
        window.addEventListener('beforeunload', () => {
            gameState.updatePlayTime();
            clearInterval(this.playTimeInterval);
        });
    }
    
    updatePlayTimeDisplay() {
        const timePlayed = document.getElementById('timePlayed');
        if (timePlayed) {
            timePlayed.textContent = gameState.getFormattedPlayTime();
        }
    }
    
    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    
    showToast({ type = 'info', title, message, duration = 3000 }) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('toast-hide');
            setTimeout(() => toast.remove(), 300);
        });
        
        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    // ============================================
    // AUTH HANDLERS
    // ============================================
    
    async handleSignOut() {
        try {
            await authService.signOutUser();
            this.showToast({
                type: 'success',
                title: 'Signed Out',
                message: 'You have been signed out successfully',
                duration: 2000
            });
            
            // Redirect to main page after 2 seconds
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 2000);
        } catch (error) {
            console.error('Sign out error:', error);
            this.showToast({
                type: 'error',
                title: 'Error',
                message: 'Failed to sign out. Please try again.',
                duration: 3000
            });
        }
    }
}

// Initialize when DOM is ready
const chapterController = new ChapterController();

// Expose for debugging
window.chapterController = chapterController;

// Global function for scene navigation (called from HTML onclick)
window.navigateToScene = (sceneNumber) => {
    chapterController.navigateToScene(sceneNumber);
};

export default chapterController;