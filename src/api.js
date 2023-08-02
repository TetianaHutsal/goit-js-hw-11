import axios from 'axios';
const API_KEY = '38520024-edbea968ff73ee695fee624f9';

export function fetchImages(query, page) {
  const perPage = 21;
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

export function createImageCard(imageData, gallery, lightbox) {
  const { webformatURL, tags, likes, views, comments, downloads } = imageData;
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const imgLink = document.createElement('a');
  imgLink.href = webformatURL;

  const img = document.createElement('img');
  img.src = webformatURL;
  img.alt = tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('info');

  const infoItems = [
    { name: 'Likes', value: likes },
    { name: 'Views', value: views },
    { name: 'Comments', value: comments },
    { name: 'Downloads', value: downloads },
  ];

  infoItems.forEach(item => {
    const p = document.createElement('p');
    p.classList.add('info-item');
    p.innerHTML = `<b>${item.name}:</b> ${item.value}`;
    info.appendChild(p);
  });

  imgLink.appendChild(img);
  card.appendChild(imgLink);
  card.appendChild(info);

  gallery.appendChild(card);

  lightbox.refresh();
}
