import Header from "../components/Header";

export default function AboutPage() {
    return (
        <main className="bg-white w-full">
            <Header />

            {/* HERO */}
            <section className="w-full py-24 bg-gradient-to-b from-green-50 to-white opacity-0 animate-fadeIn">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6 animate-slideUp">
                        Our Mission: Empower Every Student
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto animate-slideUp delay-150">
                        StudyApp was created to simplify learning, enhance productivity, and bring modern AI tools to every student.
                    </p>
                </div>
            </section>

            {/* STATS */}
            <section className="py-20 opacity-0 animate-fadeIn delay-200">
                <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-10 text-center">
                    <div className="p-10 bg-white rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-5xl font-bold text-green-600">10K+</h3>
                        <p className="text-gray-700 mt-3">Students Helped</p>
                    </div>
                    <div className="p-10 bg-white rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-5xl font-bold text-blue-600">500K+</h3>
                        <p className="text-gray-700 mt-3">AI Resources Generated</p>
                    </div>
                    <div className="p-10 bg-white rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-5xl font-bold text-purple-600">50+</h3>
                        <p className="text-gray-700 mt-3">Schools Using StudyApp</p>
                    </div>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="py-24 bg-blue-50 opacity-0 animate-fadeIn delay-300">
                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-700 text-center mb-12">
                        Our Story
                    </h2>

                    <div className="space-y-10">
                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-2xl font-semibold mb-3">✨ Built for Students, by Students</h3>
                            <p className="text-gray-700 leading-relaxed">
                                StudyApp started as a simple tool to help organize classes and improve academic workflows.
                                After seeing how many students struggled with managing resources, tracking assignments,
                                and understanding course material, we created a platform that makes learning smarter — not harder.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-2xl font-semibold mb-3">🚀 Powered by Modern AI</h3>
                            <p className="text-gray-700 leading-relaxed">
                                We integrate the latest AI models to deliver real-time explanations, summaries,
                                study guides, quizzes, and personalized feedback. StudyApp adapts to your needs
                                and supports your learning journey at every step.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-2xl font-semibold mb-3">🌍 Designed for Education at Scale</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Our mission is to bring these tools to classrooms, study groups, and universities worldwide.
                                We want every student — regardless of background — to have access to premium learning tools.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM PREVIEW (Optional Add) */}
            <section className="py-24 opacity-0 animate-fadeIn delay-400">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        The Team Behind StudyApp
                    </h2>
                    <p className="text-gray-700 text-lg">
                        We are a passionate team of developers, educators, and AI enthusiasts
                        dedicated to transforming the way students learn.
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="w-full bg-white border-t border-gray-200 py-6">
                <div className="container mx-auto text-center text-gray-600">
                    © {new Date().getFullYear()} StudyApp. All rights reserved.
                </div>
            </footer>
        </main>
    );
}
