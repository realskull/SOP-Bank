import React from 'react';
import '../css/Testimonials.css';

const testimonials = [
  {
    name: "Anonymous",
    quote: "This platform helped me craft the perfect SOP and get into my dream country!",
  },
  {
    name: "Anonymous",
    quote: "An invaluable resource for anyone applying abroad. Highly recommend!",
  }
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((testimony, index) => (
          <div key={index} className="testimonial-card">
            <p>"{testimony.quote}"</p>
            <h3>- {testimony.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
