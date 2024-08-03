import React from 'react';
import '../css/CTASection.css';

import styles from '../css/Buttons.module.css'

import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="cta-section">
      <div className="cta">
        <h2>Start Sharing Your Essays Today!</h2>
        <Link href="/add-essay" className={`${styles.button} ${styles.buttonPrimary}`}>Upload Your Essay</Link>
      </div>
    </div>
  );
};

export default CTASection;
