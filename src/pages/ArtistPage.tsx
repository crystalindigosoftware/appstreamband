import React from 'react';
import { useParams } from 'react-router-dom';

// hooks
import useTrack from '../hooks/useTrack';

// components
import Song from '../components/Song/Song';
import Albums from '../components/Artist/Albums';
import Header from '../components/Artist/Header';

// types
import { IAlbum, IArtist, ITrack } from '../types/types';

// data
import albumData from '../data/albumData.json';

const ArtistPage: React.FC = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const id = paramId || 'ln2025';

  const { currentState, currentTrack } = useTrack();

  // Filtrar todos los álbumes del artista
  const artistAlbums: IAlbum[] = albumData.filter(album => album.artist.id === id);

  if (artistAlbums.length === 0) {
    return <div>Artist not found</div>;
  }

  const artist: IArtist = artistAlbums[0].artist;
  const songsToShow: ITrack[] = artistAlbums[0].tracks ? artistAlbums[0].tracks.slice(0, 5) : [];

  return (
    <main className="artist-page">
      <Header artist={artist} />
      <section className="container">
        <section>
          {songsToShow.length > 0 ? (
            songsToShow.map((track) => {
              const playing = currentState === 'playing' && currentTrack?.id === track.id;
              return (
                <Song
                  key={track.id}
                  album={artistAlbums[0]}
                  track={track}
                  playing={playing}
                />
              );
            })
          ) : (
            <p>No songs available</p>
          )}
        </section>
        <Albums url={`/artist/${artist.id}/albums`} title="Albums" albums={artistAlbums} />
      </section>
    </main>
  );
};

export default ArtistPage;
