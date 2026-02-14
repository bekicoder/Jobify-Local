import { SetStateAction } from "react";
export default interface ContentType {
  myJobs: string;
    createJob: string;
    proposals: string;
    create: string;
    edit: string
  alreadySignedInMessage:string;
  organizationName:string;
  password: string;
  signUp: string;
  fname: string;
  lname: string;
  role: string;
  employee: string;
  employer: string;
  haveAccount: string;
  logIn: string;
  about: string;
  footer_about_paragraph: string;
  contact: string;
  email: string;
  phone: string;
  home_link: string;
  sent_link: string;
  saved_link: string;
  explore_link: string;
  dashboard_link: string;
  find_job: string;
  hero_header: string;
  hero_paragraph:string;
  job_posted: string;
  active_users: string;
  campany_amount: string;
  motive_header: string;
  motive_paragraph:string;
  about_us: string;
  about_paragraph:string;
  staf_header: string;
  footer_paragraph:string;
  links:string;
  categories:string;
  location:string;
  jobType:string;
  salary:string;
  jobSearchPlaceholder:string;
  proposalPlaceholder:string;
 writeProposal:string;
  markdownSupport:string;
  headline:string;
  careers:string;
  below:string;
  send:string;
  dashboard:string;
  workspace:string;
  inbox:string;
  name:string;
  post:string;
  team:string;
  aboutJob:string;
  signOut:string;
  jobDetails:string;
  title:string;
  language:string;
  apply:string;
  learn_more:string;
  right:string;
  donhave: string;
  createOne: string;
  notMemeber:string;
};
export interface income_range {
  id: number;
  label: string;
}
export interface _Fd {
  [key:string]:string | number
  title: string;
  detail: string;
  salary_range: string;

  EnCategory: string;
  FrCategory: string;
  ArCategory: string;
  AmCategory: string;

  EnJobType: string;
  FrJobType: string;
  ArJobType: string;
  AmJobType: string;
}
export interface _myjobsType {
  [key:string]:string|number,
 id: number;
  created_at: string; 
  posted_by: string; 
  flag: string;     
  salary_range: string;

  titleEn: string;
  detailEn: string;
  EnLocation: string;
  EnCategory: string;
  EnJobtype: string;

  titleAm: string;
  detailAm: string;
  AmLocation: string;
  AmCategory: string;
  AmJobtype: string;

  titleAr: string;
  detailAr: string;
  ArLocation: string;
  ArCategory: string;
  ArJobtype: string;

  titleFr: string;
  detailFr: string;
  FrLocation: string;
  FrCategory: string;
  FrJobtype: string;
}
export interface DetailsPanelType {
  option: string;
  job: _myjobsType;
  setJobdetail: React.Dispatch<SetStateAction<number | null>>;
  setPage: React.Dispatch<SetStateAction<string | null>>;
  setFd: React.Dispatch<SetStateAction<_Fd>>;
  setEdit: React.Dispatch<SetStateAction<number | null>>;
  setApprovals:React.Dispatch<SetStateAction<{ id: number; approval: string; }[]>>
  approvals:{ id: number; approval: string; }[]
}  

export interface _jobs {
  id: number;
  title: string;
  location: string;
  jobType: string;
  flag: string;
  created_at: string;
  category: string;
  salary_range: string;
  detail: string;
}
export interface createJobsParamsType {
  setjobs: React.Dispatch<SetStateAction<_jobs[]>>;
  setPage: React.Dispatch<SetStateAction<string | null>>;
  setFd: React.Dispatch<SetStateAction<_Fd>>;
  setEdit: React.Dispatch<SetStateAction<number | null>>;
  fd: _Fd;
  edit: number | null;
  setMyjobs: React.Dispatch<SetStateAction<_myjobsType[]>>;
  setJobdetail: React.Dispatch<SetStateAction<number | null>>;
}
export interface proposalType {
  [key:string]:string | number | boolean
  id: number;
  sender: string;
  career_owner: string;
  name: string;
  flag: string;
  salary_range: string;
  approval: string;
  seenstatus: boolean;
  created_at: string; // or Date if you parse it
  senderlocen: string;
  senderlocam: string;
  senderlocar: string;
  senderlocfr: string;

  EnJobtype: string;
  AmJobtype: string;
  ArJobtype: string;
  FrJobtype: string;

  titleen: string;
  titleam: string;
  titlear: string;
  titlefr: string;

  detailEn: string;
  detailAm: string;
  detailAr: string;
  detailFr: string;
}

export interface jobType {
  [key: string]: unknown;
  id: number;
  catagory: string;
  created_at: string;
  detail: string;
  flag: string;
  jobtype: string;
  location: string;
  posted_by: string;
  salary_range: string;
  title: string;
  updated_at: string;
}

export interface job_detailsPanel {
  proposal_ids: number[];
  job: jobType;
  setJobdetail: React.Dispatch<SetStateAction<number | null>>;
  proposals: proposalType[];
  setProposal_ids: React.Dispatch<SetStateAction<number[]>>;
  saved_ids: number[];
  setSaved_ids: React.Dispatch<SetStateAction<number[]>>;
  setSavedJobs: React.Dispatch<SetStateAction<jobType[]>>;
  approvals:{ id: number; approval: string; }[];
  setApprovals:React.Dispatch<SetStateAction<{ id: number; approval: string; }[]>>
}

export interface countriesType {
  id: number;
  name: string;
  flag: string;
}
