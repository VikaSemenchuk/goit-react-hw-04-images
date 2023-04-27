import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { APIgetImages } from 'services/fetch';
import { Searchbar } from 'components/searchbar/Searchbar';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { Button } from 'components/button/Button';
import { Loader } from 'components/loader/Loader';
import { ToastContainerEl } from '../toast/ToastContainer';

import { Container } from './App.styled';

export const App = () => {
  const [search, setSearch] = useState('');
  const [gallery, setGallery] = useState([]);
  const [totalImg, setTotalImg] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) return;

    const getImages = async () => {
      try {
        setIsLoading(true);

        const { images, totalImg } = await APIgetImages(search, page);

        if (!images.length) {
          setGallery([]);
          toast.error(
            'Sorry. There are no images ... 😭. Please, try some other words for search'
          );
          return;
        }

        setTotalImg(totalImg);

        if (page === 1) {
          setGallery(images);
        } else setGallery(prev => [...prev, ...images]);
        
      } catch (error) {
        toast.error(`Something wrong 😢 Please, try again later`);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [search, page]);

  function handleSearchFormSubmit(search) {
    setSearch(search);
    setPage(1);
  }

  function loadMore() {
    setPage(prev => prev + 1);
  }

  return (
    <Container>
      <ToastContainerEl />

      {/* Search */}
      <Searchbar onSubmit={handleSearchFormSubmit} />

      {/* Loader */}
      {isLoading && <Loader />}

      {/* Gallery */}
      {gallery.length !== 0 && <ImageGallery images={gallery} />}

      {/* Button */}
      {totalImg > gallery.length && !!gallery.length && (
        <Button loadMore={loadMore} />
      )}
    </Container>
  );
};
