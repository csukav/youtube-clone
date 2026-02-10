import React from 'react';

function VideoItem({ video, onVideoSelect }) {
  return (
    <div 
      className="video-item"
      onClick={() => onVideoSelect(video)}
    >
      <img 
        src={video.snippet.thumbnails.medium.url} 
        alt={video.snippet.title}
      />
      <div className="video-item__info">
        <h3>{video.snippet.title}</h3>
        <p className="channel-name">{video.snippet.channelTitle}</p>
        <p className="description">{video.snippet.description}</p>
      </div>
    </div>
  );
}

export default VideoItem;