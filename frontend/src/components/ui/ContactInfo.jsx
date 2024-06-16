import './styles/ContactInfo.css'

const ContactInfo = () => {
    const phoneNumber = '(509) 893-2367'
    const email = 'stmtuning@hotmail.com'
    const address = '4715 E Trent Ave, Spokane, WA 99212'
    const hours = '9am-5pm, Monday through Friday'

    return (
        <div className='contact'>
            <h4>Contact:</h4>
            <ul>
                <li>
                    <a href="tel:509-893-2367">
                        <span>phone</span> | {phoneNumber}
                    </a>
                </li>
                <li>
                    <a href="mailto:stmtuning@hotmail.com">
                        <span>email</span> | {email}
                    </a>
                </li>
                <li>
                    <a href="https://maps.app.goo.gl/QbksovXGtDDT5ptB9"
                        target="_blank" rel="noreferrer">
                        <span>address</span> | {address}
                    </a>
                </li>
                <li><span>hours</span> | {hours}</li>
            </ul>
        </div>
    )
}

export default ContactInfo