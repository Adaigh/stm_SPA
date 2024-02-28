import { useEffect, useState } from "react"
import UserDetails from '../components/UserDetails'

const UserHome = () => {

    const [users, setUsers] = useState(null)

    useEffect(() =>{
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            const json = await response.json()
            if(response.ok) {
                setUsers(json)
            }else{
                console.error("ERROR")
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="home">
            <h2>Users</h2>
             {users && users.map((user) => (
                <UserDetails key={user._id} user={user} />
             ))}
        </div>
    )
}

export default UserHome