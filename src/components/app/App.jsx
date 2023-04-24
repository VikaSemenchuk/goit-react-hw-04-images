import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from 'services/fetch';

import { Searchbar } from 'components/searchbar/Searchbar';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { Button } from 'components/button/Button';
import { Loader } from 'components/loader/Loader';
import { ToastContainerEl } from '../toast/ToastContainer';
import { Modal } from '../modal/Modal.jsx';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    search: '',
    gallery: [],
    totalImg: 0,
    modalImg: null,
    alt: '',
    page: 1,
    error: null,
    isModal: false,
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      this.setState({ loading: true });
      getImages(search, page)
        .then(({ images, totalImg }) => {
          if (!images.length) {
            this.setState({ gallery: [] });
            toast.error(
              'Sorry. There are no images ... 😭. Please, try some other words for search'
            );
            return;
          }

          this.setState({
            gallery: images,
            totalImg,
            modalImg: images.modalImg,
            error: '',
            page: 1,
          });
        })

        .catch(error => {
          this.setState({ error });
          toast.error(error.message);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }

    if (prevState.page < page) {
      this.setState({ loading: true });
      getImages(search, page)
        .then(({ images, totalImg }) => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...images],
            totalImg,
            modalImg: images.modalImg,
            error: '',
            page: this.state.page,
          }));
        })

        .catch(error => {
          this.setState({ error });
          toast.error(error.message);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleSearchFormSubmit = search => {
    this.setState({ search, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModal: !prevState.isModal }));
  };

  getModalImg = (modalImg, alt) => {
    this.setState({ modalImg, alt });
  };

  render() {
    const { gallery, totalImg, alt, loading, isModal, modalImg } = this.state;
    return (
      <Container>
        <ToastContainerEl />

        {/* Search */}
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        {/* Loader */}
        {loading && <Loader />}

        {/* Gallery */}
        {gallery.length !== 0 && (
          <ImageGallery
            images={gallery}
            openModal={this.toggleModal}
            getModalImg={this.getModalImg}
          />
        )}

        {/* Modal */}
        {isModal && (
          <Modal modalImg={modalImg} alt={alt} closeModal={this.toggleModal} />
        )}

        {/* Button */}
        {totalImg > gallery.length && !!gallery.length && (
          <Button loadMore={this.loadMore} />
        )}
      </Container>
    );
  }
}
