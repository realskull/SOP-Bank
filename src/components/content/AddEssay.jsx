import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, auth } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../../css/content/AddEssay.css';

function AddEssay() {
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (user) {
            try {
                await addDoc(collection(db, 'Essays'), {
                    userId: user.uid,
                    content: content,
                    createdAt: new Date()
                });
                navigate('/');
            } catch (error) {
                console.error('Error adding essay:', error.message);
            }
        } else {
            console.error('No user signed in');
        }
    };

    return (
        <div className="addEssayContainer">
            <h2>Add Your Essay</h2>
            <form onSubmit={handleSubmit}>
                <ReactQuill value={content} onChange={setContent} />
                <button type="submit" className="submitEssayButton">Submit Essay</button>
            </form>
        </div>
    );
}

export default AddEssay;
