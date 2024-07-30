// src/components/Modal/Modal.jsx
import React from 'react';
import '../css/Modal.css';

const Modal = ({ show, onClose, onConfirm, title, message, showButtons }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                {showButtons && (
                    <div className="modal-buttons">
                        <button onClick={onConfirm} className="confirm-button">Yes</button>
                        <button onClick={onClose} className="cancel-button">No</button>
                    </div>
                )}
                {!showButtons && (
                    <div className="modal-buttons">
                        <button onClick={onClose} className="close-button">Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
