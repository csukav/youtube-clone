import React from 'react';

function VideoPlayer({ video }) {
  if (!video) return null;

  const getVideoId = () => {
    if (typeof video.id === 'object') {
      return video.id.videoId;
    }
    return video.id;
  };

  // Hozzáadtuk az autoplay=1 paramétert
  const videoSrc = `https://www.youtube.com/embed/${getVideoId()}?autoplay=1`;

  return (
    <div className="video-player">
      <iframe
        src={videoSrc}
        title={video.snippet.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="video-player__info">
        <h3>{video.snippet.title}</h3>
        <p className="channel-title">{video.snippet.channelTitle}</p>
        <p className="description">{video.snippet.description}</p>
      </div>
    </div>
  );
}

export default VideoPlayer;


