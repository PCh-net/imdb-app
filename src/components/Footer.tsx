// components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

const Footer: React.FC = () => {
  return (
    <nav className="p-4 text-white">
      <div className="flex items-center justify-between">
        <Link to="/"><img src="/image/logo/logo_1_rgb_150px.png" alt="Logo" className="h-8" /></Link><p className='text-l text-lime-900 hover:text-lime-600 '>IMDb API 2024 - PCh</p>
        <button className="focus:outline-none" onClick={() => window.scrollTo(0, 0)}>
          <FontAwesomeIcon 
            icon={faCircleChevronUp} 
            className="text-3xl text-lime-900 hover:text-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 animate__animated animate__bounce animate__infinite"
          />
        </button>
      </div>
    </nav>
  );
};

export default Footer;
