import React, { useEffect } from "react";
import { fetchCategories } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import Category from "./category-item.component";
import { Grid } from "@material-ui/core";


const CategoryList = ({ categories, fetchCategories }) => {

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    return (
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