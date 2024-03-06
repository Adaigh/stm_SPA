import './styles/PictureFrameStyle.css'


// Could be adjusted to use the above image component
const PictureFrame = ({ src, alt, caption }) => (
    <div className="pictureFrame" >
        <figure>
            <img src={src} alt={alt} />
            <figcaption>{caption}</figcaption>
        </figure>
    </div>
);

export default PictureFrame
