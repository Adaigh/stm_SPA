import AboutPane from '../components/ui/AboutPane'
import MyCarousel from '../components/ui/Carousel'
import ContactInfo from '../components/ui/ContactInfo'
import { sectionData } from './resources/CarouselData'

import './styles/STMHome.css'

const STMHome = () => {

    return(
        <div className='stm-home page'>
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