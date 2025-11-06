// Firebase/user-service.js - Centralized User Data Service
import { db } from './firebase-config.js';
import { 
  doc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  increment 
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

class UserService {
  constructor() {
    this.db = db;
  }

  // ✅ NEW - Get Full User Profile
  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // ✅ NEW - Update User Profile
  async updateUserProfile(userId, profileData) {
    try {
      await updateDoc(doc(db, 'users', userId), profileData);
    } catch (error) {
      throw error;
    }
  }

  // Get User Progress
  async getUserProgress(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().progress;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Update User Progress
  async updateUserProgress(userId, progressData) {
    try {
      await updateDoc(doc(db, 'users', userId), {
        progress: progressData
      });
    } catch (error) {
      throw error;
    }
  }

  // Complete Chapter
  async completeChapter(userId, chapterId) {
    try {
      await updateDoc(doc(db, 'users', userId), {
        'progress.completed': arrayUnion(chapterId),
        'stats.chaptersCompleted': increment(1)
      });
    } catch (error) {
      throw error;
    }
  }

  // Get User Stats
  async getUserStats(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().stats;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Update Current Chapter
  async updateCurrentChapter(userId, chapterId) {
    try {
      await updateDoc(doc(db, 'users', userId), {
        'progress.current': chapterId
      });
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();