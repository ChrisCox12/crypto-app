import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Layout() {
    return (
        <Box className='layout' display='flex' height='100vh'>
            <Navbar />
            <div style={{ width: '100%' }}>
                <Outlet/>
                <Footer />
            </div>
        </Box>
    )
}