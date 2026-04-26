import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { formatPrice } from '../utils/price';

export default function MobileCartBar() {
    const { cartItems, grandTotal, totalItems } = useCart();
    const { openCart, isCartOpen } = useUI();

    // Hide if empty or if sidebar is already open
    if (cartItems.length === 0 || isCartOpen) return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between animate-in slide-in-from-bottom duration-300">
            <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">{totalItems} Items</p>
                <p className="text-lg font-bold text-black">{formatPrice(grandTotal)}</p>
            </div>
            <button
                onClick={openCart}
                className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition shadow-md"
            >
                View Cart
            </button>
        </div>
    );
}
