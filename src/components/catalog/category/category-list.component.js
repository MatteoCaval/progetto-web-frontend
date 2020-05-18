import React, { useEffect } from "react";
import { fetchCategories } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import Category from "./category-item.component";
import { Grid, Fab, makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    fabAdd: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

const CategoryList = ({ categories, fetchCategories }) => {

    const classes = useStyles()

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {
                    categories.map(category => {
                        return (
                            <Grid key={category.id} item xs={6} sm={4}>
                                <Category key={category.id} category={category}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Fab className={classes.fabAdd}
                 color="primary"
                 aria-label="add"
                 component={RouterLink}
                 to="/createcategory">
                <AddIcon/>
            </Fab>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.catalog.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)