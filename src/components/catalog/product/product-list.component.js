import React, { useEffect } from "react";
import { fetchProductsForCategory } from "../../../redux/catalog/catalog.actions";
import ProductItem from "./product-item.component";
import { connect } from "react-redux";
import { Fab, Grid, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { AdminConstrained } from "../../common/constrained-containers.component";


const useStyles = makeStyles((theme) => ({
    fabAdd: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

const ProductList = ({ fetchCategoryProducs, match, products }) => {

    const categoryId = match.params.categoryId

    console.log(products)

    useEffect(() => {
        fetchCategoryProducs(categoryId)
    }, [fetchCategoryProducs])

    const classes = useStyles()
    return (
        <div>
            <React.Fragment>
                <Grid container spacing={2}>
                    {
                        products.map(product => {
                            return (
                                <Grid key={product.id} item xs={6} sm={4}>
                                    <ProductItem key={product.id} product={product}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <AdminConstrained>
                    <Fab className={classes.fabAdd}
                         color="primary"
                         aria-label="add"
                         component={RouterLink}
                         to={`${categoryId}/createproduct`}>
                        <AddIcon/>
                    </Fab>
                </AdminConstrained>
            </React.Fragment>
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    const categoryId = ownProps.match.params.categoryId
    return {
        products: state.catalog.products.filter(product => product.categoryId === categoryId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryProducs: (categoryId) => dispatch(fetchProductsForCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)