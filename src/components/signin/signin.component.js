import React, {useState} from "react";
import './signin.style.scss'
import {connect} from "react-redux";
import {loginUser} from "../../redux/user/user.actions";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Typography, Link, TextField, Button, Avatar} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = ({login}) => {
    const classes = useStyles();
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const {email, password} = userCredentials;

    const handleChange = event => {
        const {value, name} = event.target
        setCredentials({...userCredentials, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(userCredentials.email, userCredentials.password)
    }

    return (
        <div className='sign-in'>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Link component={RouterLink} to='/signup' variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </form>
                </div>
            </Container>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(loginUser(email, password))
})


export default connect(null, mapDispatchToProps)(SignIn)