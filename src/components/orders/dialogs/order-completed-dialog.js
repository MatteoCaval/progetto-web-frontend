import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const OrderCompletedDialog = ({ open, handleClose, goMyOrdersAction, goHomeAction }) => {
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Order successfully completed!</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem button className="btn" onClick={() => goHomeAction()}>
                        <ListItemIcon>
                            <HomeIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={`Go to home`}/>
                    </ListItem>
                    <ListItem button onClick={() => goMyOrdersAction()}>
                        <ListItemIcon>
                            <ShoppingBasketIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={`Go to my orders`}/>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default OrderCompletedDialog;
