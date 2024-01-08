// components/CategoriesPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MiniButton from '../components/MiniButton';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import SimpleNavbar from '../components/SimpleNavbar';

const capitalizeFirstLetter = (string: string) => {
  return string
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const categories = [
  "action", "adventure", "animation", "biography", "comedy",
  "crime", "documentary", "drama", "family", "fantasy",
  "film noir", "history", "horror", "music", "musical",
  "mystery", "romance", "sci-fi", "short", "sport",
  "superhero", "thriller", "war"
];

const CategoriesPage: React.FC = () => {
  return (
    <Layout>
    <div className='md:container md:mx-auto'>
    <SimpleNavbar />
      {categories.map((category, index) => (
        <div key={index} className='mb-4'>
          <Link to={`/search/${category}`}>
            <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
              <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
                <h1 className='text-xl text-lime-900 text-center text-capitalize'>{capitalizeFirstLetter(category)}</h1>
                <MiniButton size="text-m md:text-lg lg:text-xl xl:text-xl truncate align-middle" fullWidth={true}>
                  <FontAwesomeIcon className='text-m md:text-lg lg:text-xl xl:text-xl truncate align-middle' icon={faArrowRight} />
                  &emsp;Check movies
                </MiniButton>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <Footer />
    </div>
    </Layout>
  );
};

export default CategoriesPage;
