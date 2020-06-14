import React, { useState } from "react";
import { Button, Container, Grid, makeStyles, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { createCategory, resetCatalogOperationsState } from "../../../redux/catalog/catalog-operations.actions";
import { withRouter } from "react-router-dom";
import Progress from "../../common/progress.component";

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

const CategoryForm = ({ history, loading, error, completed, createCategory, resetCatalogOperationsState }) => {

    const classes = useStyles();

    if (completed) {
        history.push(`/`)
        resetCatalogOperationsState()
    }

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
        createCategory({
            name: categoryData.name,
            image: categoryData.imageUrl
        })
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
            <Progress loading={loading}/>
        </Container>
    )

}

const mapStateToProps = state => {
    const { loading, error, completed } = state.catalogOperations
    return {
        loading,
        error,
        completed
    }
}

export default withRouter(connect(
    mapStateToProps,
    { createCategory, resetCatalogOperationsState }
)(CategoryForm))