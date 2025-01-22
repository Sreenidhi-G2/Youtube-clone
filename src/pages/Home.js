import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import {useAppDispatch,useAppSelector} from "../hooks/useApp"
import { GetHomePageVideos } from '../Store/reducers/GetHomePageVideos'
import Spinner from '../components/Spinner'
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../components/card'

const Home = () => {

  const dispatch=useAppDispatch();
  const videos=useAppSelector((state)=>state.youtubeApp.videos);
  useEffect(()=>{
      dispatch(GetHomePageVideos(false));
      
  },[dispatch])

  
  return (
    <div className='max-h-screen overflow-auto'>
      <div style={{height:"7.5vh "}}>
        <Nav/>
        </div>
        <div  className="flex" style={{height:"92.5vh"}}>
        <Sidebar/>
        {
          videos.length?(
            <InfiniteScroll dataLength={videos.length} next={()=>dispatch(GetHomePageVideos(true))} hasMore={videos.length<500}
            loader={<Spinner/>}
            height={650}>
                <div className='grid gap-y-14 gap-x-8 grid-cols-4 p-8'>
                  {videos.map((item)=>{
                    return <Card data={item} key={item.videoId}/>
                  })}
                </div>

              </InfiniteScroll>
          ):(
            <Spinner/>
          )
        }
        
        </div>


    </div>
  )
}

export default Home