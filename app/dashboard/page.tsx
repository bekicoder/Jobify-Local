"use client";
import React, {
  FormEvent,
  use,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Route } from "next/";
import { useSharedState } from "../SharedStateContext";
import {
  income_range,
  _Fd,
  _myjobsType,
  DetailsPanelType,
  _jobs,
  proposalType,
  createJobsParamsType,
} from "../interfaces";
import {categories as categoriesAm,jobTypes as jobTypesAm} from "@/lib/languages/am.json"
import {categories as categoriesEn,jobTypes as jobTypesEn} from "@/lib/languages/en.json"

const JobDetailsPanel = ({
  option,
  job,
  setJobdetail,
  setPage,
  setFd,
  setEdit,
}: DetailsPanelType) => {
  const [approval, setApproval] = useState<string>(job.approval as string);
  const [opend, setOpend] = useState<boolean>(false);
  const date = job.created_at.split(" ");
  const proposal = option === "proposal";
  const { content, lang,lightDark,grayText,bgColor,textColor,mode } = useSharedState();
  const handleEdit = () => {
    setFd({
      Jobtype: job.Jobtype,
      category: job.category,
      title: job[`title${lang}`] as string,
      detail: job[`detail${lang}`] as string,
      salary_range: job.salary_range,
      EnCategory: job.EnCategory,
      AmCategory: job.AmCategory,
      EnJobType: job.EnJobtype,
      AmJobType: job.AmJobtype,
    });
    setPage("createJob");
    setJobdetail(null);
    setEdit(Number(job.id));
  };
  async function handleApproval(status: boolean) {
    const res = await fetch("/api/approval", {
      method: "POST",
      body: JSON.stringify({ status: status, jobId: job.propId }),
      headers: { "Content-Type": "application/json" },
    });
    const approval_res = await res.json();
    if (approval_res.msg == "successful") {
      setApproval(status ? "approved" : "declined");
    }
  }
  return (
    <div className={`w-full pl-4 md:pl-12 h-full md:h-[calc(100vh-5rem)] rounded-2xl  overflow-y-auto bg-${lightDark} text-${textColor}`}>
      {/*proposal form */}
      {opend && (
        <div
          onClick={(e) => e.currentTarget == e.target && setOpend(false)}
          className="proposal_container w-screen h-screen fixed top-0 py-12 px-8 pt-16 left-0 bg-black/50 flex items-center justify-center"
        >
          <div className="w-full p-4 h-full  rounded-2xl max-w-2xl flex flex-col relative">
            <h1 className="text-2xl font-bold text-center mb-1">
              Write Proposal
            </h1>
            <p className="text-center text-sm text-gray-600 mb-4">
              {content.markdownSupport}
            </p>
            <button
              onClick={() => setOpend(false)}
              className="absolute top-6 right-6 hover:bg-gray-300 w-8 h-8 rounded-full"
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <textarea
              placeholder="Enter proposal details..."
              className="w-full border rounded-xl resize-none p-4 max-h-full flex-1 focus:border-0 focus-outline-0.5 outline-sky-500"
            ></textarea>
            <button className="px-6 py-2 rounded-full bg-sky-600 hover:bg-[#0a2540] text-white font-medium cursor-pointer flex-none w-fit my-4 mx-auto">
              {content.send}
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex justify-between pr-4 pt-4">
        <button
          onClick={() => setJobdetail(null)}
          className="py-2 cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left" />
        </button>

        {!proposal && (
          <button
            onClick={handleEdit}
            className="ml-auto mr-5 text-[18px] cursor-pointer"
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        )}
        {proposal && (
          <div className="flex items-center gap-2">
            <button
              disabled={approval == "approved"}
              onClick={() => handleApproval(true)}
              className={`flex items-center justify-center w-10 h-10 rounded-full
               bg-green-500 ${approval != "approved" && "hover:bg-green-600 cursor-pointer"}
               transition duration-200 shadow-md ${approval == "declined" && "hidden"}`}
              title="Approve"
            >
              <i className="fa-solid fa-thumbs-up text-white text-sm"></i>
            </button>

            <button
              disabled={approval == "declined"}
              onClick={() => handleApproval(false)}
              className={`flex items-center justify-center w-10 h-10 rounded-full
               bg-red-500  ${approval != "declined" && "hover:bg-red-600 cursor-pointer"}
               transition duration-200 shadow-md ${approval == "approved" && "hidden"}`}
              title="Decline"
            >
              <i className="fa-solid fa-thumbs-down text-white text-sm"></i>
            </button>
          </div>
        )}
      </div>
      {/* job title */}
      <div className="w-full flex justify-between pr-4">
        <span className={`text-sm flex items-center font-medium text-${grayText}`}>
          {proposal ? job.name : job.salary_range} {proposal && " • " + job.location}{!proposal && " • " + job[`${lang}Jobtype`]}
        </span>
        <span className="text-sm">
          <i className={`fa-solid fa-calendar-day mr-2 text-${grayText}`}/>
          {date[0]}
        </span>
      </div>
        <h1 className="text-2xl font-medium mb-4 mt-8">{job[`title${lang}`]}</h1>
      {proposal && <p className="text-sm  mt-1">{job.sender}</p>}
      <h3 className={`text-xl font-medium mb-2 text-${grayText}`}>
        {content.aboutJob}
      </h3>
      <article className={`prose lg:prose-l prose-${mode == "dark" ? "invert" : "slate"} max-h-full flex-1 mb-16 text-${textColor}`}>
        <ReactMarkdown>{job[`detail${lang}`] as string}</ReactMarkdown>
        <div className="w-full h-12"></div>
      </article>
    </div>
  );
};

const CreateJobs = ({
  fd,
  setFd,
  edit,
  setEdit,
  setMyjobs,
  setPage,
}: createJobsParamsType) => {
  const [openedMenu, setOpenedMenu] = useState<string | null>();

  const { jobTypes } = useSharedState();
  const { jobCategories } = useSharedState();
  const { content, lang,bgColor,textColor,grayText,lightDark,mode } = useSharedState();
  const [selectedJt, setSelectedJt] = useState("");
  const incomeRanges: income_range[] = [
    { id: 1, label: `${content.below} $500` },
    { id: 2, label: "$500 – $1,000" },
    { id: 3, label: "$1,000 – $2,000" },
    { id: 4, label: "$2,000 – $3,000" },
    { id: 5, label: "$3,000 – $5,000" },
    { id: 6, label: "$5,000 – $7,000" },
    { id: 7, label: "$7,000 – $10,000" },
    { id: 8, label: "$10,000+" },
  ];
  function toggleMenu(
    e:
      | React.FocusEvent<HTMLDivElement, Element>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    menu: string,
  ) {
    if (e.type == "blur" || openedMenu == menu) {
      setOpenedMenu(null);
    } else {
      setOpenedMenu(menu);
    }
  }
  async function handleSumit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tempStore = fd
    setFd({
          title: "",
          detail: "",
          salary_range: "",
          EnCategory: "",
          AmCategory: "",
          EnJobType: "",
          AmJobType: "",
        });
      const res = await fetch("/api/createJob", {
        body: JSON.stringify({ fd:tempStore, editId: edit }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.status == "successful") {
        setMyjobs(prev=>(
          prev.map(j=>j.id === data.data.id ? data.data:j)
        ))
      }else{
        setFd(tempStore)
        alert("Failed to create job try again later!")
      }
  }
  function handleChange(id: number, option: string) {
    const languages = ["En", "Am"];

    interface OptionType {
      id: number;
      name: string;
    }

    const options: { [key: string]: OptionType[] } = {
      categoriesEn: categoriesEn,
      jobTypesEn: jobTypesEn,
      categoriesAm: categoriesAm,
      jobTypesAm: jobTypesAm,
    };

    // Build all translations first
    const newTranslations: { [key: string]: string } = {};

    languages.forEach((lang) => {
      const keyName =
        option === "categories" ? `categories${lang}` : `jobTypes${lang}`;

      const stateKey =
        option === "categories" ? `${lang}Category` : `${lang}JobType`;

      const found = options[keyName]?.find((o) => o.id === id);
      if (lang == "En" && found) setSelectedJt(found?.name);

      if (found) {
        newTranslations[stateKey] = found.name;
      }
    });

    // Update fd once with all translations
    setFd((prev) => ({ ...prev, ...newTranslations }));
  }

  return (
    <form
      onSubmit={handleSumit}
      className={`w-full px-4 pt-4 md:rounded-2xl flex flex-col md:bg-${lightDark} bg-${bgColor} text-${textColor} h-full`}
    >
      <h1 className="text-2xl font-bold text-center mb-1">
        {content.writeProposal}
      </h1>
      <p className="text-center text-sm mb-4">
        {content.markdownSupport}
      </p>
      <div className="flex w-full flex-col gap-3 mb-4 font-medium md:flex-row md:justify-between">
        {/* job type */}
        <div
          onClick={(e) => toggleMenu(e, "Job_type")}
          onBlur={(e) => toggleMenu(e, "Job_type")}
          tabIndex={0}
          className={`p-3 relative rounded-lg bg-${mode=="light"?"white":bgColor}  hover:bg-gray-100 md:shadow-lg hover:${mode=="dark"&&"text-gray-700"} flex items-center cursor-pointer flex-1`}
        >
          <i className="fa-solid fa-briefcase mr-2" />
          {content.jobType}&nbsp;
          <i className="fa-solid fa-chevron-down mr-3 ml-auto"></i>
          <input
            name="Job_type"
            value={fd.EnJobType}
            className="sr-only"
            onChange={()=>{}}
            required
          />
          {openedMenu == "Job_type" && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`filter-box text-${textColor} z-1000 scale-95  absolute rounded-2xl shadow-lg w-full top-[calc(100%+10px)] h-50  left-0 p-3 flex flex-col gap-2 overflow-auto whitespace-nowrap bg-${bgColor}`}
            >
              {jobTypes.map((t, i) => (
                <label
                  key={i}
                  onClick={(e) => {
                    handleChange(t.id, "Jobtypes");
                  }}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                >
                  <span
                    className={`w-4 h-4 aspect-square ${fd[`${lang}JobType`] == t.name.trim() ? "bg-[#0ea5e9] text-white" : "bg-gray-200 text-gray-200"} flex-none rounded flex items-center justify-cente`}
                  >
                    <i className="fa-solid fa-check scale-90 ml-0.5"></i>
                  </span>
                  {t.name}
                </label>
              ))}
            </div>
          )}
        </div>
        {/* job category */}
        <div
          onClick={(e) => toggleMenu(e, "Job_catagories")}
          onBlur={(e) => toggleMenu(e, "Job_catagories")}
          tabIndex={0}
          className={`p-2 relative rounded-lg bg-${mode=="light"?lightDark:bgColor} hover:${mode=="dark"&&"text-gray-700"} hover:bg-gray-100 md:shadow-lg flex items-center cursor-pointer flex-1`}
        >
          <i className="fas fa-layer-group mr-2"></i>
          {content.categories}
          <i className="fa-solid fa-chevron-down mr-3 ml-auto"></i>
          <input
            name={content.categories}
            value={fd.EnCategory}
            className="sr-only"
            onChange={()=>{}}
            required
          />
          {openedMenu == "Job_catagories" && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`filter-box text-${textColor} z-1000 scale-95  absolute rounded-2xl shadow-lg w-full top-[calc(100%+10px)] h-50  left-0 p-3 flex flex-col gap-2 bg-${bgColor} overflow-auto whitespace-nowrap`}
            >
              {jobCategories.map((t, i) => (
                <label
                  key={i}
                  onClick={(e) => {
                    handleChange(t.id, "categories");
                  }}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                >
                  <span
                    className={`w-4 h-4 aspect-square flex-none ${fd[`${lang}Category`] == t.name ? "bg-[#0ea5e9] text-white" : "bg-gray-200 text-gray-200"}  rounded flex items-center justify-cente`}
                  >
                    <i className="fa-solid fa-check scale-90 ml-0.5"></i>
                  </span>
                  {t.name}
                </label>
              ))}
            </div>
          )}
        </div>
        {/* job salary */}
        <div
          onClick={(e) => toggleMenu(e, "Income_range")}
          onBlur={(e) => toggleMenu(e, "Income_range")}
          tabIndex={0}
          className={`p-2 relative rounded-lg bg-${mode=="light"?lightDark:bgColor} hover:${mode=="dark"&&"text-gray-700"} hover:bg-gray-100 md:shadow-lg flex items-center cursor-pointer flex-1`}
        >
          <i className="fas fa-sack-dollar mr-2"></i>
          {content.salary}
          <i className="fa-solid fa-chevron-down mr-3 ml-auto"></i>
          <input
            name="range"
            value={fd.salary_range}
            className="sr-only"
            onChange={()=>{}}
            required
          />
          {openedMenu == "Income_range" && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`filter-box z-1000 scale-95  absolute rounded-2xl shadow-lg w-full top-[calc(100%+10px)] h-50  left-0 p-3 flex flex-col gap-2 overflow-auto whitespace-nowrap text-${textColor} bg-${bgColor}`}
            >
              {incomeRanges.map((t, i) => (
                <label
                  key={i}
                  onClick={(e) => {
                    setFd((prev) => ({ ...prev, salary_range: t.label }));
                  }}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                >
                  <span
                    className={`w-4 h-4 aspect-square flex-none rounded flex items-center justify-cente ${fd.salary_range == t.label ? "bg-[#0ea5e9] text-white" : "bg-gray-200 text-gray-200"}`}
                  >
                    <i className="fa-solid fa-check scale-90 ml-0.5"></i>
                  </span>
                  {t.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <input
        onChange={(e) => setFd((prev) => ({ ...prev, title: e.target.value }))}
        value={fd.title}
        name="title"
        placeholder={content.title}
        className="w-full p-2 px-4 rounded-lg border mb-3"
        required
      />
      <textarea
        onChange={(e) => setFd((prev) => ({ ...prev, detail: e.target.value }))}
        name="detail"
        value={fd.detail}
        placeholder={content.proposalPlaceholder}
        className="w-full border rounded-xl min-h-50 resize-none p-4 max-h-full flex-1 focus:border-0 focus-outline-0.5"
        required
      ></textarea>
      <button
        type="submit"
        className="px-6 py-2 rounded-full bg-sky-600 hover:bg-[#0a2540] text-white font-medium cursor-pointer flex-none w-fit my-4 mx-auto"
      >
        {!edit ? content.create : content.edit}
      </button>
    </form>
  );
};

const Employer = () => {
  const [selectedJob, setJobdetail] = useState<number | null>(0);
  const [page, setPage] = useState<string | null>("proposals");
  const [jobs, setJobs] = useState<_jobs[]>([]);
  const [myJobs, setMyjobs] = useState<_myjobsType[]>([]);
  const [edit, setEdit] = useState<number | null>(null);
  const [proposals, setProposals] = useState([]);
  const [proposal_ids, setProposal_ids] = useState([]);
  const { content, lang,lightDark,bgColor,textColor,grayText,mode,borderColor } = useSharedState();
  const [approvals, setApprovals] = useState<{ id: number; approval: string }[]>([]);

  const [fd, setFd] = useState({
    title: "",
    detail: "",
    salary_range: "",
    EnCategory: "",
    AmCategory: "",
    EnJobType: "",
    AmJobType: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const job_res = await fetch("/api/myJobs");
      const { resData } = await job_res.json();

      setMyjobs(resData);
      //fetch proposals
      const prop_res = await fetch("/api/proposal/?role=employer", {
        cache: "no-store",
      });
      const props = await prop_res.json();
      if (props.data.legth == 0) return;

      const fullProposal = props.data.map(
        (p: Record<string, string | number>) => {
          const proposed_job = resData.filter(
            (j: Record<string, string | number>) => {
              return j.id == Number(p.career_id);
            },
          );

          return {
            id: Number(p.career_id),
            career_owner: p.career_owner,
            created_at: p.created_at,
            name: p.name,
            detailAm: p?.amproposal,
            detailEn: p?.enproposal,
            sender: p.sender,
            senderlocen: p?.senderlocen,
            senderlocam: p?.senderlocam,
            AmJobtype: proposed_job[0]?.AmJobtype,
            EnJobtype: proposed_job[0]?.EnJobtype,
            titleam: proposed_job[0]?.titleAm,
            titleen: proposed_job[0]?.titleEn,
            approval: p.approval,
            seenstatus: p.seenstatus,
            propId: p.id,
          };
        },
      );
      setProposals(fullProposal);
    };

    fetchData();
  }, []);

  async function handleSeen(jobid_: number, status: proposalType) {
    if (!status.seenstatus) {
      const seenRes = await fetch("/api/seenStatus", {
        method: "POST",
        body: JSON.stringify({ jobId: jobid_ }),
        headers: { "Content-Type": "application/json" },
      });
      const { msg } = await seenRes.json();
      console.log(msg, "this is the msg");
      if (msg !== "successful") {
      }
    }
  }

  const [rowsColor, setRcolor] = useState("gray-100");
    const [rowshoverColor, setRHovcolor] = useState("zinc-950");
    useEffect(() => {
      if (mode == "dark") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRcolor("zinc-900");
        setRHovcolor("zinc-950");
      }
      if (mode == "light") {
        setRcolor("gray-100");
        setRHovcolor("gray-200");
      }
    }, [mode]);
  return (
    <div className={`w-full md:h-full pt-16 min-h-[100vh] flex flex-col md:flex-row overflow-auto bg-${bgColor} text-${textColor} md:fixed`}>
      <aside className={`w-full md:w-72 h-full bg-${bgColor} md:rounded md:shadow-2xl md:border-r border-${borderColor}`}>
  <div className="md:hidden flex items-center justify-center h-14 bg-gradient-to-r from-sky-600 to-sky-500 text-white text-lg font-semibold tracking-wide shadow-md">
    {content.headline}
  </div>
  <div className="hidden md:flex items-center justify-center py-3 bg-sky-600 text-white text-2xl font-semibold rounded-t">
    {content.headline}
  </div>
  <div className={`flex md:flex-col flex-row md:gap-5 gap-3 md:p-4 p-3 justify-around md:justify-start  text-${textColor} md:bg-transparent`}>
    <div
      onClick={() => setPage("myJobs")}
      className={`flex hover:scale-105 flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl cursor-pointer transition-all duration-300 bg-${lightDark} active:scale-95 w-full md:w-auto`}
    >
      <i className="fa-solid fa-layer-group text-lg md:text-xl"></i>
      <span className="max-md:text-sm md:text-base font-medium">{content.myJobs}</span>
    </div>
    <div
      onClick={() => setPage("createJob")}
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl cursor-pointer transition-all duration-300 bg-${lightDark} hover:scale-105 active:scale-95  w-full md:w-auto`}
    >
      <i className="fa-solid fa-wand-magic-sparkles text-lg md:text-xl"></i>
      <span className="max-md:text-sm md:text-base font-medium">{content.createJob}</span>
    </div>

    <div
      onClick={() => setPage("proposals")}
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl cursor-pointer transition-all duration-300 bg-${lightDark} hover:scale-105 active:scale-95 w-full md:w-auto`}
    >
      <i className="fa-solid fa-handshake text-lg md:text-xl"></i>
      <span className="max-md:text-sm md:text-base font-medium">{content.proposals}</span>
    </div>
  </div>
      </aside>
      <div className={`pb-5 w-full min-[768]:px-12 min-[950px]:px-24 overflow-auto relative`}>
        {page == "createJob" && (
          <CreateJobs
            setJobdetail={setJobdetail}
            setPage={setPage}
            setMyjobs={setMyjobs}
            setjobs={setJobs}
            fd={fd}
            setFd={setFd}
            edit={edit}
            setEdit={setEdit}
          />
        )}

        {page == "myJobs" && (
          <div className={`w-full h-full ${!selectedJob &&"mb-28"}`}>
            {selectedJob ? (
              <JobDetailsPanel
                setEdit={setEdit}
                job={myJobs[selectedJob - 1]}
                setJobdetail={setJobdetail}
                setPage={setPage}
                setFd={setFd}
                option={""}
                setApprovals={setApprovals}
                approvals={approvals}
              />
            ) : (
              <>
                <table className={`w-full md:shadow-2xl md:rounded-2xl bg-${lightDark} px-7 overflow-hidden pb-48`}>
                  <thead className="border-b border-b-gray-300 px-7">
                    <tr>
                      <th className="text-left text-sm font-medium px-4 py-2">
                        {content.careers}
                      </th>
                      <th className="text-left text-sm font-medium px-4 py-2">
                        {content.location}
                      </th>
                      <th className="text-left text-sm font-medium px-4 py-2">
                        {content.jobType}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myJobs?.map((p: _myjobsType, i) => (
                      <tr
                        onClick={() => {
                          setJobdetail(i + 1);
                        }}
                        key={i}
                        className={`even:bg-${rowsColor} hover:bg-${rowshoverColor} cursor-pointer`}
                      >
                        <td className="text-left text-sm px-4 py-2 text-indigo-500 font-medium">
                          {p[`title${lang}`]}
                        </td>
                        <td className="text-left text-sm px-4 py-2 flex items-center gap-2">
          
                          {p[`${lang}Location`]}
                        </td>
                        <td className="text-left text-sm px-4 py-1">
                          {p[`${lang}Jobtype`]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}

        {page == "proposals" && (
          <div className="w-full h-full">
            {selectedJob ? (
              <JobDetailsPanel
                option="proposal"
                job={proposals[selectedJob - 1]}
                setJobdetail={setJobdetail}
                setPage={setPage}
                setFd={setFd}
                setEdit={setEdit}
                setApprovals={setApprovals}
                approvals={approvals}
              />
            ) : (
              <>
                <table className={`w-full md:shadow-2xl md:rounded-2xl  px-7 overflow-hidden bg-${lightDark}`}>
                  <thead className="border-b border-b-gray-300 px-7">
                    <tr>
                      <th className="text-left text-sm font-medium px-4 py-2">
                        {content.name}
                      </th>
                      <th className="text-left text-sm font-medium px-4 py-2">
                        {content.location}
                      </th>
                      <th className="text-left text-sm font-medium px-4 py-2">
                        {content.careers}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposals.map((p: proposalType, i) => (
                      <tr
                        onClick={() => {
                          setJobdetail(i + 1);
                          handleSeen(p.propId as number, p);
                        }}
                        key={i}
                        className="even:bg-gray-50 hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="text-left text-sm px-4 py-2 text-indigo-500 font-medium">
                          {p.name}
                        </td>
                        <td className="text-left text-sm px-4 py-2 flex items-center gap-2">
                          
                          {p[`senderloc${lang.toLowerCase()}`]}
                        </td>
                        <td className="text-left text-sm px-4 py-1">
                          {p[`title${lang.toLowerCase()}`]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employer;
