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


const SelectRiderDialog = ({ riders, open, handleClose, handleListItemClick}) => {
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Assign this order</DialogTitle>
            <DialogContent>
                <List>
                    {riders && riders.map((rider) => (
                        <ListItem button onClick={() => handleListItemClick(rider)} key={rider.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <DirectionsBikeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${rider.name} ${rider.surname}`} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleClose} color="primary">
                    Ok
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectRiderDialog;
