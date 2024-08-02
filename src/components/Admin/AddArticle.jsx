import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import '../../css/Admin/AddArticle.css'; // Reusing the same CSS file
import DOMPurify from 'dompurify';
import { lastAcademicLevels, fieldsOfStudy, languageTests, proficiencyOptions } from '../utils/options'; // Import predefined options

import styles from '../../css/Buttons.module.css';

function AddArticle() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [lastAcademicLevel, setLastAcademicLevel] = useState('');
    const [averageGPA, setAverageGPA] = useState('');
    const [languageProficiencyTest, setLanguageProficiencyTest] = useState('');
    const [languageProficiencyScore, setLanguageProficiencyScore] = useState('');
    const [availableFunds, setAvailableFunds] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sanitize the content before storing it
            const sanitizedContent = DOMPurify.sanitize(content);

            await addDoc(collection(db, 'Articles'), {
                title,
                description,
                content: sanitizedContent,
                fieldOfStudy,
                lastAcademicLevel,
                averageGPA,
                languageProficiencyTest,
                languageProficiencyScore,
                availableFunds,
                createdAt: new Date()
            });
            navigate('/admin'); // Redirect to homepage or articles list
        } catch (error) {
            console.error('Error adding article:', error.message);
        }
    };

    return (
        <div className="addEssayContainer"> {/* Reusing the CSS class */}
            <h2>Add Your Article</h2>
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
                <div className="formGroup">
                    <label htmlFor="fieldOfStudy">Field of Study:</label>
                    <select
                        id="fieldOfStudy"
                        value={fieldOfStudy}
                        onChange={(e) => setFieldOfStudy(e.target.value)}
                    >
                        <option value="">Select...</option>
                        {fieldsOfStudy.map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="formGroup">
                    <label htmlFor="lastAcademicLevel">Last Academic Level:</label>
                    <select
                        id="lastAcademicLevel"
                        value={lastAcademicLevel}
                        onChange={(e) => setLastAcademicLevel(e.target.value)}
                    >
                        <option value="">Select...</option>
                        {lastAcademicLevels.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="formGroup">
                    <label htmlFor="averageGPA">Average GPA:</label>
                    <input
                        type="text"
                        id="averageGPA"
                        value={averageGPA}
                        onChange={(e) => setAverageGPA(e.target.value)}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="languageProficiencyTest">Language Proficiency Test:</label>
                    <select
                        id="languageProficiencyTest"
                        value={languageProficiencyTest}
                        onChange={(e) => {
                            setLanguageProficiencyTest(e.target.value);
                            setLanguageProficiencyScore(''); // Reset proficiency score when test changes
                        }}
                    >
                        <option value="">Select...</option>
                        {languageTests.map((test) => (
                            <option key={test.value} value={test.value}>
                                {test.label}
                            </option>
                        ))}
                    </select>
                </div>
                {languageProficiencyTest && (
                    <div className="formGroup">
                        <label htmlFor="languageProficiencyScore">Language Proficiency Score:</label>
                        <select
                            id="languageProficiencyScore"
                            value={languageProficiencyScore}
                            onChange={(e) => setLanguageProficiencyScore(e.target.value)}
                        >
                            <option value="">Select...</option>
                            {proficiencyOptions[languageProficiencyTest]?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="formGroup">
                    <label htmlFor="availableFunds">Available Funds:</label>
                    <input
                        type="text"
                        id="availableFunds"
                        value={availableFunds}
                        onChange={(e) => setAvailableFunds(e.target.value)}
                    />
                </div>
                <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>Submit Article</button>
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

export default AddArticle;
