import React from 'react';

function VideoPlayer({ video }) {
  if (!video) return null;

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className="video-player">
      <iframe
        src={videoSrc}
        title={video.snippet.title}
        allowFullScreen
      />
      <div className="video-player__info">
        <h3>{video.snippet.title}</h3>
        <p>{video.snippet.channelTitle}</p>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
}

export default VideoPlayer;
