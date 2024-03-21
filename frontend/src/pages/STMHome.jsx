import AboutPane from '../components/AboutPane'
import MyCarousel from '../components/Carousel'
import ContactInfo from '../components/ContactInfo'
import './styles/STMHome.css'

const STMHome = () => (
    <div className='stm-home'>
        <AboutPane />
        <MyCarousel/>
        <ContactInfo/>
    </div> 
  );

  export default STMHome