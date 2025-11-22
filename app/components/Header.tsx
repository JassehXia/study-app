// app/components/Header.tsx
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react"; // hamburger icon

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="w-full bg-white shadow-md fixed top-0 z-50">
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16">

                {/* Logo / Brand */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    StudyApp
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </Link>
                    <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition">
                        Pricing
                    </Link>
                    <Link href="#about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                        Login
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-700">
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md border-t border-gray-200">
                    <nav className="flex flex-col gap-4 px-6 py-4">
                        <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
                            Home
                        </Link>
                        <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
                            Features
                        </Link>
                        <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition">
                            Pricing
                        </Link>
                        <Link href="#about" className="text-gray-700 hover:text-blue-600 transition">
                            About
                        </Link>
                        <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full">
                            Login
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
