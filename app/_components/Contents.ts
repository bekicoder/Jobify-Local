export type ContentType = {
  home_link: string;
  sent_link: string;
  saved_link: string;
  explore_link: string;
  dashboard_link: string;
  find_job: string;
  hero_header: string;
  hero_paragraph: string;
  job_posted: string;
  active_users: string;
  campany_amount: string;
  motive_header: string;
  motive_paragraph: string;
  about_us: string;
  about_paragrap: string;
  staf_header: string;
  footer_paragraph: string;
  quick_link: string;
  about: string;
  footer_about_paragraph: string;
  learn_more: string;
  contact: string;
  email: string;
  phone: string;
  right: string;
};

export const Stafs = ()=>{
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
return(stafs)
}
//translate function
async function translateContent(obj: Record<string, string>, targetLang: number) {
  // 1️⃣ Get entries [key, value] from the object
  const entries = Object.entries(obj);
  // 2️⃣ Map over entries and create promises
    console.log("this is for cheack up",targetLang)
    const targetLangNum = Number(targetLang);
  const promises = entries.map(async ([key, value]) => {
    console.log({ text: value, targetLangNum })
    console.log("this is for cheack up",targetLangNum)

    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value,targetLang  }),
    });
    const data = await res.json();

    // 3️⃣ Return [key, translatedValue]
    return [key, data.translatedText];
  });

  // 4️⃣ Wait for all promises to finish
  const translatedEntries = await Promise.all(promises);

  // 5️⃣ Convert back to object
  const translatedObj = Object.fromEntries(translatedEntries);

  return translatedObj;
}
const Contents = async (lang:number) => {
  const content = {
    home_link: "Home",
    sent_link: "Applied",
    saved_link: "Bookmark",
    explore_link: "Discover",
    dashboard_link: "Dashboard",
    find_job:"Find Jobs",
    hero_header: "Step Into Your Future with the Perfect Job",
    hero_paragraph:
      "Browse thousands of openings, apply in seconds, and land the role you deserve.",
    job_posted: "Jobs Posted",
    active_users: "Active Job Seekers",
    campany_amount: "Companies Hiring",
    motive_header: "The best way to get Job",
    motive_paragraph:
      "Turn every job application into a real opportunity with expert guidance on networking, personal branding, and interview mastery.",
    about_us: "About Us",
    about_paragrap:
      "Jobify is a neutral, autonomous organization that connects employers with job seekers worldwide. Founded in 2026 by Bereket Girma, Jobify operates in 80+ countries, simplifying hiring and job searching through a trusted and user-friendly platform.",
    staf_header: "Our Community",
    footer_paragraph:
      "Jobify connects job seekers with the best opportunities worldwide. Apply in seconds and land your dream role.",
    quick_link: "Quick Links",
    about: "About",
    footer_about_paragraph: `Founded in 2026 by Bereket Girma, Jobify operates in 80+ countries,
            simplifying hiring and job searching.`,
    learn_more: "Learn More",
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    right: " All rights reserved.",
  };

  const engContent = {
    home_link: "Home",
    sent_link: "Applied",
    saved_link: "Bookmark",
    explore_link: "Discover",
    dashboard_link: "Dashboard",
    find_job:"Find Jobs",
    hero_header: "Step Into Your Future with the Perfect Job",
    hero_paragraph:
      "Browse thousands of openings, apply in seconds, and land the role you deserve.",
    job_posted: "Jobs Posted",
    active_users: "Active Job Seekers",
    campany_amount: "Companies Hiring",
    motive_header: "The best way to get Job",
    motive_paragraph:
      "Turn every job application into a real opportunity with expert guidance on networking, personal branding, and interview mastery.",
    about_us: "About Us",
    about_paragrap:
      "Jobify is a neutral, autonomous organization that connects employers with job seekers worldwide. Founded in 2026 by Bereket Girma, Jobify operates in 80+ countries, simplifying hiring and job searching through a trusted and user-friendly platform.",
    staf_header: "Our Community",
    footer_paragraph:
      "Jobify connects job seekers with the best opportunities worldwide. Apply in seconds and land your dream role.",
    quick_link: "Quick Links",
    about: "About",
    footer_about_paragraph: "paragph",
    learn_more: "Learn More",
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    right: " All rights reserved.",
  };
  if (lang ==1) {
  return content;
  }else{
    const targetLang = Number(lang);
    console.log("it is not english",lang,targetLang,typeof(targetLang))
     const translatedContent = await translateContent(content, targetLang);
     console.log(translatedContent)
     return content
  }
};

export default Contents;
