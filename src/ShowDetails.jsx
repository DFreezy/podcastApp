import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShowDetails = ({ selectedPodcast, setSelectedPodcast, addToFavorites }) => {
  const audioRef = useRef(null);
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching show details: ${response.status}`);
        }
        const responseData = await response.json();
        setShowDetails(responseData);
        setLoading(false);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        setError("Error fetching show details. Please try again later.");
        setLoading(false);
      }
    };
    fetchShowDetails();
  }, [id]);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const toggleFavorite = () => {
    const isFavorite = selectedPodcast && selectedPodcast.id === id;
    if (isFavorite) {
      setSelectedPodcast(null); // Remove from favorites
    } else {
      setSelectedPodcast(showDetails); // Add to favorites
      addToFavorites(showDetails); // Optionally pass season and title as needed
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  };

  const handleAudioProgress = () => {
    // Handle audio progress update as needed
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!showDetails) {
    return <div>Show not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-3xl">
        <button onClick={handleBackClick} className="back-button mb-4">&larr; Back</button>
        <h1 className="text-3xl font-semibold mb-4">{showDetails.title}</h1>
        <img src={showDetails.image} alt={showDetails.title} className="w-full rounded-lg mb-4" />

        <p className="text-gray-700 mb-8">{showDetails.description}</p>

        <button
          onClick={toggleFavorite}
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ${selectedPodcast && selectedPodcast.id === id ? 'text-red-500 border border-red-500 hover:bg-red-500' : 'border border-blue-500 hover:bg-blue-700'}`}
        >
          {selectedPodcast && selectedPodcast.id === id ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>

        {selectedSeason ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">{selectedSeason.title}</h2>
            <img src={selectedSeason.image} alt={selectedSeason.title} className="w-full rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">Episodes</h3>
            {selectedSeason.episodes.map(episode => (
              <div key={episode.id} className="flex items-center justify-between py-2 border-b border-gray-300">
                <p className="text-lg">{episode.title}</p>
                <audio
                  ref={audioRef}
                  className="ml-4"
                  onTimeUpdate={handleAudioProgress}
                >
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div>
                  <button onClick={playAudio} className="text-blue-500 hover:text-blue-700 focus:outline-none ml-4">
                    {audioPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button onClick={pauseAudio} className="text-red-500 hover:text-red-700 focus:outline-none ml-2">
                    Stop
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold mb-4">Seasons</h2>
            {showDetails.seasons.map(season => (
              <div
                key={season.id}
                className="flex items-center justify-between py-2 border-b border-gray-300 cursor-pointer"
                onClick={() => handleSeasonSelect(season)}
              >
                <h3 className="text-lg">{season.title}</h3>
                <p className="text-gray-500">Episodes: {season.episodes.length}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
