// MovieDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import SimpleNavbar from '../components/SimpleNavbar';
import CustomButton from '../components/CustomButton';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';


interface Movie {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  imdbRating: string;
  Genre: string;
  imdbVotes: string;
  Director: string;
  Released: string;
  DVD: string;
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Runtime: string;
  Writer: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;

}   


const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (id) {
          const apiKey = process.env.REACT_APP_OMDB_API_KEY;
          const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
          setMovie(response.data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  console.log(movie);

  if (!movie) {
    return <Layout>
      <div className='md:container md:mx-auto'>
        <SimpleNavbar />
        <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 items-center'>
          <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
            <img src="/image/logo/loading-circle.gif" alt="loader-gif" className='mb-2 h-auto max-h-320 object-cover' />
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
        <title>Movie detail {movie.Title} | IMDb API App</title>
        <meta name="description" content={`Actors | ${movie.Actors} - ${movie.Genre}`} />
        <meta property="og:title" content={`Movie detail ${movie.Title} | IMDb API App`} />
        <meta property="og:description" content={`Actors | ${movie.Actors} - ${movie.Genre}`} />
        <meta property="og:image" content={movie.Poster} />
        <meta property="og:url" content={`/movies/${id}`} />
      </Helmet>
      <div className='md:container md:mx-auto'>
      <SimpleNavbar />

        <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
          <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
            <h1 className='text-3xl text-lime-950'>{movie.Title}</h1>
            <p className='text-2xl text-lime-900'>{movie.Genre}</p>
            <p className='text-2xl text-lime-900'>({movie.Year})</p>
            {movie.Poster !== 'N/A' && movie.Poster !== '' && (
            <img src={movie.Poster} alt={`${movie.Title} Poster`} className='mb-2 w-full md:w-1/2 object-cover h-auto' />
            )}
            {movie.Plot !== 'N/A' && movie.Plot !== '' && (
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-900 text-center pb-2'>{movie.Plot}</p>
            </div>
            )} 
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>Actors: {movie.Actors}</p>
            </div>
            {movie.Awards !== 'N/A' && movie.Awards !== '' && (
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>Awards: {movie.Awards}</p>
            </div>   
            )} 
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>IMDb rating: {movie.imdbRating
} / IMDb votes: {movie.imdbVotes}</p>
            </div>
            {movie.Director !== 'N/A' && movie.Director !== '' && (
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>Director: {movie.Director}</p>
            </div>
            )} 
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>Released: {movie.Released}</p>
            </div>
            {movie.DVD !== 'N/A' && movie.DVD !== '' && (
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>DVD: {movie.DVD}</p>
            </div>
            )}
            {movie.BoxOffice !== 'N/A' && movie.BoxOffice !== '' && (
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>BoxOffice: {movie.BoxOffice}</p>
            </div>
            )}
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>Runtime: {movie.Runtime}</p>
            </div>
            {movie.Writer !== 'N/A' && movie.Writer !== '' && (
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>Writer: {movie.Writer}</p>
            </div>
            )}
            {movie.Ratings.map((rating, index) => (
              <div key={index} className="border-6 border-t border-lime-600 pt-2">
                <p className='text-xl text-lime-800 text-center'>
                  {rating.Source}: {rating.Value}
                </p>
              </div>
            ))}
            {movie.Metascore !== 'N/A' && movie.Metascore !== '' && (
            <div className="border-6 border-t border-lime-600 pt-2">
              <p className='text-xl text-lime-800 text-center'>Metascore: {movie.Metascore}</p>
            </div>
            )}


          </div>
        </div>

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
      <Footer />
    </Layout>
  );
};

export default MovieDetails;

