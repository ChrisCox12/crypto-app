import { createTheme } from '@mui/material';


const theme = createTheme({
    palette: {
        primary: {
            main: '#001e19',
            light: '#28453f',
            dark: '#000000'
        },
        secondary: {
            main: '#ff8a80',
            light: '#ffbcaf',
            dark: '#c85a54'
        }
    },
    typography: {
        fontFamily: 'Roboto'
    }
});

export default theme;