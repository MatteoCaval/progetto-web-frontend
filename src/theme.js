import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import indigo from '@material-ui/core/colors/indigo'

let theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: green,
        // type: 'dark',
    },
    status: {
        danger: 'orange',
    },
    typography: {
        fontFamily: 'Roboto' ,

        h1:{
            fontSize: '2rem',
            fontWeight: "bold"
        },
        h2:{
            fontSize: '1.6rem',
            fontWeight: 500
        },
        h3:{
            fontSize: '1.4rem',
            fontWeight: 500
        },
        h4:{
            fontSize: '1.2rem',
            fontWeight: 400
        },
        h5:{
            fontSize: '1rem',
            fontWeight: 500
        },
        h6:{
            fontSize: '1rem',
            fontWeight: 500
        },
        subtitle1:{
            
        },
        subtitle2:{
            
        },
        body1:{
            
        },
        body2:{
            
        },
        button:{
            
        },
        caption:{
            
        },
        overline:{
            
        },
    }
});

theme = responsiveFontSizes(theme);

export default theme;