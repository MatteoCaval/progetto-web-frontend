import React, { useState } from "react";
import './signin.style.scss'
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

const SignIn = ({ setCurrentUser }) => {
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
        setCurrentUser(userCredentials.email)
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

const mapDispatchToProps = dispatch => ({
    setCurrentUser: name => dispatch(setCurrentUser(name))
})

export default connect(null, mapDispatchToProps)(SignIn)