'use client';

import Header from "../components/Header";
import Features from "../components/Features";

export default function FeaturesPage() {
    return (
        <main className="bg-white w-full">
            <Header />

            {/* FEATURES HERO */}
            <section className="w-full py-24 bg-blue-50">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-6">
                        Features That Empower You
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                        Explore how our AI-powered platform helps you study smarter, organize better, and achieve more.
                    </p>
                </div>
            </section>

            {/* FEATURES GRID */}
            <Features />
        </main>
    );
}
