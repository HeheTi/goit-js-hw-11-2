const axios = require('axios');

export default class ApiPictureConstructor {
  #API_KEY = '24468918-f1629215ca3337ba51b4044a7';
  BASE_URL = 'https://pixabay.com/api/';
  #searchInfo = '';
  #PER_PAGE = 40;

  constructor() {
    this.#searchInfo = '';
  }

  getURL() {
    const queryParams = new URLSearchParams({
      key: this.#API_KEY,
      q: `${this.searchInfo}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${this.perPage}`,
    });

    return `${this.BASE_URL}?${queryParams}`;
  }

  get perPage() {
    return this.#PER_PAGE;
  }
  get searchInfo() {
    return this.#searchInfo;
  }

  set searchInfo(value) {
    this.#searchInfo = value;
  }
}
