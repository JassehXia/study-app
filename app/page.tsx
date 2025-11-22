'use client';

import Hero from "./components/Hero";
import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LandingPage() {
  const features = [
    {
      title: "Organize Classes",
      description: "Keep all your class notes, assignments, and schedules in one place.",
    },
    {
      title: "AI-Powered Resources",
      description: "Generate summaries, quizzes, and explanations automatically for your subjects.",
    },
    {
      title: "Track Progress",
      description: "Monitor your learning progress, achievements, and milestones easily.",
    },
  ];

  return (
    <main className="bg-white w-full">

      {/* HERO SECTION */}
      <Header />
      <Hero />

      {/* FEATURES SECTION */}
      <section className="w-full py-24 bg-blue-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
            Features
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <motion.section
        className="w-full py-24 bg-green-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            Ready to start learning smarter?
          </h2>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg shadow-md transition-all hover:scale-105">
            Get Started Now
          </Button>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-6 md:px-12 text-center text-gray-600">
          &copy; {new Date().getFullYear()} StudyApp. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
