import React from 'react'
import { TiHome } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";


const Sidebar = () => {
    const mainLinks=[
    {
        icon:<TiHome className='text-2xl'/>,
        name:'Home'
    },
    {
        icon:<SiYoutubeshorts className='text-2xl'/>,
        name:'Shorts'

    },
    {
        icon:<MdSubscriptions className='text-2xl'/>,
        name:'Subscription'

    },
    {
        icon: <MdAccountCircle className='text-2xl'/>,
        name:"You"
    },
    ]

  return (
    <div className='w-2/12 bg-[#212121]  pt-5 overflow-auto pb-8 h-screen'>
        <ul className='flex flex-col border-b-1 border-grey-800'>
            {mainLinks.map(({icon,name})=>{
                return (
                    <li key={name} className={`p1-6 py-3 hover:bg-[#757575] ${name === "Home"?"bg-[#454545]":" "} rounded-xl`}>
                         <a href='#' className='flex items-center gap-5'>
                         {icon}<span className='text-sm tracking-wider'>{name}</span></a>   
                    </li>
                )
            }
           )}
        </ul>
    </div>
  )
}

export default Sidebar