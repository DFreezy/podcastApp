// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowHome from './HomePage'; // Adjust paths for other components
import Favorites from './Favorites';
import SignUp from './SignUp';
import Login from './Login';
import ShowDetails from './ShowDetails';

const App = () => {
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const addToFavorites = (episode, show, season) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorite = { episode, show, season, dateAdded: new Date() };
    const updatedFavorites = [...storedFavorites, newFavorite];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowHome />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/showdetails/:id" 
          element={<ShowDetails 
            selectedPodcast={selectedPodcast} 
            setSelectedPodcast={setSelectedPodcast} 
            addToFavorites={addToFavorites} 
          />} 
        />
        <Route path="*" element={<ShowHome />} />
      </Routes>
    </Router>
  );
};

export default App;
