import { useState } from 'react';
import Modal from 'react-modal';
import { standardStyle, formatPhone } from '../../hooks/useUtils';

import './styles/AccountsDetail.css'
import AccountForm from '../forms/AccountForm';
import { useDeleteCustomer } from '../../hooks/api/useCustomersApi';
import { useDeleteAccount } from '../../hooks/api/useAccountsApi';
import ConfirmModal from '../forms/ConfirmModal';
import { useRecipientsContext } from '../../hooks/useRecipientsContext';
import { useCreateMailerRecipient } from '../../hooks/api/useMailerApi';

const AccountsDetails = ({ info }) => {

    const [edit, setEdit] = useState(false)
    const [confirmIsOpen, setConfirmIsOpen] = useState(false)

    const { recipients } = useRecipientsContext()
    const { createRecipient } = useCreateMailerRecipient()
    const { deleteCustomer } = useDeleteCustomer()
    const { deleteAccount } = useDeleteAccount()

    const confirmDelete = (e) => {
        e.preventDefault()
        setConfirmIsOpen(true)
    }

    const handleDelete = async (confirmed) => {
        setConfirmIsOpen(false)
        if (confirmed) {
            await deleteCustomer(info.user)
            await deleteAccount(info)
        }
    }

    const handleMailerAdd = async () => {
        let { response } = await createRecipient(info.user.emailAddress)

        if (!response.ok) {
            window.alert("Error adding address to email list, could not contact server.")
        }
    }

    return (
        <>
            <div className='accounts-detail'>
                <div className='info-area'>
                    <span>{info.user.emailAddress}</span>
                    <br />
                    <span>{info.user.lastName}, {info.user.firstName} {formatPhone(info.user.phoneNumbers[0])}</span>
                </div>
                <div>
                    {info.access > 0 && !recipients.includes(info.user.emailAddress) &&
                        <span
                            className='material-symbols-outlined outgoing_mail'
                            onClick={() => handleMailerAdd()}
                            title='Add email address to the mailer list.'
                        >
                            outgoing_mail
                        </span>
                    }
                    <button className='edit' onClick={() => setEdit(true)}>Edit</button>
                    <button className='cancel' onClick={(e) => confirmDelete(e)}>Delete</button>
                </div>
                <Modal
                    isOpen={edit}
                    onRequestClose={() => setEdit(false)}
                    style={standardStyle}
                    contentLabel='Edit Account Details'
                    className="modal"
                    overlayClassName="overlay"
                    appElement={document.getElementById('root') || undefined}
                >
                    <AccountForm
                        account={info}
                        closeForm={() => setEdit(false)} />
                </Modal>
                <ConfirmModal
                    modalIsOpen={confirmIsOpen}
                    onClose={handleDelete}
                    message={"Are you sure you want to delete the account for: " + info.user.emailAddress}
                />
            </div>
        </>
    )
}

export default AccountsDetails