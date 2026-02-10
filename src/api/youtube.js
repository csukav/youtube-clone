import axios from 'axios';
import { API_CONFIG } from './config';

const youtubeApi = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    params: {
        ...API_CONFIG.DEFAULT_PARAMS,
        key: API_CONFIG.API_KEY,
    },
});

export const searchVideos = async (searchTerm) => {
    try {
        const response = await youtubeApi.get('/search', {
            params: {
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

export const getVideoDetails = async (videoId) => {
    try {
        const response = await youtubeApi.get('/videos', {
            params: {
                id: videoId,
                part: 'snippet,statistics'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching video details:', error);
        return null;
    }
};

export const getChannelDetails = async (channelId) => {
    try {
        const response = await youtubeApi.get('/channels', {
            params: {
                id: channelId,
                part: 'snippet,statistics'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching channel details:', error);
        return null;
    }
};

export const getRelatedVideos = async (videoTitle, channelTitle) => {
    try {
        // Kinyerünk kulcsszavakat a címből
        const keywords = videoTitle
            .replace(/[^\w\s]/g, '') // Műveleti karakterek eltávolítása
            .split(' ')
            .filter(word => word.length > 3) // Rövid szavak szűrése
            .slice(0, 3) // Első 3 kulcsszó
            .join(' ');
        
        const searchQuery = keywords || channelTitle;
        
        const response = await youtubeApi.get('/search', {
            params: {
                q: searchQuery,
                type: 'video',
                maxResults: 15
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching related videos:', error);
        return { items: [] };
    }
};

