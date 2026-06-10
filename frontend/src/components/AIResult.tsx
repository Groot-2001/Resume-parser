import React from "react";
import {AIAnalysis} from "../types/ai";

interface AtsResultProps {
  analysis: AIAnalysis;
  onGenerateResume: () => void;
  isGenerating: boolean;
}

function AIResult({
  analysis,
  onGenerateResume,
  isGenerating,
}: AtsResultProps) {
  return (
    <div className="mt-8 rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center border-purple-500 bg-purple-500/10 flex-1
      p-4
      rounded-2xl
      border
      cursor-pointer
      transition-all">
        AI Resume Coach
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg">
            Overall Assessment
          </h3>

          <p className="mt-2">
            {analysis?.overallAssessment}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Strengths
          </h3>

          <ul className="list-disc list-inside">
            {analysis?.strengths?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Areas For Improvement
          </h3>

          <ul className="list-disc list-inside">
            {analysis?.areasForImprovement?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            📋 Action Plan
          </h3>

          <ul className="list-disc list-inside mt-2">
            {analysis.actionPlan?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            ✨ ATS-Friendly Resume Suggestions
          </h3>

          <ul className="list-disc list-inside mt-2">
            {analysis.resumeBulletSuggestions?.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            🎯 Hiring Recommendation
          </h3>

          <div className="mt-2 rounded-2xl border p-4">
            <p>
              <strong>Status:</strong>{" "}
              {analysis.hiringRecommendation?.status}
            </p>

            <p className="mt-2">
              <strong>Reasoning:</strong>{" "}
              {analysis.hiringRecommendation?.reasoning}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={onGenerateResume}
            disabled={isGenerating}
            className="
      w-full
      py-4
      rounded-2xl
      bg-purple-600
      text-white
      font-semibold
      hover:bg-purple-700
      transition
      disabled:opacity-50
    "
          >
            {isGenerating
              ? "Generating Optimized Resume..."
              : "🚀 Generate ATS Optimized Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIResult;
