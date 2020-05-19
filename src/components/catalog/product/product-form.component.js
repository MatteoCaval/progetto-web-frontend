import React, { useState } from "react";
import { Button, Container, Grid, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
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

const ProductForm = ({ match, editMode }) => {

    const { productId, categoryId } = match.params

    const classes = useStyles();

    const [productData, setProuctData] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
        ingredients: ['qualcosa', 'qualcosa2']
    })

    const handleChange = event => {
        const { value, name } = event.target
        setProuctData({ ...productData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.post(`${Config.API_BASE_URL}/catalog/products`, {
            ...productData,
            category_id: categoryId
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
                            type='string'
                            fullWidth
                            value={productData.name}
                            onChange={handleChange}
                            label='Name'/>
                    </Grid>
                    <Grid item xs={12}>
                        <img
                            className={classes.image}
                            src={productData.image}
                            alt='image-preview'/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='image'
                            name='image'
                            variant='outlined'
                            autoComplete='off'
                            required
                            type='url'
                            fullWidth
                            value={productData.image}
                            onChange={handleChange}
                            label='Image url'/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='description'
                            name='description'
                            variant='outlined'
                            autoComplete='off'
                            required
                            fullWidth
                            multiline
                            rows='3'
                            value={productData.description}
                            onChange={handleChange}
                            label='Description'/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='price'
                            name='price'
                            variant='outlined'
                            autoComplete='off'
                            required
                            type='number'
                            fullWidth
                            value={productData.price}
                            onChange={handleChange}
                            label='Price'/>
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

export default ProductForm