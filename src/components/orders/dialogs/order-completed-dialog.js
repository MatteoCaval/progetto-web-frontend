import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";

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
