import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

const DisplayVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/display-video/${id}`, {
          responseType: 'blob',
        });

        // Creating an object URL for the video blob
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error('Error displaying video:', error);
      }
    };

    fetchVideo();
  }, [id]);

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `video-${id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='filesDisplay'>
      {videoUrl && (
        <div>
          <h2>Video file:</h2>
          <hr />
          <video controls src={videoUrl} className='mediafdis' />
        </div>
      )}
      <button onClick={downloadVideo} className='downloadbtt'>Download</button>
    </div>
    // <div className='mediasumdis'></div>  --for video analysis
  );
};

export default DisplayVideo;