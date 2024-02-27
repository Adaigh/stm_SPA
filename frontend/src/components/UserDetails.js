const UserDetails = ({user}) => {
    return (
        <div className="user-details">
            <h4>{user.lastName}, {user.firstName}</h4>
            <p>Phone: {user.phoneNumber}&emsp;Email: {user.emailAddress}</p>
        </div>
    )
}

export default UserDetails