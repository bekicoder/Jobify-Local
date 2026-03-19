"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import ContentType, { citiesType } from "./interfaces";

type job_types = {
  id: number;
  name: string;
};

type JobCategory = {
  id: number;
  name: string;
};

type SharedStateType = {
  lang: string;
  setLang: (val: string) => void;
  content: ContentType;
  setContent: (val: ContentType) => void;
  jobTypes: job_types[];
  jobCategories: JobCategory[];
  cities: citiesType[];
  setCities: (val: citiesType[]) => void;
  mode: string;
  setMode: (arg0: string) => void;
  textColor: string;
  bgColor: string;
  grayText: string;
  lightDark: string;
  borderColor: string;
  lng: string;
  setLng: (val: string) => void;
};

const SharedStateContext = createContext<SharedStateType | undefined>(
  undefined
);

export const SharedStateProvider = ({ children }: { children: ReactNode }) => {

  const [lang, setLang] = useState("En");

  const [content, setContent] = useState<ContentType>({} as ContentType);
  const [jobTypes, setJobTypes] = useState<job_types[]>([]);
  const [jobCategories, setCatagories] = useState<JobCategory[]>([]);
  const [cities, setCities] = useState<citiesType[]>([]);

  const [mode, setMode] = useState("light");
  const [textColor, setTextcolor] = useState("black");
  const [bgColor, setbgcolor] = useState("white");
  const [grayText, setgrayText] = useState("gray-700");
  const [lightDark, setLightD] = useState("white");
  const [borderColor, setBorcolor] = useState("border-gray-200");
  const [lng, setLng] = useState("En");

  const [translations, setTranslations] = useState<unknown>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const res = await fetch("/api/languages");
        const data = await res.json();

        setTranslations(data);

        setContent(data.en.contents);
        setCities(data.en.cities);
        setJobTypes(data.en.jobTypes);
        setCatagories(data.en.categories);

      } catch (err) {
        console.error("Failed to load translations:", err);
      }
    }

    loadTranslations();
  }, []);

  useEffect(() => {
    if(!translations)return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const languages = translations as any
    if (lang === "Am" && lng !== "Hd") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContent(languages.am.contents);
      setCities(languages.am.cities);
      setJobTypes(languages.am.jobTypes);
      setCatagories(languages.am.categories);

    } else if (lang === "En" && lng !== "Hd") {
      setContent(languages.en.contents);
      setCities(languages.en.cities);
      setJobTypes(languages.en.jobTypes);
      setCatagories(languages.en.categories);

    } else if (lng === "Hd") {
      setContent(languages.hd.contents);
      setCities(languages.hd.cities);
      setJobTypes(languages.hd.jobTypes);
      setCatagories(languages.hd.categories);
    }
  }, [lng, translations, lang]);

  useEffect(() => {
    if (mode === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTextcolor("white");
      setbgcolor("[#121212]");
      setgrayText("white");
      setLightD("[#1E1E1E]");
      setBorcolor("gray-500");
    }

    if (mode === "light") {
      setTextcolor("black");
      setbgcolor("white");
      setgrayText("gray-700");
      setLightD("[#f6f9fc]");
      setBorcolor("gray-200");
    }
  }, [mode]);

  useEffect(() => {
    const mode_ = localStorage.getItem("mode");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mode_) setMode(mode_ as string);
  }, []);

  return (
    <SharedStateContext.Provider
      value={{
        lang,
        setLang,
        content,
        setContent,
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
        lng,
        setLng,
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