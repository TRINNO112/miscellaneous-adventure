// ============================================
// PROGRESS PAGE CONTROLLER
// ============================================

import gameState from './game-state.js';
import { authService } from './firebase/auth-service.js';
import { userService } from './firebase/user-service.js';

class ProgressController {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('Progress Controller initialized');
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }
    
    onDOMReady() {
        this.setupEventListeners();
        this.loadProgressData();
    }
    
    setupEventListeners() {
        // User menu
        this.setupUserMenu();
        
        // Game state events
        window.addEventListener('progressLoaded', () => this.updateUI());
        window.addEventListener('statsUpdated', () => this.updateUI());
        
        // Auth state
        authService.onAuthStateChange((user) => {
            this.updateUserInfo(user);
            if (user) {
                this.loadProgressData();
            }
        });
    }
    
    setupUserMenu() {
        const userMenu = document.getElementById('navUserMenu');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenu && userDropdown) {
            userMenu.addEventListener('click', () => {
                userDropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target)) {
                    userDropdown.classList.remove('active');
                }
            });
        }
        
        // Sign out
        const signOutLink = document.getElementById('signOutLink');
        if (signOutLink) {
            signOutLink.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.handleSignOut();
            });
        }
    }
    
    async loadProgressData() {
        try {
            await gameState.loadProgress();
            this.updateUI();
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
    
    updateUI() {
        this.updateOverallStats();
        this.updateCharacterStats();
        this.updateChapterProgress();
        this.updateAchievements();
    }
    
    updateOverallStats() {
        // Total play time
        const totalPlayTime = document.getElementById('totalPlayTime');
        if (totalPlayTime) {
            totalPlayTime.textContent = gameState.getFormattedPlayTime();
        }
        
        // Chapters completed
        const chaptersCompleted = document.getElementById('chaptersCompleted');
        if (chaptersCompleted) {
            let completed = 0;
            if (gameState.progress.chapter1.completedAt) completed++;
            if (gameState.progress.chapter2.completedAt) completed++;
            if (gameState.progress.chapter3.completedAt) completed++;
            chaptersCompleted.textContent = `${completed} / 3`;
        }
        
        // Total choices
        const totalChoicesMade = document.getElementById('totalChoicesMade');
        if (totalChoicesMade) {
            totalChoicesMade.textContent = gameState.stats.choicesMade;
        }
        
        // Achievements
        const achievementsCount = document.getElementById('achievementsCount');
        if (achievementsCount) {
            achievementsCount.textContent = gameState.achievements.length;
        }
    }
    
    updateCharacterStats() {
        const stats = gameState.stats;
        
        // Integrity
        this.updateStat('integrity', stats.integrity);
        
        // Reputation
        this.updateStat('reputation', stats.reputation);
        
        // Moral Path
        this.updateStat('moralPath', stats.moralPath);
        
        // Influence
        this.updateStat('influence', stats.influence);
    }
    
    updateStat(statName, value) {
        const valueEl = document.getElementById(`${statName}Value`);
        const barEl = document.getElementById(`${statName}Bar`);
        const labelEl = document.getElementById(`${statName}Label`);
        
        if (valueEl) {
            valueEl.textContent = `${value}%`;
        }
        
        if (barEl) {
            setTimeout(() => {
                barEl.style.width = `${value}%`;
            }, 100);
        }
        
        if (labelEl) {
            labelEl.textContent = gameState.getStatLabel(statName, value);
        }
    }
    
    updateChapterProgress() {
        for (let i = 1; i <= 3; i++) {
            const progress = gameState.getChapterProgress(i);
            const chapterKey = `chapter${i}`;
            
            // Progress bar
            const progressBar = document.getElementById(`chapter${i}Progress`);
            if (progressBar) {
                setTimeout(() => {
                    progressBar.style.width = `${progress.percentage}%`;
                }, 100 * i);
            }
            
            // Scenes text
            const scenesText = document.getElementById(`chapter${i}Scenes`);
            if (scenesText) {
                scenesText.textContent = `${progress.completed} / ${progress.total}`;
            }
            
            // Status
            const statusEl = document.getElementById(`chapter${i}Status`);
            const cardEl = document.querySelector(`.chapter-progress-card[data-chapter="${i}"]`);
            
            if (statusEl && cardEl) {
                if (gameState.progress[chapterKey].completedAt) {
                    statusEl.innerHTML = '<i class="fas fa-check-circle"></i><span>Completed</span>';
                    statusEl.style.background = 'rgba(16, 185, 129, 0.2)';
                    statusEl.style.color = '#10b981';
                    cardEl.classList.remove('locked');
                } else if (progress.completed > 0) {
                    statusEl.innerHTML = '<i class="fas fa-play-circle"></i><span>In Progress</span>';
                    statusEl.style.background = 'rgba(139, 92, 246, 0.2)';
                    statusEl.style.color = '#8b5cf6';
                    cardEl.classList.remove('locked');
                } else if (i === 1) {
                    statusEl.innerHTML = '<i class="fas fa-unlock"></i><span>Available</span>';
                    statusEl.style.background = 'rgba(139, 92, 246, 0.2)';
                    statusEl.style.color = '#8b5cf6';
                    cardEl.classList.remove('locked');
                } else {
                    statusEl.innerHTML = '<i class="fas fa-lock"></i><span>Locked</span>';
                    cardEl.classList.add('locked');
                }
            }
        }
    }
    
    updateAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;
        
        if (gameState.achievements.length === 0) {
            achievementsGrid.innerHTML = `
                <div class="achievement-placeholder">
                    <i class="fas fa-trophy"></i>
                    <p>Complete chapters to unlock achievements</p>
                </div>
            `;
            return;
        }
        
        // Sample achievements data
        const allAchievements = {
            'chapter1_complete': {
                icon: '🏢',
                title: 'Office Chaos Master',
                description: 'Completed Chapter 1'
            },
            'chapter2_complete': {
                icon: '💼',
                title: 'Field Operations Expert',
                description: 'Completed Chapter 2'
            },
            'chapter3_complete': {
                icon: '⚖️',
                title: 'Final Confrontation Victor',
                description: 'Completed Chapter 3'
            },
            'first_choice': {
                icon: '🎯',
                title: 'Decision Maker',
                description: 'Made your first choice'
            }
        };
        
        achievementsGrid.innerHTML = gameState.achievements
            .map(id => {
                const achievement = allAchievements[id] || {
                    icon: '🏆',
                    title: 'Achievement',
                    description: 'Unlocked!'
                };
                
                return `
                    <div class="achievement-card">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-info">
                            <div class="achievement-title">${achievement.title}</div>
                            <div class="achievement-description">${achievement.description}</div>
                        </div>
                    </div>
                `;
            })
            .join('');
    }
    
    updateUserInfo(user) {
        const userName = document.getElementById('userName');
        const userDisplayName = document.getElementById('userDisplayName');
        const userEmail = document.getElementById('userEmail');
        const userAvatar = document.getElementById('userAvatar');
        const dropdownAvatar = document.getElementById('dropdownAvatar');
        
        if (user) {
            const displayName = user.displayName || 'Player';
            const email = user.email || 'Anonymous';
            let photoURL = user.photoURL;
            
            if (!photoURL) {
                photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=8b5cf6&color=fff&size=200`;
            }
            
            if (userName) userName.textContent = displayName;
            if (userDisplayName) userDisplayName.textContent = displayName;
            if (userEmail) userEmail.textContent = email;
            if (userAvatar) userAvatar.src = photoURL;
            if (dropdownAvatar) dropdownAvatar.src = photoURL;
        } else {
            const guestAvatar = 'https://ui-avatars.com/api/?name=Guest&background=6b7280&color=fff&size=200';
            
            if (userName) userName.textContent = 'Guest';
            if (userDisplayName) userDisplayName.textContent = 'Guest Player';
            if (userEmail) userEmail.textContent = 'Not logged in';
            if (userAvatar) userAvatar.src = guestAvatar;
            if (dropdownAvatar) dropdownAvatar.src = guestAvatar;
        }
    }
    
    async handleSignOut() {
        try {
            await authService.signOutUser();
            window.location.href = './index.html';
        } catch (error) {
            console.error('Sign out error:', error);
            alert('Failed to sign out');
        }
    }
}

// Initialize
const progressController = new ProgressController();
window.progressController = progressController;

export default progressController;