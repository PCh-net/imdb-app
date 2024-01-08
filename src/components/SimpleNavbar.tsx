// components/SimpleNavbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniButton from './MiniButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons';

const SimpleNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="p-6 text-white">
      <div className="flex items-center justify-between">

      <Link to="/"><img src="/image/logo/IMDB_Logo_2016_120x60.png" alt="Logo" className="h-8" /></Link>

        <button className="focus:outline-none" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-3xl text-lime-100" />
        </button>
      </div>

      {isOpen && (
        <ul className="md:flex mt-2">
          <li>
            <Link to="/" onClick={toggleMenu}><MiniButton size="text-xl" fullWidth={true}><FontAwesomeIcon icon={faHouse} className="text-lime-800" />&emsp;Home page</MiniButton></Link>
          </li>
          <li>
            <Link to="/movies" onClick={toggleMenu}><MiniButton size="text-xl" fullWidth={true}>Movies by IMDb Rating</MiniButton></Link>
          </li>
          <li>
            <Link to="/search/" onClick={toggleMenu}><MiniButton size="text-xl" fullWidth={true}>Search</MiniButton></Link>
          </li>
          <li>
            <Link to="/search/matrix" onClick={toggleMenu}><MiniButton size="text-xl" fullWidth={true}>Search Matrix</MiniButton></Link>
          </li> 
          <li>
            <Link to="/categories" onClick={toggleMenu}><MiniButton size="text-xl" fullWidth={true}>Categories</MiniButton></Link>
          </li> 
        </ul>
      )}
    </nav>
  );
};

export default SimpleNavbar;
