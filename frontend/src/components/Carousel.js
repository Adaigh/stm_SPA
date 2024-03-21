import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import InfoPane from './InfoPane'
import './styles/Carousel.css'
import { sectionData } from '../pages/resources/CarouselData'

const MyCarousel = () => {
  const [selected, setSelected] = useState(0);
  
  return (
    <div className='carousel-container'>
           
      <Carousel 
        selectedItem={selected} 
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        onChange={setSelected}
        onClickItem={setSelected}
        onClickThumb={setSelected} 
      >
        {sectionData.map((section, index) => (
          <InfoPane key={index} bgurl={section.bgurl}>
            <h2>{section.sectionTitle}</h2>
            <div className='info-content'>
              <div className='info-text'>
                <p>{section.sectionContent}</p>
                <ul className='info-list'>
                {section.sectionList.map((listItem, index) => (
                  <li key={index}>{listItem}</li>
                ))}
                </ul>
              </div>
              
            </div>
          </InfoPane>
        ))}
      </Carousel>

      
    </div>
  );
};

export default MyCarousel;