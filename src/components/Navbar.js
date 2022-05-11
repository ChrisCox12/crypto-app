import { Box, Button, Menu, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import styles from '../styles/Styles.module.css';


export default function Navbar() {
    const location = useLocation();

    //console.log(location)
    return (
        <Box className='navbar' bgcolor='primary.main'>
            <Box>
                <Typography component='h1' variant='h3' color='white' mb='4rem'>Crypto Central</Typography>
            </Box>
            <Stack spacing={1}>
                <div className={styles.navlink} data-selected={location.pathname === '/'}>
                    <HomeRoundedIcon fontSize='large' />
                    <Link to='/'>Home</Link>
                </div>
                <div className={styles.navlink} data-selected={location.pathname === '/cryptocurrencies'}>
                    <CurrencyBitcoinIcon fontSize='large' />
                    <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                </div>
                <div className={styles.navlink} data-selected={location.pathname === '/exchanges'}>
                    <CurrencyExchangeIcon fontSize='large' />
                    <Link to='/exchanges'>Exchanges</Link>
                </div>
                <div className={styles.navlink} data-selected={location.pathname === '/news'}>
                    <NewspaperRoundedIcon fontSize='large' />
                    <Link to='/news'>News</Link>
                </div>
            </Stack>
        </Box>
    )
}