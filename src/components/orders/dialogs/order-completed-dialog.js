import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'


const OrderCompletedDialog = ({ open, handleClose, goMyOrdersAction, goHomeAction }) => {
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Order Completed Successfully!</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem button onClick={() => goHomeAction()}>
                        <ListItemText primary={`Go to home`}/>
                    </ListItem>
                    <ListItem button onClick={() => goMyOrdersAction()}>
                        <ListItemText primary={`Go to my orders`}/>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default OrderCompletedDialog;
