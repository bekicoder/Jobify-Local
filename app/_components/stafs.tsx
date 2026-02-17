"use client";
import { title } from "process";
import { useSharedState } from "../SharedStateContext";
import { useState, useEffect } from "react";
const Stafs = () => {
  const stafs = [
  {
    name: "Oliver Benjamin",
    img: "/photo-1560250097-0b93528c311a.avif",
    description:
      "Leading strategy and vision to scale hiring platforms AI",
    stars: 4.5,
    halfStar: true,
    color: "bg-sky-600",
    title: "CEO",
  },
  {
    name: "Emily Grace",
    img: "/photo-1494790108377-be9c29b29330.avif",
    description:
      "Managing teams and delivery to ensure reliable operations",
    stars: 5,
    halfStar: false,
    color: "bg-pink-500",
    title: "Team Lead",
  },
  {
    name: "Alexander Carter",
    img: "/photo-1599566150163-29194dcaad36.avif",
    description:
      "Overseeing finance planning compliance and long term rise",
    stars: 5,
    halfStar: false,
    color: "bg-green-500",
    title: "CFO",
  },
  {
    name: "Thomas Anderson",
    img: "/premium_photo-1689539137236-b68e436248de.avif",
    description:
      "Supporting daily tasks coordination and smooth core flow!",
    stars: 3,
    halfStar: true,
    color: "bg-yellow-500",
    title: "Assistant",
  },
];
  const {teams}  = useSharedState();
  const {content,grayText} = useSharedState();
  const [lang, setLang] = useState<string>("english");

  return (
    <div>
      <strong className={`w-full text-center block text-3xl text-${grayText} mb-16`}>
        {content.team}
      </strong>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 justify-items-center px-6">
        {teams.map((p, i) => (
          <div
            key={i}
            className="h-150 min-w-80 max-w-100 w-full flex-1  flex bg-bg-[#f1f5f9] shadow-lg shadow-gray-200 group relative scale- rounded-2xl"
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
