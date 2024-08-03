import React from 'react';
import '../css/HowItWorks.css';

const steps = [
  { step: 1, description: "Sign up for a free account." },
  { step: 2, description: "Browse essays shared by the community!" },
  { step: 3, description: "Contribute to the community by sharing your essays too!" },
  { step: 4, description: "Read free articles on how to write a good SOP. FOR FREE!" },
];

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        {steps.map((step) => (
          <div key={step.step} className="step">
            <h3>Step {step.step}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
