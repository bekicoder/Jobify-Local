import { SetStateAction } from "react";
export default interface ContentType {
  [key: string]: string;
};
export interface income_range {
  id: number;
  label: string;
}
export interface _Fd {
  [key:string]:string | number | null
  title: string;
  detail: string;
  salary_range: string;

  EnCategory: string;
  AmCategory: string;
  EnJobType: string;
  AmJobType: string;
}
export interface _myjobsType {
  [key:string]:string|number,
 id: number;
  created_at: string; 
  posted_by: string; 
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
  incomeRanges:income_range[]
  setSelectedJt:React.Dispatch<SetStateAction<number | null>>;
  setSelectedCt:React.Dispatch<SetStateAction<number | null>>;
}  

export interface _jobs {
  id: number;
  title: string;
  location: string;
  jobType: string;
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
  incomeRanges:income_range[]
  selectedJt:number|null;
  setSelectedJt:React.Dispatch<SetStateAction<number | null>>;
  selectedCt:number|null;
  setSelectedCt:React.Dispatch<SetStateAction<number | null>>;
}
export interface proposalType {
            [key:string]:string | number;
            id:number,
            career_owner:string;
            created_at:string;
            name: string;
            seenstatus: string;
            approval: string;
            detailAm: string;
            detailEn: string;
            sender: string;
            senderlocen: string;
            senderlocam: string;
            AmJobtype: string;
            EnJobtype: string;
            titleam: string;
            titleen: string;
            salary_range:string;
}

export interface jobType {
  [key:string]:string | number;
  id: number;
  titleEn: string;
  titleAm: string;
  EnCategory: string;
  AmCategory: string;
  EnJobtype: string; 
  AmJobtype: string;
  EnLocation: string;
  AmLocation: string;
  detailEn: string;
  detailAm: string;
  salary_range: string;
  posted_by: string;
  created_at: string;

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
  setProposals:React.Dispatch<SetStateAction<proposalType[]>>
}

export interface citiesType {
  id: number;
  name: string;
  type:string;
}
