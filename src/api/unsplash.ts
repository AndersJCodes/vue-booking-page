//src/api/unsplash.ts

import axios from 'axios';

const unsplashClient = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
});

export const fetchPhotos = (query: string) => {
    return unsplashClient.get(`/search/photos`, {
        params: { query, per_page: 10 },
    });
};

