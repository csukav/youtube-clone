import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import { searchVideos, getRandomVideos } from './api/youtube';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    loadRandomVideos();
  }, []);

  const loadRandomVideos = async () => {
    const response = await getRandomVideos();
    setVideos(response.items);
    setSelectedVideo(null);
  };

  const handleSearch = async (searchTerm) => {
    const response = await searchVideos(searchTerm);
    setVideos(response.items);
    setSelectedVideo(null);
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <div className={`content ${selectedVideo ? 'with-player' : ''}`}>
        {selectedVideo && (
          <VideoPlayer video={selectedVideo} />
        )}
        <VideoList 
          videos={videos} 
          onVideoSelect={(video) => setSelectedVideo(video)} 
        />
      </div>
    </div>
  );
}

export default App;

