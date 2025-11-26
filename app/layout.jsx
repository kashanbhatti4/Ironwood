import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata = {
    title: 'Ironwood Atelier',
    description: 'Minimal ecommerce brand.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased bg-white text-gray-900 min-h-screen flex flex-col font-sans">
                <Navbar />
                <CartDrawer />
                <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-12">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
