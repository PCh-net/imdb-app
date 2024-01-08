// pages/SearchPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import SimpleNavbar from '../components/SimpleNavbar';
import Layout from '../components/Layout';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import BoxLiMore from '../components/BoxLiMore';


const capitalizeFirstLetter = (string: string) => {
  return string
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


const categories = [
  { 
    category: "action", 
    details: [
      { id: 1, name: "Animal", description: "A father, who is often away due to work, is unable to comprehend the intensity of his son's love. Ironically, this fervent love and admiration for his father and family creates conflict between the father and son.", imdbid: "tt13751694", image: "https://m.media-amazon.com/images/M/MV5BNGViM2M4NmUtMmNkNy00MTQ5LTk5MDYtNmNhODAzODkwOTJlXkEyXkFqcGdeQXVyMTY1NDY4NTIw._V1_SX300.jpg", year: "2023", yt: "" },
      { id: 2, name: "Fast Charlie", description: "Charlie Swift is a fixer with a problem: the thug he's whacked is missing his head and Charlie will only be paid if the body can be identified. Enter Marcie Kramer, the victim's ex-wife and a woman with all the skills Charlie needs.", imdbid: "tt6722400", image: "https://m.media-amazon.com/images/M/MV5BNGVlZDAyNjYtMjBkNi00MWJhLTliOWUtZTI1NzFjYWY1ZDQxXkEyXkFqcGdeQXVyNzc3MDg1NTM@._V1_SX300.jpg", year: "2023", yt: "" },
      { id: 3, name: "The Killer", description: "After a fateful near-miss, an assassin battles his employers and himself, on an international manhunt he insists isn't personal.", imdbid: "tt1136617", image: "https://m.media-amazon.com/images/M/MV5BZGJkMDUwZWQtYTMzMS00NTg5LWE1ZTYtOTVhMDI4NGI1YjMyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg", year: "2023", yt: "" },
      // więcej
    ]
  },
  { 
    category: "adventure", 
    details: [
      { id: 1, name: "Wonka", description: "With dreams of opening a shop in a city renowned for its chocolate, a young and poor Willy Wonka discovers that the industry is run by a cartel of greedy chocolatiers.", imdbid: "tt6166392", image: "https://m.media-amazon.com/images/M/MV5BNDM4NTk0NjktZDJhMi00MmFmLTliMzEtN2RkZDY2OTNiMDgzXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg", year: "2023", yt: "" },
      { id: 2, name: "Barbie", description: "Barbie suffers a crisis that leads her to question her world and her existence.", imdbid: "tt1517268", image: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg", year: "2023", yt: "" },
      { id: 3, name: " Chicken Run: Dawn of the Nugget", description: "Having pulled off an escape from Tweedy's farm, Ginger has found a peaceful island sanctuary for the whole flock. But back on the mainland the whole of chicken-kind faces a new threat, and Ginger and her team decide to break in.", imdbid: "tt8337264", image: "https://m.media-amazon.com/images/M/MV5BYWQ4MTAwZTgtMGVhNC00ZmI1LTkzYzYtMzE1MzJhZjk3OGM1XkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_SX300.jpg", year: "2023", yt: "" },
      // więcej
    ]
  },
  { 
    category: "fantasy", 
    details: [
      { id: 1, name: "Spider-Man: Across the Spider-Verse", description: "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.", imdbid: "tt9362722", image: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg", year: "2023", yt: "" },
      { id: 2, name: "Everything Everywhere All at Once", description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.", imdbid: "tt6710474", image: "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg", year: "2023", yt: "" },
      { id: 3, name: "Avatar: The Way of Water", description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.", imdbid: "tt1630029", image: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg", year: "2023", yt: "" },
      // więcej
    ]
  },
  // wzór dla każdej kategorii
];

//console.log(categories);


const SearchPage: React.FC<{ limit?: number, randomize?: boolean }> = ({ limit = 5, randomize = false }) => {

  return (
    <>
  
    <Layout>
    <Helmet>
        <title>Search movie | IMDb API App</title>
        <meta name="description" content="Search the top movies." />
        <meta property="og:title" content="Top Movies | IMDb API App" />
        <meta property="og:description" content="Discover the top movies." />
        <meta property="og:image" content="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg" />
        <meta property="og:url" content="/search" />
      </Helmet>
    <SimpleNavbar />
    <div className='md:container md:mx-auto'>
      {categories.map((category, index) => (
        <div key={category.category}>
          <div className='flex flex-col p-4'>
            <div className='bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
              <div className='flex flex-col items-center drop-shadow-md bg-blend-color'>

                {category.details.map((detail) => (
                  <div key={detail.id} className='px-5 py-2.5 text-center me-2 mb-2'>
                      <div className='flex flex-col items-center bg-blend-color'>
                        <div className='flex flex-row drop-shadow-md'>
                          <div className='basis-1/3'>
                          <Link to={`/movies/${detail.imdbid}`}><img src={detail.image} alt={`${detail.image} Poster`} className='mb-2 w-full h-auto max-h-96 object-cover' /></Link>
                          </div>
                          <div className='basis-2/3 ml-2 md:ml-4 lg:ml-6 xl:ml-8 text-left text-lime-900'>
                            <h2><FontAwesomeIcon icon={faStar} />&emsp;{capitalizeFirstLetter(category.category)} movie&emsp;<FontAwesomeIcon icon={faStar} /></h2>
                            <h2 className='text-2xl md:text-2xl lg:text-3xl xl:text-3xl align-middle text-lime-900'>"{detail.name}" {detail.year}</h2>
                            <p className='text-xl md:text-2xl lg:text-3xl xl:text-3xl'>{detail.description}</p>
                          </div>
                        </div>
                        
                      </div>
                    <Link to={`/movies/${detail.imdbid}`}><CustomButton size="text-xl" fullWidth={true}><FontAwesomeIcon className='text-l md:text-lg lg:text-xl xl:text-xl truncate align-middle' icon={faArrowRight} />&emsp;&emsp;{detail.name}</CustomButton></Link>
                  </div>
                ))}
              </div>
            </div>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <BoxLiMore limit={4} randomize={true} />
            </ul>
          </div>
        </div>
        // ssss

      ))}
      <Footer />
    </div>
    </Layout>
    </>
  );
};

export default SearchPage;
