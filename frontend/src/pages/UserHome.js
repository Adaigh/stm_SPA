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
        console.log("useEffect triggered")
    }, [dispatch])

    const callRefreshUsers = async (e) => {
        setFilter('')
        e.target.classList.toggle('waiting')
        const response = await fetch('/api/users')
        const json = await response.json()
        if(response.ok) {
            dispatch({type:'SET_USERS', payload: json})
        }
        e.target.classList.toggle('waiting')

    }

    return (
        <div className="userHome">
            <div className="users">
                <div className="user-header">
                    <span className="user-title">Users</span> 
                    <input
                        className="user-filter"
                        type="text"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Search by Name, Phone, or Email"
                        size='50'
                    />
                    <span class="material-symbols-outlined refresh" onClick={(e) => callRefreshUsers(e)}>
                            refresh
                    </span>
                </div>
                {users && users.filter((user) => {
                    return (user.firstName.toUpperCase().includes(filter.toUpperCase()) ||
                    user.lastName.toUpperCase().includes(filter.toUpperCase()) || 
                    user.phoneNumbers[0].toString().includes(filter) || 
                    user.emailAddresses[0].toUpperCase().includes(filter.toUpperCase()))
                }).map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
            <div className="user-form">
            <div className="add-user-title">Add a New User:</div>
                <UserForm />
            </div>
        </div>
    )
}

export default UserHome