import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { GalleryList } from './Gallery.styled';

export const ImageGallery = ({ images, openModal, getModalImg }) => {
  return (
    <GalleryList>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          image={el}
          openModal={openModal}
          getModalImg={getModalImg}
        />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  openModal: PropTypes.func.isRequired,
  getModalImg: PropTypes.func.isRequired,
};
