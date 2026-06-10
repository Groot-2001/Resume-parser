import React from "react";
import {OptimizedResumeType as OptimizedResumeTypes} from "../types/optimizedResume";

interface OptimizedResumeProps {
  resume: OptimizedResumeTypes;
}

function OptimizedResume({resume}: OptimizedResumeProps) {
  return (
    <div className="rounded-3xl border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 mt-6">
      <h2 className="text-2xl font-bold mb-8">
        🚀 ATS Optimized Resume
      </h2>

      {/* Header */}
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold">
          {resume.header.name}
        </h1>

        <p className="mt-2">{resume.header.title}</p>

        <p className="text-sm text-gray-500 mt-2">
          {resume.header.location} | {resume.header.phone} |{" "}
          {resume.header.email}
        </p>

        <p className="text-sm">
          {resume.header.github} | {resume.header.linkedin}
        </p>
      </div>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2">
          Professional Summary
        </h3>

        <p>{resume.summary}</p>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Technical Skills
        </h3>

        <div className="space-y-2">
          <p>
            <strong>Backend:</strong>{" "}
            {resume.skills.backend.join(", ")}
          </p>

          <p>
            <strong>Frontend:</strong>{" "}
            {resume.skills.frontend.join(", ")}
          </p>

          <p>
            <strong>Databases:</strong>{" "}
            {resume.skills.databases.join(", ")}
          </p>

          <p>
            <strong>Cloud & Tools:</strong>{" "}
            {resume.skills.cloudAndTools.join(", ")}
          </p>

          <p>
            <strong>Concepts:</strong>{" "}
            {resume.skills.concepts.join(", ")}
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h3
          className=" text-xl
  font-bold
  border-b
  border-purple-500/30
  pb-2
  mb-4"
        >
          Professional Experience
        </h3>

        {resume.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold">{exp.title}</h4>

              <span className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>

            <p className="text-gray-500">{exp.company}</p>

            <ul className="list-disc list-inside space-y-2">
              {exp.bulletPoints.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Projects
        </h3>

        {resume.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold">
              {project.name}
            </h4>

            <ul className="list-disc list-inside mt-2">
              {project.bulletPoints.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
  <h3
    className="
      text-xl
      font-bold
      border-b
      border-purple-500/30
      pb-2
      mb-4
    "
  >
    Education
  </h3>

  <div className="overflow-x-auto">
    <table
      className="
        w-full
        border-collapse
        rounded-xl
        overflow-hidden
      "
    >
      <thead>
        <tr
          className="
            bg-purple-500/10
            border-b
            border-purple-500/20
          "
        >
          <th className="text-left p-3">
            Degree
          </th>

          <th className="text-left p-3">
            Institution
          </th>

          <th className="text-left p-3">
            Score
          </th>

          <th className="text-left p-3">
            Year
          </th>
        </tr>
      </thead>

      <tbody>
        {resume.education.map(
          (edu, index) => (
            <tr
              key={index}
              className="
                border-b
                border-black/10
                dark:border-white/10
              "
            >
              <td className="p-3">
                {edu.degree}
              </td>

              <td className="p-3">
                {edu.institution}
              </td>

              <td className="p-3">
                {edu.score}
              </td>

              <td className="p-3">
                {edu.year}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
</section>

      {/* Certifications */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Certifications
        </h3>

        <ul className="list-disc list-inside">
          {resume.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default OptimizedResume;
