/**
 * Formats a number as a currency string.
 * @param {number} amount 
 * @param {string} [currency='INR'] 
 * @returns {string}
 */
export const formatPrice = (amount, currency = 'INR') => {
    if (isNaN(amount)) return '₹0.00';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Calculates the discount percentage.
 * @param {number} price 
 * @param {number} originalPrice 
 * @returns {number} round discount percentage
 */
export const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
};

/**
 * Rounds a number to two decimal places.
 * @param {number} num 
 * @returns {number}
 */
export const roundToTwo = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};
