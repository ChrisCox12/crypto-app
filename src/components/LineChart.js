import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'; //   Chart.js 3 is tree-shakeable, so it necessary to import and register the controllers, 
                                   //   elements, scales, and plugins you're going to use
import { Typography, Box } from "@mui/material";


export default function LineChart({ coinHistory, currentPrice, coinName }) {
    const coinPrice = [];
    const coinTimeStamp = [];

    for(let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory.data.history[i].price);
        //  Date constructor only accepts number in milliseconds but timestamp is in seconds, must mutliply by 1000
        //  to convert into date correctly; toLocaleDateString() is there to make the date more readable
        coinTimeStamp.push( new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString() );

        //console.log( coinHistory.data.history[i].timestamp )
    }

    //console.log(coinTimeStamp)

    //  data and options are there to configure the line chart
    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: 'red',
                borderColor: 'yellow'
            }
        ]
    };
    
    const options = {
        scales: {
            x: {
                reverse: true
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
            <Box className='chart-header'>
                <Typography className='chart-title'>{coinName} Price Chart</Typography>
                <Box className='price-container'>
                    <Typography className='price-change'>{coinHistory?.data?.change}%</Typography>
                    <Typography className='current-price'>Current {coinName} Price: $ {currentPrice}</Typography>
                </Box>
            </Box>

            <Line data={data} options={options} />
        </>
    )
}