import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import InfoPane from './InfoPane'; // Assuming InfoPane is in a file named InfoPane.jsx
import PictureFrame from './PictureFrame';
import './styles/Carousel.css'

const NewCarousel = ({ sectionData }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div>

        <ul className="carousel-nav">
        {sectionData.map((section, index) => (
          <li key={index}>
            <button onClick={(e) => { e.preventDefault(); setSelected(index); }}>
              {section.sectionTitle} 
            </button>
          </li>
        ))}
      </ul>
      
      <Carousel 
        selectedItem={selected} 
        showArrows={true}
        showThumbs={false}
        onChange={setSelected}
        onClickItem={setSelected}
        onClickThumb={setSelected} 
      >
        {sectionData.map((section, index) => (
          <InfoPane key={index}>
            <div>
              <h3>{section.sectionTitle}</h3>
              <p>{section.sectionContent}</p>
            </div>
            <PictureFrame 
              src={section.src} 
              alt={section.alt} 
              caption={section.caption} />
          </InfoPane>
        ))}
      </Carousel>

      
    </div>
  );
};

export default NewCarousel;