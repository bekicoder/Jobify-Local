"use client"
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const SignUp = ({setOpen})=>{
  type locations = {
    id:number,
    name:string,
    flag:string
}
 // locations for filter
const countries:locations[] = [
  { id: 1, name: "Argentina", flag: "https://flagcdn.com/w40/ar.png" },
  { id: 2, name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
  { id: 3, name: "Austria", flag: "https://flagcdn.com/w40/at.png" },
  { id: 4, name: "Belgium", flag: "https://flagcdn.com/w40/be.png" },
  { id: 5, name: "Brazil", flag: "https://flagcdn.com/w40/br.png" },

  { id: 6, name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { id: 7, name: "China", flag: "https://flagcdn.com/w40/cn.png" },
  { id: 8, name: "Colombia", flag: "https://flagcdn.com/w40/co.png" },
  { id: 9, name: "Czech Republic", flag: "https://flagcdn.com/w40/cz.png" },
  { id: 10, name: "Denmark", flag: "https://flagcdn.com/w40/dk.png" },

  { id: 11, name: "Egypt", flag: "https://flagcdn.com/w40/eg.png" },
  { id: 12, name: "Ethiopia", flag: "https://flagcdn.com/w40/et.png" },
  { id: 13, name: "Finland", flag: "https://flagcdn.com/w40/fi.png" },
  { id: 14, name: "France", flag: "https://flagcdn.com/w40/fr.png" },
  { id: 15, name: "Germany", flag: "https://flagcdn.com/w40/de.png" },

  { id: 16, name: "Ghana", flag: "https://flagcdn.com/w40/gh.png" },
  { id: 17, name: "Greece", flag: "https://flagcdn.com/w40/gr.png" },
  { id: 18, name: "India", flag: "https://flagcdn.com/w40/in.png" },
  { id: 19, name: "Indonesia", flag: "https://flagcdn.com/w40/id.png" },
  { id: 20, name: "Ireland", flag: "https://flagcdn.com/w40/ie.png" },

  { id: 21, name: "Israel", flag: "https://flagcdn.com/w40/il.png" },
  { id: 22, name: "Italy", flag: "https://flagcdn.com/w40/it.png" },
  { id: 23, name: "Japan", flag: "https://flagcdn.com/w40/jp.png" },
  { id: 24, name: "Kenya", flag: "https://flagcdn.com/w40/ke.png" },
  { id: 25, name: "Malaysia", flag: "https://flagcdn.com/w40/my.png" },

  { id: 26, name: "Mexico", flag: "https://flagcdn.com/w40/mx.png" },
  { id: 27, name: "Morocco", flag: "https://flagcdn.com/w40/ma.png" },
  { id: 28, name: "Netherlands", flag: "https://flagcdn.com/w40/nl.png" },
  { id: 29, name: "New Zealand", flag: "https://flagcdn.com/w40/nz.png" },
  { id: 30, name: "Nigeria", flag: "https://flagcdn.com/w40/ng.png" },

  { id: 31, name: "Norway", flag: "https://flagcdn.com/w40/no.png" },
  { id: 32, name: "Pakistan", flag: "https://flagcdn.com/w40/pk.png" },
  { id: 33, name: "Philippines", flag: "https://flagcdn.com/w40/ph.png" },
  { id: 34, name: "Poland", flag: "https://flagcdn.com/w40/pl.png" },
  { id: 35, name: "Portugal", flag: "https://flagcdn.com/w40/pt.png" },

  { id: 36, name: "Qatar", flag: "https://flagcdn.com/w40/qa.png" },
  { id: 37, name: "Romania", flag: "https://flagcdn.com/w40/ro.png" },
  { id: 38, name: "Saudi Arabia", flag: "https://flagcdn.com/w40/sa.png" },
  { id: 39, name: "South Africa", flag: "https://flagcdn.com/w40/za.png" },
  { id: 40, name: "South Korea", flag: "https://flagcdn.com/w40/kr.png" },

  { id: 41, name: "Spain", flag: "https://flagcdn.com/w40/es.png" },
  { id: 42, name: "Sweden", flag: "https://flagcdn.com/w40/se.png" },
  { id: 43, name: "Switzerland", flag: "https://flagcdn.com/w40/ch.png" },
  { id: 44, name: "Thailand", flag: "https://flagcdn.com/w40/th.png" },
  { id: 45, name: "Turkey", flag: "https://flagcdn.com/w40/tr.png" },

  { id: 46, name: "Ukraine", flag: "https://flagcdn.com/w40/ua.png" },
  { id: 47, name: "United Arab Emirates", flag: "https://flagcdn.com/w40/ae.png" },
  { id: 48, name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { id: 49, name: "United States", flag: "https://flagcdn.com/w40/us.png" },
  { id: 50, name: "Vietnam", flag: "https://flagcdn.com/w40/vn.png" },
];
    type checkbox = {
      role:string | null,
      location:string | null,
      flag:string | null
    }
    const [type,setType] = useState<checkbox>({role:"",location:"",flag:""})

    const router = useRouter();
    const [openedMenu,setOpenedMenu] = useState<string | null>(null)

    function toggleRoleCheckbox(value:string){
        setType((prev)=>({...prev,role:value}))
  }
  function toggleLocationCheckbox(location:string,flag:string){
      setType((prev)=>({...prev,location:location,flag:flag}))
      
  }
  function toggleMenu(e:React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,menu:string){
    if(e.type == "blur" || openedMenu==menu){
      setTimeout(()=>{
        setOpenedMenu(null)
      },300)
    }else{
        setOpenedMenu(menu)
    }
  }
  async function handleSibmit(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const fdObj = Object.fromEntries(fd.entries())
    console.log(fdObj)
    const res = await fetch("/api/signup",{
      method:"POST",
      body:JSON.stringify(fdObj),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data =await res.json()
    console.log("error",data)
    if(data.message == "user created"){
      router.replace("/")
      router.refresh();
    }
  }
  
  return(
    <div className='w-full max-w-xl h-full md:h-124 md:rounded-2xl flex flex-col items-center bg-white md:px-28 px-10 md:mt-4 pt-4'>
      <strong className='text-2xl text-[#0a2540]'>Sign up</strong>
      <form onSubmit={handleSibmit} action="/api/signup" method='POST' className='flex flex-col pt-7 gap-4 w-full'>
        <div className='flex border border-gray-400 rounded p-1 px-2'>
          <input type="text" name="fname" className='w-full focus:outline-0' placeholder='First Name' required/>
          <span><i className='fa-solid fa-user text-gray-600 px-2'></i></span>
        </div>
        <div className='flex border border-gray-400 rounded p-1 px-2'>
          <input type="text" name="lname" required className='w-full focus:outline-0' placeholder='Last Name'/>
          <span><i className='fa-solid fa-user text-gray-600 px-2'></i></span>
        </div>
        <div className='flex border border-gray-400 rounded p-1 px-2'>
          <input type='email' name="email" required className='w-full focus:outline-0' placeholder='Email'/>
          <span><i className='fa-solid fa-envelope text-gray-600 px-2'></i></span>
        </div>
        <div className='flex border border-gray-400 rounded p-1 px-2'>
          <input type='password' name="password" required className='w-full focus:outline-0' placeholder='Password'/>
          <span><i className='fa-solid fa-eye text-gray-600 px-2'></i></span>
        </div>
        <div onClick={(e)=>toggleMenu(e,"Location")} onBlur={(e)=>toggleMenu(e,"Location")} className="relative cursor-pointer flex rounded-xl item-center px-2 hover:bg-yellow-100  bg-gray-100 items-center pl-2 bg-[#f6f9fc] py-2 gap-2">
                        <i className="fa-solid fa-map-marker-alt text-gray-500"/>
                        Location
                        <input name="location" value={type.location} className="sr-only"/>
                        <input name="flag" value={type.flag} className='sr-only'/>
                        <button type="button" className="cursor-pointer px-12 ml-auto">
                        <i className={`fa-solid ${openedMenu=="Location" ? "fa-chevron-up" : "fa-chevron-down" } ml-auto`}/>
                        </button>
                        {openedMenu == "Location" && (<div className="filter-box z-1000 scale-95  absolute rounded-2xl shadow-lg w-full top-[calc(100%+10px)] h-50 bg-white left-0 p-3 flex flex-col gap-2 overflow-auto whitespace-nowrap">
                            {countries.map((c,i)=>(
                              <div onClick={(e)=>{toggleLocationCheckbox(c.name,c.flag)}} key={i} className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                                <span className="w-4 h-4 aspect-square flex-none bg-sky-200 text-sky-200 rounded block peer-checked:bg-sky-500 flex items-center justify-center" style={{ backgroundColor: type.location === c.name ? "#0ea5e9" : undefined}}>
                                    <i className="fa-solid fa-check scale-90 " style={{opacity:type.location === c.name ? 1 : 0 }}></i>
                                </span><Image width={20} height={20} src={c.flag} alt={c.name + " flag"} className="h-fit aspect-video"/> {c.name}
                            </div>  
                            ))}
        
                        </div>)}
                        </div>
        <div className='flex justify-between'>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                                  <input name="type" onChange={()=>toggleRoleCheckbox("employer")} type="checkbox" value={type.role} className="peer sr-only" required={type.role === "employer" || type == null}/>
                                  <span className={`w-4 h-4 aspect-square flex-none bg-sky-200 text-sky-200 ${type.role == "employer" && 'text-white'} rounded block ${type.role == "employer" && "bg-sky-500"} flex items-center justify-center`}>
                                      <i className="fa-solid fa-check scale-90 "></i>
                                  </span>Emloyer
                              </label>  
                              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                                  <input name="type" onChange={()=>toggleRoleCheckbox("employee")} type="checkbox" value={type.role} className="peer sr-only" required={type.role === "employee" || type == null}/>
                                  <span className={`w-4 h-4 aspect-square flex-none bg-sky-200 text-sky-200 ${type.role == "employee" && 'text-white'} rounded block ${type.role == "employee" && "bg-sky-500"} flex items-center justify-center`}>
                                      <i className="fa-solid fa-check scale-90"></i>
                                  </span>Emloyee
                              </label>  
        </div>
                <button type="submit" className="px-6 py-2 rounded-full w-full bg-sky-500 hover:bg-[#0a2540] text-white font-medium cursor-pointer flex-none w-fit mx-auto">Sign up</button>
      </form>
      <span>Already have an account ? <span className='text-indigo-700 cursor-pointer' onClick={()=>setOpen("signIn")}> Sign in</span> </span>
        <p className='text-center my-2'>Or</p>
<button className='w-full rounded-full mt-5 border py-2 flex hover:bg-[#0a2540] hover:text-white cursor-pointer justify-center items-center gap-3'>Google
          <Image src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" width={20} height={20} alt="google logo"/>
        </button>
            </div>
  )
}
const SignIn = ({setOpen})=>{
  const [type,setType] = useState<string>()

  function toggleCheckbox(type:string){
        setType(type)
  }
  return(
    <div className='w-full max-w-xl h-full md:h-124 md:rounded-2xl flex flex-col items-center bg-white  md:px-28 px-10 mt-4 pt-4'>
      <strong className='text-2xl text-[#0a2540]'>Sign in</strong>
      <form action="/api/signin" method='POST' className='flex flex-col pt-7 gap-4 w-full'>
        <div className='flex border border-gray-400 rounded p-1 px-2'>
          <input type="email" name='email' className='w-full focus:outline-0' placeholder='Email'/>
          <span><i className='fa-solid fa-envelope text-gray-600 px-2'></i></span>
        </div>
        <div className='flex border border-gray-400 rounded p-1 px-2'>
          <input type="password" name="password" className='w-full focus:outline-0' placeholder='password'/>
          <span><i className='fa-solid fa-eye-slash cursor-pointer text-gray-600 px-2'></i></span>
        </div>

        

          <button className="px-6 py-2 rounded-full bg-sky-500 hover:bg-[#0a2540] text-white font-medium cursor-pointer flex-none w-fit my-4 mx-auto w-full">Sign in</button>
      </form>
        <button>Not member ? <span className='text-indigo-700 cursor-pointer' onClick={()=>setOpen("signUp")}> Sign up</span> </button>
        <p className='text-center my-'>Or</p>
        <button className='w-full rounded-full mt-5 border py-2 flex hover:bg-[#0a2540] hover:text-white cursor-pointer justify-center items-center gap-3'>Google
          <Image src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" width={20} height={20} alt="google logo"/>
        </button>
    </div>
  )
}

const Acount = () => {
  const [open,setOpen] = useState<string>("signUp");
  return (
    <div className='w-full h-screen md:px-8 flex justify-center items-center bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600'>
      {open == 'signIn' ? <SignIn setOpen={setOpen}/> : <SignUp setOpen={setOpen}/> }
    </div>
  );
};

export default Acount;