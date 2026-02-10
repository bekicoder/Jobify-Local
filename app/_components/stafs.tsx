"use client"

import { title } from "process";
import Contents from "./Contents";
import { useState,useEffect } from "react";
import { Stafs as StafsData } from "./Contents";
import { ContentType } from "./Contents";
const Stafs = () => {
  const stafs = StafsData();
   const [contents, setContent] = useState<ContentType | null>(null);
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
      setContent(content); // now safe, always ContentType
    }
  };

  loadContent();
}, []);
  return (
    <div>
      <strong className="w-full text-center block text-3xl text-[#0a2540] mb-16">
        Our Community
      </strong>
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 justify-items-center">
        {stafs.map((p, i) => (
          <div
            key={i}
            className="h-140 w-100 bg-bg-[#f1f5f9] shadow-lg shadow-gray-200 group relative scale- rounded-2xl"
          >
            <span className="w-10 h-10 bg-gray-200 rounded-full absolute left-full -translate-x-[50%] -translate-y-[20%] flex justify-center items-center z-10">
              <i className="fa-solid fa-quote-right text-xl"></i>
            </span>
            <div className="w-full h-full overflow-hidden rounded-2xl">
              <div className="h-[65%] w-full flex relative ">
                <div
                  style={{ backgroundImage: `url(${p.img})` }}
                  className={`w-full h-full bg-cover group-hover:scale-110 transition-transform duration-200 origin-bottom`}
                ></div>
                <div
                  className={`h-16 w-150 absolute ${p.color} bottom-0 origin-center -rotate-8 translate-5 transition duration-200 -translate-x-8 group-hover:rotate-0`}
                ></div>
              </div>
              <div className="pt-8 text-center">
                <p className="mt-2 font-bold">{p.name}</p>
                <p className="mt-1">{p.title}</p>
                <p className="px-8 font-medium text-gray-500">
                  {p.description}
                </p>
                <span className="flex gap-2 justify-center mt-3">
                  {Array.from({ length: p.stars }).map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-500"></i>
                  ))}
                  {p.halfStar && (
                    <i className="fas fa-solid fa-star-half-stroke text-yellow-500"></i>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stafs;
