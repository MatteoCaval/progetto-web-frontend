import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, Grid, TextField } from "@material-ui/core";

const CreateRiderDialog = () => {

    const [riderData, setRiderData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        const { value, name } = event.target
        setRiderData({ ...riderData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(riderData)
    }

    return (
        <Dialog open={true}>
            <DialogTitle>Create rider</DialogTitle>
            <DialogContent>
                <form onSubmit={handleChange}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id='name'
                                name='name'
                                autoComplete='off'
                                variant='outlined'
                                required
                                fullWidth
                                value={riderData.name}
                                onChange={handleChange}
                                label='Name'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='surname'
                                name='surname'
                                variant='outlined'
                                autoComplete='off'
                                required
                                fullWidth
                                value={riderData.surname}
                                onChange={handleChange}
                                label='Surname'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={riderData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={riderData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">Create</Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateRiderDialog