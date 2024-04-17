
import { useState } from 'react'
import Modal from 'react-modal';

import PhoneNumbersTable from './PhoneNumberTable'
import VehiclesTable from './VehiclesTable'
import './styles/DetailsDisplay.css'
import AccountUpdateForm from '../forms/AccountUpdateForm';

const standardStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}

const DetailsDisplay = ({currentUser}) => {

    const [showEdit, setShowEdit] = useState(false)

    const toggleEdit = (e) => {
        e.preventDefault()
        showEdit ? setShowEdit(false) : setShowEdit(true)
    }

    return (
        <div className="details-container">

            <h1>Account Details: </h1>

            <button onClick={toggleEdit}>Edit Account Details</button>

            
            <table className='details-list'>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{currentUser.firstName} {currentUser.lastName}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{currentUser.emailAddress}</td>
                </tr>
                <tr>
                    <td>Phone Numbers</td>
                        <td>
                            <PhoneNumbersTable phoneNumbers={currentUser.phoneNumbers}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vehicles</td>
                        <td>
                            <VehiclesTable vehicles={currentUser.vehicles}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Modal
                isOpen={showEdit}
                onRequestClose={() => setShowEdit(false)}
                style={standardStyle}
                contentLabel="Edit Account Details"
                className="modal"
                overlayClassName="overlay"
                >
                    <AccountUpdateForm currentUser={currentUser}/>
            </Modal>
        </div>
    )
}

export default DetailsDisplay