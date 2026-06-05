import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Analysis() {
  const resumeId = useParams().id;
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const response = await fetch(
        `http://localhost:5000/api/resume/${resumeId}`
      );
      const data = await response.json();
      console.log("Data:",data);
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
    <div className="bg-white min-h-screen px-8 py-8 dark:bg-black">
      <h1 className="text-center text-4xl text-black font-bold mb-8 dark:text-white">
        Resume Analysis
      </h1>
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
          src={analysisData?.resumeUrl}
          title="Resume Preview"
          className="w-full h-full rounded-3xl"
        />
        </div>
        <div className="col-span-7 space-y-6">
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
        </div>
      </div>
    </div>
  );
}

export default Analysis;
