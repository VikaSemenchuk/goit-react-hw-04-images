import PropTypes from 'prop-types';
import { Component } from 'react';

import { Overlay, ModalStyle } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.escCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escCloseModal);
  }

  escCloseModal = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  closeModal = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { modalImg, alt } = this.props;

    return (
      <Overlay onClick={this.closeModal}>
        <ModalStyle>
          <img src={modalImg} alt={alt} />
        </ModalStyle>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
