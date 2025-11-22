// app/components/Header.tsx
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Add shadow when scrolling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`w-full fixed top-0 z-50 bg-white transition-shadow ${isScrolled ? "shadow-md" : ""
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    StudyApp
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#home" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </a>
                    <a href="#features" className="text-gray-700 hover:text-blue-600 transition">
                        Features
                    </a>
                    <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">
                        Pricing
                    </a>
                    <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </a>
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                        Login
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-700">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
                    }`}
            >
                <nav className="flex flex-col gap-4 px-6">
                    <a href="home" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </a>
                    <a href="features" className="text-gray-700 hover:text-blue-600 transition">
                        Features
                    </a>
                    <a href="pricing" className="text-gray-700 hover:text-blue-600 transition">
                        Pricing
                    </a>
                    <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </a>
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full">
                        Login
                    </Button>
                </nav>
            </div>
        </header>
    );
}
