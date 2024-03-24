import AboutPane from '../components/AboutPane'
import MyCarousel from '../components/Carousel'
import ContactInfo from '../components/ContactInfo'
import { sectionData } from './resources/CarouselData'

import './styles/STMHome.css'

const STMHome = () => {

    return(
        <div className='stm-home'>
            <AboutPane 
                header="STM Tuning"
                >
                <p>
                    Welcome! We have been performing maintenance and repair in Spokane,
                    Washington for over 20 years, providing specialized service for Audi,
                    Volkswagen, and BMW's.
                </p>
            </AboutPane>
            <MyCarousel sectionData={sectionData}/>
            <ContactInfo/>
        </div>)
}

  export default STMHome