/**
 * Mock Authentication Logic with "Hashing"
 */

// Simple "hash" for demo purposes
const hashPassword = (password) => {
    return btoa(password + "_hashed_salt_v1");
};

// Simulate database delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    async login(email, password) {
        await delay(800);
        const users = JSON.parse(localStorage.getItem('zipfresh_users_db') || '[]');
        const user = users.find(u => u.email === email && u.passwordHash === hashPassword(password));

        if (user || (email === 'demo@zipfresh.com' && password === 'password')) {
            // Return user without password hash
            const userData = user || {
                id: 'user_demo',
                name: 'Demo User',
                email: 'demo@zipfresh.com',
                addresses: [],
                phone: '9876543210'
            };
            // eslint-disable-next-line no-unused-vars
            const { passwordHash, ...safeUser } = userData;
            return { user: safeUser, token: 'mock_jwt_token_' + Date.now() };
        }
        throw new Error('Invalid credentials');
    },

    async signup(userData) {
        await delay(1000);
        const users = JSON.parse(localStorage.getItem('zipfresh_users_db') || '[]');

        if (users.find(u => u.email === userData.email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: 'user_' + Date.now(),
            ...userData,
            passwordHash: hashPassword(userData.password),
            createdAt: new Date().toISOString(),
            addresses: []
        };

        // Don't save plain password
        // eslint-disable-next-line no-unused-vars
        const { password, ...userToSave } = newUser;

        users.push(userToSave);
        localStorage.setItem('zipfresh_users_db', JSON.stringify(users));

        // Return safe user object
        // eslint-disable-next-line no-unused-vars
        const { passwordHash, ...safeUser } = userToSave;
        return { user: safeUser, token: 'mock_jwt_token_' + Date.now() };
    },

    async updateUser(id, updates) {
        await delay(500);
        const users = JSON.parse(localStorage.getItem('zipfresh_users_db') || '[]');
        const index = users.findIndex(u => u.id === id);

        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            localStorage.setItem('zipfresh_users_db', JSON.stringify(users));
            // eslint-disable-next-line no-unused-vars
            const { passwordHash, ...safeUser } = users[index];
            return safeUser;
        }
        // Handle demo user update loosely for session
        return { id, ...updates };
    }
};
