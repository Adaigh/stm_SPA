import AboutPane from '../components/AboutPane.js'
import MyCarousel from '../components/Carousel.js';
import ContactInfo from '../components/ContactInfo.js';
import './styles/STMHome.css'

const STMHome = () => (
    <div className='stm-home'>
        <AboutPane />
        <MyCarousel/>
        <ContactInfo/>
    </div> 
  );

  export default STMHome