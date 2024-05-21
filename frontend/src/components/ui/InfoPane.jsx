import React from 'react';

import './styles/InfoPane.css'

// Reusable component for sections with image and text
const InfoPane = ({ children }) => {
    return (
      <div className="infopane">
        <div className='infochildren'>
          {children}
        </div>
      </div>
    );
  };

export default InfoPane