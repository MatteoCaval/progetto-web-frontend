import React, { useEffect } from "react";
import { fetchProductsForCategory } from "../../../redux/catalog/catalog.actions";
import ProductItem from "./product-item.component";
import { connect } from "react-redux";
import { Fab, Grid, makeStyles } from "@material-ui/core";
import ProductPage from "./product-page.component";
import { Link as RouterLink, Route, Switch } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles((theme) => ({
    fabAdd: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

const ProductList = ({ fetchCategoryProducs, match, products }) => {

    const categoryId = match.params.categoryId

    useEffect(() => {
        fetchCategoryProducs(categoryId)
    }, [fetchCategoryProducs])

    const classes = useStyles()
    return (
        <div>
            <Switch>
                <Route path={`${match.url}/:productId`} component={ProductPage}/>
                <Route path={match.url}>
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
                        <Fab className={classes.fabAdd}
                             color="primary"
                             aria-label="add"
                             component={RouterLink}
                             to={`${categoryId}/createproduct`}>
                            <AddIcon/>
                        </Fab>
                    </React.Fragment>
                </Route>
            </Switch>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        products: state.catalog.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryProducs: (categoryId) => dispatch(fetchProductsForCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)