"use client";
import { useState, useEffect } from "react";
import { useSharedState } from "../SharedStateContext";
import { text } from "stream/consumers";

const Stats = () => {
  const { content, bgColor, textColor,grayText,lightDark } = useSharedState();
  const stats = [
    { title: content?.job_posted,count:"150,000+",icon:"fa-briefcase",color:"blue" },
    { title: content?.active_users,count:"50,000+",icon:"fa-user-group",color:"green" },
    { title: content?.campany_amount,count:"10,000+",icon:"fa-building",color:"purple" }
  ];

  return (
    <section className={`py-24 px-6 bg-${lightDark} text-${textColor}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">
            {content.how_it_works}
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className={`p-8 rounded-2xl shadow-md bg-${bgColor}`}>
              <div className="text-sky-600 text-4xl mb-4">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <h3 className="font-semibold text-xl mb-2">{content.create_account}</h3>
              <p className={`text-${grayText}`}>
                {content.create_account_desc}
              </p>
            </div>

            <div className={`bg-${bgColor} p-8 rounded-2xl shadow-md`}>
              <div className="text-sky-600 text-4xl mb-4">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="font-semibold text-xl mb-2">{content.search_jobs}</h3>
              <p className={`text-${grayText}`}>
                {content.create_account_desc}
              </p>
            </div>

            <div className={`bg-${bgColor} p-8 rounded-2xl shadow-md`}>
              <div className="text-sky-600 text-4xl mb-4">
                <i className="fa-solid fa-paper-plane"></i>
              </div>
              <h3 className="font-semibold text-xl mb-2">{content.apply_instantly}</h3>
              <p className={`text-${grayText}`}>
                {content.apply_instantly_desc}
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Stats;
