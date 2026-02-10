"use client";
import Image from "next/image";
import { useEffect, useState,useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Acount from "../account/page";
import Contents from "./Contents";
import { ContentType } from "./Contents";
export default function NavBar() {
  interface accountType {
    name: string;
    email: string;
    role: string;
    profile: string;
    location:string;
    flag:string;
  }
  type Language = {
  id: number;
  language: string;
  short_name: string;
};

  const pathname = usePathname();
  const [hovered, setHovered] = useState<boolean>(false);
  const [user, setUser] = useState<accountType | null>(null);
  const [profileShow, setprofileShow] = useState<boolean>(false);
  const [contents,setContent] = useState<ContentType>()
  const [languages,setLanguages] = useState([])
  const [lang,setLang] = useState<number>(1)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
  const loadContent = async () => {
    const selectedLang = localStorage.getItem("lang");

    if (!selectedLang) {
      const content = await Contents(1); // ✅ await the Promise
      setContent(content);               // now it's ContentType
      setLang(1);
      localStorage.setItem("lang", "1");
    } else {
      const content = await Contents(Number(selectedLang));
      setContent(content);
    }

    // Fetch other data
    const fetchData = async () => {
      const resL = await fetch("/api/languages");
      const langs = await resL.json();
      setLanguages(langs);

      const res = await fetch("/api/users/");
      const data = await res.json();
      if (data.message === "Unauthorized") return;
      setUser(data);
    };
    fetchData();
  };

  loadContent(); // call the async wrapper
}, []);


  const dropdownRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleTranslation(lang:number){
    console.log("the selected language is",lang)
    localStorage.setItem("lang",String(lang))
    return window.location.reload()
  }
  return (
    <nav
      className={`fixed z-10000 p-0 w-full bg-white h-12 items-center justify-between ${pathname == "/account" ? "hidden" : "flex"}`}
    >
      <Link href="/" className="relative m-2 flex gap-4 cursor-pointer">
        <div className="relative">
          <span className="block w-6 h-6 rounded-full bg-sky-600/50"></span>
          <span className="block w-6 h-6 rounded-full bg-sky-600 absolute top-0 -right-[50%] animate-circle"></span>
        </div>
        <span className="font-medium">Jobify</span>
      </Link>
      <ul
        className={`text-black flex p-2 pt-4 md:p-0 md:pr- bg-white md:bg-transparent gap-3 w-full h-screen md:h-fit items-start absolute top-full flex-col  transition-transform duration-300 font-medium ${hovered ? "translate-x-0" : "translate-x-full"} md:w-[60%] md:flex-row md:right-0 md:translate-x-0 md:top-0 md:gap-2 md:relative`}
      >
        <Link
          href="/"
          className="cursor-pointer w-full px-2 py-4 hover:bg-gray-100 transition duration-200 gap-2 flex items-center group md:flex md:justify-center h-12"
        >
          <i className="fas fa-home text-gray-500 group-hover:text-gray-900 overflow-hidden md:w-0"></i>
          {contents?.home_link}{" "}
          <span className="md:hidden ml-auto">
            <i className="fas fa-arrow-right ml-auto scale-0 group-hover:scale-100 transition overflow-hidden md:w-0 md: hidden"></i>
          </span>
        </Link>
        <Link
          href="/jobs?route=appliedJobs"
          className="cursor-pointer w-full px-2 py-4 hover:bg-gray-100 transition duration-200 flex items-center hover:text-gray-900 group md:flex md:justify-center h-12"
        >
          <i className="fa-solid fa-briefcase text-gray-500 group-hover:text-gray-900 overflow-hidden md:w-0 mr-2"></i>
          {contents?.sent_link}
          <span className="md:hidden ml-auto">
            <i className="fas fa-arrow-right ml-auto scale-0 group-hover:scale-100 transition overflow-hidden md:w-0 md: hidden"></i>
          </span>
        </Link>
        {user?.role == "employee" && (
          <Link
            href="/jobs?route=savedJobs"
            className="cursor-pointer w-full px-2 py-4 hover:bg-gray-100 transition duration-200  gap-2 flex items-center hover:text-gray-900 group md:flex md:justify-center h-12"
          >
            <i className="fa-solid fa-bookmark text-gray-500 group-hover:text-gray-900 overflow-hidden md:w-0"></i>
            {contents?.saved_link}
            <span className="md:hidden ml-auto mr-3 ">
              <i className="fas fa-arrow-right scale-0 group-hover:scale-100 transition"></i>
            </span>
          </Link>
        )}
        <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full px-2 py-4 hover:bg-gray-100 transition duration-200  gap-2 flex items-center hover:text-gray-900 group md:flex md:justify-center h-12"
      >
        {lang && languages && "Language"}{lang && languages && <i className="fa-solid fa-chevron-down mt-1"></i>}
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <ul className="absolute mt-2 w-56 bg-white shadow-lg border rounded z-50 max-h-60 overflow-auto">
          {languages && languages.map((language:Language) => (
            <li
              key={language.id}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setLang(language.id);
                setIsOpen(false);
                handleTranslation(language.id)
              }}
            >
              <input
                type="radio"
                checked={lang === language.id}
                readOnly
                className="accent-blue-600"
              />
              <span>{language.language}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
        <Link
          href={user?.role == "employer" ? "/dashboard" : "/jobs"}
          className="cursor-pointer w-full px-2 py-4 hover:bg-gray-100 transition duration-200  gap-2 flex items-center hover:text-gray-900 group md:flex md:justify-center h-12"
        >
          <i
            className={`fa-solid fa-${user?.role == "employee" ? "building" : "gauge"} text-gray-500 group-hover:text-gray-900 overflow-hidden md:w-0`}
          ></i>
          {user?.role == "employer"
            ? contents?.dashboard_link
            : contents?.explore_link}
          <span className="md:hidden ml-auto mr-3 ">
            <i className="fas fa-arrow-right scale-0 group-hover:scale-100 transition"></i>
          </span>
        </Link>
        {user && (
          <div className="max-md:mt-auto max-md:mb-15 relative gap-3 w-full bg-[#f1f5f9] md:bg-transparent h-20 md:h-fit flex items-center justify-start px-3 rounded-xl md:flex-col">
            <div
              onClick={() => setprofileShow(!profileShow)}
              className={`w-8 cursor-pointer h-8 rounded-full flex justify-center mt-2 items-center text-xl text-white peer`}
              style={{ backgroundColor: user.profile }}
            >
              {user.name.substr(0, 1)}
            </div>
            <div
              className={`text-sm peer-hover:block md:absolute md:w-60  md:top-[130%] md:right-5 rounded-lg border border-gray-300 py-12 md:bg-[#f1f5f9] md:py-4 md:px-4 ${profileShow ? "block" : "md:hidden"}`}
            >
              <p>
                <i className="fa-solid fa-user text-gray-600 px-2"></i>{" "}
                {user.name}
              </p>
              <p>
                <i className="fa-solid fa-envelope text-gray-600 px-2"></i>{" "}
                {user.email}
              </p>
              <p className="flex">
                <i className="fa-solid fa-map-marker-alt text-gray-600 pl-2 mr-3" />{" "}
                {user.location} <img src={user.flag} className="w-5 h-5 flex" />
              </p>
              <a
                href="/api/signout/"
                className="text-purple-600 mt-2 block font-sans"
              >
                <i className="fa-solid fa-arrow-left text-gray-600 pl-2 mr-3" />{" "}
                Sign out
              </a>
            </div>
          </div>
        )}

        {!user && pathname != "/account" && (
          <div className="bg-[#f1f5f9] w-full h-20 flex items-center justify-center rounded-xl md:hidden">
            <a className="px-2 py-0 hidden flex-none rounded-full bg-sky-600 text-white font-normal cursor-pointer hover:bg-[#0a2540]">
              Log In&nbsp;
              <i className="fa-solid fa-chevron-right scale-75 my-auto"></i>
            </a>
          </div>
        )}
      </ul>
      {!user && (
        <Link
          href="/account"
          className={`max-md:hidden mr-4 flex-none my-auto px-3 py-1 rounded-full bg-sky-600 text-white font-normal cursor-pointer hover:bg-[#0a2540] ${pathname == "/account" && "opacity-0 pointer-events-none"}`}
        >
          Log In&nbsp;
          <i className="fa-solid fa-chevron-right scale-75 my-auto"></i>
        </Link>
      )}
      <button
        className="cursor-pointer w-8 h-8 flex flex-col gap-2 rounded-full flex items-center justify-center hover:bg-[#f1f5f9] md:hidden"
        onClick={() => setHovered((prev) => !prev)}
      >
        <span
          className={`w-5 h-0.5 bg-black origin-left transition delay-100 ${hovered ? "rotate-45 -translate-y-0.5 translate-x-1" : "rotate-0"}`}
        ></span>
        <span
          className={`w-5 h-0.5 bg-black origin-left transition delay-100 ${hovered ? "-rotate-45 translate-y-0.5 translate-x-1" : "rotate-0"}`}
        ></span>
      </button>
    </nav>
  );
}
