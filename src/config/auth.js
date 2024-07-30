import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Sign up function
const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
        return userCredential.user; // Return user data on successful sign-up
    } catch (error) {
        console.error('Error signing up:', error.message);
        return { error: error.message }; // Return error message on failure
    }
};

// Sign in function
const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        return userCredential.user; // Return user data on successful sign-in
    } catch (error) {
        console.error('Error signing in:', error.message);
        return { error: error.message }; // Return error message on failure
    }
};

// Sign out function
const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log('User signed out');
    } catch (error) {
        console.error('Error signing out:', error.message);
    }
};

export { signUp, signIn, signOutUser };
