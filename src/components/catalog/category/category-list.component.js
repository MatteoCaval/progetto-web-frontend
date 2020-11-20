import React, { useEffect } from "react";
import { fetchCategories } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import { Grid, GridList, GridListTile, Typography, CardMedia } from "@material-ui/core";
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
            <main>
                <Grid container>
                    <Grid item xs={12} sm={6}> 
                        <Typography variant="h2" className="page-title">Il chioschetto ti da il ben venuto!</Typography>
                        <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem mi, suscipit et scelerisque vitae, aliquet et augue. 
                        Praesent maximus suscipit mauris, nec mollis arcu egestas ac. Aenean et ornare libero. Suspendisse potenti. Proin non tincidunt ipsum. 
                        Vivamus sit amet purus vel lectus sagittis cursus at eget tellus. In eget justo sed elit venenatis mollis. 
                        Curabitur ac erat vel ipsum interdum lobortis. Morbi dapibus, nulla vitae efficitur consectetur, turpis quam rutrum enim, vitae pretium arcu magna et nisi. 
                        Proin elementum et ex sit amet varius. Sed in sollicitudin dolor. Proin ullamcorper volutpat orci nec malesuada. 
                        Vestibulum magna nisi, mattis vitae efficitur id, pulvinar quis tortor. Sed ultrices lacus quis nisl cursus pellentesque eu id risus.
                        </Typography>                    
                    </Grid>
                    <Grid item  xs={12} sm={6} className="image-container">
                        <img class='home-image' src="https://www.ilchioschettobarpizzeria.it/wp-content/uploads/2019/10/logo-bianco.jpg"/>
                    </Grid>
                </Grid>

                <div class="categories-container">                        
                <Typography variant="h2" className="page-title">Dai una occhiata alle nostre pietanze!</Typography>
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
      
            </main>
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