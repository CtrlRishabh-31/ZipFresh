import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { roundToTwo } from '../utils/price';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useLocalStorage('zipfresh_cart_v2', []);
    const [savedItems, setSavedItems] = useLocalStorage('zipfresh_saved_v2', []);

    // -- Actions --

    const addItem = (product) => {
        if (!product.inStock) return { success: false, error: 'Out of stock' };

        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
        return { success: true };
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.qty + delta);
                    return { ...item, qty: newQty };
                }
                return item;
            })
        );
    };

    const saveForLater = (id) => {
        const itemToSave = cartItems.find(item => item.id === id);
        if (!itemToSave) return;

        setSavedItems(prev => {
            // Avoid duplicates in saved list
            if (prev.find(i => i.id === id)) return prev;
            return [...prev, itemToSave];
        });
        removeItem(id);
    };

    const restoreItem = (id) => {
        const itemToRestore = savedItems.find(item => item.id === id);
        if (!itemToRestore) return;

        // Check if valid product structure or fetch fresh if needed (assuming simple object for now)
        // If it exists in cart, just increment? Or just add separate? 
        // Logic: If in cart, increment. If not, add.
        setCartItems(prev => {
            const existing = prev.find(i => i.id === id);
            if (existing) {
                return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, itemToRestore];
        });

        setSavedItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // -- Derived Values --

    const { subtotal, totalDiscount, grandTotal, totalItems } = useMemo(() => {
        let sub = 0;
        let disc = 0;
        let count = 0;

        cartItems.forEach(item => {
            const original = item.originalPrice || item.price;
            const price = item.price;
            const qty = item.qty;

            sub += original * qty;
            disc += (original - price) * qty;
            count += qty;
        });

        return {
            subtotal: roundToTwo(sub),
            totalDiscount: roundToTwo(disc),
            grandTotal: roundToTwo(sub - disc),
            totalItems: count
        };
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems, savedItems,
            addItem, removeItem, updateQuantity, saveForLater, restoreItem, clearCart,
            subtotal, totalDiscount, grandTotal, totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
}
