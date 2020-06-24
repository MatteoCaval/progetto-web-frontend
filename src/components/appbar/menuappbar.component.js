import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Menu, MenuItem, IconButton, Typography, Toolbar, AppBar, Drawer, Fab } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(10)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        cursor: "pointer"
    },
    headerButtons: {
        marginLeft: "auto"
    },
    list: {
        width: 250,
    },
}));

const MenuAppBar = ({ currentUser, history, logout }) => {
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
        <div className={classes.root}>
            <AdminConstrained>
                <Drawer anchor='left' open={drawerOpen} onClose={hideDrawer}>
                    <List className={classes.list}>
                        <ListItem button
                                  component={RouterLink}
                                  to="/live-orders"
                                  onClick={hideDrawer}>
                            <ListItemIcon>{<ListAltIcon/>}</ListItemIcon>
                            <ListItemText primary='Live Orders'/>
                        </ListItem>
                        <ListItem button
                                  component={RouterLink}
                                  to="/orders"
                                  onClick={hideDrawer}>
                            <ListItemIcon>{<ListAltIcon/>}</ListItemIcon>
                            <ListItemText primary='Order History'/>
                        </ListItem>
                        <ListItem button
                                  component={RouterLink}
                                  to="/timetable"
                                  onClick={hideDrawer}>
                            <ListItemIcon>{<ScheduleIcon/>}</ListItemIcon>
                            <ListItemText primary='Timetable'/>
                        </ListItem>
                        <ListItem button
                                  component={RouterLink}
                                  to='/riders'
                                  onClick={hideDrawer}>
                            <ListItemIcon>{<DirectionsBikeIcon/>}</ListItemIcon>
                            <ListItemText primary='Riders'/>
                        </ListItem>
                    </List>
                </Drawer>
            </AdminConstrained>
            <AppBar position="fixed">
                <Toolbar>
                    <AdminConstrained>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={() => setDrawerOpen(true)}>
                            <MenuIcon/>
                        </IconButton>
                    </AdminConstrained>
                    <Typography variant="h2" className={classes.title}
                                onClick={handleLogoClick}>FoodDelivery</Typography>
                    <div className={classes.headerButtons}>
                        {currentUser && currentUser.role === 'consumer' && (
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
                                {
                                    currentUser.role === 'consumer' &&
                                    <MenuItem onClick={() => history.push('/orders')}>My Orders</MenuItem>
                                }
                                <MenuItem onClick={() => logout()}>Logout</MenuItem>
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
        currentUser: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar))