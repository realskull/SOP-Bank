// src/firestore.js
import { db } from './config/firebaseConfig';
import { collection, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';

const addEssay = async (content, tags, userId) => {
    try {
        // Input validation
        if (!content.trim() || !tags.trim()) {
            throw new Error('Content and tags cannot be empty');
        }

        // Add essay to Firestore
        const essayRef = await addDoc(collection(db, 'Essays'), {
            userId: userId,
            content: content,
            tags: tags
        });

        // Update user's document with the new essay ID
        const userDocRef = doc(db, 'Users', userId);
        await updateDoc(userDocRef, {
            essays: arrayUnion(essayRef.id)
        });

        console.log('Essay added with ID:', essayRef.id);
    } catch (error) {
        console.error('Error adding essay:', error.message);
    }
};

export { addEssay };
