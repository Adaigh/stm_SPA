import './styles/AboutPane.css'
// Component specifically for about section
const AboutPane = ({header, children}) => {

  return (
    <div className="aboutpane">
      <h2>{header}</h2>
      {children}
    </div>
  )
}

export default AboutPane