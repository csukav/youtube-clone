import axios from 'axios';

const API_KEY = 'AIzaSyB81QoYE-URbEIZxXtWc4GE3u7bHk2vLKQ';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 10,
        key: API_KEY,
        q: searchTerm,
        type: 'video'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { items: [] };
  }
};

export const getRandomVideos = async () => {
  const popularTerms = ['music', 'news', 'gaming', 'sports', 'education'];
  const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
  return searchVideos(randomTerm);
};
