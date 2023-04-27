import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '35482299-15104ebb11f3b9947dca699f9';

export const APIgetImages = async (search, page) => {
  const params = {
    key: API_KEY,
    q: search,
    page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  };
  try {
    const { data } = await axios.get(`${URL}`, { params });

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

  } catch (error) {}
};
