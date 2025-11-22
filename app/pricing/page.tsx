import Header from "../components/Header";

export default function PricingPage() {
    return (
        <main className="bg-white w-full">
            <Header />

            {/* HERO */}
            <section className="w-full py-24 bg-gradient-to-b from-blue-50 to-white opacity-0 animate-fadeIn">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-6 animate-slideUp">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto animate-slideUp delay-150">
                        Choose a plan designed for real students who want to learn smarter.
                    </p>
                </div>
            </section>

            {/* PRICING GRID */}
            <section className="py-20 opacity-0 animate-fadeIn delay-200">
                <div className="container mx-auto px-6 md:px-12 grid gap-12 md:grid-cols-3">

                    {/* FREE PLAN */}
                    <div className="group bg-white shadow-xl rounded-2xl border border-blue-200 p-10 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Free</h3>
                        <p className="text-gray-600 mb-6">Perfect for starting out.</p>

                        <div className="text-5xl font-bold text-gray-900 mb-6">$0</div>

                        <ul className="text-gray-700 space-y-3 mb-8">
                            <li>✔ Basic AI help</li>
                            <li>✔ Up to 5 classes</li>
                            <li>✔ Limited resource generation</li>
                        </ul>

                        <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                            Start Free
                        </button>
                    </div>

                    {/* PRO PLAN (highlighted) */}
                    <div className="group bg-blue-600 text-white shadow-2xl rounded-2xl p-10 text-center scale-105 relative
                                    before:absolute before:inset-0 before:rounded-2xl before:border-4 before:border-blue-300 before:opacity-0
                                    hover:before:opacity-100 before:transition-all before:duration-300
                                    transition-all duration-300 hover:-translate-y-2">

                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                            Most Popular
                        </span>

                        <h3 className="text-3xl font-bold mb-4">Pro</h3>
                        <p className="mb-6 opacity-90">Best for serious students.</p>

                        <div className="text-5xl font-bold mb-6">$9<span className="text-lg opacity-80">/mo</span></div>

                        <ul className="space-y-3 mb-8 opacity-95">
                            <li>✔ Unlimited classes</li>
                            <li>✔ Full AI tools</li>
                            <li>✔ Smart progress tracking</li>
                            <li>✔ Fast resource generation</li>
                        </ul>

                        <button className="w-full py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition">
                            Upgrade to Pro
                        </button>
                    </div>

                    {/* TEAM PLAN */}
                    <div className="group bg-white shadow-xl rounded-2xl border border-blue-200 p-10 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Team</h3>
                        <p className="text-gray-600 mb-6">Perfect for study groups.</p>

                        <div className="text-5xl font-bold text-gray-900 mb-6">$5<span className="text-lg text-gray-500">/user</span></div>

                        <ul className="text-gray-700 space-y-3 mb-8">
                            <li>✔ Shared study spaces</li>
                            <li>✔ Collaboration tools</li>
                            <li>✔ Group AI assistance</li>
                            <li>✔ Student dashboard</li>
                        </ul>

                        <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                            Contact Sales
                        </button>
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="w-full bg-white border-t border-gray-200 py-6">
                <div className="container mx-auto text-center text-gray-600">
                    © {new Date().getFullYear()} StudyApp. All rights reserved.
                </div>
            </footer>
        </main>
    );
}
