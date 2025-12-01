// app/dashboard/layout.tsx
'use client';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50">
            <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-700">Dashboard</h1>

                <div>
                    {/* Show user avatar if signed in */}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    {/* Show sign-in button if signed out */}
                    <SignedOut>
                        <SignInButton>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </header>


            <main className="p-6 max-w-6xl mx-auto">
                {children}
            </main>

            <footer className="w-full bg-white border-t border-gray-200 py-4 mt-12 text-center text-gray-600">
                &copy; {new Date().getFullYear()} StudyApp. All rights reserved.
            </footer>
        </div>
    );
}
