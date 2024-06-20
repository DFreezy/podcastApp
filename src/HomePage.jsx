import React, { useEffect, useState } from 'react';

const genres = {
  0: 'All',
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

const ShowHome = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [sortOrder, setSortOrder] = useState('alphabetical');

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setShows(data);
        } else {
          setShows([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShows([]);
        setLoading(false);
      });
  }, []);

  const changeGenreHandler = (e) => {
    setSelectedGenre(Number(e.target.value));
  };

  const changeSortOrderHandler = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredShows = shows.filter(show => {
    return selectedGenre === 0 || show.genre === genres[selectedGenre];
  });

  const sortedShows = filteredShows.sort((a, b) => {
    switch (sortOrder) {
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'reverse-alphabetical':
        return b.title.localeCompare(a.title);
      case 'newest-to-oldest':
        return new Date(b.updated) - new Date(a.updated);
      case 'oldest-to-newest':
        return new Date(a.updated) - new Date(b.updated);
      default:
        return 0;
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-center my-4">Shows</h1>
      <div className="flex justify-center items-center my-4">
        <select
          name="genreFilter"
          value={selectedGenre}
          onChange={changeGenreHandler}
          className="p-2 border border-gray-300 rounded"
        >
          {Object.entries(genres).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        <select
          name="sortOrder"
          value={sortOrder}
          onChange={changeSortOrderHandler}
          className="ml-2 p-2 border border-gray-300 rounded"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="reverse-alphabetical">Reverse Alphabetical</option>
          <option value="newest-to-oldest">Newest to Oldest</option>
          <option value="oldest-to-newest">Oldest to Newest</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedShows.map(show => (
          <div key={show.id} className="bg-white p-4 rounded shadow-lg">
            <img className="w-full h-auto rounded" src={show.image} alt={show.title} />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{show.title}</h2>
              <p className="text-sm text-gray-600">Seasons: {show.seasons.length}</p>
              <p className="text-sm text-gray-600">Updated: {new Date(show.updated).toLocaleDateString()}</p>
              <a href={`/show/${show.id}`} className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowHome;
