import { Outlet } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import Footer from "./pages/Footer";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
            <AnimatePresence mode="wait">
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y:0 }}
                exit={{ opacity: 0, y:-10 }}
                transition={{ duration: 0.3 }}
                className="flex-grow">
                <Outlet />
            </motion.main>
            </AnimatePresence>
            <Footer/>
        </div>      
    )
}