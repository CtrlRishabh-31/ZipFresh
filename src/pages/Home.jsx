import { useState, useMemo, useEffect, Suspense } from 'react';
import { useUI } from '../context/UIContext';
import { products, CATEGORIES } from '../data/products';
import { useDebounce } from '../hooks/useDebounce';
import { searchProducts, filterByCategory, sortProducts } from '../utils/filters';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    // Use UI Context for category persistence
    const { lastSelectedCategory, setLastSelectedCategory } = useUI();

    // Debounce search to optimize performance
    const debouncedSearch = useDebounce(searchTerm, 300);

    // useMemo for filtering logic
    const filteredProducts = useMemo(() => {
        let result = products;
        result = filterByCategory(result, lastSelectedCategory);
        result = searchProducts(result, debouncedSearch);
        // Optional: Add sort functionality later via Filters component prop
        return result;
    }, [lastSelectedCategory, debouncedSearch]);

    return (
        <>
            {/* Hero */}
            <section className="px-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                    <h1 className="text-6xl md:text-7xl font-extrabold leading-tight md:leading-[1.2] mb-6 text-white drop-shadow-lg">
                        Groceries Delivered<br />
                        <span className="text-yellow-400">In 15 Minutes</span>
                    </h1>
                    <p className="mb-8 text-lg md:text-xl text-white/90 max-w-lg">
                        Fresh fruits, veggies, dairy, and everything in between — at your doorstep instantly.
                    </p>
                    <a href="#shop" className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">Order Now</a>
                    <button onClick={() => setShowDownloadModal(true)} className="ml-6 hover:underline text-white">Download App →</button>
                </div>
                <img src="/images/grocery-image.png" alt="Grocery" className="w-full max-w-xl drop-shadow-2xl scale-110" />
            </section>

            {/* Product Listing */}
            <section id="shop" className="px-10 py-20 bg-white/5 text-white min-h-screen">
                <h2 className="text-3xl font-bold mb-6">Popular Products</h2>

                <Filters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    categories={CATEGORIES}
                    selectedCategory={lastSelectedCategory}
                    onCategoryChange={setLastSelectedCategory}
                />

                <ProductGrid
                    products={filteredProducts}
                    isLoading={false} // Could hook up to real loading state if fetching from API
                    renderItem={(p) => <ProductCard key={p.id} product={p} />}
                />
            </section>

            {/* Features */}
            <section className="bg-white/10 px-10 py-20">
                <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Why Choose ZipFresh</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
                    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md shadow-lg">
                        <img src="/images/delivery.png" className="w-16 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">15-Min Delivery</h3>
                        <p className="text-white/80">No more waiting! Groceries delivered at lightning speed.</p>
                    </div>
                    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md shadow-lg">
                        <img src="/images/fresh.png" className="w-16 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Freshness Guaranteed</h3>
                        <p className="text-white/80">Only the freshest items picked and delivered with care.</p>
                    </div>
                    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md shadow-lg">
                        <img src="/images/app.png" className="w-16 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Easy to Use App</h3>
                        <p className="text-white/80">Order, track, repeat — all from our seamless app.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="px-10 py-20">
                <h2 className="text-4xl font-bold text-center text-yellow-400 mb-10">What Customers Say</h2>
                <div className="grid md:grid-cols-3 gap-6 text-sm text-white/90">
                    <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                        <p>"Absolutely love ZipFresh! Fastest delivery ever and everything is always fresh!"</p>
                        <p className="mt-4 font-semibold text-yellow-300">— Anjali, Delhi</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                        <p>"It feels like magic — click, and boom! Groceries on my doorstep."</p>
                        <p className="mt-4 font-semibold text-yellow-300">— Rajeev, Noida</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                        <p>"I’ve stopped going to the market altogether. Thank you, ZipFresh!"</p>
                        <p className="mt-4 font-semibold text-yellow-300">— Meera, Gurgaon</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-16 bg-yellow-400 text-black">
                <h2 className="text-3xl font-bold mb-4">Join Thousands Who Shop Smarter</h2>
                <p className="mb-6 text-lg">Download ZipFresh today and make your grocery runs disappear.</p>
                <button onClick={() => setShowDownloadModal(true)} className="bg-black text-yellow-400 px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                    Download Now
                </button>
            </section>

            {/* Download Modal */}
            {showDownloadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-xl p-8 max-w-md w-full relative">
                        <button onClick={() => setShowDownloadModal(false)} className="absolute top-2 right-4 text-gray-600 hover:text-black text-2xl">&times;</button>
                        <h2 className="text-2xl font-bold mb-4">Download ZipFresh App</h2>
                        <p className="mb-4">Scan the QR or click below to download our app.</p>
                        <div className="flex justify-around mb-6">
                            <img src="/images/qr-android.png" alt="Android QR" className="w-24 h-24 border rounded" />
                            <img src="/images/qr-ios.png" alt="iOS QR" className="w-24 h-24 border rounded" />
                        </div>
                        <div className="flex justify-between">
                            <a href="https://play.google.com" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300">Google Play</a>
                            <a href="https://www.apple.com/in/app-store/" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300">App Store</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
