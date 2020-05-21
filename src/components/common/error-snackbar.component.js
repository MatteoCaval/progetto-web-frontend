import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ErrorSnackbar = ({ errorMessage }) => {
    const [open, setOpen] = React.useState(true);
    return (
        errorMessage ?
            <Snackbar
                open={open}
                autoHideDuration={2000}
                message={errorMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }/> : null
    )
}

export default ErrorSnackbar