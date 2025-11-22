'use client';

import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Free",
        monthlyPrice: 0,
        annualPrice: 0,
        description: "For students just getting started",
        features: [
            "Organize classes",
            "Basic AI resource generation",
            "Track progress",
        ],
        popular: false,
    },
    {
        name: "Pro",
        monthlyPrice: 9.99,
        annualPrice: 99.99,
        description: "For students who want full power",
        features: [
            "Unlimited AI resources",
            "Advanced progress tracking",
            "Collaborative study tools",
            "Priority support",
        ],
        popular: true,
    },
    {
        name: "Team",
        monthlyPrice: 29.99,
        annualPrice: 299.99,
        description: "For study groups and small teams",
        features: [
            "All Pro features",
            "Group management",
            "Shared resources",
            "Analytics dashboard",
        ],
        popular: false,
    },
];

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false);

    const formatPrice = (price: number) =>
        price === 0 ? "Free" : `$${price.toFixed(2)}`;

    return (
        <main className="bg-white w-full">
            <Header />

            {/* HERO */}
            <section className="w-full py-32 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-6">
                        Pricing Plans
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
                        Choose a plan that fits your learning style. Upgrade anytime as your needs grow.
                    </p>

                    {/* Monthly/Annual Toggle */}
                    <div className="inline-flex bg-white rounded-full shadow-md p-1 border border-gray-200">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2 rounded-full transition-colors ${!isAnnual ? "bg-blue-500 text-white" : "text-gray-700"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2 rounded-full transition-colors ${isAnnual ? "bg-blue-500 text-white" : "text-gray-700"
                                }`}
                        >
                            Annual
                        </button>
                    </div>
                </div>
            </section>

            {/* PRICING CARDS */}
            <section className="w-full py-24">
                <div className="container mx-auto px-6 md:px-12 grid gap-8 md:grid-cols-3">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`border-2 rounded-3xl p-8 flex flex-col justify-between shadow-lg transition-transform hover:scale-105 ${plan.popular
                                    ? "border-green-500 bg-green-50 shadow-xl"
                                    : "border-gray-200 bg-white"
                                }`}
                        >
                            {plan.popular && (
                                <span className="text-sm font-bold text-green-700 uppercase mb-2">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
                            <p className="text-3xl font-semibold text-gray-800 mb-4">
                                {formatPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice)}
                            </p>
                            <p className="text-gray-600 mb-6">{plan.description}</p>
                            <ul className="mb-6 space-y-2">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-gray-700">
                                        <span className="text-green-500">✔</span> {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className={`w-full text-lg px-6 py-3 rounded-lg shadow-md ${plan.popular
                                        ? "bg-green-500 hover:bg-green-600 text-white"
                                        : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                                    }`}
                            >
                                Choose Plan
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
