import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, auth } from '../../config/firebaseConfig';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import '../../css/content/UploadArticle.css';
import { readFileAsText } from '../../utils/fileUtils';
import DOMPurify from 'dompurify';

function UploadArticle() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [userData, setUserData] = useState(null);
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [lastAcademicLevel, setLastAcademicLevel] = useState('');
    const [averageGPA, setAverageGPA] = useState('');
    const [languageProficiencyTest, setLanguageProficiencyTest] = useState('');
    const [languageProficiencyOverall, setLanguageProficiencyOverall] = useState('');
    const [availableFunds, setAvailableFunds] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, 'Users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        };

        fetchUserData();
    }, []);

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
        setLoading(true);
        setError('');

        const user = auth.currentUser;
        if (user && userData) {
            try {
                // Sanitize the content before storing it
                const sanitizedContent = DOMPurify.sanitize(content);

                await addDoc(collection(db, 'Articles'), {
                    userId: user.uid,
                    title,
                    description,
                    content: sanitizedContent,
                    fieldOfStudy: fieldOfStudy || userData.fieldOfStudy,
                    lastAcademicLevel: lastAcademicLevel || userData.lastAcademicLevel,
                    averageGPA: averageGPA || userData.averageGPA,
                    languageProficiencyTest: languageProficiencyTest || userData.languageProficiencyTest,
                    languageProficiencyOverall: languageProficiencyOverall || userData.languageProficiencyOverall,
                    availableFunds: availableFunds || userData.availableFunds,
                    createdAt: new Date()
                });
                navigate('/');
            } catch (error) {
                setError('Failed to upload article. ' + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setError('No user signed in or user data not available');
        }
    };

    return (
        <div className="upload-article-container">
            <h2>Upload Your Article</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fileUpload">Already have a written article? (PDF/DOC/TXT):</label>
                    <input
                        type="file"
                        id="fileUpload"
                        accept=".pdf, .doc, .docx, .txt"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <ReactQuill
                        id="content"
                        value={content}
                        onChange={setContent}
                        modules={editorModules}
                        formats={editorFormats}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fieldOfStudy">Field of Study:</label>
                    <input
                        type="text"
                        id="fieldOfStudy"
                        value={fieldOfStudy}
                        onChange={(e) => setFieldOfStudy(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastAcademicLevel">Last Academic Level:</label>
                    <input
                        type="text"
                        id="lastAcademicLevel"
                        value={lastAcademicLevel}
                        onChange={(e) => setLastAcademicLevel(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="averageGPA">Average GPA:</label>
                    <input
                        type="text"
                        id="averageGPA"
                        value={averageGPA}
                        onChange={(e) => setAverageGPA(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="languageProficiencyTest">Language Proficiency Test:</label>
                    <input
                        type="text"
                        id="languageProficiencyTest"
                        value={languageProficiencyTest}
                        onChange={(e) => setLanguageProficiencyTest(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="languageProficiencyOverall">Language Proficiency Overall:</label>
                    <input
                        type="text"
                        id="languageProficiencyOverall"
                        value={languageProficiencyOverall}
                        onChange={(e) => setLanguageProficiencyOverall(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="availableFunds">Available Funds:</label>
                    <input
                        type="text"
                        id="availableFunds"
                        value={availableFunds}
                        onChange={(e) => setAvailableFunds(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-article-button" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Article'}
                </button>
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

export default UploadArticle;
