/**
 * Filters products by name search term.
 * @param {Array} products 
 * @param {string} term 
 * @returns {Array}
 */
export const searchProducts = (products, term) => {
    if (!term || !products) return products;
    const lowerTerm = term.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerTerm) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerTerm)))
    );
};

/**
 * Filters products by category.
 * @param {Array} products 
 * @param {string} category 
 * @returns {Array}
 */
export const filterByCategory = (products, category) => {
    if (!category || category === "All" || !products) return products;
    return products.filter(p => p.category === category);
};

/**
 * Filters products by stock availability.
 * @param {Array} products 
 * @param {boolean} onlyInStock 
 * @returns {Array}
 */
export const filterByStock = (products, onlyInStock) => {
    if (!onlyInStock || !products) return products;
    return products.filter(p => p.inStock);
};

/**
 * Sorts products by given criteria.
 * @param {Array} products 
 * @param {string} sortBy - 'price-asc', 'price-desc', 'rating-desc'
 * @returns {Array}
 */
export const sortProducts = (products, sortBy) => {
    if (!products) return [];
    const sorted = [...products];
    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating-desc':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
};
