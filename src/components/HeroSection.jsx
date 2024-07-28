import React from 'react';
import '../css/HeroSection.css';

import styles from '../css/Buttons.module.css'

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to SOP Bank</h1>
                <p>Your gateway to exemplary essays and personalized samples.</p>
                <a href="#upload" className={`${styles.button} ${styles.buttonPrimary}`}>Upload Your Essay</a>
                <a href="#features" className={`${styles.button} ${styles.buttonPrimary}`}>Explore Features</a>
            </div>


        </section>
    );
}

export default HeroSection;

/*
              <div>
                <button className={`${styles.button} ${styles.buttonPrimary}`}>Primary Button</button>
                <button className={`${styles.button} ${styles.buttonSecondary}`}>Secondary Button</button>
                <button className={`${styles.button} ${styles.buttonSuccess} ${styles.buttonLarge}`}>Large Success Button</button>
                <button className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall}`}>Small Danger Button</button>
                <button className={`${styles.button} ${styles.buttonWarning} ${styles.buttonWarningWiggle}`}>Wiggle Warning Button</button>
                <button className={`${styles.button} ${styles.buttonInfo} ${styles.buttonInfoRotate}`}>Rotate Info Button</button>
                <button className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonPrimaryPulse}`}>Pulse Primary Button</button>
                <button className={`${styles.button} ${styles.buttonOutlinePrimary}`}>Outline Primary Button</button>
                <button className={`${styles.button} ${styles.buttonOutlineSecondary}`}>Outline Secondary Button</button>
                <button className={`${styles.button} ${styles.buttonDark} ${styles.buttonRounded}`}>Rounded Dark Button</button>
            </div>
 */
