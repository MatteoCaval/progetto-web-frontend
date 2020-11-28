import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@material-ui/core";

const DeliverOrderDialog = ({ open, handleDiscard, handleConfirm}) => {
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleDiscard}>
            <DialogTitle>Order delivery</DialogTitle>
            <DialogContent>
                <Typography>
                    Do you confirm the delivery of this order?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDiscard} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeliverOrderDialog;
