// src/pages/Ats.tsx
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ResumeSummary from "../components/ResumeSummary";
import AtsResult from "../components/AtsResult";
import {ATSAnalysis} from "../types/ats";
import {ResumeAnalysis} from "../types/resume";
import Navbar from "../components/Navbar";

function Ats() {
  const {id: resumeId} = useParams<{id: string}>();
  const [resumeData, setResumeData] =
    useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] =
    useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<
    "traditional" | "ai"
  >("traditional");
  const [analysisCompleted, setAnalysisCompleted] =
    useState(false);

  // Fetch resume data (same as Analysis page)
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/resume/${resumeId}`
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
    console.log("Job Description:", jobDescription);
    try {
      setIsAnalyzing(true);

      const response = await fetch(
        `http://localhost:5000/api/ats/`,
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

      setAnalysisResult(result?.data);
      setAnalysisCompleted(true);
      setJobDescription("");
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setIsAnalyzing(false);
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

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PANEL - Resume Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 sticky top-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Resume Name
                </p>
                <h2 className="text-xl font-bold wrap-break-word">
                  {resumeName}
                </h2>
              </div>
              <ResumeSummary resume={resumeData} />
              <br />

              <div>
                <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
                  ATS Results
                </h2>
                {analysisResult ? (
                  <AtsResult analysis={analysisResult} />
                ) : (
                  <div className="rounded-3xl border border-dashed border-purple-500/50 bg-purple-500/5 p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                      ATS analysis results will appear here
                      after you analyze a job description.
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Paste a job description and click
                      Analyze ATS Compatibility.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Job Description & Analysis */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6">
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

                <div className="flex flex-col md:flex-row gap-3">
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
                      Gemini-powered review and
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
      </div>
    </div>
  );
}

export default Ats;
