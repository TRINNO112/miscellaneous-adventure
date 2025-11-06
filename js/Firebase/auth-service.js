// Firebase/auth-service.js - Centralized Authentication Service
import { auth, db } from './firebase-config.js';
import { 
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
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  increment,
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

class AuthService {
  constructor() {
    this.auth = auth;
    this.db = db;
  }

  // User Registration
  async signUpWithEmail(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: name,
        email: email,
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

export const authService = new AuthService();