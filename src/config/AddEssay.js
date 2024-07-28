// src/components/AddEssay.js
import React, { useState } from 'react';
import { addEssay } from '../firestore';
import { auth } from '../config/firebaseConfig';

const AddEssay = () => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (user) {
            try {
                await addEssay(content, tags, user.uid);
                setContent('');
                setTags('');
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            console.error('No user signed in');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Essay content" required />
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" required />
            <button type="submit">Add Essay</button>
        </form>
    );
};

export default AddEssay;
