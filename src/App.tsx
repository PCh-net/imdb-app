import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import Movies from './pages/MoviesIndex';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>        
          <Routes>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
