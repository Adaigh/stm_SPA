import React from 'react';
import './styles/InfoPane.css'

// Reusable component for sections with image and text
const InfoPane = ({ url, children }) => {
    // Ensure children is an array in case only a single child is passed
    const childArray = Array.isArray(children) ? children : [children];
  
    return (
      <div className="infopane">
        {childArray.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    );
  };

export default InfoPane