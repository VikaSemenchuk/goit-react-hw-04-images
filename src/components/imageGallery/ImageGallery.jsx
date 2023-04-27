import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { GalleryList } from './Gallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(el => (
        <ImageGalleryItem key={el.id} image={el} />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
};
