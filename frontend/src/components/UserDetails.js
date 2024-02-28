import './styles/UserDetailStyle.css'

const UserDetails = ({user}) => {
    return (
        <div className="user-details">
            <h4>{user.lastName}, {user.firstName}</h4>
            <ul>
                {user.phoneNumbers.map((number, index) => {
                    return <li key={index}><u>Phone</u>:&emsp;{number.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</li>
                })}

                <li><u>Email</u>:&emsp;{user.emailAddress}</li>
            </ul>
        </div>
    )
}

export default UserDetails