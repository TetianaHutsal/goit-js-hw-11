import axios from 'axios';
const API_KEY = '38520024-edbea968ff73ee695fee624f9';

export function fetchImages(query, page, gallery) {
  const perPage = 20; 
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    )
    .then((response) => response.data)
    .then((data) => {
      return { data, gallery };
    })
    .catch((error) => {
      console.error('Image loading error', error);
      return { data: { hits: [] }, gallery };
    });
}

  
  export function createImageCard(imageData, gallery) {
    const { webformatURL, tags, likes, views, comments, downloads } = imageData;
    const card = document.createElement('div');
    card.classList.add('photo-card');
    card.innerHTML = `
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${likes}</p>
        <p class="info-item"><b>Views:</b> ${views}</p>
        <p class="info-item"><b>Comments:</b> ${comments}</p>
        <p class="info-item"><b>Downloads:</b> ${downloads}</p>
      </div>
    `;
    gallery.appendChild(card); 
  }