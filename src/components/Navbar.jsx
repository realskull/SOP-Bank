import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { useAuth } from './Auth/AuthContext';
import { signOutUser } from '../config/auth';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
        setIsDropdownOpen(false); // Close the dropdown after logout
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav>
            <Link to="/" className="logo">
                <h1>SOP Bank</h1>
            </Link>

            
            <div className="userProfile">
                {currentUser ? (
                    <div className="userInfo" onClick={toggleDropdown}>
                        <img src={currentUser.photoURL || 'https://via.placeholder.com/32'} alt="User Profile" />
                        <span>{currentUser.name || 'User'}</span>
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
                {currentUser && (
                    <Link to="/add-essay" className="signInButton">Upload</Link>
                )}
                {currentUser && currentUser.isAdmin ? (
                    <Link to="/admin" className="signInButton">Admin Panel</Link>
                ) : null}
            </div>
        </nav>
    );
}

export default Navbar;
