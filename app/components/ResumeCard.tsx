import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeURL, setResumeURL] = useState("");

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(resume.imagePath);
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            setResumeURL(url);
        };
        loadResume();
    }, [resume.imagePath]);

    return (
        <Link
            to={`/resume/${resume.id}`}
            className="resume-card animate-in fade-in duration-100 bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col gap-4"
        >
            <div className="resume-card-header flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                    {resume.companyName ? (
                        <h2 className="!text-black font-bold text-lg sm:text-xl break-words">
                            {resume.companyName}
                        </h2>
                    ) : (
                        <h2 className="!text-black font-bold text-lg sm:text-xl">Resume</h2>
                    )}
                    {resume.jobTitle && (
                        <h3 className="text-sm sm:text-base text-gray-500 break-words">
                            {resume.jobTitle}
                        </h3>
                    )}
                </div>

                <div className="flex justify-center sm:justify-end">
                    <ScoreCircle score={resume.feedback.overallScore} />
                </div>
            </div>

            
            {resumeURL && (
                <div className="gradient-border animate-in fade-in duration-1000 rounded-xl overflow-hidden">
                    <img
                        src={resumeURL}
                        alt="resume"
                        className="w-full h-[220px] sm:h-[320px] object-cover object-top"
                    />
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;
