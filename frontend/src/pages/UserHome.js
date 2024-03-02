import { useEffect } from "react"
import { useUsersContext } from "../hooks/useUsersContext"

// Components
import UserDetails from '../components/UserDetails'
import UserForm from "../components/UserForm"

const UserHome = () => {
    const {users, dispatch} = useUsersContext()

    useEffect(() =>{
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            const json = await response.json()
            if(response.ok) {
                dispatch({type:'SET_USERS', payload: json})
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="userHome">
            <div className="users">
                <h2>Users</h2>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
            <UserForm />
        </div>
    )
}

export default UserHome