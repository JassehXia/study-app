// components/Hero.tsx
'use client';

import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-white via-blue-50 to-green-50 w-full min-h-screen flex items-center overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 text-center md:text-left flex flex-col justify-center relative z-10">

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-bold text-blue-700 leading-tight">
                    Learn Smarter, Not Harder
                </h1>

                {/* Subtext */}
                <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
                    Your AI-powered student companion. Organize your classes, generate resources, and track your learning progress all in one place.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg shadow-md transition-all hover:scale-105">
                        Get Started
                    </Button>
                    <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-8 py-4 rounded-lg text-lg shadow-md transition-all hover:scale-105">
                        Learn More
                    </Button>
                </div>
            </div>

            {/* Decorative Circles / Shapes */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full opacity-40 animate-pulse mix-blend-multiply blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 animate-pulse mix-blend-multiply blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-300 rounded-full opacity-20 animate-ping mix-blend-multiply blur-2xl pointer-events-none"></div>
        </section>
    );
}
