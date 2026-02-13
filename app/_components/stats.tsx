"use client";
import { useState, useEffect } from "react";
import { useSharedState } from "../SharedStateContext";

const Stats = () => {
  const {content} = useSharedState();
  const [lang, setLang] = useState<string>("english");

  
  return (
    <div className=" flex flex-col md:flex-row justify-center items-center gap-8 px-4">
      {/* Jobs Posted */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 w-72 hover:scale-105 transition-transform duration-300">
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <i className="fa-solid fa-briefcase text-blue-600 text-2xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {content?.job_posted}
        </h3>
        <p className="text-3xl font-bold text-blue-600">150,000+</p>
      </div>

      {/* Active Job Seekers */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 w-72 hover:scale-105 transition-transform duration-300">
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <i className="fa-solid fa-user-group text-green-600 text-2xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {content?.active_users}
        </h3>
        <p className="text-3xl font-bold text-green-600">50,000+</p>
      </div>

      {/* Companies Hiring */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 w-72 hover:scale-105 transition-transform duration-300">
        <div className="bg-purple-100 p-4 rounded-full mb-4">
          <i className="fa-solid fa-building text-purple-600 text-2xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {content?.campany_amount}
        </h3>
        <p className="text-3xl font-bold text-purple-600">10,000+</p>
      </div>
    </div>
  );
};

export default Stats;
