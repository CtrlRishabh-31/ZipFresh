import { useState } from 'react';

/**
 * Hook to manage state synchronized with localStorage.
 * @param {string} key - The key to store/retrieve data in localStorage.
 * @param {any} initialValue - The initial value to use if no data exists.
 * @param {Function} [deserialize=JSON.parse] - Function to parse stored string.
 * @param {Function} [serialize=JSON.stringify] - Function to stringify value.
 * @returns {[any, Function, Function]} - [storedValue, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue, deserialize = JSON.parse, serialize = JSON.stringify) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            if (typeof window === "undefined") {
                return initialValue;
            }
            const item = window.localStorage.getItem(key);
            return item ? deserialize(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, serialize(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue];
}
