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
  const {content,textColor} = useSharedState();

  return (
    <div>
      <section className={`py-24 px-6 text-${textColor}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/construction-workers-welding-steel-beams.jpg"
              className="rounded-3xl shadow-xl"
              alt="workers"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">
              {content.why_choose_us}
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li>✔ {content.verified_employers}</li>
              <li>✔ {content.ai_matching}</li>
              <li>✔ {content.secure_platform}</li>
              <li>✔ {content.global_opportunities}</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Stafs;
