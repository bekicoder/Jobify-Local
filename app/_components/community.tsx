
const Community = ()=>{
    const persons =[
        {
            name:"Alexander Carter",
            img:"/photo-1599566150163-29194dcaad36.avif",
            review:"“Jobify made finding my dream job effortless! Highly recommend to anyone looking for opportunities.”",
            stars:5,
            halfStar:false,
            color:"bg-green-500"
        },
        {
            name:"Emily Grace",
            img:"/photo-1494790108377-be9c29b29330.avif",
            review:"“The fastest and easiest way to land a job I’ve ever used!”",
            stars:5,
            halfStar:false,
            color:"bg-pink-500"
        },
        {
            name:"Oliver Benjamin",
            img:"/photo-1560250097-0b93528c311a.avif",
            review:"“The recommendations felt tailored to me. Jobify made job hunting stress-free and efficient.”",
            stars:4.5,
            halfStar:true,
            color:"bg-sky-500"
        },
        {
            name:"Thomas Anderson",
            img:"/premium_photo-1689539137236-b68e436248de.avif",
            review:"“I trust Jobify completely. Every job posting is real, and the platform helped me connect with great employers.”",
            stars:3,
            halfStar:true,
            color:"bg-yellow-500"
        }
    ]
    return(
        <div>
        <strong className="w-full text-center block text-3xl text-[#0a2540] mb-16">Our Community</strong>
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 justify-items-center">
          {persons.map((p,i)=>(
            <div key={i} className="h-140 w-100 bg-bg-[#f1f5f9] shadow-lg shadow-gray-200 group relative scale- rounded-2xl">
                <span className="w-10 h-10 bg-gray-200 rounded-full absolute left-full -translate-x-[50%] -translate-y-[20%] flex justify-center items-center z-10"><i className="fa-solid fa-quote-right text-xl"></i></span>
                <div className="w-full h-full overflow-hidden rounded-2xl">
                  <div className="h-[65%] w-full flex relative ">
                    <div style={{ backgroundImage: `url(${p.img})` }} className={`w-full h-full bg-cover group-hover:scale-110 transition-transform duration-200 origin-bottom`}></div>
                    <div className={`h-16 w-150 absolute ${p.color} bottom-0 origin-center -rotate-8 translate-5 transition duration-200 -translate-x-8 group-hover:rotate-0`}></div>
                </div>
                <div className="pt-12 text-center">
                    <p className="mt-2 font-bold">{p.name}</p>
                  <p className="px-8 font-medium text-gray-500">{p.review}</p>
                  <span className="flex gap-2 justify-center mt-3">
                    {
                      Array.from({ length: p.stars }).map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-500"></i>
                      ))
                    }
                    {p.halfStar && (
                      <i className="fas fa-solid fa-star-half-stroke text-yellow-500"></i>
                       ) }
                  </span>
                </div>  
                </div>
                
            </div>
          ))}

        </div>
        </div>
    )
}

export default Community;