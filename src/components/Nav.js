import React from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { SlBell } from "react-icons/sl";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { changeSearchTerm, clearVideos } from '../features/Youtube/Youtubeslice';
import { GetSearchPageVideos } from '../Store/reducers/GetSearchPageVideos';

const Nav = () => {

    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const searchTerm=useAppSelector((state)=>state.youtubeApp.searchTerm);

    const handleSeacrch=()=>{
        if(location.pathname!=='/search') navigate("/search");
        else{
            dispatch(clearVideos);
            dispatch(GetSearchPageVideos(false));
        }
    }

  return (
    <div className='flex justify-between items-center bg-[#454545] opacity-95 sticky px-14 h-14  text-white'>
        <div className='flex gap-8 items-center text-2xl text-white'>
            <div>
            <CiMenuBurger/>
            </div>
            <div className='flex gap-2 items-center justify-center'>
            <FaYoutube className='text-5xl text-red-600'/>
            <span className='text-2xl  font-bold'>Youtube</span>
            </div>
            </div>
            <div className='flex items-center justify-center gap-5'>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    handleSeacrch();
                }}>
                    <div className='flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl'>
                            <div className='flex gap-5 items-center pr-5'>
                                <input type='text' placeholder='Search' className='w-96 bg-zinc-900 focus:outline-none border-none
                                ' value={searchTerm}
                                onChange={e=>dispatch(changeSearchTerm(e.target.value))}>
                                </input>
                            </div>
                            <button className='h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl'>
                                <IoSearch  className='flex items-center'/>
                                </button>
                    </div>
                </form>
                <div className='text-xl p-3 bg-zinc-900 rounded-full'>
                <FaMicrophone />
                </div>
                </div>

                <div className='flex gap-7 items-center text-xl'>
                <RiVideoAddFill className='gap-5  text-2xl  justify-between'/>
               <div className='relative'>
               <SlBell className='text-xl' />
                <span className='absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1'>9+</span>
               </div>
               <img src='https://images.thedirect.com/media/article_full/superman-logo.jpg' alt='logo' className='w-9 h-9 rounded-full'></img>
                </div>
            </div>
        
    
  )
} 

export default Nav