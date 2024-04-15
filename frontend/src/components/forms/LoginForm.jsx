import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import './styles/LoginForm.css'

import {
    EmailAddress,
    Password,
} from './labeledInputs'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log In:</h3>

            <EmailAddress
                val={email}
                req={true}
                changeFn={(e) => setEmail(e.target.value)}
                />
            <Password
                val={password}
                req={true}
                changeFn={(e) => setPassword(e.target.value)}
                />

            <button disabled={isLoading}>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default LoginForm