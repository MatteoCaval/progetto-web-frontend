import React, { useState } from "react";
import './signin.style.scss'
import { connect } from "react-redux";
import { loginUser } from "../../redux/user/user.actions";

const SignIn = ({ login }) => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const { email, password } = userCredentials;

    const handleChange = event => {
        const { value, name } = event.target
        setCredentials({ ...userCredentials, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userCredentials)
        login(userCredentials.email, userCredentials.password)
    }

    return (
        <div className='sign-in'>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <input name='email' type='email' value={email} onChange={handleChange} required/>
                <input name='password' type='password' value={password} onChange={handleChange} required/>
                <button type='submit' > Sign in</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(loginUser(email, password))
})


export default connect(null, mapDispatchToProps)(SignIn)