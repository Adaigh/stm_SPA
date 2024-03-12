import React from 'react';
import './styles/InfoPane.css'

// Reusable component for sections with image and text
const InfoPane = ({ children }) => {
    // Ensure children is an array in case only a single child is passed
    const childArray = Array.isArray(children) ? children : [children];
  
    return (
      <div className="infopane horizontal-segment">
        {childArray.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    );
  };

export default InfoPane