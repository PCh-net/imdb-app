// components/BoxLiMore.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MiniButton from './MiniButton';

const capitalizeFirstLetter = (string: string) => {
  return string
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const categories = [
  "action", "adventure", "animation", "biography", "comedy",
  "crime", "documentary", "drama", "family", "fantasy",
  "film Noir", "history", "horror", "music", "musical",
  "mystery", "romance", "sci-fi", "short", "sport",
  "superhero", "thriller", "war"
];  


const BoxLiMore: React.FC<{ limit?: number, randomize?: boolean }> = ({ limit = 5, randomize = false }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  useEffect(() => {
    if (randomize) {
      //
      const shuffled = [...categories].sort(() => 0.5 - Math.random());
      setSelectedCategories(shuffled.slice(0, limit));
    } else {
      setSelectedCategories(categories.slice(0, limit));
    }
  }, [limit, randomize]);

  return (
    <>
      {selectedCategories.map((category, index) => (
        
        <li key={index}>
          <Link to={`/search/${category}`}>
            <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
              <div className='flex flex-col items-center drop-shadow-md hover:drop-shadow-xl bg-blend-color'>
                <h1 className='text-xl text-lime-900 text-center text-capitalize'>{capitalizeFirstLetter(category)}</h1>
                <MiniButton size="text-xl" fullWidth={true}><FontAwesomeIcon className='text-m md:text-lg lg:text-xl xl:text-xl truncate align-middle' icon={faArrowRight} />&emsp;Check movies</MiniButton>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default BoxLiMore;
