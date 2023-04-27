import { useState } from 'react';
import PropTypes from 'prop-types';

import { GalleryImg, GalleryItem } from './GalleryItem.styled';
import { Modal } from '../modal/Modal.jsx';

export const ImageGalleryItem = ({ image }) => {
  const [isModal, setIsModal] = useState(false);

  const { img, alt, modalImg } = image;

  function toggleModal() {
    setIsModal(prev => !prev);
  }

  return (
    <GalleryItem>
      <GalleryImg src={img} alt={alt} onClick={() => toggleModal()} />

      {isModal && (
        <Modal modalImg={modalImg} alt={alt} closeModal={toggleModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
