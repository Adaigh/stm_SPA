import './styles/UserDetailStyle.css'

const UserDetails = ({user}) => {
    return (
        <div className="user-details">
            <h4>{user.lastName}, {user.firstName}</h4>
            <ul>
                <li><u>Phone</u>:&emsp;{user.phoneNumber
                                            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</li>

                <li><u>Email</u>:&emsp;{user.emailAddress}</li>
            </ul>
        </div>
    )
}

export default UserDetails