import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function HomePage() {
    return (
        <Box padding='1.5rem'>
            <Typography component='h1' variant='h4' mb='1.5rem'>Global Crypto Stats</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography>Total Cryptocurrencies</Typography>
                    5
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total Exchanges</Typography>
                    5
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total Market Cap</Typography>
                    5
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total 24hr Volume</Typography>
                    5
                </Grid>
                <Grid item xs={6}>
                    <Typography>Total Markets</Typography>
                    5
                </Grid>
            </Grid>
        </Box>
    )
}