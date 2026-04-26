import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../hooks/useOrders';
import { formatPrice } from '../utils/price';
import { useNavigate } from 'react-router-dom';

export default function BillModal() {
    const { cartItems, subtotal, totalDiscount, grandTotal } = useCart();
    const { isBillModalOpen, closeBillModal } = useUI();
    const { user } = useAuth();
    const { placeOrder } = useOrders();
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = Summary, 2 = Address/Payment
    const [selectedAddress, setSelectedAddress] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isBillModalOpen) return null;

    const handleCheckout = async (method) => {
        setLoading(true);
        // Simulate processing
        setTimeout(() => {
            const success = placeOrder(method, selectedAddress);
            setLoading(false);
            if (success) {
                closeBillModal();
                navigate('/profile'); // Go to orders
                setStep(1); // Reset
            }
        }, 1000);
    };

    const handleProceed = () => {
        if (!user) {
            closeBillModal();
            navigate('/login', { state: { from: { pathname: '/' } } });
        } else {
            setStep(2);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60]">
            <div className="bg-white text-black rounded-xl p-8 max-w-lg w-full relative mx-4 animate-in fade-in zoom-in duration-200">
                <button onClick={closeBillModal} className="absolute top-2 right-4 text-gray-600 hover:text-black text-2xl">&times;</button>

                {step === 1 ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Your Bill Summary</h2>
                        <div className="space-y-3 mb-4 text-sm max-h-60 overflow-y-auto">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name} (x{item.qty})</span><span>{formatPrice(item.qty * item.price)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                            </div>
                            {totalDiscount > 0 && (
                                <div className="flex justify-between text-green-600 text-sm">
                                    <span>Discount Savings</span><span>-{formatPrice(totalDiscount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                                <span>Total Amount</span><span>{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleProceed}
                            className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
                        >
                            {user ? 'Proceed to Payment' : 'Login to Checkout'}
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Complete Order</h2>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Shipping Address:</h3>
                            {user?.addresses?.length > 0 ? (
                                <select
                                    className="w-full p-2 border rounded"
                                    value={selectedAddress}
                                    onChange={(e) => setSelectedAddress(e.target.value)}
                                >
                                    <option value="">Select Address</option>
                                    {user.addresses.map(a => (
                                        <option key={a.id} value={a.id}>{a.label} - {a.street}</option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-red-500 text-sm">No address saved. Please add one in profile.</p>
                            )}
                        </div>

                        <h3 className="font-semibold mb-2">Payment Method:</h3>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button onClick={() => handleCheckout('upi')} disabled={loading} className="bg-gray-100 border hover:bg-yellow-100 text-black py-2 rounded transition">UPI / Wallet</button>
                            <button onClick={() => handleCheckout('card')} disabled={loading} className="bg-gray-100 border hover:bg-yellow-100 text-black py-2 rounded transition">Credit/Debit Card</button>
                            <button onClick={() => handleCheckout('cod')} disabled={loading} className="bg-gray-100 border hover:bg-yellow-100 text-black py-2 rounded col-span-2 transition">Cash on Delivery</button>
                        </div>

                        {loading && <p className="text-center font-bold text-yellow-600">Processing Order...</p>}

                        <button onClick={() => setStep(1)} className="text-sm text-gray-500 underline mt-4">Back to Summary</button>
                    </>
                )}
            </div>
        </div>
    );
}
