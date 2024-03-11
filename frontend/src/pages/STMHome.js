import AboutPane from '../components/AboutPane.js'
import NewCarousel from '../components/Carousel.js';



const sectionData = [
    {
        sectionTitle: 'Performance',
        sectionContent: 'Our team is passionate about performance... (rest of content)',
        src: process.env.PUBLIC_URL + '/images/engine1.jpg',
        alt: 'Built engine',
        caption: 'Freshly built 2.0'
    },
    {
        sectionTitle: 'Repairs',
        sectionContent: 'Putting your vehicle through its paces... (rest of content)',
        src: process.env.PUBLIC_URL + '/images/dave1.jpg',
        alt: 'Portrait - Dave K.',
        caption: 'Dave K. - Owner, Lead Mechanic'
    }
  ]

const STMHome = () => (
    <>
        <AboutPane />
        <NewCarousel sectionData={sectionData}/>
    </> 
  );

  export default STMHome