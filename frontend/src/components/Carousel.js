import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const MyCarousel = ({ children }) => {
  const [selected, setSelected] = useState(0);

  const handleNext = () => {
    setSelected(selected + 1 >= children.length ? 0 : selected + 1);
  };

  const handlePrev = () => {
    setSelected(selected - 1 < 0 ? children.length - 1 : selected - 1);
  };

  return (
    <div className='myCarousel'>
      <Carousel 
        selectedItem={selected} 
        showArrows={true}
        showThumbs={false}
        onChange={setSelected}
        onClickItem={setSelected}
        onClickThumb={setSelected} 
      >
        {children}
      </Carousel>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default MyCarousel;