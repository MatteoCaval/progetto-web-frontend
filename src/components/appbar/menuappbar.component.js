import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Menu, MenuItem, IconButton, Toolbar, AppBar, Drawer, Badge } from '@material-ui/core';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../redux/user/user.actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { Link as RouterLink } from 'react-router-dom'
import { AdminConstrained } from "../common/constrained-containers.component";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(10)
    },
    menuButton: {
        marginLeft: theme.spacing(2),
        position: "absolute",
        left: 0
    },
    title: {
        cursor: "pointer",
        margin: 'auto',
        height: '2em'
    },
    headerButtons: {
       position: "absolute",
       right: 0
    },
    list: {
        width: 250,
    },
}));

const MenuAppBar = ({ currentUser, products, history, logout }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleProfileMenu = (event) => {
        setAnchorEl(event.currentTarget)
        if (!currentUser) {
            history.push('/signin')
        }
    };

    //const sum = cart.products.count()
    var badgeNum = 0
    if (products) {
        products.forEach(element => {
            badgeNum+=element.quantity
        });
    }

    const handleCartMenu = (e) => {
        history.push('/cart')
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoClick = () => {
        history.push('/')
    }

    const hideDrawer = () => setDrawerOpen(false)

    return (
        <div className="toolbar">
            <AdminConstrained>
                <Drawer anchor='left' open={drawerOpen} onClose={hideDrawer}>
                    <List className={classes.list}>
                        <ListItem button
                            component={RouterLink}
                            to="/live-orders"
                            onClick={hideDrawer}>
                            <ListItemIcon>{<ListAltIcon color="primary"/>}</ListItemIcon>
                            <ListItemText primary='Live Orders' />
                        </ListItem>
                        <ListItem button
                            component={RouterLink}
                            to="/orders"
                            onClick={hideDrawer}>
                            <ListItemIcon>{<ListAltIcon color="primary"/>}</ListItemIcon>
                            <ListItemText primary='Order History' />
                        </ListItem>
                        <ListItem button
                            component={RouterLink}
                            to="/timetable"
                            onClick={hideDrawer}>
                            <ListItemIcon>{<ScheduleIcon color="primary"/>}</ListItemIcon>
                            <ListItemText primary='Timetable' />
                        </ListItem>
                        <ListItem button
                            component={RouterLink}
                            to='/riders'
                            onClick={hideDrawer}>
                            <ListItemIcon>{<DirectionsBikeIcon color="primary"/>}</ListItemIcon>
                            <ListItemText primary='Riders' />
                        </ListItem>
                    </List>
                </Drawer>
            </AdminConstrained>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <AdminConstrained>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </AdminConstrained>
                    <img src={process.env.PUBLIC_URL + '/logo_title.png'} alt="logo" className={classes.title} onClick={handleLogoClick}/>
                    <div className={classes.headerButtons}>
                        {currentUser && currentUser.role === 'consumer' && (
                            <Badge badgeContent={badgeNum} color="secondary">
                                    <ShoppingCart 
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        cursor='pointer'
                                        onClick={handleCartMenu}
                                        color="inherit"
                                    />
                            </Badge>
                        )}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleProfileMenu}
                            color="inherit">
                            <AccountCircle />
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
                                {
                                    currentUser.role === 'consumer' &&
                                    <MenuItem onClick={() => history.push('/orders')}>
                                    <ListItemIcon>
                                        <ShoppingBasketIcon color="primary"/>
                                    </ListItemIcon>
                                    My orders
                                    </MenuItem>
                                }
                                <MenuItem onClick={() => logout()}>
                                    <ListItemIcon>
                                        <ExitToAppIcon color="primary"/>
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
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
        currentUser: state.user ? state.user.data : null,
        products: state.cart ? state.cart.products : null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar))