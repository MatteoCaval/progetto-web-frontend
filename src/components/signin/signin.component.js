import React, { useState } from "react";
import './signin.style.scss'

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const { email, password } = userCredentials;

    const handleChange = event => {
        const { value, name } = event.target
        setCredentials({ ...userCredentials, [name]: value })
    }

    const handleButtonClick = () => {
        console.log(userCredentials)
    }

    return (
        <div className='sign-in'>
            <span>Sign in with your email and password</span>
            <form>
                <input name='email' type='email' value={email} onChange={handleChange} required/>
                <input name='password' type='password' value={password} onChange={handleChange} required/>
                <button type='submit' onClick={handleButtonClick}> Sign in</button>
            </form>
        </div>
    )
}

export default SignIn