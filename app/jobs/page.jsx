"use client"
import SideBar from "./employee/page";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Employer from "./employer/page";

const Jobs = ()=>{
    const pathname = usePathname()
    useEffect(()=>{
        const fetchU = async()=>{
            const res = await fetch("/api/jobs")
            const data = await res.json();

            console.log(data)
            alert(JSON.stringify(data))
            }
       fetchU() 
    })
    
    return(
        <div className="overflow-auto md:h-[calc(100vh)] pt-16">
            {pathname == "/employer" ? <Employer/> : <SideBar/> }
       </div>
    )
}

export default Jobs;