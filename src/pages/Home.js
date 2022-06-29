import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCoinsQuery } from '../redux/cryptoApi';
import CryptoList from '../components/CryptoList';
import NewsList from '../components/NewsList';
import styles from '../styles/Styles.module.css';


export default function HomePage() {
    const { data, isFetching } = useGetCoinsQuery(10);
    const globalStats = data?.data?.stats;


    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <Box padding='1.5rem'>
            <Typography component='h1' variant='h4' mb='1.5rem'>Global Crypto Stats</Typography>
            <Grid className='stats-container' container spacing={2}>
                <Grid item xs={6}>
                    <Typography>Total Cryptocurrencies</Typography>
                    <Typography className={styles.cryptoStat}>{(globalStats?.total).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total Exchanges</Typography>
                    <Typography className={styles.cryptoStat}>{millify(globalStats?.totalExchanges)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total Market Cap</Typography>
                    <Typography className={styles.cryptoStat}>{millify(globalStats?.totalMarketCap)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total 24hr Volume</Typography>
                    <Typography className={styles.cryptoStat}>{millify(globalStats?.total24hVolume)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total Markets</Typography>
                    <Typography className={styles.cryptoStat}>{millify(globalStats?.totalMarkets)}</Typography>
                </Grid>
            </Grid>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', marginBottom: '1rem', gap: '1.5rem' }}>
                <Typography component='h2' variant='h5' fontWeight={600}>Top 10 Cryptocurrencies in the world</Typography>
                <Link to='/cryptocurrencies' style={{ fontWeight: 600, fontSize: '1.125rem', textDecoration: 'none', color: '#001e19' }}>Show More</Link>
            </div>

            <CryptoList simple />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', marginBottom: '1rem' }}>
                <Typography component='h2' variant='h5' fontWeight={600}>Latest Crypto News</Typography>
                <Link to='/news' style={{ fontWeight: 600, fontSize: '1.125rem', textDecoration: 'none', color: '#001e19' }}>Show More</Link>
            </div>

            <NewsList simple />
        </Box>
    )
}