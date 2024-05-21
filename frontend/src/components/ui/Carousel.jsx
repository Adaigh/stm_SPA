import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import InfoPane from './InfoPane'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import './styles/Carousel.css'

const MyCarousel = ({sectionData}) => {
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
        autoPlay={true}
        interval={10000}
        infiniteLoop={true}
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