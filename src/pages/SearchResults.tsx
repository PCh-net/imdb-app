// SearchResults.tsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import SimpleNavbar from '../components/SimpleNavbar';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faAnglesRight, faAnglesLeft, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Movies from './MoviesIndex';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MoviesResponse {
  Search: Movie[];
  totalResults: string;
}

const SearchResults: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [firstImage, setFirstImage] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        const response = await axios.get<MoviesResponse>(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie&page=${currentPage}`
        );

        if (response.data?.Search) {
          setMovies(response.data.Search);
          setTotalResults(parseInt(response.data.totalResults, 10));

          if (response.data.Search.length > 0) {
            setFirstImage(response.data.Search[0].Poster);
          } else {
            setFirstImage(''); // 
          }

        } else {
          console.error('Invalid response from API:', response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();

  }, [searchTerm, currentPage]);


  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 3;
    const maxButtonsOnEachSide = Math.floor(maxVisibleButtons / 2);
    const startPage = Math.max(1, currentPage - maxButtonsOnEachSide);
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (currentPage > maxButtonsOnEachSide + 1) {
      buttons.push(
        <button key="first" onClick={() => {
          handlePageChange(1);
          window.scrollTo(0, 0);
        }} className="px-2 py-1 rounded focus:outline-none">
          1
        </button>
      );
      if (currentPage > maxButtonsOnEachSide + 2) {
        buttons.push(<span key="leftDots">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            handlePageChange(i);
            window.scrollTo(0, 0);
          }}
          className={`px-2 py-1 rounded focus:outline-none ${i === currentPage ? 'bg-lime-700 text-white' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - maxButtonsOnEachSide) {
      if (currentPage < totalPages - maxButtonsOnEachSide - 1) {
        buttons.push(<span key="rightDots">...</span>);
      }
      buttons.push(
        <button key="last" onClick={() => handlePageChange(totalPages)} className="px-2 py-1 rounded focus:outline-none">
          {totalPages}
        </button>
      );
    }
    //
    return buttons;
  };

  if (!movies) {
    return <Layout>
      <div className='md:container md:mx-auto'>
        <SimpleNavbar />
        <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 items-center'>
          <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
            <img src="/image/logo/loading-circle.gif" alt="loader-gif" className='mb-2 h-auto object-cover' />
          </div>   
        </div>
        <Link to="/">
          <CustomButton size="text-xl" fullWidth={true}>Home page</CustomButton>
        </Link>
      </div>
    </Layout>;
  }

  return (
    <Layout>
      <Helmet>
        <title>Search {searchTerm} | IMDb API App</title>
        <meta name="description" content={`Items: ${searchTerm} - ${totalPages}`} />
        <meta property="og:title" content={`Search ${searchTerm} | IMDb API App`} />
        <meta property="og:description" content={`Items: ${searchTerm} - ${totalPages}`} />
        <meta property="og:image" content={firstImage} />
        <meta property="og:url" content={`/search/${searchTerm}`} />
      </Helmet>
      <div className='md:container md:mx-auto'>
        <SimpleNavbar />
        <div className='flex flex-col p-4'>
          <h1 className='text-4xl text-lime-900'>Movies by search:</h1>
          <h1 className='text-2xl text-lime-900 mb-4'>{searchTerm}</h1>
          <p className='mb-2 text-l text-lime-700'>Page: {currentPage} / {totalPages} total movies: {totalResults}</p>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            {movies?.map((movie) => (
              <motion.li
              key={movie.imdbID}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-4'
              >
                <Link to={`/movies/${movie.imdbID}`}>
                  <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
                      <h1 className='text-xl text-lime-900 text-center'>{movie.Title} ({movie.Year})</h1>
                      {movie.Poster !== 'N/A' ? (
                        <img
                          src={movie.Poster}
                          alt={`${movie.Title} Poster`}
                          title={`Title: ${movie.Title}`}
                          className='mb-2 w-full h-auto max-h-96 object-cover'
                        />
                      ) : (
                        <img
                          src='/image/poster-2.jpg'
                          alt={`${movie.Title} Poster`}
                          title={`Title: ${movie.Title}`}
                          className='mb-2 w-full h-auto max-h-96 object-cover'
                        />
                      )}
                      <CustomButton size="text-xl" fullWidth={true}>More info</CustomButton>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
              <li key='key_001' className='mb-4'>
                <Link to="/">
                  <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
                      <h1 className='text-xl text-lime-900 text-center'>Best movies</h1>
                      <CustomButton
                        onClick={() => {
                          window.history.back();
                        }}
                        fullWidth={true}
                        size='text-2xl'
                      >
                        <FontAwesomeIcon icon={faCircleChevronLeft} className="text-xl text-lime-600" />&emsp;Back to list
                      </CustomButton>
                    </div>
                  </div>
                </Link>
              </li>

          </ul>
          <div className='flex justify-center mt-4 space-x-2'>

            <button
              onClick={() => handlePageChange(currentPage - 10)}
              className='px-2 py-1 rounded-full bg-lime-200 text-lime-900 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400'
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className='px-2 py-1 rounded-full bg-lime-200 text-lime-900 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400'
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className='px-2 py-1 rounded-full bg-lime-200 text-lime-900 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400'
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 10)}
              className='px-2 py-1 rounded-full bg-lime-200 text-lime-900 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400'
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );

};

export default SearchResults;
