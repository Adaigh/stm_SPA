import AboutPane from '../components/ui/AboutPane'
import Carousel from '../components/ui/Carousel'
import ContactInfo from '../components/ui/ContactInfo'

import { sectionData } from './resources/CarouselData'

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
            <Carousel sectionData={sectionData}/>
            <ContactInfo/>
        </div>)
}

  export default STMHome