import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeId, setResumeId] = useState("");   
  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:5000/api/resume/upload_resume`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = await response.json();
      setResumeId(data?.resumeId);
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/resume/analyze_resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeId,
          }),
        },
        
      );

      const data = await response.json();
      navigate(`/analysis/${resumeId}`);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mt-10 rounded-3xl border-2 border-dashed border-black/20 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl p-10 shadow-xl">
      <span className="block text-gray-600 dark:text-gray-300">
        Drop your resume here or choose a file
        <br />
        PDF & DOCX only. Max 2MB file size
      </span>

      {!uploadSuccess && (
        <label
          htmlFor="resume"
          className="
            mt-6
            inline-block
            rounded-xl
            bg-linear-to-r
            from-fuchsia-500
            via-purple-500
            to-blue-500
            px-8
            py-3
            font-semibold
            text-white
            cursor-pointer
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Upload Your Resume

          <input
            type="file"
            id="resume"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
        </label>
      )}

      {isUploading && (
        <div className="mt-6 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div> 
          <span className="font-bold text-black/40 dark:text-white">&nbsp;...Processing</span>
        </div>
      )}

      {selectedFile && !isUploading && (
        <p className="mt-4 text-sm text-green-600 font-semibold border-hidden">
          {selectedFile.name}
        </p>
      )}

      {uploadSuccess && (
        <button
          onClick={handleAnalyzeResume}
          disabled={isAnalyzing}
          className="
            mt-6
            rounded-xl
            bg-green-600
            px-8
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-green-700
            disabled:opacity-50
          "
        >
          {isAnalyzing
            ? "Analyzing Resume..."
            : "Parse Resume"}
        </button>
      )}
    </div>
  );
}

export default ResumeUploader;