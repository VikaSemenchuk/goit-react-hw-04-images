// import { useState } from 'react';

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

  // const [search, setSearch] = useState('')
  // const [gallery, setGallery] = useState([])
  // const [totalImg, setTotalImg] = useState(0)
  // const [modalImg, setModalImg] = useState(null)
  // const [alt, setAlt] = useState('')
  // const [page, setPage] = useState(1)
  // const [error, setError] = useState(null)
  // const [isModal, setIsModal] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      this.setState({ loading: true });
      // setIsLoading(true)

      getImages(search, page)
        .then(({ images, totalImg }) => {
          if (!images.length) {
            this.setState({ gallery: [] });
            // setGallery([])

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

          // setGallery(image)
          // setTotalImg(totalImg)
          // setModalImg(images.modalImg)
          // setError('')
          // setPage(1)
        })

        .catch(error => {
          this.setState({ error });
          // setError(error)

          toast.error(error.message);
        })
        .finally(() => {
          this.setState({ loading: false });
          // setIsLoading(false)
        });
    }

    if (prevState.page < page) {
      this.setState({ loading: true });
      // seIsLoading(true)
      getImages(search, page)
        .then(({ images, totalImg }) => {
          // ???????
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
          // setError(error)
          toast.error(error.message);
        })
        .finally(() => {
          this.setState({ loading: false });
          // setIsLoading(false)
        });
    }
  }

  handleSearchFormSubmit = search => {
    this.setState({ search, page: 1 });
  };

  //const handleSearchFormSubmit = search => {
  //   this.setState({ search, page: 1 });
  // setSearch(search);
  // setPage(1)
  // };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  //const loadMore = () => {
  // setPage(prev => prev + 1)
  
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }));
  // };

  toggleModal = () => {
    this.setState(prevState => ({ isModal: !prevState.isModal }));
  };

  //const toggleModal = () => {
    // setIsModal(prev => !prev)

  //   this.setState(prevState => ({ isModal: !prevState.isModal }));
  // };

  getModalImg = (modalImg, alt) => {
    this.setState({ modalImg, alt });
  };

  //const getModalImg = (modalImg, alt) => {
    // setModalImg(modalImg)
    // setAlt(alt)

  //   this.setState({ modalImg, alt });
  // };

  render() {
    const { gallery, totalImg, alt, loading, isModal, modalImg } = this.state;
    return (
      <Container>
        <ToastContainerEl />

        {/* Search */}
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {/* <Searchbar onSubmit={handleSearchFormSubmit} /> */}


        {/* Loader */}
        {loading && <Loader />}
        {/* {isLoading && <Loader />} */}


        {/* Gallery */}
        {gallery.length !== 0 && (
          <ImageGallery
            images={gallery}
            openModal={this.toggleModal}
            // openModal={toggleModal}

            getModalImg={this.getModalImg}
            // getModalImg={getModalImg}

          />
        )}

        {/* Modal */}
        {isModal && (
          
          <Modal modalImg={modalImg} alt={alt} closeModal={this.toggleModal} />
          // <Modal modalImg={modalImg} alt={alt} closeModal={toggleModal} />
        )}

        {/* Button */}
        {totalImg > gallery.length && !!gallery.length && (
          <Button loadMore={this.loadMore} />
          // <Button loadMore={loadMore} />
        )}
      </Container>
    );
  }
}
