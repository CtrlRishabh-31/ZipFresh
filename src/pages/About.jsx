import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="min-h-screen px-6 md:px-28 py-8 md:py-12 flex flex-col">
            {/* About Content */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-[0_8px_40px_rgba(255,255,255,0.15)] p-10 md:p-12 max-w-4xl mx-auto border border-white/20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">About ZipFresh</h1>
                <p className="text-white/90 mb-4 leading-relaxed">
                    Welcome to <strong className="text-yellow-300">ZipFresh</strong> — your one-stop solution for fast, reliable grocery delivery.
                    We believe that your time is valuable, and that's why we bring fresh groceries to your doorstep in just <strong className="text-yellow-300">15 minutes</strong>.
                </p>
                <p className="text-white/80 mb-4 leading-relaxed">
                    Our mission is to simplify your daily shopping experience by offering a wide variety of products including:
                    fresh produce, dairy, bakery, meat, and pantry essentials — all delivered lightning-fast and always fresh.
                </p>
                <p className="text-white/70 leading-relaxed">
                    With a growing network and a tech-driven approach, ZipFresh is redefining convenience in grocery shopping.
                    We are proud to serve thousands of happy customers every day — and we're just getting started.
                </p>
            </div>

            {/* Optional About Image */}
            <div className="mt-12 flex justify-center">
                <img src="/images/team.png" alt="Our Team" className="rounded-xl shadow-lg w-full max-w-3xl" />
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Mission</h2>
                <p className="text-white/80 max-w-xl mx-auto mb-6">
                    Whether you're a customer, partner, or future teammate — let's shape the future of grocery delivery together.
                </p>
                <Link to="/contact" className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-300 transition inline-block">
                    Contact Us Today
                </Link>
            </div>
        </div>
    );
}
