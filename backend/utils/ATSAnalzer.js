
function getATSRating(score) {
  if (score >= 90) {
    return "Excellent Match";
  }

  if (score >= 75) {
    return "Strong Match";
  }

  if (score >= 60) {
    return "Moderate Match";
  }

  return "Needs Improvement";
}

function generateRecommendations(
  missingSkills
) {
  return missingSkills.map(
    skill =>
      `Consider adding ${skill} experience if applicable.`
  );
}

function generateStrengths(
  matchedSkills
) {
  return matchedSkills.map(
    skill =>
      `Your resume demonstrates ${skill} experience, which matches with JD's Required skill`
  );
}

function generateWeaknesses(
  missingSkills
) {
  return missingSkills.map(
    skill =>
      `${skill} was found in the job description but not in your resume.`
  );
}

function generateSummary(
  atsScore,
  matchedSkills,
  missingSkills
) {
  const topMatched =
    matchedSkills.slice(0, 3).join(", ");

  const topMissing =
    missingSkills.slice(0, 3).join(", ");

  return `Your resume matches ${atsScore}% of the required skills. Strong alignment with ${topMatched}. Consider improving or highlighting experience in ${topMissing}.`;
}

const ATSAnalyzeTraditional = (ResumeSkills, JDSkills) =>{

    if (JDSkills.length === 0) {
        return {
          atsScore: 0,
          matchedSkills: [],
          missingSkills: [],
        };
      }

    // matched skills
    const matchedSkills = ResumeSkills.filter((resumeSkill)=>{
        return JDSkills.includes(resumeSkill);
    });

    // missing skills
    const missingSkills = JDSkills.filter((jdskill)=>{
        return !ResumeSkills.includes(jdskill);
    })
    // ats score
    const atsScore = Math.round(
        (matchedSkills.length /
          JDSkills.length) * 100
      );

    const rating = getATSRating(atsScore);


    return {
        atsScore,
        rating,
        summary: generateSummary(atsScore,matchedSkills,missingSkills),
        matchedSkills,
        missingSkills,
        strengths: generateStrengths(matchedSkills),
        weaknesses: generateWeaknesses(missingSkills),
        recommendations: generateRecommendations(missingSkills)
    }
}

module.exports = ATSAnalyzeTraditional;