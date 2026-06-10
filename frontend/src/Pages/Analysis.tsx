import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ResumeSummary from "../components/ResumeSummary";
import Navbar from "../components/Navbar";

function Analysis() {
  const resumeId = useParams().id;
  const [analysisData, setAnalysisData] = useState(null);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );
  }, [darkMode]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/resume/${resumeId}`
      );
      const data = await response.json();
      setAnalysisData(data);
    };

    fetchAnalysis();
  }, [resumeId]);

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Resume Analysis...
      </div>
    );
  }

  const resume = (analysisData as any)?.data;

  return (
    <div className="bg-white min-h-screen px-8 py-8  pattern-background">
      <Navbar header1="Resume Overview" />
      <div className="grid grid-cols-12 gap-6">
        <div
          className="col-span-5 
        sticky 
        top-6 
        h-[90vh]
        rounded-3xl
        border
        border-black/20
        bg-black/5
        flex
        items-center
        justify-center
        "
        >
          <iframe
            src={(analysisData as any)?.resumeUrl}
            title="Resume Preview"
            className="w-full h-full rounded-3xl"
          />
        </div>
        <div className="col-span-7 space-y-6">
          <ResumeSummary resume={resume} />
          <div
            className="rounded-3xl 
          border 
          border-black/20 
          bg-black/5
          p-6
          backdrop-blur-xl
          "
          >
            <h2 className="text-xl font-semibold mb-6">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Name</p>
                <p>{resume.contact.name}</p>
              </div>

              <div>
                <p className="text-gray-400">Email</p>
                <p>{resume.contact.email}</p>
              </div>

              <div>
                <p className="text-gray-400">Phone</p>
                <p>{resume.contact.phone}</p>
              </div>

              <div>
                <p className="text-gray-400">GitHub</p>
                <p>{resume.contact.github}</p>
              </div>

              <div>
                <p className="text-gray-400">LinkedIn</p>
                <p>{resume.contact.linkedIn}</p>
              </div>
            </div>
          </div>
          {/* SKILLS */}
          <div
            className="
            rounded-3xl
            border
            border-black/20
            dark:border-white/10
            bg-black/5
            dark:bg-white/5
            p-6
            "
          >
            <h2 className="text-2xl font-semibold mb-6">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill: any) => (
                <span
                  key={skill}
                  className="
                  px-4
                  py-2
                  rounded-full
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  text-sm
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* EXPERIENCE */}
          <div
            className="
            rounded-3xl
            border
            border-black/20
            dark:border-white/10
            bg-black/5
            dark:bg-white/5
            p-6
            "
          >
            <h2 className="text-2xl font-semibold mb-6">
              Experience
            </h2>

            <div className="space-y-4">
              {resume.experience.map(
                (exp: any, index: any) => (
                  <div
                    key={index}
                    className="
                  rounded-2xl
                  border
                  border-black/10
                  dark:border-white/10
                  bg-black/5
                  dark:bg-white/5
                  p-5
                  "
                  >
                    <h3 className="font-semibold text-lg">
                      {exp.title}
                    </h3>

                    <p className="text-purple-500">
                      {exp.company}
                    </p>

                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          {/* EDUCATION */}
          <div
            className="
            rounded-3xl
            border
            border-black/20
            dark:border-white/10
            bg-black/5
            dark:bg-white/5
            p-6
            "
          >
            <h2 className="text-2xl font-semibold mb-6">
              Education
            </h2>

            <div className="space-y-4">
              {resume.education.map(
                (edu: any, index: any) => (
                  <div
                    key={index}
                    className="
                  rounded-2xl
                  border
                  border-black/10
                  dark:border-white/10
                  bg-black/5
                  dark:bg-white/5
                  p-5
                  "
                  >
                    <h3 className="font-semibold text-lg">
                      {edu.degree}
                    </h3>

                    <p>{edu.institution}</p>

                    <p className="text-gray-500">
                      {edu.score}
                    </p>

                    <p className="text-gray-500">
                      {edu.year}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div
            className="
  rounded-3xl
  border
  border-black/20
  dark:border-white/10
  bg-linear-to-r
  from-purple-500/10
  to-blue-500/10
  p-8
  text-center
  "
          >
            <h2 className="text-2xl font-bold mb-4">
              Resume Successfully Parsed ✓
            </h2>

            <p className="text-gray-500 mb-6">
              Your resume has been analyzed successfully.
              Continue to ATS Optimization to see how well
              your resume matches a target job description.
            </p>

            <button
              onClick={() => navigate(`/ats/${resumeId}`)}
              className="
      px-8
      py-3
      rounded-xl
      bg-purple-600
      text-white
      font-semibold
      hover:bg-purple-700
      transition
    "
            >
              Analyze ATS Compatibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
