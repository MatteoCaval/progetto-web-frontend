import React, { useEffect } from "react";
import { fetchCategories } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import { GridList, GridListTile } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { AdminConstrained } from "../../common/constrained-containers.component";
import FabFixed from "../../custom/fab-fixed.component"
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import './category-list.style.scss'


const CategoryList = ({ categories, fetchCategories, history, match }) => {

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const theme = useTheme();

    const screenExtraLarge = useMediaQuery(theme.breakpoints.only('xl'));
    const screenLarge = useMediaQuery(theme.breakpoints.only('lg'));
    const screenMedium = useMediaQuery(theme.breakpoints.only('md'));
    const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));
    const screenExtraSmall = useMediaQuery(theme.breakpoints.only('xs'));
    const screenNarrow = useMediaQuery('(max-width:340px)');

    const getScreenWidth = () => {
        if (screenExtraLarge) {
            return 3;
        } else if (screenNarrow) {
            return 1;
        } else if (screenLarge) {
            return 3;
        } else if (screenMedium) {
            return 3;
        } else if (screenSmall) {
            return 2;
        } else if (screenExtraSmall) {
            return 2;
        } else {
            return 3;
        }
    }

    return (
        <React.Fragment>
            <div className="">
                <GridList spacing={2} cols={getScreenWidth()}>
                    {
                        categories.map((category) => (
                            <GridListTile key={category.name} className="gridTileStyle"
                                onClick={() => history.push(`${match.url}${category.id}`)}>
                                <img className="image-media" src={category.image} alt={category.name} />
                                <GridListTileBar
                                    title={category.name}
                                />
                            </GridListTile>))
                    }
                </GridList>
            </div>
            <AdminConstrained>
                <FabFixed icon={<AddIcon />} to={"/createcategory"} />
            </AdminConstrained>
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