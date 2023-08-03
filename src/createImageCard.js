export function createImageCard(imageData) {
  const { webformatURL, tags, likes, views, comments, downloads } = imageData;
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const imgLink = document.createElement('a');
  imgLink.href = webformatURL;

  const img = document.createElement('img');
  img.src = webformatURL;
  img.alt = tags;
  img.loading = 'lazy';

  const info = document.createElement('ul');
  info.classList.add('info');

  const infoHTML = `
      <li><p>Likes: ${likes}</p></li>
      <li><p>Views: ${views}</p></li>
      <li><p>Comments: ${comments}</p></li>
      <li><p>Downloads: ${downloads}</p></li>
    `;
  info.innerHTML = infoHTML;

  imgLink.appendChild(img);
  card.appendChild(imgLink);
  card.appendChild(info);

  return card;
}
