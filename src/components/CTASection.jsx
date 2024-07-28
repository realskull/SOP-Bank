import React from 'react';
import '../css/CTASection.css';

import styles from '../css/Buttons.module.css'

const CTASection = () => {
  return (
    <div className="cta-section">
      <div className="cta">
        <h2>Start Sharing Your Essays Today!</h2>
        <button className={`${styles.button} ${styles.buttonPrimary}`}>Upload Your Essay</button>
      </div>
      <div className="cta">
        <h2>Explore Essays and Articles</h2>
        <button className={`${styles.button} ${styles.buttonPrimary}`}>Browse Now</button>
      </div>
    </div>
  );
};

export default CTASection;
