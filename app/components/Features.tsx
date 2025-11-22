// app/components/Features.tsx
'use client';

import { CheckCircle } from "lucide-react";

interface Feature {
    title: string;
    description: string;
    color?: string; // optional accent color for the icon
}

interface FeaturesProps {
    features?: Feature[];
}

const defaultFeatures: Feature[] = [
    {
        title: "Organize Classes",
        description: "Keep all your class notes, assignments, and schedules in one place.",
        color: "text-blue-600",
    },
    {
        title: "AI-Powered Resources",
        description: "Generate summaries, quizzes, and explanations automatically for your subjects.",
        color: "text-green-600",
    },
    {
        title: "Track Progress",
        description: "Monitor your learning progress, achievements, and milestones easily.",
        color: "text-purple-600",
    },
    {
        title: "Collaborative Study",
        description: "Share resources and collaborate with classmates effortlessly for group projects and study sessions.",
        color: "text-teal-600",
    },
];

export default function Features({ features = defaultFeatures }: FeaturesProps) {
    return (
        <section className="w-full py-20 bg-blue-50">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-700 text-center mb-12">
                    Features That Empower You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start hover:scale-105 transition-transform duration-300"
                        >
                            <CheckCircle className={`w-10 h-10 mb-4 ${feature.color ?? "text-blue-600"}`} />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
