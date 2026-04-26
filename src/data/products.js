export const products = [
    // Fruits
    { id: 101, name: "Fresh Apples (Kashmir)", category: "Fruits", price: 120, originalPrice: 150, image: "/images/apple.png", rating: 4.8, inStock: true, unit: "1kg", tags: ["organic", "fresh"] },
    { id: 102, name: "Bananas (Robusta)", category: "Fruits", price: 40, originalPrice: 60, image: "/images/apple.png", rating: 4.5, inStock: true, unit: "1 dozen", tags: ["potassium", "energy"] }, // Placeholder image if specific one missing
    { id: 103, name: "Pomegranate (Anar)", category: "Fruits", price: 180, originalPrice: 220, image: "/images/apple.png", rating: 4.7, inStock: true, unit: "1kg", tags: ["antioxidant"] },

    // Vegetables
    { id: 201, name: "Farm Fresh Tomatoes", category: "Vegetables", price: 35, originalPrice: 50, image: "/images/tomato.png", rating: 4.6, inStock: true, unit: "1kg", tags: ["essential", "cooking"] },
    { id: 202, name: "Potatoes (New Crop)", category: "Vegetables", price: 30, originalPrice: 45, image: "/images/potato.png", rating: 4.5, inStock: true, unit: "1kg", tags: ["essential"] },
    { id: 203, name: "Red Onions", category: "Vegetables", price: 35, originalPrice: 60, image: "/images/onion.png", rating: 4.4, inStock: true, unit: "1kg", tags: ["essential"] },

    // Dairy
    { id: 301, name: "Full Cream Milk", category: "Dairy", price: 64, originalPrice: 70, image: "/images/milk.png", rating: 4.9, inStock: true, unit: "1L", tags: ["calcium", "daily"] },
    { id: 302, name: "Farm Fresh Eggs", category: "Dairy", price: 75, originalPrice: 90, image: "/images/eggs.png", rating: 4.7, inStock: true, unit: "12 pcs", tags: ["protein"] },
    { id: 303, name: "Paneer (Fresh)", category: "Dairy", price: 95, originalPrice: 120, image: "/images/milk.png", rating: 4.8, inStock: false, unit: "200g", tags: ["protein", "veg"] },

    // Grains & Pantry
    { id: 401, name: "Premium Basmati Rice", category: "Grains", price: 110, originalPrice: 160, image: "/images/rice.png", rating: 4.9, inStock: true, unit: "1kg", tags: ["premium", "aromatic"] },
    { id: 402, name: "Whole Wheat Atta", category: "Grains", price: 42, originalPrice: 55, image: "/images/atta.png", rating: 4.8, inStock: true, unit: "1kg", tags: ["fiber", "healthy"] },
    { id: 403, name: "Toor Dal", category: "Grains", price: 145, originalPrice: 180, image: "/images/dal.png", rating: 4.6, inStock: true, unit: "1kg", tags: ["protein"] },
    { id: 404, name: "Refined Sugar", category: "Grains", price: 48, originalPrice: 60, image: "/images/sugar.png", rating: 4.5, inStock: true, unit: "1kg", tags: ["sweet"] },
    { id: 405, name: "Iodized Salt", category: "Grains", price: 28, originalPrice: 35, image: "/images/salt.png", rating: 4.8, inStock: true, unit: "1kg", tags: ["essential"] },
    { id: 406, name: "Sunflower Oil", category: "Grains", price: 155, originalPrice: 190, image: "/images/oil.png", rating: 4.7, inStock: true, unit: "1L", tags: ["cooking"] },
    { id: 407, name: "Whole Wheat Bread", category: "Grains", price: 45, originalPrice: 50, image: "/images/bread.png", rating: 4.6, inStock: true, unit: "400g", tags: ["breakfast"] },

    // Beverages
    { id: 501, name: "Premium Tea Dust", category: "Beverages", price: 130, originalPrice: 150, image: "/images/tea.png", rating: 4.8, inStock: true, unit: "250g", tags: ["refreshing"] },
    { id: 502, name: "Instant Coffee", category: "Beverages", price: 190, originalPrice: 250, image: "/images/coffee.png", rating: 4.7, inStock: true, unit: "50g", tags: ["aromatic"] },

    // Snacks (Using placeholder images re-mapped where appropriate or generic)
    { id: 601, name: "Salted Potato Chips", category: "Snacks", price: 20, originalPrice: 30, image: "/images/potato.png", rating: 4.5, inStock: true, unit: "100g", tags: ["classic"] },
    { id: 602, name: "Roasted Almonds", category: "Snacks", price: 350, originalPrice: 500, image: "/images/grocery-image.png", rating: 4.9, inStock: true, unit: "200g", tags: ["healthy"] }
];

export const CATEGORIES = ["All", "Fruits", "Vegetables", "Dairy", "Grains", "Beverages", "Snacks"];
