import './styles/PictureFrame.css'

// Could be adjusted to use the above image component
const PictureFrame = ({ src, alt, caption }) => {
    
    return (
        <div className="pictureFrame">
            <figure>
                <img src={src} alt={alt} />
                {caption && <figcaption>{caption}</figcaption>}
            </figure>
        </div>
    )
}

export default PictureFrame
