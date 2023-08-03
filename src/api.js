import axios from 'axios';

const API_KEY = '38520024-edbea968ff73ee695fee624f9';
const perPage = 21;

export function fetchImages(query, page) {
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    )
    .then(response => response.data)
    .catch(error => {
      console.error('Image loading error', error);
      throw error;
    });
}
