import styled from "@emotion/styled";
import Album from "../../../components/Album";
import { Item } from "../../../types/spotify";

interface ISelectedTracksContainer {
  selectedTracks: Item[];
  handleSelected: (track: Item) => void;
}

const SelectedTracksContainer = ({
  selectedTracks,
  handleSelected,
}: ISelectedTracksContainer) => {
  return (
    <SelectedTrackContainer>
      {selectedTracks.length > 0 &&
        selectedTracks.map((track) => {
          return (
            <Album
              key={track.uri}
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              duration={track.duration_ms}
              select={() => handleSelected(track)}
              isSelect={false}
            />
          );
        })}
    </SelectedTrackContainer>
  );
};

export default SelectedTracksContainer;

const SelectedTrackContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-top: 80px;
  margin-bottom: 20px;
`;
