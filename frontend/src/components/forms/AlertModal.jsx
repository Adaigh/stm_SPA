import Modal from 'react-modal'
import { standardStyle } from '../../hooks/useUtils'

import './styles/ModalStyle.css'

const AlertModal = ({ modalIsOpen, onClose, message }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onClose}
            style={standardStyle}
            contentLabel="Message Alert"
            className="modal"
            overlayClassName="overlay"
            appElement={document.getElementById('root') || undefined}
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