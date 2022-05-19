import { Box, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/Styles.module.css';
import { useState } from "react";


export default function Navbar() {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    function handleOpen(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    //console.log(location)
    return (
        <Box className='navbar' bgcolor='primary.main'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: { xs: '1rem', md: '0' } }}>
                <Typography component='h1' variant='h3' color='white' mb={{ md: '4rem' }}>Crypto Central</Typography>
                
                <IconButton onClick={handleOpen} sx={{ color: 'white', display: { md: 'none' } }}>
                    <MenuIcon />
                </IconButton>

                {/* Mobile Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    sx={{ 
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        display: { md: 'none' },
                        '.MuiList-root': { bgcolor: 'primary.main' },
                        'li': { padding: '0' }
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <div className={styles.navlink} data-selected={location.pathname === '/' || location.pathname === '/home'}>
                            <HomeRoundedIcon fontSize='large' />
                            <Link to='/'>Home</Link>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div className={styles.navlink} data-selected={location.pathname === '/cryptocurrencies'}>
                            <CurrencyBitcoinIcon fontSize='large' />
                            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div className={styles.navlink} data-selected={location.pathname === '/exchanges'}>
                            <CurrencyExchangeIcon fontSize='large' />
                            <Link to='/exchanges'>Exchanges</Link>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div className={styles.navlink} data-selected={location.pathname === '/news'}>
                            <NewspaperRoundedIcon fontSize='large' />
                            <Link to='/news'>News</Link>
                        </div>
                    </MenuItem>
                </Menu>
            </Box>

            <Stack spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <div className={styles.navlink} data-selected={location.pathname === '/' || location.pathname === '/home'}>
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