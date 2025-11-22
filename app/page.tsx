// app/page.tsx
'use client';

import Hero from "./components/Hero";
import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="bg-white w-full">

      {/* HERO SECTION */}
      <Header />
      <Hero />

      {/* FEATURES SECTION */}
      <section className="w-full py-24 bg-blue-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">

            <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Organize Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Keep all your class notes, assignments, and schedules in one place.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>AI-Powered Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate summaries, quizzes, and explanations automatically for your subjects.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your learning progress, achievements, and milestones easily.
                </CardDescription>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full py-24 bg-green-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Ready to start learning smarter?</h2>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-6 md:px-12 text-center text-gray-600">
          &copy; {new Date().getFullYear()} StudyApp. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
