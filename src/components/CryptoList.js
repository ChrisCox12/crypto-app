import { Grid, Typography, Card, CardContent, CardHeader, Avatar, TextField, InputAdornment } from "@mui/material";
import millify from "millify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCoinsQuery } from "../services/cryptoApi";
import styles from '../styles/Styles.module.css';
import SearchIcon from '@mui/icons-material/Search';


// simple acts as a way of checking whether we are on the Home page or the Cryptocurrencies page
export default function CryptoList({ simple }) {
    const count = simple ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCoinsQuery(count);
    const [coins, setCoins] = useState(cryptoList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    
    useEffect(() => {
        //  filter data by checking the sanitized (in this case, lowercase) input and name
        const filteredData = (cryptoList?.data?.coins)?.filter(coin => (coin.name).toLowerCase().includes( searchTerm.toLowerCase() ));

        setCoins(filteredData);
    }, [searchTerm, cryptoList]);


    if(isFetching) return <Typography>Loading...</Typography>;

    //console.log(count)

    return ( 
        <>
            {/* Only want to show the search bar when on the cryptocurrencies page */}
            {!simple && (
                <div className={styles.searchBar}>
                    <TextField
                        fullWidth
                        label='Search Crypto'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <Grid className='crypto-cards-container' container spacing={2}>
                {coins?.map(coin => (
                    <Grid className={`crypto-card ${styles.cryptolink}`} item xs={12} sm={6} lg={3} key={coin.uuid}>
                        <Link to={`/crypto/${coin.uuid}`}>
                            <Card>
                                <CardHeader 
                                    title={`${coin.rank}. ${coin.name}`} 
                                    avatar={<Avatar src={`${coin.iconUrl}`} />} 
                                    sx={{ 
                                        flexDirection: 'row-reverse', 
                                        '.MuiTypography-root': { 
                                            fontSize: '1.1rem', 
                                            fontWeight: 500 
                                        } 
                                    }}
                                />
                                <CardContent>
                                    <Typography>Price: ${millify(coin.price)}</Typography>
                                    <Typography>Market Cap: {millify(coin.marketCap)}</Typography>
                                    <Typography>Daily Change: {millify(coin.change)}%</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}