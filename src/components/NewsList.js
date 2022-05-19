import { Typography, Grid, Card, CardContent, FormControl, Avatar, Select, MenuItem, InputLabel } from "@mui/material";
import moment from "moment";
import { useState } from "react";

import { useGetNewsQuery } from "../services/cryptoNewsApi";
import { useGetCoinsQuery } from "../services/cryptoApi";
import styles from '../styles/Styles.module.css';


// simple acts as a way of checking whether we are on the Home page or the News page
export default function NewsList({ simple }) {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetNewsQuery({ newsCategory: newsCategory, count: simple ? 6 : 12 });
    const { data: cryptoCoins } = useGetCoinsQuery(100);
    
    //console.log(cryptoNews);

    if(!cryptoNews?.value) return <Typography>Loading...</Typography>;

    return (
        <Grid className='news-cards-container' container spacing={2}>
            {/* Only want to show the coin selector when on the news page */}
            {!simple && (
                <Grid item xs={12}>
                    <FormControl sx={{ width: '15rem' }}>
                        <InputLabel id='coin-select'>Select a Crypto coin</InputLabel>
                        <Select
                            labelId='coin-select'
                            id='select'
                            label='Select a Crypto coin'
                            defaultValue='Cryptocurrency'
                            onChange={(e) => setNewsCategory(e.target.value)}
                        >
                            <MenuItem value='Cryptocurrency'>Cryptocurrency</MenuItem>
                            
                            {cryptoCoins?.data?.coins.map(coin => (
                                <MenuItem value={coin.name} key={coin.name}>{coin.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            )}

            {cryptoNews?.value?.map((news, index) => (
                <Grid className='news-card' item xs={12} sm={6} lg={4} key={index}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent className={styles['news-card-content']}>
                            <a className={styles.newslink} href={news.url} target='_blank' rel='noreferrer'>
                                <Typography>{news.name}</Typography>
                                <img src={news?.image?.thumbnail?.contentUrl} alt='' />
                            </a>
                            
                            {/* Only show the first 100 characters */}
                            <Typography>
                                {news.description.length > 100 ?
                                    `${news.description.substring(0, 100)}...`
                                    :
                                    news.description
                                }
                            </Typography>
                            
                            <div className={styles.providerContainer}>
                                <div className={styles.providerInfo}>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt='provider avatar' />
                                    <Typography>{news.provider[0]?.name}</Typography>
                                </div>

                                {/* display time from now, starting with seconds from now */}
                                <Typography>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}