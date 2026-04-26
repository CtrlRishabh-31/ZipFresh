import { useState } from 'react';

export default function Contact() {
    const [showPartnerModal, setShowPartnerModal] = useState(false);

    return (
        <div className="flex-grow px-6 py-16 md:px-28 text-white">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
                <p className="text-lg max-w-2xl mx-auto text-white/90">
                    Have feedback, questions, or partnership ideas? Drop us a message — we’d love to hear from you!
                </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-10 rounded-2xl shadow-[0_8px_40px_rgba(255,255,255,0.15)] grid md:grid-cols-2 gap-10 border border-white/20">

                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Contact Information</h2>
                    <p className="text-white/80 mb-4">Our team is available 24/7 to help you with any queries or assistance you need.</p>

                    <div className="space-y-4 text-white/90">
                        <p><strong>Email:</strong> support@zipfresh.com</p>
                        <p><strong>Phone:</strong> +91 8077654321</p>
                        <p><strong>Head Office:</strong> Sector 62, Noida, Uttar Pradesh, India - 201301</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2 text-yellow-300">Connect With Us</h3>
                        <div className="flex space-x-5">
                            <a href="https://facebook.com" target="_blank" title="Facebook" rel="noreferrer">
                                <img src="/images/facebook.png" alt="Facebook" className="w-6 hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a href="https://twitter.com" target="_blank" title="Twitter" rel="noreferrer">
                                <img src="/images/twitter.png" alt="Twitter" className="w-6 hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a href="https://instagram.com" target="_blank" title="Instagram" rel="noreferrer">
                                <img src="/images/instagram.png" alt="Instagram" className="w-6 hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" title="LinkedIn" rel="noreferrer">
                                <img src="/images/linkedin.png" alt="LinkedIn" className="w-6 hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block mb-1 font-medium text-white">Full Name</label>
                        <input type="text" placeholder="Enter your name" className="w-full bg-black/50 border border-white/30 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-white">Email Address</label>
                        <input type="email" placeholder="Enter your email" className="w-full bg-black/50 border border-white/30 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-white">Your Message</label>
                        <textarea rows="5" placeholder="Write your message..." className="w-full bg-black/50 border border-white/30 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"></textarea>
                    </div>
                    <button type="submit" className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
                        Send Message
                    </button>
                </form>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Want to collaborate with us?</h2>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                    If you're a vendor, delivery partner, or a startup looking to grow with us, reach out directly at{' '}
                    <a href="mailto:partner@zipfresh.com" className="text-yellow-400 hover:underline">partner@zipfresh.com</a>.
                </p>
                <button onClick={() => setShowPartnerModal(true)} className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-300 transition-all">
                    Partner with ZipFresh
                </button>
            </div>

            {/* Partner Modal */}
            {showPartnerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-lg w-11/12 md:w-1/2 p-6 relative">
                        <button onClick={() => setShowPartnerModal(false)} className="absolute top-2 right-4 text-black text-2xl font-bold">&times;</button>
                        <h3 className="text-2xl font-semibold mb-4">Become a Partner</h3>
                        <p className="mb-4">Fill out your details and our team will contact you shortly.</p>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Full Name" className="w-full border border-gray-300 px-4 py-2 rounded" />
                            <input type="email" placeholder="Email" className="w-full border border-gray-300 px-4 py-2 rounded" />
                            <input type="text" placeholder="Business Name / Startup" className="w-full border border-gray-300 px-4 py-2 rounded" />
                            <textarea rows="4" placeholder="Your Proposal" className="w-full border border-gray-300 px-4 py-2 rounded"></textarea>
                            <button type="submit" className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
