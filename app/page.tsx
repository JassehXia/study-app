'use client';

import Hero from "./components/Hero";
import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect } from "react";


export default function LandingPage() {
  useEffect(() => {
    fetch("/api/user/init", { method: "POST" });
  }, []);
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

      {/* HEADER + HERO */}
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Hero />
      </motion.div>

      {/* FEATURES SECTION */}
      <section className="w-full py-24 bg-blue-50">
        <motion.div
          className="container mx-auto px-6 md:px-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
            Features
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-blue-700">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CALL TO ACTION */}
      <motion.section
        className="w-full py-24 bg-green-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.h2
            className="text-4xl font-bold text-green-700 mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to start learning smarter?
          </motion.h2>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg shadow-lg transition-all hover:scale-105">
              Get Started Now
            </Button>
          </motion.div>
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
