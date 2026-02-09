"use client"
import Contents from "./Contents";
import { useState,useEffect } from "react";
export default function Footer() {
  const [contents,setContent] = useState<ContentType>()
    
  useEffect(()=>{
    const selectedLang = localStorage.setItem("lang", "english");
    if(!selectedLang){
      setContent(Contents("english"))
      localStorage.setItem("lang",35)
    }
  },[])
  return (
    <footer className="bg-[#0a2540] text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <a href="/" className="flex items-center gap-3">
            <div className="relative">
              <span className="block w-8 h-8 rounded-full bg-sky-600/50"></span>
              <span className="block w-8 h-8 rounded-full bg-sky-600 absolute top-0 -right-2 animate-circle"></span>
            </div>
            <span className="font-bold text-xl">Jobify</span>
          </a>
          <p className="text-gray-300 text-sm">{contents?.footer_paragraph} </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <a href="/" className="hover:text-sky-500 transition">
            {contents?.home_link}
          </a>
          <a href="/jobs" className="hover:text-sky-500 transition">
            {contents?.explore_link}
          </a>
          <a
            href="/jobs?route=appliedJobs"
            className="hover:text-sky-500 transition"
          >
            {contents?.sent_link}
          </a>
          <a
            href="/jobs?route=savedJobs"
            className="hover:text-sky-500 transition"
          >
            {contents?.saved_link}
          </a>
        </div>

        {/* About */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg mb-2">{contents?.about}</h3>
          <p className="text-gray-300 text-sm">
            {contents?.footer_about_paragraph}
          </p>
          <a href="/about" className="hover:text-sky-500 transition mt-2">
            {contents?.learn_more}
          </a>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg mb-2">{contents?.contact}</h3>
          <p className="text-gray-300 text-sm">
            {contents?.email}: support@jobify.com
          </p>
          <p className="text-gray-300 text-sm">
            {contents?.phone}: +251 9365-84567
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="p-2 bg-sky-600 rounded-full hover:bg-sky-400 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="p-2 bg-sky-600 rounded-full hover:bg-sky-400 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="p-2 bg-sky-600 rounded-full hover:bg-sky-400 transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Jobify. All rights reserved.
      </div>
    </footer>
  );
}
