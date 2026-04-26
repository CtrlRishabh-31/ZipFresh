import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import BillModal from './BillModal';
import ToastContainer from './Toast';
import MobileCartBar from './MobileCartBar';

export default function Layout() {
    return (
        <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <CartSidebar />
            <BillModal />
            <MobileCartBar />
            <ToastContainer />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
