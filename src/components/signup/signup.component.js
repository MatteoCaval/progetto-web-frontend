import React, { useState } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Container, Grid, Link, TextField, Button, Avatar, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { registerUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = ({ registerUser }) => {
    const classes = useStyles();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        role: 'consumer'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        registerUser(userData)
    }

    const handleChange = event => {
        const { value, name } = event.target
        setUserData({ ...userData, [name]: value })
    }

    const { name, surname, email, password } = userData

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h2" className="page-title">Sign up</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                value={name}
                                label="First Name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="surname"
                                value={surname}
                                label="Surname"
                                name="surname"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to='/signin' variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (userData) => dispatch(registerUser(userData))
    }
}

export default connect(null, mapDispatchToProps)(SignUp)