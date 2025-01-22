import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import {useAppDispatch,useAppSelector} from "../hooks/useApp"
import { GetHomePageVideos } from '../Store/reducers/GetHomePageVideos'
import Spinner from '../components/Spinner'
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../components/card'
import { useNavigate } from 'react-router-dom'
import { clearVideos } from '../features/Youtube/Youtubeslice'
import { GetSearchPageVideos } from '../Store/reducers/GetSearchPageVideos'
import SearchCard from '../components/SearchCard'

const Home = () => {

    const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const videos=useAppSelector((state)=>state.youtubeApp.videos);
  const searchTerm=useAppSelector((state)=>state.youtubeApp.searchTerm);
  useEffect(()=>{
      dispatch(clearVideos());
      if(searchTerm===" ")navigate("/");
      else (
        dispatch(GetSearchPageVideos(false))
      )
      
  },[dispatch,navigate,searchTerm])

  

  return (
    <div className='max-h-screen overflow-auto'>
      <div style={{height:"7.5vh"}}>
        <Nav/>
        </div>
        <div  className="flex" style={{height:"92.5vh"}}>
        <Sidebar/>
        {
          videos.length?(
            <div className='py-8 pl-8 flex flex-col gap-5 w-full'>
            <InfiniteScroll dataLength={videos.length} next={()=>dispatch(GetSearchPageVideos(true))} hasMore={videos.length<500}
            Loader={<Spinner/>}
            height={650}>
                  {videos.map((item)=>{
                    return (
                        <div className='my-5 '>
                    <SearchCard data={item} key={item.videoId}/>
                    </div>
                    )
                  })}
              </InfiniteScroll>
              </div>
          ):(
            <Spinner/>
          )
        }
        
        </div>


    </div>
  )
}

export default Home