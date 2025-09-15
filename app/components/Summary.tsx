import React from 'react'
import ScoreGauge from "~/components/ScoreGauge";

const Category = ({title,score}: {title:string, score:number})=>{
    const textColour = score > 70 ? "text-green-600" : score > 45 ? "text-yellow-600" : "text-red-600";
    const ratingText = score > 70 ? "Strong" : score > 45 ? "Good Start" : "Needs Work";
    const bgColour = score > 70 ? "bg-badge-green" : score > 45 ? "bg-badge-yellow" : "bg-badge-red";

    return(
        <div className={"resume-summary"}>
            <div className={"category"}>
                <div className={"flex flex-row gap-2 items-center justify-center"}>
                    <p className={"text-2xl"}>{title}</p>
                    <div className={`${bgColour} ${textColour} px-3 py-1 rounded-full`}>
                        <p className={"text-sm font-medium"}>{ratingText}</p>
                    </div>
                </div>
                <p className={"text-2xl"}>
                    <span className={textColour}>{score}</span>
                    /100
                </p>
            </div>
        </div>
    )
}

const Summary = ({feedback}: {feedback: Feedback}) => {
    return (
        <div className={"bg-white rounded-2xl shadow-md w-full"}>
            <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4 sm:gap-8 text-center sm:text-left">
                <ScoreGauge score={feedback.overallScore} />
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl sm:text-2xl font-bold">Your Resume Score</h2>
                    <h3 className="text-gray-500 text-sm sm:text-base">
                        This score is calculated based on the variables listed below
                    </h3>
                </div>
            </div>

            <Category title={"Tone & Style"} score={feedback.toneAndStyle.score} />

            <Category title={"Content"} score={feedback.content.score} />

            <Category title={"Structure"} score={feedback.structure.score} />

            <Category title={"Skills"} score={feedback.skills.score} />

        </div>
    )
}
// @ts-ignore
export default Summary
