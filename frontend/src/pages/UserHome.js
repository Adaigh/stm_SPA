import { useCallback, useEffect, useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './styles/UserHome.css'

// Components
import UserDetails from '../components/UserDetails'
import UserForm from "../components/UserForm"

const UserHome = () => {
    const {users, dispatch} = useUsersContext()
    const [filter, setFilter] = useState('')
    const {user} = useAuthContext()

    // GET user data from server
    const fetchUsers = useCallback(async () => {
        const response = await fetch('/api/users', {
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        })
        const json = await response.json()
        if(response.ok) {
            dispatch({type:'SET_USERS', payload: json})
        }
    }, [dispatch, user.webToken])

    // Fetch user list on load 
    useEffect(() =>{
        fetchUsers()
    }, [dispatch, user, fetchUsers])

    // Refresh (fetch) user list
    const callRefreshUsers = (e) => {
        e.target.classList.toggle("waiting")
        fetchUsers()
        e.target.classList.toggle("waiting")
    }

    return (
        <div className="userHome">
            <div className="users">

                {/* Header including search filter and buttons  */}
                <div className="user-header">
                    <h2 className="user-title">Users</h2> 
                    <input
                        className="user-filter"
                        type="text"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Search by Name, Phone, or Email"
                        size='50'
                    />
                    <span className="material-symbols-outlined close" onClick={() => setFilter('')}>close</span>
                    <span className="material-symbols-outlined refresh" onClick={(e) => callRefreshUsers(e)}>refresh</span>
                </div>

                {/* Filter and map users into userDetail components */}
                {users && users.filter((userInfo) => {
                    return (userInfo.firstName.toUpperCase().includes(filter.toUpperCase()) ||
                    userInfo.lastName.toUpperCase().includes(filter.toUpperCase()) || 
                    userInfo.phoneNumbers[0].toString().includes(filter) || 
                    userInfo.emailAddresses[0].toUpperCase().includes(filter.toUpperCase()))
                }).map((userInfo) => (
                    <UserDetails key={userInfo._id} userInfo={userInfo} />
                ))}

            </div>

            {/* New User Information form */}
            <div className="user-form">
                <h2 className="add-user-title">Add a New User:</h2>
                <UserForm />
            </div>
        </div>
    )
}

export default UserHome