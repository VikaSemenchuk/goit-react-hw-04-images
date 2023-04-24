import PropTypes from 'prop-types';

import { GalleryImg, GalleryItem } from './GalleryItem.styled';

export const ImageGalleryItem = ({ image, openModal, getModalImg }) => {
  const { img, alt, modalImg } = image;

  return (
    <GalleryItem>
      <GalleryImg
        src={img}
        alt={alt}
        onClick={() => {
          getModalImg(modalImg, alt);
          openModal();
        }}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  getModalImg: PropTypes.func.isRequired,
};
