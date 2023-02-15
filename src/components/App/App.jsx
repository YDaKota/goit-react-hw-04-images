import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';
import style from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import getPhotos from 'services/api';
// import Loader from 'components/Loader/Loader';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    loading: false,
    error: '',
    images: [],
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    // маркер обновления состояния

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const { hits, totalHits } = await getPhotos(query, page);

        // ошибка, если запрос ничего не возвращает

        if (!hits.length) {
          toast.error(`We didn't find any ${query} images`, {
            theme: 'colored',
          });
          return;
        }

        // если все ок

        if (page > 1) {
          toast.success(`We have found ${12} more of ${totalHits} images`, {
            theme: 'colored',
          });
        } else {
          toast.success(`We have found ${12} of ${totalHits} images`, {
            theme: 'colored',
          });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          error: '',
          totalHits,
        }));
      } catch (error) {
        toast.error('Something went wrong', {
          theme: 'colored',
        });
        this.setState({ error: 'Something went wrong' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  // обработка клика по кнопке load more

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // получаем из формы имя запроса и добавляем в state

  getQuery = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalHits: 0,
    });
  };

  render() {
    const { images, loading, totalHits } = this.state;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.getQuery} />
        {!!images.length && <ImageGallery images={images} />}
        {images.length !== totalHits && !loading ? (
          <Button onClick={this.handleClick} />
        ) : (
          false
        )}
        <ToastContainer autoClose={3000} />
        <ColorRing
          visible={loading}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{ margin: '0 auto' }}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        
      </div>
    );
  }
}

