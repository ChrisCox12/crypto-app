import { Box } from '@mui/material';
import CryptoList from '../components/CryptoList';


export default function CryptocurrenciesPage() {

    return (
        <Box padding='1.5rem' minHeight='100%'>
            <CryptoList />
        </Box>
    )
}