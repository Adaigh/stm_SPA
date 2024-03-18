import './styles/ContactInfo.css'

const ContactInfo = () => {
    const phoneNumber = '(509) 893-2367'
    const address = '4715 E Trent Ave, Spokane, WA 99212'
    const hours = '9am-5pm, Monday through Friday'

    return (
        <div className='contact'>
            <h4>Contact:</h4>
            <ul>
                <li><span>phone</span> | {phoneNumber}</li>
                <li><span>address</span> | {address}</li>
                <li><span>hours</span> | {hours}</li>
            </ul>
        </div>
    )
}

export default ContactInfo