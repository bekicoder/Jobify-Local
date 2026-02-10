"use client"
import Contents from "./Contents";
import {useState,useEffect} from "react"
import Image from "next/image";
import { ContentType } from "./Contents";
const About = () => {
  const [contents,setContent] = useState<ContentType>()
  const [lang, setLang] = useState<string>("english");
  
  // Load language content

  useEffect(() => {
    const loadContent = async () => {
      const selectedLang = localStorage.getItem("lang");

      if (!selectedLang) {
        const content = await Contents(1); // default language
        setContent(content);
        setLang("english");
        localStorage.setItem("lang", "1");
      } else {
        const content = await Contents(Number(selectedLang));
        setContent(content);
      }
    };

    loadContent();
  }, []);

  return (
    <div>
      <div className="bg-[url('/cubes.png')] bg-sky-50 bg-repeat bg-gray-5 ">
        <div className="flex flex-col-reverse gap-16 items-center md:flex-row md:w-[70%] ml-auto py-10">
          <Image
            width={700}
            height={50}
            className="max-md:w-80"
            src="/cunning-businessman-squeezing-briefcase-removebg-preview.png"
            alt="cunning-businessman-squeezing-briefcase"
          />
          <div className=" flex flex-col items-center">
            <h1 className="text-2xl font-medium text-[#0a2540] text-center mb-2">
              {contents?.motive_header}
            </h1>
            <p className="w-[50%] text-center">{contents?.motive_paragraph}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-7 mt-16">
        <strong className="w-full text-center block text-3xl text-[#0a2540]">
          {contents?.about_us}
        </strong>
        <p className="w-[70%]">{contents?.about_paragrap}</p>
      </div>
    </div>
  );
};

export default About;
