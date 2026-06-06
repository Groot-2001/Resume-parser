import React from 'react';
import { ATSAnalysis } from "../types/ats";

interface AtsResultProps {
    analysis: ATSAnalysis;
  }

function AtsResult({ analysis }: AtsResultProps) {
    return (
        <div className="mt-8 rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6">
          <h2 className="text-2xl font-semibold mb-4">ATS Analysis Results</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500">ATS Score</p>
              <p className="text-3xl font-bold">{analysis.atsScore}%</p>
            </div>
            <div>
              <p className="text-gray-500">Matched Skills</p>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedSkills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-green-500/20 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500">Missing Skills</p>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-red-500/20 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500">Strengths</p>
              <ul className="list-disc list-inside">
                {analysis.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-500">Weaknesses</p>
              <ul className="list-disc list-inside">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-500">Recommendations</p>
              <ul className="list-disc list-inside">
                {analysis.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
}

export default AtsResult;
