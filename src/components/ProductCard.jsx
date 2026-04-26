import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { formatPrice, calculateDiscount } from '../utils/price';

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const { addToast, openCart } = useUI();

    const handleAddToCart = () => {
        const result = addItem(product);
        if (result.success) {
            addToast(`Added ${product.name} to cart`);
            openCart();
        } else {
            addToast(result.error, 'error');
        }
    };

    const discount = calculateDiscount(product.price, product.originalPrice);

    return (
        <div className={`group bg-white/10 p-5 rounded-2xl shadow-[0_8px_30px_rgba(255,255,255,0.1)] backdrop-blur-md transition transform hover:scale-[1.05] hover:shadow-[0_12px_35px_rgba(255,255,255,0.2)] text-center border border-white/20 relative flex flex-col h-full ${!product.inStock ? 'opacity-75 grayscale' : ''}`}>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                {discount > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{discount}%</span>}
                {!product.inStock && <span className="bg-gray-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">OUT OF STOCK</span>}
                {product.inStock && discount === 0 && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">FRESH</span>}
            </div>

            {/* Image */}
            <img src={product.image} alt={product.name} className="w-28 h-28 mx-auto mb-3 object-contain rounded-lg shadow-md border border-white/10 bg-white/10 group-hover:scale-110 transition duration-300" />

            {/* Content */}
            <div className="flex-grow flex flex-col justify-end">
                <h3 className="text-lg font-semibold mb-1 truncate" title={product.name}>{product.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{product.unit || 'per unit'}</p>

                {/* Price */}
                <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="text-yellow-300 font-medium text-lg">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                </div>

                {/* Action */}
                <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full px-4 py-1.5 rounded-full font-semibold transition ${product.inStock ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
}
