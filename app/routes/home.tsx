import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";

import {Link, useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ProfileIQ" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
    // To maintain security, if a user tries to access the page without being authenticated they get rerouted to the sign in page
    const {auth, kv }= usePuterStore();
    const navigate= useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if(!auth.isAuthenticated) navigate("/auth?next=/");
    },[auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async ()=>{
            setLoadingResumes(true);

            const resumes= (await kv.list("resume:*", true)) as KVItem[];

            const parsedResumes= resumes?.map((resume)=>(
                JSON.parse(resume.value) as Resume
            ))

            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }
        loadResumes();
    }, []);


    return (
    <main className={"bg-[url('/images/bg-main.svg')] bg-cover min-h-screen"}>
      <Navbar />
      <section className={"main-section px-4 sm:px-8"}>
        <div className={"page-heading py-12 text-center sm:py-16"}>
          <h1 className="!text-2xl sm:text-4xl font-bold leading-tight">Track Your Applications & Resume Ratings</h1>
            {!loadingResumes && resumes.length === 0 ?(
                <h2 className="text-base sm:text-lg text-gray-600">No resumes found. Upload your first resume to get feedback</h2>
            ):(
                <h2 className="text-base sm:text-lg text-gray-600">Review your submissions and check AI-powered feedback.</h2>
            )}
        </div>

          {loadingResumes && (
              <div className={"flex flex-col items-center justify-center"}>
                  <img src={"/images/resume-scan-2.gif"} alt={"loading"} className={"w-[200px]"} />
              </div>
          )}

        {!loadingResumes && resumes.length > 0 && (
          <div className={"resumes-section"}>
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

          {!loadingResumes && resumes.length === 0 && (
              <div className={"flex-col items-center justify-center mt-10 gap-4"}>
                  <Link to={"/upload"} className={"primary-button w-full sm:w-auto text-lg sm:text-xl font-semibold text-center"}>
                    Upload Resume
                  </Link>
              </div>
          )}
      </section>
    </main>
  );
}
