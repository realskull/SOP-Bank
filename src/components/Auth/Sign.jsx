// src/pages/SignUp.js
import React, { useState } from 'react';
import { auth, db } from '../../config/firebaseConfig'; // Correct import of auth and db
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import '../../css/Auth/SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastAcademicLevel, setLastAcademicLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [averageGPA, setAverageGPA] = useState('');
  const [languageProficiencyTest, setLanguageProficiencyTest] = useState('');
  const [languageProficiencyOverall, setLanguageProficiencyOverall] = useState('');
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
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          lastAcademicLevel,
          fieldOfStudy,
          averageGPA,
          languageProficiencyTest,
          languageProficiencyOverall,
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
                <input
                  type="text"
                  value={lastAcademicLevel}
                  onChange={(e) => setLastAcademicLevel(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Field of Study:</label>
                <input
                  type="text"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  required
                />
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
                <input
                  type="text"
                  value={languageProficiencyTest}
                  onChange={(e) => setLanguageProficiencyTest(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Language Proficiency Overall:</label>
                <input
                  type="text"
                  value={languageProficiencyOverall}
                  onChange={(e) => setLanguageProficiencyOverall(e.target.value)}
                  required
                />
              </div>
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

export default SignUp;
