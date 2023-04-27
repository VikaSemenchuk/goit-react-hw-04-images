import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalStyle } from './Modal.styled';

export const Modal = ({ closeModal, alt, modalImg }) => {
  
  useEffect(() => {
    function escCloseModal(e) {
      if (e.code === 'Escape') closeModal();
    }
    document.addEventListener('keydown', escCloseModal);

    return () => document.removeEventListener('keydown', escCloseModal);
  }, [closeModal]);

  function onCloseModal(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <Overlay onClick={onCloseModal}>
      <ModalStyle>
        <img src={modalImg} alt={alt} />
      </ModalStyle>
    </Overlay>
  );
};

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
