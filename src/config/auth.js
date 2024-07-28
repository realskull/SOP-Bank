// src/auth.js
import { auth } from './firebaseConfig';

const signUp = async (email, password) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log('User signed up:', userCredential.user);
    } catch (error) {
        console.error('Error signing up:', error);
    }
};

const signIn = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('User signed in:', userCredential.user);
    } catch (error) {
        console.error('Error signing in:', error);
    }
};

export { signUp, signIn };
