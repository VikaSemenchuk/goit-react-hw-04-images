const URL = 'https://pixabay.com/api/';
const API_KEY = '35482299-15104ebb11f3b9947dca699f9';

export function getImages(search, page) {
  return fetch(
    `${URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error(`Something wrong 😢 Please, try again later`));
      }
    })
    .then(data => {
      const images = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id: id,
          alt: tags,
          img: webformatURL,
          modalImg: largeImageURL,
        })
      );
      const totalImg = data.totalHits;
      return { images, totalImg };
    });
}
