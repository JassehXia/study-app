'use client';

import Header from "../components/Header";
import Features from "../components/Features";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
    return (
        <main className="bg-white w-full">
            <Header />

            {/* FEATURES HERO */}
            <section className="w-full py-32 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
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

            {/* CALL TO ACTION */}
            <section className="w-full py-24 bg-green-50">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
                        Ready to start learning smarter?
                    </h2>
                    <p className="text-gray-700 mb-8 max-w-xl mx-auto">
                        Join thousands of students who are boosting their productivity with AI-powered tools.
                    </p>
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg shadow-md transition-all hover:scale-105">
                        Get Started Now
                    </Button>
                </div>
            </section>
        </main>
    );
}
