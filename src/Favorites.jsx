import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [filterOption, setFilterOption] = useState('all');

  // Fetch favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const saveFavoritesToLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleRemoveFavorite = (episodeId) => {
    const updatedFavorites = favorites.filter(favorite => favorite.episode.episode !== episodeId);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  const sortedFavorites = [...favorites].sort((itemA, itemB) => {
    switch (filterOption) {
      case 'titleAscending':
        return itemA.show.localeCompare(itemB.show) || itemA.episode.title.localeCompare(itemB.episode.title);
      case 'titleDescending':
        return itemB.show.localeCompare(itemA.show) || itemB.episode.title.localeCompare(itemA.episode.title);
      case 'dateAscending':
        return new Date(itemA.dateAdded) - new Date(itemB.dateAdded);
      case 'dateDescending':
        return new Date(itemB.dateAdded) - new Date(itemA.dateAdded);
      default:
        return 0;
    }
  });

  const handleFilterSelect = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className="favorites-container p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Episodes:</h1>
      <nav className="flex items-center justify-between mb-4">
        <label htmlFor="filterSelect" className="mr-2">Sort By:</label>
        <select
          id="filterSelect"
          onChange={handleFilterSelect}
          value={filterOption}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="titleAscending">Title A-Z</option>
          <option value="titleDescending">Title Z-A</option>
          <option value="dateAscending">Oldest</option>
          <option value="dateDescending">Latest</option>
        </select>
      </nav>
      {sortedFavorites.length > 0 ? (
        <ul className="favorites-list">
          {sortedFavorites.map(({ episode, show, season, dateAdded }) => (
            <li key={episode.episode} className="mb-4">
              <div className="p-4 border border-gray-300 rounded">
                <h3 className="text-xl font-bold mb-2">{show}</h3>
                <h4 className="text-lg mb-1">{`Season: ${season}`}</h4>
                <p className="mb-2">{`Episode ${episode.episode}: ${episode.title.slice(0, 25)}${episode.title.length > 25 ? '...' : ''}`}</p>
                <div className="audio-container mb-2">
                  <audio controls className="w-full">
                    <source src={episode.file} type="audio/mp3" />
                    Audio not supported by your browser.
                  </audio>
                </div>
                <p className="mb-2">Date Added: {new Date(dateAdded).toLocaleDateString()}</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleRemoveFavorite(episode.episode)}
                >
                  Remove from Favorites
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600">No favorites added yet. Add some from the episodes!</p>
      )}
    </div>
  );
};

export default Favorites;
