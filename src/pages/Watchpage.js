import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import Nav from "../components/Nav";
import { GetRecommendedVideos } from "../Store/reducers/getrecommendedVideo";
import { getVideoDetails } from "../Store/reducers/getVideoDetails";

const Watch = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentPlaying = useAppSelector((state) => state.youtubeApp.currentPlaying);
  const recommendedVideos = useAppSelector((state) => state.youtubeApp.recommendedVideos);
  const loadingVideoDetails = useAppSelector((state) => state.youtubeApp.loadingVideoDetails);
  const loadingRecommendedVideos = useAppSelector((state) => state.youtubeApp.loadingRecommendedVideos);
  const errorMessage = useAppSelector((state) => state.youtubeApp.errorMessage); // Error handling for API requests

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id)); // Fetch video details
    } else {
      navigate("/"); // Redirect if no video id found
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) {
      dispatch(GetRecommendedVideos(id)); // Fetch recommended videos after the current video is playing
    }
  }, [currentPlaying, dispatch, id]);

  if (loadingVideoDetails || loadingRecommendedVideos) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>; // Handle API errors
  }

  return (
    <div>
      {currentPlaying && currentPlaying.videoId === id && (
        <div className="max-h-screen overflow-auto">
          {/* Navigation */}
          <div className="h-[7.5vh]">
            <Nav />
          </div>

          {/* Video Player Section */}
          <div className="flex flex-col items-center p-4">
            {currentPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                frameBorder={0}
                width={800}
                height={502}
                allowFullScreen
                title="YouTube Player"
              ></iframe>
            ) : (
              <p>Loading video...</p>
            )}
          </div>

          {/* Recommended Videos Section */}
          <div className="p-4">
            {recommendedVideos?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedVideos.map((video) => (
                  <div key={video.videoId} className="video-card">
                    <img src={video.videoThumbnail} alt={video.videoTitle} />
                    <h4>{video.videoTitle}</h4>
                    <p>{video.videoViews} views • {video.videoAge}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recommended videos found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;
