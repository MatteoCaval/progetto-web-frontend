import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Menu, MenuItem ,IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(10)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: "pointer"
    },
}));

const MenuAppBar = ({ currentUser, history }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleProfileMenu = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(currentUser)
        if (!currentUser) {
            history.push('/signin')
        }
    };

    const handleCartMenu = (e) => {
        history.push('/cart')
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoClick = () => {
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} onClick={handleLogoClick}>FoodDelivery</Typography>
                    <div>
                        {currentUser && (
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleCartMenu}
                                color="inherit">
                                <ShoppingCart/>
                            </IconButton>
                        )}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleProfileMenu}
                            color="inherit">
                            <AccountCircle/>
                        </IconButton>
                        {currentUser && (
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}>
                                <MenuItem onClick={handleClose}>My Orders</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        )}
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(MenuAppBar))