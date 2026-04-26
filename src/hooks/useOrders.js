import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { useNavigate } from 'react-router-dom';

/**
 * Service to manage orders
 */
export const orderService = {
    getOrders(userId) {
        const allOrders = JSON.parse(localStorage.getItem('zipfresh_orders_v1') || '[]');
        return allOrders.filter(o => o.userId === userId);
    },

    createOrder(userId, cartItems, total, address) {
        const allOrders = JSON.parse(localStorage.getItem('zipfresh_orders_v1') || '[]');
        const newOrder = {
            id: 'ord_' + Date.now(),
            userId,
            items: cartItems,
            total,
            address,
            status: 'Processing',
            date: new Date().toISOString()
        };
        allOrders.unshift(newOrder); // Add to top
        localStorage.setItem('zipfresh_orders_v1', JSON.stringify(allOrders));
        return newOrder;
    }
};

export const useOrders = () => {
    const { user } = useAuth();
    const { cartItems, grandTotal, clearCart } = useCart();
    const { addToast } = useUI();
    const navigate = useNavigate();

    const placeOrder = (paymentMethod, addressId) => {
        if (!user) {
            addToast("Please login to place an order", "error");
            navigate('/login');
            return false;
        }

        const address = user.addresses?.find(a => a.id === addressId) || user.addresses?.[0];
        // If no address, we might want to prompt user. For now, assume we proceed or use a default string.

        try {
            orderService.createOrder(user.id, cartItems, grandTotal, address || "Default Address");
            clearCart();
            addToast("Order placed successfully!");
            // navigate('/profile'); // Redirect to orders page (which is in profile for now)
            return true;
        } catch (error) {
            addToast("Failed to place order", "error");
            return false;
        }
    };

    return { placeOrder, getOrders: () => orderService.getOrders(user?.id) };
};
