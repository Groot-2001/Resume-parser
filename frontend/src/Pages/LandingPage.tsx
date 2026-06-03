import React from "react";
import ResumeUploader from "../components/ResumeUploader";
import Navbar from "../components/Navbar";
import FeatureSection from "../components/FeatureSection";

function LandingPage() {

  return (
    <div className="landing-page min-h-screen w-full pattern-background">
      {/* Navbar */}
      <Navbar/>
      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
        <span className="mb-4 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1 text-sm font-medium text-blue-400">
          AI Powered
        </span>

        <h1 className="max-w-4xl text-5xl font-bold text-black dark:text-white md:text-7xl">
          Smart Resume Check
          <br />
          Fast & Free
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Fix errors, improve keywords, and boost your
          chances of landing interviews.
        </p>

        <ResumeUploader />
      </section>

      {/* Features Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-black dark:text-white">
            Why Choose Resume Checker?
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Everything you need to optimize your resume and
            get more interviews.
          </p>
        </div>

        <FeatureSection/>
      </section>
    </div>
  );
}

export default LandingPage;
