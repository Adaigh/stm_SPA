
import { useState } from 'react'
import Modal from 'react-modal';

import PhoneNumbersTable from './PhoneNumberTable'
import VehiclesTable from './VehiclesTable'
import AccountUpdateForm from '../forms/AccountUpdateForm';
import './styles/DetailsDisplay.css'
import { useDetailsContext } from '../../hooks/useDetailsContext';

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

const DetailsDisplay = () => {

    const [showEdit, setShowEdit] = useState(false)
    const {details} = useDetailsContext()


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
                        <td>{details.user.firstName} {details.user.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{details.user.emailAddress}</td>
                    </tr>
                    <tr>
                        <td>Phone Numbers</td>
                            <td>
                                <PhoneNumbersTable phoneNumbers={details.user.phoneNumbers}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Vehicles</td>
                            <td>
                                <VehiclesTable vehicles={details.user.vehicles}/>
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
                        <AccountUpdateForm closeForm={() => setShowEdit(false)}/>
                </Modal>
            </div>
    )
}

export default DetailsDisplay