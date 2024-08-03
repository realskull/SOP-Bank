import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../Auth/AuthContext'; // Adjust the import path as necessary
import { db } from '../../config/firebaseConfig';
import '../../css/content/AddEssay.css';
import { readFileAsText } from '../../utils/fileUtils';
import DOMPurify from 'dompurify';

function AddEssay() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const { currentUser } = useAuth(); // Use the useAuth hook
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin'); // Redirect to signup if not logged in
        }
    }, [currentUser, navigate]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            readFileAsText(selectedFile).then(text => {
                setContent(text);
            }).catch(error => {
                console.error('Error reading file:', error);
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentUser) {
            try {
                // Sanitize the content before storing it
                const sanitizedContent = DOMPurify.sanitize(content);

                await addDoc(collection(db, 'Essays'), {
                    userId: currentUser.uid,
                    title,
                    description,
                    content: sanitizedContent,
                    fieldOfStudy: currentUser.fieldOfStudy,
                    lastAcademicLevel: currentUser.lastAcademicLevel,
                    averageGPA: currentUser.averageGPA,
                    languageProficiencyTest: currentUser.languageProficiencyTest,
                    languageProficiencyScore: currentUser.languageProficiencyScore,
                    availableFunds: currentUser.availableFunds,
                    createdAt: new Date()
                });
                navigate('/');
            } catch (error) {
                console.error('Error adding essay:', error.message);
            }
        } else {
            console.error('No user signed in or user data not available');
        }
    };

    if (!currentUser) {
        return null; // Optionally show a loading spinner or message until redirect
    }

    return (
        <div className="addEssayContainer">
            <h2>Add Your Essay</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="content">Content:</label>
                    <ReactQuill
                        id="content"
                        value={content}
                        onChange={setContent}
                        modules={editorModules}
                        formats={editorFormats}
                    />
                </div>
                <button type="submit" className="submitEssayButton">Submit Essay</button>
            </form>
        </div>
    );
}

const editorModules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
    ],
};

const editorFormats = [
    'font',
    'size',
    'header',
    'bold',
    'italic',
    'underline',
    'color',
    'background',
    'list',
    'bullet',
    'align',
    'link',
    'image',
    'clean'
];

export default AddEssay;

{
    /*
                    <div className="formGroup">
                    <label htmlFor="fileUpload">Already have a written SOP? (PDF/DOC/TXT):</label>
                    <input
                        type="file"
                        id="fileUpload"
                        accept=".pdf, .doc, .docx, .txt"
                        onChange={handleFileChange}
                    />
                </div>

    */
}