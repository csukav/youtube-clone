import React from 'react';
import VideoItem from './VideoItem';

function VideoList({ videos, onVideoSelect }) {
  return (
    <div className="video-list">
      {videos.map(video => (
        <VideoItem
          key={video.id.videoId}
          video={video}
          onVideoSelect={onVideoSelect}
        />
      ))}
    </div>
  );
}

export default VideoList;