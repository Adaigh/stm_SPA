import { useEffect, useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext"

// Components
import UserDetails from '../components/UserDetails'
import UserForm from "../components/UserForm"

const UserHome = () => {
    const {users, dispatch} = useUsersContext()
    const [filter, setFilter] = useState('')

    useEffect(() =>{
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            const json = await response.json()
            if(response.ok) {
                dispatch({type:'SET_USERS', payload: json})
            }
        }

        fetchUsers()
    }, [dispatch])

    return (
        <div className="userHome">
            <div className="users">
                <span className="user-title">Users</span>
                <input
                    className="user-filter"
                    type="text"
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search"
                    size='50'
                />
                {users && users.filter((user) => {
                    return (user.firstName.toUpperCase().includes(filter.toUpperCase()) ||
                    user.lastName.toUpperCase().includes(filter.toUpperCase()))
                }).map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
            <div>
            <span className="add-user-title">Add User:</span>
                <UserForm />
            </div>
        </div>
    )
}

export default UserHome