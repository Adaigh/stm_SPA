import Modal from 'react-modal'
import { standardStyle } from '../../hooks/useUtils'

const ConfirmModal = ({modalIsOpen, onClose, message}) => {
    return (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => onClose(false)}
        style={standardStyle}
        contentLabel="Confirmation Dialog"
        className="modal"
        overlayClassName="overlay"
        >

            {message}
            <br/>
            <button
                className="submit"
                onClick={(e) => {e.preventDefault(); onClose(true)}}>CONFIRM</button>
            <button
                className="cancel"
                onClick={(e)=> {e.preventDefault(); onClose(false)}}>CANCEL</button>
        </Modal>


    )
}

export default ConfirmModal