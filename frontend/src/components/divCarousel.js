import React, { useState } from 'react';
// import './DivCarousel.css'; // Optional CSS file for styling

const DivCarousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handlePrevClick = () => {
        setActiveIndex(activeIndex === 0 ? children.length - 1 : activeIndex - 1);
    };

    const handleNextClick = () => {
        setActiveIndex(activeIndex === children.length - 1 ? 0 : activeIndex + 1);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {React.Children.map(children, (child) => (
                    <div className="carousel-item">{child}</div>
                ))}
            </div>
            <button className="carousel-prev" onClick={handlePrevClick}>Prev</button>
            <button className="carousel-next" onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default DivCarousel;