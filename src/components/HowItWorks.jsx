import React from 'react';
import '../css/HowItWorks.css';

const steps = [
  { step: 1, description: "Sign up for a free account." },
  { step: 2, description: "Upload your Statement of Purpose or browse existing ones." },
  { step: 3, description: "Find essays that match your application profile." },
  { step: 4, description: "Read and refine your essay based on feedback." },
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
