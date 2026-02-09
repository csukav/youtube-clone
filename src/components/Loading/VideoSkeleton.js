import React from 'react';
import './Loading.css';

const VideoSkeleton = ({ count = 1 }) => {
  return [...Array(count)].map((_, index) => (
    <div key={index} className="video-skeleton">
      <div className="video-skeleton-thumbnail"></div>
      <div className="video-skeleton-info">
        <div className="video-skeleton-title"></div>
        <div className="video-skeleton-channel"></div>
      </div>
    </div>
  ));
};

export default VideoSkeleton;