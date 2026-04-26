import { useState } from 'react';

export default function Features() {
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    return (
        <div className="relative z-10">
            {/* Hero & Features */}
            <section className="px-6 md:px-10 py-16 text-white flex flex-col items-center">
                <div className="text-center mb-14 max-w-3xl">
                    <h1 className="text-5xl font-bold mb-4">Explore Our Top Features</h1>
                    <p className="text-lg text-white/90">
                        ZipFresh is designed to deliver not just groceries, but convenience and innovation — all within 15 minutes.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
                    {/* Feature Card Template */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center hover:scale-105 hover:shadow-2xl transition">
                        <img src="/images/delivery.png" alt="Fast Delivery" className="w-20 h-20 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">Lightning Fast Delivery</h2>
                        <p className="text-white/80">Groceries at your doorstep in under 15 minutes.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center hover:scale-105 hover:shadow-2xl transition">
                        <img src="/images/fresh.png" alt="Fresh Produce" className="w-20 h-20 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">Freshness Guaranteed</h2>
                        <p className="text-white/80">Only the finest and freshest products selected for you.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center hover:scale-105 hover:shadow-2xl transition">
                        <img src="/images/app.png" alt="User App" className="w-20 h-20 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">User-Friendly App</h2>
                        <p className="text-white/80">Easy navigation. Seamless checkout. Smart tracking.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center hover:scale-105 hover:shadow-2xl transition">
                        <img src="/images/affordable.png" alt="Affordable Pricing" className="w-20 h-20 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">Affordable Pricing</h2>
                        <p className="text-white/80">Get quality groceries at pocket-friendly prices.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center hover:scale-105 hover:shadow-2xl transition">
                        <img src="/images/support.png" alt="Support" className="w-20 h-20 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">24/7 Support</h2>
                        <p className="text-white/80">Questions? We’re always just a message away.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center hover:scale-105 hover:shadow-2xl transition">
                        <img src="/images/secure.png" alt="Secure Payments" className="w-20 h-20 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">Secure Payments</h2>
                        <p className="text-white/80">Encrypted transactions. Total peace of mind.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16 border-t border-white/10 bg-black bg-opacity-70">
                <h2 className="text-3xl font-bold mb-4 text-white">Ready to experience instant grocery delivery?</h2>
                <button onClick={() => setShowDownloadModal(true)} className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-300 transition">
                    Download the App
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
        </div>
    );
}
