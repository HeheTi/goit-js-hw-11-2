import { Notify } from 'notiflix/build/notiflix-notify-aio';
import InfiniteScroll from 'infinite-scroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';

import refs from './js/refs.js';
import ApiPictureConstructor from './js/api.js';
import markupAllPic from './js/markup.js';

const picturesApi = new ApiPictureConstructor();

const gallery = new SimpleLightbox('.gallery a', {
  animationSpeed: 300,
});

const FAILURE = 'Sorry, there are no images matching your search query. Please try again.';
const INFO = "We're sorry, but you've reached the end of search results.";
const resultMessage = info => `Hooray! We found ${info} images.`;

let infScroll = new InfiniteScroll(refs.gallery, {
  path: function () {
    return `${picturesApi.getURL()}&page=${this.pageIndex}`;
  },
  history: false,
  responseBody: 'json',
});

infScroll.on('load', function ({ hits, totalHits }) {
  if (hits.length < 1) {
    return Notify.failure(FAILURE);
  }
  const totalPage = Math.ceil(totalHits / picturesApi.perPage);

  if (infScroll.pageIndex - 1 >= totalPage) return Notify.info(INFO);
  if (infScroll.pageIndex - 1 === 1) Notify.success(resultMessage(totalHits));

  const proxyElem = document.createElement('div');

  const markup = markupAllPic(hits);
  proxyElem.innerHTML = markup;
  const photoCards = proxyElem.querySelectorAll('.photo-card');
  infScroll.appendItems(photoCards);
  gallery.refresh();
});

function onSearchPicture(e) {
  e.preventDefault();
  picturesApi.searchInfo = e.currentTarget.elements.searchQuery.value;

  infScroll.loadNextPage();

  reset();
}

refs.form.addEventListener('submit', onSearchPicture);

function reset() {
  refs.gallery.innerHTML = '';
}
