import React from "react";
import {ATSAnalysis} from "../types/ats";

interface AtsResultProps {
  analysis: ATSAnalysis;
}

function AtsResult({analysis}: AtsResultProps) {
  const scoreColor =
    analysis.atsScore >= 90
      ? "text-green-500"
      : analysis.atsScore >= 75
      ? "text-blue-500"
      : analysis.atsScore >= 60
      ? "text-yellow-500"
      : "text-red-500";
  return (
    <div className="mt-8 rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6">
      <h2 className="text-2xl text-center font-semibold mb-4">
        ATS Analysis Results
      </h2>
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div
            className="
    rounded-2xl
    p-4
    text-center
    border
    border-yellow-500/20
    bg-yellow-500/10
    mb-6
  "
          >
            <p className="font-semibold">
              {analysis.rating}
            </p>

            <p className="text-sm mt-1">
              {analysis.summary}
            </p>
          </div>
          <p className="text-gray-500">ATS Score</p>

          <h1
            className={`text-6xl font-bold mt-2 ${scoreColor}`}
          >
            {analysis.atsScore}%
          </h1>

          <div className="mt-4 w-full h-4 rounded-full border bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-1000"
              style={{
                width: `${analysis.atsScore}%`,
              }}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">
              ✔ Matched Skills
            </p>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              {analysis.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-green-500/20 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-500">
              ❌ Missing Skills
            </p>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              {analysis.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-red-500/20 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">💪 Strengths</p>
            <ul className="list-disc list-inside rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              {analysis.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">⚠ Weaknesses</p>
            <ul className="list-disc list-inside rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              {analysis.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">
              🚀 Recommendations
            </p>
            <ul className="list-disc list-inside rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              {analysis.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AtsResult;
