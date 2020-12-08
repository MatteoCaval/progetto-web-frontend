import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from "@material-ui/core";

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'


const SelectRiderDialog = ({ riders, open, handleClose, handleListItemClick}) => {
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Assign this order</DialogTitle>
            <DialogContent>
                <List>
                    {riders && riders.map((rider) => (
                        <ListItem button onClick={() => handleListItemClick(rider)} key={rider.id}>
                            <ListItemIcon>
                            <DirectionsBikeIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary={`${rider.name} ${rider.surname}`} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectRiderDialog;
