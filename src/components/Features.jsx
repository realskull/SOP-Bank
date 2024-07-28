import React from 'react';
import '../css/Features.css';

function Features() {
    return (
        <section className="features" id="features">
            <h2>Our Features</h2>
            <div className="feature-items">
                <div className="feature-item">
                    <h3>Personalized Essay Samples</h3>
                    <p>Get essay samples tailored to your profile and requirements.</p>
                </div>
                <div className="feature-item">
                    <h3>Upload Your Essay</h3>
                    <p>Submit your essay for feedback and improvement suggestions.</p>
                </div>
                <div className="feature-item">
                    <h3>Comprehensive Articles</h3>
                    <p>Read articles on various topics related to essay writing and applications.</p>
                </div>
            </div>
        </section>
    );
}

export default Features;
