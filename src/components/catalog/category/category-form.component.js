import React, { useState } from "react";
import { Container, Grid, TextField, makeStyles, Button } from "@material-ui/core";
import axios from 'axios'
import Config from "../../../config";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    form: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(2)
    },
    image: {
        width: '100%'
    }
}))

const CategoryForm = ({ match }) => {

    const classes = useStyles();

    const [categoryData, setCategoryData] = useState({
        name: '',
        imageUrl: ''
    })

    const handleChange = event => {
        const { value, name } = event.target
        setCategoryData({ ...categoryData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.post(`${Config.API_BASE_URL}/catalog/categories`, {
            name: categoryData.name,
            image: categoryData.imageUrl
        }).then(result => console.log('success'))
            .catch(error => console.log('error'))
    }

    return (
        <Container className={classes.root} maxWidth='xs'>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id='name'
                            name='name'
                            autoComplete='off'
                            variant='outlined'
                            required
                            fullWidth
                            value={categoryData.name}
                            onChange={handleChange}
                            label='Category Name'/>
                    </Grid>
                    <Grid item xs={12}>
                        <img
                            className={classes.image}
                            src={categoryData.imageUrl}
                            alt='image-preview'/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='image'
                            name='imageUrl'
                            variant='outlined'
                            autoComplete='off'
                            required
                            fullWidth
                            value={categoryData.imageUrl}
                            onChange={handleChange}
                            label='Category Image'/>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >Done
                    </Button>

                </Grid>
            </form>
        </Container>
    )

}

export default CategoryForm