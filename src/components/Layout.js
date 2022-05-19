import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from '../styles/Styles.module.css';


export default function Layout() {
    return (
        <Box className={styles.layout} flexDirection={{ xs: 'column', md: 'row'}}>
            <Navbar />
            <div style={{ width: '100%', overflowY: 'scroll' }}>
                <Outlet/>
                <Footer />
            </div>
        </Box>
    )
}