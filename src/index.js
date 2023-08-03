import { fetchImages } from './api';
import { createImageCard } from './createImageCard';
import notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let currentQuery = '';
let lightbox;

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value.trim();
  if (searchQuery === currentQuery) return;

  currentQuery = searchQuery;
  page = 1;
  gallery.innerHTML = '';

  fetchImages(currentQuery, page)
    .then(showImages)
    .catch(error => {
      console.error('Error fetching images:', error);
      showNotification(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {});
  }
}

function showNotification(message) {
  notiflix.Notify.failure(message);
}

function showImages(data) {
  const hits = data?.hits ?? [];
  const totalHits = data?.totalHits ?? 0;
  const cards = [];

  if (hits.length > 0) {
    notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    initLightbox();

    hits.forEach(image => {
      const card = createImageCard(image);
      cards.push(card);
    });

    gallery.append(...cards);

    if (hits.length >= totalHits) {
      loadMoreBtn.style.display = 'none';
      showNotification(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      page += 1;
      loadMoreBtn.style.display = 'block';
    }
  } else {
    if (page === 1) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      showNotification(
        "We're sorry, but you've reached the end of search results."
      );
    }
    loadMoreBtn.style.display = 'none';
  }
}

loadMoreBtn.addEventListener('click', () => {
  fetchImages(currentQuery, page)
    .then(showImages)
    .then(() => {
      window.scrollBy({
        top: gallery.lastElementChild.clientHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
});
