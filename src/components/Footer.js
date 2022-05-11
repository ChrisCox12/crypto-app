import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styles from '../styles/Styles.module.css';


export default function Footer() {
    return (
        <Box bgcolor='primary.main' color='white' padding='1.5rem 0'>
            <Stack spacing={1} alignItems='center'>
                <Typography>Crypto Central</Typography>
                <Typography>All rights reserved</Typography>
                <Stack spacing={1} direction='row'>
                    <Link to='/' className={styles.footerLink}>Home</Link>
                    <Link to='/exchanges' className={styles.footerLink}>Exchanges</Link>
                    <Link to='/news' className={styles.footerLink}>News</Link>
                </Stack>
            </Stack>
        </Box>
    )
}