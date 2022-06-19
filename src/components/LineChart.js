import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; //   Chart.js 3 is tree-shakeable, so it necessary to import and register the controllers, 
                                   //   elements, scales, and plugins you're going to use
import { Typography } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';


export default function LineChart({ coinHistory, currentPrice, coinName }) {
    const coinPrice = [];
    const coinTimeStamp = [];

    for(let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory.data.history[i].price);
        //  Date constructor only accepts number in milliseconds but timestamp is in seconds, must mutliply by 1000
        //  to convert into date correctly; toLocaleDateString() is there to make the date more readable
        coinTimeStamp.push( new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString() );
    }

    //  data and options are there to configure the line chart
    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                borderColor: 'rgb(75, 192, 192)'
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
            <div className='chart-header'>
                <Typography className='chart-title' fontWeight={500}>{coinName} Price Chart</Typography>
                <div className='price-container'>
                    <div className='price-change' style={{ display: 'flex', gap: '0.3rem' }}>
                        <span style={{ fontWeight: 500 }}>Price Change:</span>{' '}
                        {coinHistory?.data?.change}%
                        {coinHistory?.data?.change >= 0 ? <ArrowCircleUpIcon sx={{ color: 'green' }} /> : <ArrowCircleDownIcon sx={{ color: 'red' }} />}
                    </div>
                    <div className='current-price'>
                        <span style={{ fontWeight: 500 }}>Current {coinName} Price:</span>{' '}
                        ${currentPrice}
                    </div>
                </div>
            </div>

            <Line data={data} options={options} />
        </>
    )
}