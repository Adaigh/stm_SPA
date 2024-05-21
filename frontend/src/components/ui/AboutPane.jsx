import './styles/AboutPane.css'

const AboutPane = ({header, children}) => {

  return (
    <div className="aboutpane">
      <h2>{header}</h2>
      {children}
    </div>
  )
}

export default AboutPane