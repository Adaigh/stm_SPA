import Modal from 'react-modal'
import { standardStyle } from '../../hooks/useUtils'

const AlertModal = ({ modalIsOpen, onClose, message }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onClose}
            style={standardStyle}
            contentLabel="Message Alert"
            className="modal"
            overlayClassName="overlay"
        >
            {message}
            <br/>
            <button
                className="submit"
                onClick={(e) => { e.preventDefault(); onClose() }}>OK</button>
        </Modal>
    )
}

export default AlertModal