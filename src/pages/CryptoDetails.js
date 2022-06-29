import { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Grid, Typography, Select, MenuItem, FormControl, Box } from '@mui/material';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TagIcon from '@mui/icons-material/Tag';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import LineChart from '../components/LineChart';
import { useGetCoinDetailsQuery, useGetHistoryQuery } from '../redux/cryptoApi';
import styles from '../styles/Styles.module.css';


export default function CryptoDetailsPage() {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCoinDetailsQuery(coinId);
    const { data: history } = useGetHistoryQuery({ coinId: coinId, timePeriod: timePeriod });
    const coinDetails = data?.data?.coin;
    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']; // list of time periods for checking coin price history

    const stats = [
        { 
            title: 'Price to USD', 
            value: `$${coinDetails?.price && millify(coinDetails.price, { precision: 2 })}`, 
            icon: <MonetizationOnOutlinedIcon sx={{ color: 'green' }} />
        },
        { 
            title: 'Rank', 
            value: coinDetails?.rank, 
            icon: <TagIcon />
        },
        { 
            title: '24hr Volume', 
            value: `$${(coinDetails && coinDetails['24hVolume']) && millify(coinDetails['24hVolume'])}`, 
            icon: <FlashOnIcon sx={{ color: 'rgb(240, 204, 0)' }} />
        },
        { 
            title: 'Market Cap', 
            value: `$${coinDetails?.marketCap && millify(coinDetails.marketCap)}`, 
            icon: <MonetizationOnOutlinedIcon sx={{ color: 'green' }} />
        },
        { 
            title: 'All-time-high (daily avg.)', 
            value: `$${coinDetails?.allTimeHigh && millify(coinDetails.allTimeHigh.price, { precision: 2 })}`, 
            icon: <EmojiEventsOutlinedIcon sx={{ color: 'rgb(240, 204, 0)' }} />
        }
    ];

    const genericStats = [
        { 
            title: 'Number of Markets', 
            value: coinDetails?.numberOfMarkets, 
            icon: <GraphicEqIcon sx={{ color: 'teal' }} />
        },
        { 
            title: 'Number of Exchanges', 
            value: coinDetails?.numberOfExchanges, 
            icon: <CurrencyExchangeIcon sx={{ color: 'teal' }} />
        },
        { 
            title: 'Approved Supply', 
            value: coinDetails?.supply?.confirmed ? <CheckIcon /> : <CloseIcon />, 
            icon: <ErrorOutlineOutlinedIcon sx={{ color: 'maroon' }} />
        },
        { 
            title: 'Total Supply', 
            value: `$${coinDetails?.supply?.total && millify(coinDetails.supply.total)}`, 
            icon: <ErrorOutlineOutlinedIcon sx={{ color: 'maroon' }} />
        },
        { 
            title: 'Circulating Supply', 
            value: `$${coinDetails?.supply?.circulating && millify(coinDetails.supply.circulating)}`, 
            icon: <ErrorOutlineOutlinedIcon sx={{ color: 'maroon' }} />
        }
    ];


    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <Grid className='coin-details-container' container padding='2.5rem'>
            <Grid className='coin-details-heading' item xs={12} mb='2rem' textAlign='center'>
                <Typography fontWeight={700} fontSize='3rem' color='primary.light'>{coinDetails.name} ({coinDetails.symbol}) Price</Typography>
                <Typography>{coinDetails.name} live price in US dollars ($). View value statistics, market caps and supply.</Typography>
            </Grid>
            
            <Grid className='coin-details-select' item xs={12} mb='2.5rem'>
                <FormControl sx={{ width: '15rem' }}>
                    <Select
                        defaultValue='7d'
                        onChange={(e) => setTimePeriod(e.target.value)}
                    >
                        {time.map(period => <MenuItem value={period} key={period}>{period}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <LineChart 
                    coinHistory={history} 
                    currentPrice={millify(coinDetails.price, { precision: 2 })} 
                    coinName={coinDetails.name} 
                />
            </Grid>

            <Grid className='stats-container' container item spacing={6} mb='4rem' mt='0.25rem'>
                <Grid className='coin-value-stats' item xs={12} md={6}>
                    <Box mb='2rem'>
                        <Typography fontSize='1.5rem' fontWeight={500}>{coinDetails.name} Value Statistics</Typography>
                        <Typography>An overview showing the stats of {coinDetails.name}</Typography>
                    </Box>
                    
                    {stats.map((stat, index) => (
                        <Box className={styles.statBlock} key={`${stat.title}-${index}`}>
                            <Box className={styles['coin-stats-name']}>
                                <Typography>{stat.icon}</Typography>
                                <Typography>{stat.title}</Typography>
                            </Box>
                            <Typography className={styles['stats']}>{stat.value}</Typography>
                        </Box>
                    ))}
                </Grid>

                <Grid className='other-stats-info' item xs={12} md={6}>
                    <Box mb='2rem'>
                        <Typography fontSize='1.5rem' fontWeight={500}>Other Statistics</Typography>
                        <Typography>An overview showing the stats of all cryptocurrencies</Typography>
                    </Box>

                    {genericStats.map((stat, index) => (
                        <Box className={styles.statBlock} key={`${stat.title}-generic-${index}`}>
                            <Box className={styles['other-stats-name']}>
                                <Typography>{stat.icon}</Typography>
                                <Typography>{stat.title}</Typography>
                            </Box>
                            <Typography className={styles['stats']}>{stat.value}</Typography>
                        </Box>
                    ))}
                </Grid>
            </Grid>

            <Grid className='coin-description-links' container spacing={6}>
                <Grid className={styles['coin-description']} item xs={12} md={6}>
                    <Typography component='h3' variant='h4' fontWeight={700} color='primary.light'>What is {coinDetails.name}</Typography>
                    
                    {HTMLReactParser(coinDetails.description)}
                </Grid>

                <Grid className='coin-links' item xs={12} md={6}>
                    <Typography fontWeight={700} fontSize='2rem'>{coinDetails.name} Links</Typography>
                    
                    {coinDetails?.links?.map((link, index) => (
                        <Box className={styles.linksBlock} key={`${link.name}-${index}`}>
                            <Typography>{link.name}</Typography>
                            <a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}