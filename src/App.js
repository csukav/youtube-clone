import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Loading from './components/Loading/Loading';
import VideoSkeleton from './components/Loading/VideoSkeleton';
import { searchVideos, getRandomVideos, getVideoDetails, getRelatedVideos } from './api/youtube';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRandomVideos();
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      loadRelatedVideos(selectedVideo.id.videoId);
    }
  }, [selectedVideo]);

  const loadRandomVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRandomVideos();
      setVideos(response.items);
      setSelectedVideo(null);
    } catch (err) {
      setError('Hiba történt a videók betöltése közben');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchVideos(searchTerm);
      setVideos(response.items);
      setSelectedVideo(null);
    } catch (err) {
      setError('Hiba történt a keresés során');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSelect = async (video) => {
    try {
      setLoading(true);
      setError(null);
      const details = await getVideoDetails(video.id.videoId);
      if (details && details.items.length > 0) {
        setSelectedVideo({ ...video, ...details.items[0] });
      } else {
        setSelectedVideo(video);
      }
    } catch (err) {
      setError('Hiba történt a videó betöltése során');
      setSelectedVideo(video);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedVideos = async (videoId) => {
    try {
      const response = await getRelatedVideos(videoId);
      setRelatedVideos(response.items);
    } catch (err) {
      console.error('Hiba történt a kapcsolódó videók betöltése során:', err);
    }
  };

  return (
    <AuthProvider>
      <div className="app">
        <SearchBar onSearch={handleSearch} onHomeClick={loadRandomVideos} />
        {error && <div className="error-message">{error}</div>}
        
        <div className={`content ${selectedVideo ? 'with-player' : ''}`}>
          {selectedVideo && (
            loading ? (
              <Loading size="large" />
            ) : (
              <VideoPlayer video={selectedVideo} />
            )
          )}
          
          <div className="video-list-container">
            {selectedVideo && <h2 className="related-videos-title">Kapcsolódó videók</h2>}
            {loading ? (
              <VideoSkeleton count={6} />
            ) : (
              <VideoList 
                videos={selectedVideo ? relatedVideos : videos} 
                onVideoSelect={handleVideoSelect}
              />
            )}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;


