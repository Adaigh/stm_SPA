import { useState } from "react"
import { useSelfSignup } from "../hooks/useSelfSignup"

const SelfSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {selfSignup, isLoading, error} = useSelfSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await selfSignup(email, password)
    }

    return (
        <form className='self-signup' onSubmit={handleSubmit}>
            <h3>Sign Up:</h3>

            <label>Email: </label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password: </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Submit</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default SelfSignup