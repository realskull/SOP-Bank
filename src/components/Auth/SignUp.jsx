import React, { useState } from 'react';
import { auth, db } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../../css/Auth/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { lastAcademicLevels, fieldsOfStudy, languageTests, proficiencyOptions } from '../utils/options';

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

  // Function to map proficiency scores to a common scale
  const mapProficiencyScore = (test, score) => {
    switch (test) {
      case 'IELTS':
        return mapIELTS(score);
      case 'TOEFL':
        return mapTOEFL(score);
      case 'PTE':
        return mapPTE(score);
      case 'CEFR':
        return mapCEFR(score);
      default:
        return 0; // Default to 0 if test is not recognized
    }
  };

  // Mappings for each test to the 0-100 scale
  const mapIELTS = (score) => {
    const bands = {
      '9': 100,
      '8.5': 90,
      '8': 80,
      '7.5': 70,
      '7': 60,
      '6.5': 50,
      '6': 40,
      '5.5': 30,
      '5': 20,
      'Below 5': 10
    };
    return mapToRange(bands[score] || 0);
  };

  const mapTOEFL = (score) => {
    const scores = {
      '120-115': 100,
      '114-110': 90,
      '109-105': 80,
      '104-100': 70,
      '99-95': 60,
      '94-90': 50,
      '89-85': 40,
      '84-80': 30,
      '79-75': 20,
      'Below 75': 10
    };
    return mapToRange(scores[score] || 0);
  };

  const mapPTE = (score) => {
    const scores = {
      '90-85': 100,
      '84-80': 90,
      '79-70': 80,
      'Below 70': 60
    };
    return mapToRange(scores[score] || 0);
  };

  const mapCEFR = (score) => {
    const levels = {
      'C2': 100,
      'C1': 90,
      'B2': 80,
      'B1': 70,
      'A2': 60,
      'A1': 50
    };
    return mapToRange(levels[score] || 0);
  };

  // Convert the raw score to a range
  const mapToRange = (score) => {
    if (score >= 91) return 100; // CEFR C2
    if (score >= 81) return 90;  // CEFR C1
    if (score >= 61) return 80;  // CEFR B2
    if (score >= 41) return 70;  // CEFR B1
    if (score >= 21) return 60;  // CEFR A2
    return 50;                   // CEFR A1
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isSignUp ? 'Create Account' : 'Log In'}</h1>
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
                  {lastAcademicLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
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
                  {fieldsOfStudy.map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
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
                  onChange={(e) => {
                    setLanguageProficiencyTest(e.target.value);
                    setLanguageProficiencyScore(''); // Reset proficiency score when test changes
                  }}
                  required
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
                <div className="input-group">
                  <label>Language Proficiency Score:</label>
                  <select
                    value={languageProficiencyScore}
                    onChange={(e) => setLanguageProficiencyScore(e.target.value)}
                    required
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
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button className="" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login old account' : 'Create a new account'}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
