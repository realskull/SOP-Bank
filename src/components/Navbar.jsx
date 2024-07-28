import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        name: '',
        profilePicture: '',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Logic to check if user is logged in
        // For example: setIsLoggedIn(auth.currentUser !== null);
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Clear user state and set isLoggedIn to false
        setUser({
            name: '',
            profilePicture: '',
        });
        setIsLoggedIn(false);
        setIsDropdownOpen(false); // Close the dropdown after logout
        console.log('Logout clicked');
    };

    const handleLogin = () => {
        // Simulate a successful login
        setUser({
            name: 'John Doe',
            profilePicture: 'https://via.placeholder.com/32',
        });
        setIsLoggedIn(true);
        console.log('Login successful');
    };

    return (
        <nav>
            <Link to="/" className="logo">
                <h1>SOP Bank</h1>
            </Link>

            <div className="search">
                <label htmlFor="search">Search</label>
                <input type="text" id="search" />
                <span className="searchIcon">
                    <FontAwesomeIcon icon={faSearch} />
                </span>
            </div>

            <div className="userProfile">
                {isLoggedIn ? (
                    <div className="userInfo" onClick={toggleDropdown}>
                        <img src={user.profilePicture} alt="User Profile" />
                        <span>{user.name}</span>
                        <FontAwesomeIcon icon={faCaretDown} className={`dropdownArrow ${isDropdownOpen ? 'open' : ''}`} />
                        {isDropdownOpen && (
                            <div className="dropdownMenu">
                                <Link to="/profile">Profile</Link>
                                <a onClick={handleLogout}>Logout</a>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/signin" className="signInButton">Sign In</Link>
                )}
                {isLoggedIn && (
                    <Link to="/add-essay" className="uploadButton">Upload</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
