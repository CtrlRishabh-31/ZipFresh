import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UIContext = createContext();

export function useUI() {
    return useContext(UIContext);
}

export function UIProvider({ children }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);
    const [lastSelectedCategory, setLastSelectedCategory] = useLocalStorage('zipfresh_category_v2', 'All');

    // Toasts state: Array of { id, message, type }
    const [toasts, setToasts] = useState([]);

    // -- Actions --

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const openBillModal = () => {
        setIsCartOpen(false);
        setIsBillModalOpen(true);
    };
    const closeBillModal = () => setIsBillModalOpen(false);

    // Toast System
    const addToast = useCallback((message, type = 'success') => { // type: success, error, info
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3s
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <UIContext.Provider value={{
            isCartOpen, toggleCart, openCart, closeCart,
            isBillModalOpen, openBillModal, closeBillModal,
            lastSelectedCategory, setLastSelectedCategory,
            toasts, addToast, removeToast
        }}>
            {children}
        </UIContext.Provider>
    );
}
