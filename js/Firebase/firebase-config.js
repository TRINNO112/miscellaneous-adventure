// Firebase/firebase-config.js - Combined Firebase Services
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOHaoLEZjT8V5rkuDrOsdny1s09OKMelc",
  authDomain: "miscellaneous-adventure.firebaseapp.com",
  projectId: "miscellaneous-adventure",
  storageBucket: "miscellaneous-adventure.firebasestorage.app",
  messagingSenderId: "974562975403",
  appId: "1:974562975403:web:8dc24c1b865680cd4e61ee",
  measurementId: "G-08GC6BKWLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth Service Class
class AuthService {
  constructor() {
    this.auth = auth;
    this.db = db;
  }

  // User Registration
  async signUpWithEmail(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Generate default avatar URL
      const defaultPhotoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff&size=200`;
      
      await updateProfile(userCredential.user, { 
        displayName: name,
        photoURL: defaultPhotoURL
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: name,
        email: email,
        photoURL: defaultPhotoURL,
        createdAt: serverTimestamp(),
        progress: {
          completed: [],
          current: 'ch-1',
          achievements: []
        },
        stats: {
          totalPlayTime: 0,
          chaptersCompleted: 0,
          choicesMade: 0
        }
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Email Sign In
  async signInWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Google Sign In
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Create user document if new user
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          createdAt: serverTimestamp(),
          progress: {
            completed: [],
            current: 'ch-1',
            achievements: []
          },
          stats: {
            totalPlayTime: 0,
            chaptersCompleted: 0,
            choicesMade: 0
          }
        });
      }

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Password Reset
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  }

  // Sign Out
  async signOutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  // Auth State Observer
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  }

  // Get Current User
  getCurrentUser() {
    return auth.currentUser;
  }
}

// User Service Class
class UserService {
  constructor() {
    this.db = db;
  }

  // Get Full User Profile
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

  // Update User Profile
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

// Create service instances
const authService = new AuthService();
const userService = new UserService();

// Export everything
export { 
  auth, 
  db, 
  app,
  authService,
  userService
};