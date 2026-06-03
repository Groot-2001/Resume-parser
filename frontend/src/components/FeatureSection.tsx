import React from 'react';

function FeatureSection() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5  p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
        ATS Analysis
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        Get instant ATS compatibility scores and
        actionable recommendations to improve your
        chances.
      </p>
    </div>

    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
        Keyword Optimization
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        Discover missing keywords recruiters are
        searching for and improve your visibility.
      </p>
    </div>

    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
        Resume Improvements
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        Improve readability, formatting, structure,
        and overall impact of your resume.
      </p>
    </div>
  </div>
  );
}

export default FeatureSection;
