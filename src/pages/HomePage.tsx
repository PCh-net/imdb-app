// Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SimpleNavbar from '../components/SimpleNavbar';
import CustomButton from '../components/CustomButton';
import BoxLiMore from '../components/BoxLiMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import 'animate.css';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Awards: string;
  Category: string;
  Plot: string;
  Metascore: string;
  //
}

const Home: React.FC = () => {
  const [bestMovies, setBestMovies] = useState<Movie[]>([]);
  const [firstImage, setFirstImage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        // API
        const categories = ['Animation', 'Sport', 'Comedy', 'Romance', 'Sci-Fi'];
        const maxResults = 4; // 

        // unikalny zakres dat dla każdej kategorii
        const dateRanges = [
          '1980-01-01,1990-12-31',
          '2000-01-01,2012-12-31',
          '1990-01-01,2000-12-31',
        ];
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        const requests = categories.map((category, index) =>
          axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${category}&y=${dateRanges[index]}`)
        );

        const responses = await Promise.all(requests);

        const bestMoviesData: Movie[] = [];
        responses.forEach((response) => {
          if (response.data?.Search) {
            const sortedMovies = response.data.Search.sort((a: Movie, b: Movie) => {
              return parseInt(b.Year) - parseInt(a.Year);
            });
            bestMoviesData.push(...sortedMovies.slice(0, maxResults));
          }
        });

        if (bestMovies.length > 0) {
          setFirstImage(bestMovies[0].Poster);
        } else {
          setFirstImage('/image/poster-1.jpg');
        }

        setBestMovies(bestMoviesData);


      } catch (error) {
        console.error('Error fetching best movies:', error);
      }
    };

    fetchData();

  }, []);


  if (!bestMovies) {
    return <Layout>
      <div className='md:container md:mx-auto'>
        <SimpleNavbar />
        <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 items-center'>
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
        <title>Top Movies | IMDb API App</title>
        <meta name="description" content="Discover the top movies from various genres." />
        <meta property="og:title" content="Top Movies | IMDb API App" />
        <meta property="og:description" content="Discover the top movies from various genres." />
        <meta property="og:image" content={firstImage} />
        <meta property="og:url" content="/" />
      </Helmet>
      <div className='md:container md:mx-auto'>
        <SimpleNavbar />

        <div className='flex flex-col p-4'>
          <h1 className='text-4xl text-lime-900 mb-4'>Home page</h1>
          
            <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
              <Link to={`/search`}>
              <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
                <h1 className='text-xl text-lime-900 text-center animate__animated animate__bounceIn animate__delay-1s'><FontAwesomeIcon icon={faStar} />&emsp;Search Movie&emsp;<FontAwesomeIcon icon={faStar} /></h1>
                <CustomButton size="text-xl" fullWidth={true}>Top Movies</CustomButton>
              </div>
              </Link>
            </div>
          
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

            {bestMovies?.map((movie) => (
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
                      <img src={movie.Poster} alt={`${movie.Title} Poster`} title={`Title: ${movie.Title}`} className='mb-2 w-full h-auto max-h-96 object-cover' />
                      <CustomButton size="text-xl truncate" fullWidth={true}>{movie.Title}</CustomButton>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
              <li key='key_001' className='mb-4'>
                <Link to="/movies">
                  <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
                      <h1 className='text-xl text-lime-900 text-center'>Top Movies by IMDb Rating</h1>
                      <CustomButton size="text-xl truncate" fullWidth={true}><FontAwesomeIcon icon={faStar} />&emsp;Check movies&emsp;<FontAwesomeIcon icon={faStar} /></CustomButton>
                    </div>
                  </div>
                </Link>
              </li>
              <BoxLiMore limit={5} randomize={true} />
          </ul>

        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Home;
