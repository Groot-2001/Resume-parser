// src/pages/Ats.tsx
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import AtsResult from "../components/AtsResult";
import {ATSAnalysis} from "../types/ats";
import {ResumeAnalysis} from "../types/resume";
import Navbar from "../components/Navbar";
import AIResult from "../components/AIResult";
import {OptimizedResumeType} from "../types/optimizedResume";
import OptimizedResume from "../components/OptimizedResume";
import {useRef} from "react";

function Ats() {
  const {id: resumeId} = useParams<{id: string}>();
  const [resumeData, setResumeData] =
    useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] =
    useState<ATSAnalysis | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<
    "traditional" | "ai"
  >("traditional");
  const [analysisCompleted, setAnalysisCompleted] =
    useState(false);
  const [isGeneratingResume, setIsGeneratingResume] =
    useState(false);
  const [optimizedResume, setOptimizedResume] =
    useState<OptimizedResumeType | null>(null);
  const [lastAnalyzedJD, setLastAnalyzedJD] = useState("");
  const aiResultRef = useRef<HTMLDivElement>(null);
  const optimizedResumeRef = useRef<HTMLDivElement>(null);

  // Fetch resume data (same as Analysis page)
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/resume/${resumeId}`
        );
        const data = await response.json();
        setResumeData(data?.data);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      } finally {
        setLoading(false);
      }
    };
    if (resumeId) fetchResume();
  }, [resumeId]);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert(
        "Please paste a job description before analyzing."
      );
      return;
    }
    setOptimizedResume(null);
    try {
      setIsAnalyzing(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/ats/`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            resumeId,
            jobDescription,
            analysisType,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "ATS Analysis Failed"
        );
      }
      if (analysisType === "ai") {
        setAiResult(result.data);
        setAnalysisResult(null);
        setLastAnalyzedJD(jobDescription);
      } else {
        setAnalysisResult(result?.data);
        setAiResult(null);
        setLastAnalyzedJD(jobDescription);
      }

      setAnalysisCompleted(true);
      requestAnimationFrame(() => {
        aiResultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    } catch (error) {
      alert(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateResume = async () => {
    try {
      setIsGeneratingResume(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/resume/generate-optimized-resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeId,
            jobDescription: lastAnalyzedJD,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to generate optimized resume"
        );
      }

      setOptimizedResume(result?.data);
      requestAnimationFrame(() => {
        optimizedResumeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setIsGeneratingResume(false);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/resume/download-optimized-resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeId,
          }),
        }
      );

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "optimized_resume.pdf";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const getButtonText = () => {
    if (isAnalyzing) {
      return "Analyzing...";
    }

    if (!jobDescription.trim()) {
      return analysisCompleted
        ? "✓ Analysis Successful"
        : "Paste Job Description";
    }

    return "Analyze ATS Compatibility";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold dark:bg-black bg-white">
        Loading resume data...
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold dark:bg-black bg-white">
        Resume not found. Please go back and try again.
      </div>
    );
  }

  const resumeName =
    resumeData?.contact?.name || "Unknown Resume";

  return (
    <div className="bg-white dark:bg-black min-h-screen px-4 py-8 md:px-8 pattern-background">
      <div className="max-w-7xl mx-auto">
        <Navbar header1="ATS Compatibility Analyzer" />

        <div className="max-w-5xl mx-auto">
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6">
              <div
                className="mb-6 text-center border-purple-500 bg-purple-500/10 flex-1
      p-4
      rounded-2xl
      border
      cursor-pointer
      transition-all"
              >
                <p className="text-sm text-gray-500">
                  Resume Selected
                </p>

                <h4 className="text-2xl font-semibold mt-1 text-black/70 ">
                  {resumeName}
                </h4>
              </div>
              <label
                htmlFor="jobDescription"
                className="block text-lg font-semibold mb-3"
              >
                Job Description
              </label>
              <div className="mb-6">
                <p className="font-semibold mb-3">
                  Choose Analysis Type
                </p>

                <div className="flex flex-col md:flex-row gap-3 mt3">
                  <label
                    className={`
      flex-1
      p-4
      rounded-2xl
      border
      cursor-pointer
      transition-all
      ${
        analysisType === "traditional"
          ? "border-purple-500 bg-purple-500/10"
          : "border-black/20 dark:border-white/10"
      }
    `}
                  >
                    <input
                      type="radio"
                      name="analysisType"
                      value="traditional"
                      checked={
                        analysisType === "traditional"
                      }
                      onChange={() =>
                        setAnalysisType("traditional")
                      }
                      className="hidden"
                    />

                    <h3 className="font-semibold">
                      Quick ATS Check
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Fast keyword and skill matching
                    </p>
                  </label>

                  <label
                    className={`
      flex-1
      p-4
      rounded-2xl
      border
      cursor-pointer
      transition-all
      ${
        analysisType === "ai"
          ? "border-purple-500 bg-purple-500/10"
          : "border-black/20 dark:border-white/10"
      }
    `}
                  >
                    <input
                      type="radio"
                      name="analysisType"
                      value="ai"
                      checked={analysisType === "ai"}
                      onChange={() => setAnalysisType("ai")}
                      className="hidden"
                    />

                    <h3 className="font-semibold">
                      AI Resume Coach
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Grok-powered review and
                      recommendations
                    </p>
                  </label>
                </div>
              </div>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);

                  if (analysisCompleted) {
                    setAnalysisCompleted(false);
                  }
                  setOptimizedResume(null);
                  setAiResult(null);
                  setAnalysisResult(null);
                }}
                placeholder="Paste the target job description here..."
                className="w-full h-80 p-4 rounded-2xl border border-black/20 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mt-6 w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
        {/* Analysis Results */}

        {(analysisResult || aiResult) && (
          <div
            className="mt-8 scroll-mt-24"
            ref={aiResultRef}
          >
            {analysisResult ? (
              <AtsResult analysis={analysisResult} />
            ) : (
              <AIResult
                analysis={aiResult}
                onGenerateResume={handleGenerateResume}
                isGenerating={isGeneratingResume}
              />
            )}
          </div>
        )}
        {isGeneratingResume && (
          <div className="mt-8 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6 text-center">
            Generating ATS Optimized Resume...
          </div>
        )}

        {optimizedResume && (
          <div
            className="mt-8 scroll-mt-24"
            ref={optimizedResumeRef}
          >
            <OptimizedResume resume={optimizedResume} />
          </div>
        )}
        {optimizedResume && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDownloadResume}
              className="
        px-8
        py-4
        rounded-2xl
        bg-purple-600
        text-white
        font-semibold
        hover:bg-purple-700
        transition
      "
            >
              📄 Download PDF Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ats;
