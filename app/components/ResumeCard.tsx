import React, {useEffect, useState} from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const {fs}= usePuterStore();
    const [resumeURL, setResumeURL] = useState('');

    useEffect(() => {
        const loadResume= async ()=>{
            const blob = await fs.read(resume.imagePath);
            if(!blob) return;
            const url = URL.createObjectURL(blob);
            setResumeURL(url)
        }
        loadResume();
    }, [resume.imagePath]);

    return (
    <Link
      to={`/resume/${resume.id}`}
      className={"resume-card animate-in fade-in duration-100"}
    >
      <div className={"resume-card-header"}>

        <div className={"flex flex-col gap-2"}>
            {resume.companyName && <h2 className={"!text-black font-bold break-words"}>
                {resume.companyName}
            </h2>}
            {resume.jobTitle && <h3 className={"text-lg text-gray-500 break-words"}>
                {resume.jobTitle}
            </h3>}
            {!resume.companyName && !resume.jobTitle && <h2 className={"!text-black font-bold"}>Resume</h2>}
        </div>

        <div className={"flex-shrink-0"}>
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>

      </div>

        {resumeURL && (<div className={"gradient-border animate-in fade-in duration-1000"}>
            <div className={"h-full w-full"}>
                <img src={resumeURL} alt="resume"
                     className={"w-full h-[350px] max-sm:h-[200px] object-cover object-top"}/>
            </div>
        </div>)}

    </Link>
  );
};
export default ResumeCard;
