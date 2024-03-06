import React from 'react';

// Reusable component for sections with image and text
const InfoPane = ({ children }) => {
    // Ensure children is an array in case only a single child is passed
    const childArray = React.useMemo(() => Array.isArray(children) ? children : [children]);
  
    return (
      <div className="infopane">
        {childArray.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    );
  };

export default InfoPane