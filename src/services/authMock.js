/**
 * Mock Authentication Service
 * Simulates backend API calls with delays
 */

const MOCK_USER = {
    id: 'user_123',
    name: 'Demo User',
    email: 'demo@zipfresh.com',
    role: 'customer'
};

export const loginAPI = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'demo@zipfresh.com' && password === 'password') {
                resolve({ user: MOCK_USER, token: 'mock_jwt_token_123' });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 800); // Simulate network delay
    });
};

export const getUserAPI = async (token) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token === 'mock_jwt_token_123') {
                resolve(MOCK_USER);
            } else {
                reject(new Error('Invalid token'));
            }
        }, 500);
    });
};
