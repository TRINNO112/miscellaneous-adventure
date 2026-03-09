import React, { createContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Context and Hook exported together at bottom to satisfy Fast Refresh
// Export the context so useAuth hook in separate file can access it
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize data for new users
    async function initializeUserData(uid) {
        const initialData = {
            stats: {
                integrity: 45,
                reputation: 12,
                influence: 0
            },
            currentScene: 'chapter_1_start',
            inventory: [],
            createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', uid), initialData);
        return initialData;
    }

    // Sign Up
    const signup = React.useCallback(async (email, password) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const data = await initializeUserData(res.user.uid);
        setUserData(data);
        return res;
    }, []);

    // Login
    const login = React.useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    // Google Login
    const googleLogin = React.useCallback(async () => {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const docRef = doc(db, 'users', res.user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const data = await initializeUserData(res.user.uid);
            setUserData(data);
        } else {
            setUserData(docSnap.data());
        }
        return res;
    }, []);

    // Logout
    const logout = React.useCallback(() => {
        return signOut(auth);
    }, []);

    // Centralized Data Update Helper
    async function updateUserData(updates) {
        const newData = { ...userData, ...updates };
        setUserData(newData);

        if (user) {
            try {
                await updateDoc(doc(db, 'users', user.uid), updates);
            } catch (err) {
                console.error("Cloud sync failed:", err);
            }
        } else {
            localStorage.setItem('guest_progress', JSON.stringify(newData));
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } else {
                // Handle Guest Mode (load from LocalStorage)
                const guestData = localStorage.getItem('guest_progress');
                if (guestData) {
                    setUserData(JSON.parse(guestData));
                } else {
                    setUserData({
                        stats: { integrity: 45, reputation: 12, influence: 0 },
                        currentScene: 'chapter_1_start',
                        inventory: []
                    });
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        userData,
        signup,
        login,
        googleLogin,
        logout,
        setUserData,
        updateUserData
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
