import React, { useEffect } from "react";
import { fetchCategories } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import { Grid, GridList, GridListTile, Typography, CardMedia } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { AdminConstrained } from "../../common/constrained-containers.component";
import FabFixed from "../../custom/fab-fixed.component"
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
                <Grid container className="welcome">
                    <Grid item sm={12} md={6}> 
                        <Typography variant="h2" className="page-title">Welcome into UniBurger!</Typography>
                        <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem mi, suscipit et scelerisque vitae, aliquet et augue. 
                        Praesent maximus suscipit mauris, nec mollis arcu egestas ac. Aenean et ornare libero. Suspendisse potenti. Proin non tincidunt ipsum. 
                        Vivamus sit amet purus vel lectus sagittis cursus at eget tellus. In eget justo sed elit venenatis mollis. 
                        Curabitur ac erat vel ipsum interdum lobortis. Morbi dapibus, nulla vitae efficitur consectetur, turpis quam rutrum enim, vitae pretium arcu magna et nisi. 
                        Proin elementum et ex sit amet varius. Sed in sollicitudin dolor. Proin ullamcorper volutpat orci nec malesuada. 
                        Vestibulum magna nisi, mattis vitae efficitur id, pulvinar quis tortor. Sed ultrices lacus quis nisl cursus pellentesque eu id risus.
                        </Typography>                    
                    </Grid>
                    <Grid item  sm={12} md={6} className="image-container">
                        <img  className='home-image' src={process.env.PUBLIC_URL + '/homer.png'} alt="Homer eating hamburger"/>
                    </Grid>
                </Grid>

                <div className="categories-container">
                <Typography variant="h2" className="page-title">Take a look at our fantastic dishes!</Typography>
                <GridList spacing={25} cols={getScreenWidth()}>
                {
                    categories.map((category) => (
                        <GridListTile key={category.name} className="tile"
                            onClick={() => history.push(`${match.url}${category.id}`)}>                      
                            <div className="image-container">
                                <CardMedia
                                    className='image'
                                    image={category.image}/>
                                    <span className="overlay"/>
                                    <div className="text-container">
                                        <Typography variant="h2" className="text">{category.name}</Typography>
                                    </div>
                            </div>
                
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