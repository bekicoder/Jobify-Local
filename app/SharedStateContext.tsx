// app/context/SharedStateContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import {contents as contentsEn,teams as teamsEn,categories as categoriesEn,jobTypes as jobTypesEn,cities as citiesEn} from "@/lib/languages/en.json"
import {contents as contentsAm,teams as teamsAm,categories as categoriesAm,jobTypes as jobTypesAm,cities as citiesAm} from "@/lib/languages/am.json"
import ContentType, { citiesType } from "./interfaces";
// Define all states you want to share
type job_types = {
  id: number;
  name: string;
};
type JobCategory = {
  id: number;
  name: string;
};
type teamsType = {
  name: string;
  img: string;

  description: string;
  stars: number;
  halfStar: boolean;
  color: string;
  title: string;
};
type SharedStateType = {
  lang: string;
  setLang: (val: string) => void;
  content: ContentType;
  setContent: (val: ContentType) => void;
  jobTypes: job_types[];
  jobCategories: JobCategory[];
  teams: teamsType[];
  cities: citiesType[];
  setCities: (val: citiesType[]) => void;
  mode:string;
  setMode:(arg0:string)=> void;
  textColor:string;
  bgColor:string;
  grayText:string;
  lightDark:string;
  borderColor:string;
};

const SharedStateContext = createContext<SharedStateType | undefined>(
  undefined,
);

export const SharedStateProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState("En");
  const [content, setContent] = useState<ContentType>(contentsEn);
  const [jobTypes, setJobTypes] = useState<job_types[]>(jobTypesEn);
  const [jobCategories, setCatagories] = useState<JobCategory[]>(categoriesEn);
  const [teams, setTeam] = useState<teamsType[]>(teamsEn);
  const [cities, setCities] = useState<citiesType[]>(citiesEn);
  const [mode,setMode] = useState("light")
  const [textColor,setTextcolor] = useState("black")
  const [bgColor,setbgcolor] = useState("white")
  const [grayText,setgrayText] = useState("gray-700")
  const [lightDark,setLightD] = useState("white")
  const [borderColor,setBorcolor] = useState("border-gray-200")
  useEffect(() => {
    if (lang == "Am") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContent(contentsAm);
      setCities(citiesAm);
      setJobTypes(jobTypesAm);
      setCatagories(categoriesAm);
      setTeam(teamsAm);
    }
    else if (lang == "En") {
      setContent(contentsEn);
      setCities(citiesEn);
      setJobTypes(jobTypesEn);
      setCatagories(categoriesEn);
      setTeam(teamsEn);
    }
  }, [lang]);
  useEffect(()=>{
    if(mode == "dark"){
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTextcolor("white")
    setbgcolor("[#121212]")
    setgrayText("white")
    setLightD("[#1E1E1E]")
    setBorcolor("gray-500")
  }if(mode == "light"){
    setTextcolor("black")
    setbgcolor("white")
    setgrayText("gray-700")
    setLightD("[#f6f9fc]")
    setBorcolor("gray-200")
  }
  },[mode])
  useEffect(()=>{
    const mode_ = localStorage.getItem("mode")
    console.log(mode_,"this is the mode")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if(mode_) setMode(mode_ as string)
  },[])

  return (
    <SharedStateContext.Provider
      value={{
        lang,
        setLang,
        content,
        setContent,
        teams,
        jobCategories,
        jobTypes,
        cities,
        setCities,
        mode,
        setMode,
        textColor,
        bgColor,
        grayText,
        lightDark,
        borderColor,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context)
    throw new Error("useSharedState must be used within SharedStateProvider");
  return context;
};
