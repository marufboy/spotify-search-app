import styled from "@emotion/styled";
import Album from "../../../components/Album";

interface ISongs {
  uri: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  duration_ms: string;
}

interface ITrackContainer {
  tracks : ISongs[];
  selectedTracks: string[];
  handleSelected: (id: string) => void;
}

const TrackContainer = ({ tracks, selectedTracks, handleSelected } : ITrackContainer) => {
  return (
    <TracksContainer>
      {tracks.length > 0 &&
        tracks.map((track) => {
          return selectedTracks.includes(track.uri) ? (
            <Album
              key={track.uri}
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              duration={track.duration_ms}
              select={() => handleSelected(track.uri)}
              isSelect={false}
            />
          ) : (
            <Album
              key={track.uri}
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              duration={track.duration_ms}
              select={() => handleSelected(track.uri)}
              isSelect={true}
            />
          );
        })}
    </TracksContainer>
  );
};

export default TrackContainer;

const TracksContainer = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
