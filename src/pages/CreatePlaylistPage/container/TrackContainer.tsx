import styled from "@emotion/styled";
import Album from "../../../components/Album";
import { Item } from "../../../types/spotify";

interface ITrackContainer {
  tracks: Item[];
  selectedTracks: string[];
  handleSelected: (id: string) => void;
}

const TrackContainer = ({
  tracks,
  selectedTracks,
  handleSelected,
}: ITrackContainer) => {
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
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
