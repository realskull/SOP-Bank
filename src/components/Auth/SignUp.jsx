import React, { useState } from 'react';
import { auth, db } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../../css/Auth/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { lastAcademicLevels, fieldsOfStudy, languageTests, ieltsBands, toeflScores, pteScores, cefrLevels } from '../utils/options';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastAcademicLevel, setLastAcademicLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [averageGPA, setAverageGPA] = useState('');
  const [languageProficiencyTest, setLanguageProficiencyTest] = useState('');
  const [languageProficiencyScore, setLanguageProficiencyScore] = useState('');
  const [availableFunds, setAvailableFunds] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Try something else.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Weak password. Password must be at least 6 characters.';
      case 'auth/user-not-found':
        return 'Incorrect username or password. Check if you made a mistake.';
      case 'auth/wrong-password':
        return 'Incorrect username or password. Check if you made a mistake.';
      case 'auth/invalid-credential':
        return 'Incorrect username or password. Check if you made a mistake.';
      default:
        console.log(error);
        return 'An error occurred. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDoc(doc(db, 'Users', user.uid), {
          name,
          lastAcademicLevel,
          fieldOfStudy,
          averageGPA,
          languageProficiencyTest,
          languageProficiencyScore: mapProficiencyScore(languageProficiencyTest, languageProficiencyScore),
          availableFunds,
          email
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (error) {
      setError(handleAuthError(error));
    }
  };

  const mapProficiencyScore = (test, score) => {
    // Example mappings, adjust as needed
    switch (test) {
      case 'IELTS':
        return parseInt(score); // IELTS bands directly
      case 'TOEFL':
        return parseInt(score); // TOEFL scores directly
      case 'PTE':
        return parseInt(score.split('-')[0]); // Use the high end of PTE range
      case 'CEFR':
        return cefrLevels.indexOf(score) * 20 + 20; // Simplified scoring for CEFR
      default:
        return 0;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <>
              <div className="input-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Last Academic Level:</label>
                <select
                  value={lastAcademicLevel}
                  onChange={(e) => setLastAcademicLevel(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  {lastAcademicLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Field of Study:</label>
                <select
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  {fieldsOfStudy.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Average GPA:</label>
                <input
                  type="text"
                  value={averageGPA}
                  onChange={(e) => setAverageGPA(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Language Proficiency Test:</label>
                <select
                  value={languageProficiencyTest}
                  onChange={(e) => setLanguageProficiencyTest(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  {languageTests.map(test => (
                    <option key={test.value} value={test.value}>{test.label}</option>
                  ))}
                </select>
              </div>
              {languageProficiencyTest && (
                <div className="input-group">
                  <label>Language Proficiency Score:</label>
                  <select
                    value={languageProficiencyScore}
                    onChange={(e) => setLanguageProficiencyScore(e.target.value)}
                    required
                  >
                    <option value="">Select...</option>
                    {getProficiencyOptions(languageProficiencyTest).map(score => (
                      <option key={score} value={score}>{score}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="input-group">
                <label>Available Funds:</label>
                <input
                  type="text"
                  value={availableFunds}
                  onChange={(e) => setAvailableFunds(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <p className="redirect-text">
          {isSignUp ? (
            <>Already have an account? <a href="#" onClick={() => setIsSignUp(false)}>Sign In</a></>
          ) : (
            <>Don't have an account? <a href="#" onClick={() => setIsSignUp(true)}>Sign Up</a></>
          )}
        </p>
      </div>
    </div>
  );
}

// Function to get proficiency score options based on the selected test
const getProficiencyOptions = (test) => {
  switch (test) {
    case 'IELTS':
      return ieltsBands;
    case 'TOEFL':
      return toeflScores;
    case 'PTE':
      return pteScores;
    case 'CEFR':
      return cefrLevels;
    default:
      return [];
  }
};

export default SignUp;
