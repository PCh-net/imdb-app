// MoviesIndex.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import SimpleNavbar from '../components/SimpleNavbar';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

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

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const [firstImage, setFirstImage] = useState('');


  useEffect(() => {
    // aktualizuj URL zgodnie z API
    const fetchMovies = async () => {
      try {
        const response = await axios.get<MoviesResponse>(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&type=movie&s=movie&page=${currentPage}&sort=imdbRating`
        );

        if (response.data?.Search) {
          setMovies(response.data.Search);
          setTotalResults(parseInt(response.data.totalResults, 10));
        } else {
          console.error('Invalid response from API:', response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    if (movies && movies.length > 0) {
      setFirstImage(movies[0].Poster);
    } else {
      setFirstImage('/image/poster-1.jpg'); // 
    }

    fetchMovies();
  }, [currentPage]);

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

    return buttons;
  };

  if (!movies) {
    return <Layout>
      <div className='md:container md:mx-auto'>
        <SimpleNavbar />
        <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 items-center'>
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
        <title>Top Movies by IMDb Rating | IMDb API App</title>
        <meta name="description" content="Discover the top movies by IMDb Rating.." />
        <meta property="og:title" content="Top Movies by IMDb Rating | IMDb API App" />
        <meta property="og:description" content="Discover the top movies by IMDb Rating." />
        <meta property="og:image" content={firstImage} />
        <meta property="og:url" content="/movies" />
      </Helmet>
      <div className='md:container md:mx-auto'>
        <SimpleNavbar />
        <div className='flex flex-col p-4'>
          <h1 className='text-4xl text-lime-900 mb-4'>Top Movies by IMDb Rating</h1>
          <p className='mb-2 text-l text-lime-700'>Page: {currentPage} / {totalPages} total movies: {totalResults}</p>

          <div className='flex justify-center p-4 space-x-2'>
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
                      <h1 className='text-xl text-lime-900 text-center line-clamp-2 text-ellipsis min-h-[2rem]'>{movie.Title}</h1>
                      <h2 className='text-xl text-lime-900 text-center'>({movie.Year})</h2>
                      <img src={movie.Poster} alt={`${movie.Title} Poster`} className='mb-2 w-full h-auto max-h-96 object-cover' />
                      <CustomButton size="text-xl" fullWidth={true}>More info</CustomButton>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
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

export default Movies;
