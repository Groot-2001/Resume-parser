import React from 'react';
import {ResumeAnalysis} from "../types/resume";

  type ResumeSummaryProps = {
    resume: ResumeAnalysis;
  };


function ResumeSummary({ resume }: ResumeSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
    <div className="rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-5 text-center">
      <p className="text-sm text-gray-500">
        Skills Found
      </p>
      <h3 className="text-4xl font-bold mt-2">
        {resume.skills.length}
      </h3>
    </div>

    <div className="rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-5 text-center">
      <p className="text-sm text-gray-500">
        Experience Entries
      </p>
      <h3 className="text-4xl font-bold mt-2">
        {resume.experience.length}
      </h3>
    </div>

    <div className="rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-5 text-center">
      <p className="text-sm text-gray-500">
        Education Entries
      </p>
      <h3 className="text-4xl font-bold mt-2">
        {resume.education.length}
      </h3>
    </div>
  </div>
  );
}

export default ResumeSummary;
