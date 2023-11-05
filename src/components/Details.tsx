import React, { useEffect, useState } from 'react';
import { EpisodeDetails, Results } from '../types/interface';

interface DetailsProps {
  characterDetails: Results;
  onClose: () => void;
}

export const Details: React.FC<DetailsProps> = ({
  characterDetails,
  onClose,
}) => {
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails[]>([]);

  useEffect(() => {
    if (characterDetails && characterDetails.episode) {
      Promise.all(
        characterDetails.episode.map((episodeUrl: string) =>
          fetch(episodeUrl).then((response) => response.json())
        )
      )
        .then((data) => {
          setEpisodeDetails(data);
        })
        .catch((error) => {
          console.error('Error fetching episode details: ', error);
        });
    }
  }, [characterDetails]);

  return (
    <div className="right-panel">
      <div className="character-details">
        <div className="close-button" onClick={onClose}>
          Close
        </div>
        <h2>{characterDetails.name}</h2>
        <img src={characterDetails.image} alt={characterDetails.name} />
        <p>Status: {characterDetails.status}</p>
        <p>Gender: {characterDetails.gender}</p>
        <p>Species: {characterDetails.species}</p>
        {episodeDetails && episodeDetails.length > 0 && (
          <div className="episode-details">
            <h3>Episode:</h3>
            <ul>
              {episodeDetails.map((episode) => (
                <li key={episode.id}>
                  <p>
                    {episode.episode} {episode.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
