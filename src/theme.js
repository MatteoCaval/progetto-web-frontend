import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#921C2A'
        },
        secondary: {
            main: '#FFFFFF'
        }
    },
    status: {
        danger: 'orange',
    },
    typography: {
        fontFamily: 'Maven Pro' ,

        h1:{
            fontSize: '2.2rem',
            fontWeight: 800
        },
        h2:{
            fontSize: '1.6rem',
            fontWeight: 600
        },
        h3:{
            fontSize: '1.2rem',
            fontWeight: 600
        },
        h4:{
            fontSize: '1rem',
            fontWeight: 600
        },
        h5:{
            fontSize: '1rem',
            fontWeight: 500
        },
        h6:{
            fontSize: '1rem',
            fontWeight: 800
        },
        subtitle1:{
            
        },
        subtitle2:{
            
        },
        body1:{
            fontSize: '1rem',
        },
        body2:{
            
        },
        caption:{
            
        },
        overline:{
            
        },
        button:{
            color: 'secondary',
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;