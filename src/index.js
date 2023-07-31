import { fetchImages, createImageCard } from './api';
import notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let currentQuery = '';

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value.trim();
  if (searchQuery === currentQuery) return;

  currentQuery = searchQuery;
  page = 1;
  gallery.innerHTML = '';

  fetchImages(currentQuery, page, gallery)
    .then(showImages)
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
}

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchImages(currentQuery, page, gallery)
    .then(showImages)
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
});

function showNotification(message) {
  notiflix.Notify.failure(message);
}

function showImages(result) {
  const data = result.data;
  const hits = data?.hits ?? [];

  if (hits.length === 0) {
    if (page === 1) {
      showNotification(
        "Sorry, but no images were found for your request. Please try again."
      );
    } else {
      showNotification("Sorry, these are the latest search results.");
    }
    loadMoreBtn.style.display = 'none';
  } else {
    hits.forEach((image) => {
      createImageCard(image, gallery);
    });
    loadMoreBtn.style.display = 'block';
  }
}