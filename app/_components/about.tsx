
import Image from "next/image";
const About = ()=>{
    return(
        <div>
            <div className="bg-[url('/cubes.png')] bg-sky-50 bg-repeat bg-gray-5 ">
            <div className="flex flex-col-reverse gap-16 items-center md:flex-row md:w-[70%] ml-auto py-10">
         <Image
            width={700}
            height={50}
            className="max-md:w-80"
            src='/cunning-businessman-squeezing-briefcase-removebg-preview.png'
            alt="cunning-businessman-squeezing-briefcase"
            />
        <div className=" flex flex-col items-center">
          <h1 className="text-2xl font-medium text-[#0a2540] text-center mb-2">The best way to get Job</h1>
          <p className="w-[50%] text-center">Turn every job application into a real opportunity with expert guidance on networking, personal branding, and interview mastery.</p>
         </div>
            </div>
        </div>
        <div className="flex flex-col items-center gap-7 mt-16">
        <strong className="w-full text-center block text-3xl text-[#0a2540]">About Us</strong>
        <p className="w-[70%]">
            Jobify is a neutral, autonomous organization that connects employers with job seekers worldwide. Founded in 2026 by Bereket Girma, Jobify operates in 80+ countries, simplifying hiring and job searching through a trusted and user-friendly platform.
        </p>
        </div>
        </div>
    )
}

export default About;