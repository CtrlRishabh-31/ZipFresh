import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { formatPrice } from '../utils/price';

export default function CartSidebar() {
    const { cartItems, savedItems, updateQuantity, removeItem, saveForLater, restoreItem, subtotal } = useCart();
    const { isCartOpen, toggleCart, openBillModal } = useUI();

    return (
        <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white text-black shadow-xl transform transition-transform duration-300 z-50 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center px-4 py-3 border-b shrink-0">
                <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
                <button onClick={toggleCart} className="text-gray-600 text-2xl hover:text-black">&times;</button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-6">
                {/* Active Cart Items */}
                <div className="space-y-4">
                    {cartItems.length === 0 && <p className="text-center text-gray-500 py-4">Your cart is empty.</p>}
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                    <div className="flex items-center border rounded">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-gray-100">−</button>
                                        <span className="px-2">{item.qty}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-gray-100">+</button>
                                    </div>
                                    <span className="ml-2">x {formatPrice(item.price)}</span>
                                </div>
                                <div className="flex gap-3 mt-2 text-xs">
                                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline">Remove</button>
                                    <button onClick={() => saveForLater(item.id)} className="text-blue-500 hover:underline">Save for Later</button>
                                </div>
                            </div>
                            <p className="font-bold">{formatPrice(item.qty * item.price)}</p>
                        </div>
                    ))}
                </div>

                {/* Saved For Later */}
                {savedItems.length > 0 && (
                    <div className="border-t pt-4">
                        <h3 className="font-bold mb-3 text-gray-700">Saved for Later ({savedItems.length})</h3>
                        <div className="space-y-3">
                            {savedItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                    <div>
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-500">{formatPrice(item.price)}</p>
                                        <button onClick={() => restoreItem(item.id)} className="text-blue-500 text-xs hover:underline mt-1">Move to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t px-4 pb-6 bg-white shrink-0 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <p className="text-lg font-bold flex justify-between mb-4">
                    <span>Subtotal:</span> <span>{formatPrice(subtotal)}</span>
                </p>
                <button
                    onClick={openBillModal}
                    disabled={cartItems.length === 0}
                    className={`w-full font-semibold py-3 rounded-lg transition ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300 text-black'}`}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
