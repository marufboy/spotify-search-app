import styled from "@emotion/styled";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TrackContainer from "./container/TrackContainer";
import { ModalBase } from "../../components/ModalBase";
import { getTracks, getUser, postPlaylist, postTrackToPlaylist } from "./lib";
import NavBarContainer from "./container/NavBarContainer";
import { FormPlaylist } from "../../components/FormPlaylist";
import { Item } from "../../types/spotify";
import { setUser } from "../../store/token/userSlice";
import SearchBarContainer from "./container/SearchBarContainer";
import SelectedTracksContainer from "./container/SelectedTracksContainer";

export function CreatePlaylistPage() {
  const [search, setSearch] = useState<string>("");
  const [tracks, setTracks] = useState<Item[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Item[]>([]);
  const [playlist, setPlaylist] = useState({ name: "", description: "" });
  const [opened, setOpened] = useState<boolean>(false);
  const [isSwitch, setSwitch] = useState<boolean>(true);

  const globToken = useAppSelector((state) => state.token.value);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleInput = (e: ChangeEvent) =>
    setSearch((e.target as HTMLInputElement).value);

  const handleTracks = async (e: FormEvent) => {
    e.preventDefault();
    const uri = `https://api.spotify.com/v1/search?q=${search}&type=track`;
    getTracks(globToken, uri)
      .then((res) => {
        const data = res.data.tracks.items as Item[];
        setTracks(data);
      })
      .catch((err) => console.log(err));
  };

  const handlePlaylist = async (e: FormEvent) => {
    e.preventDefault();
    if (playlist.name.length > 10 && playlist.description !== "") {
      const data = {
        name: playlist.name,
        description: playlist.description,
        public: false,
      };
      postPlaylist(globToken, user.id, data)
        .then((res) => {
          const playlistID = res.data.id;
          postTrackToPlaylist(globToken, user.id, playlistID, selectedTracks);
        })
        .catch((err) => console.log(err.message));
      setPlaylist({ name: "", description: "" });
    } else {
      setPlaylist({ name: "", description: "" });
    }
  };

  const handleSelected = (track: Item) => {
    const alreadySelected = selectedTracks.find(
      (selected) => selected.uri === track.uri
    );
    if (alreadySelected) {
      const filterSelected = selectedTracks.filter(
        (item) => item.uri !== track.uri
      );
      setSelectedTracks(filterSelected);
    } else {
      setSelectedTracks((selectedTrack): Item[] => [...selectedTrack, track]);
    }
  };

  const handleFormChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setPlaylist({ ...playlist, [name]: value });
  };

  useEffect(() => {
    getUser(globToken).then((res) => {
      const response = res.data;
      dispatch(
        setUser({
          id: response.id,
          name: response.display_name,
          profilImg: response.images[0].url,
          spotifyUrl: response.external_urls.spotify,
        })
      );
    });
  }, [user]);

  return (
    <Container>
      <NavBarContainer handleSwitch={setSwitch} />
      {isSwitch ? (
        <>
          <SearchBarContainer
            selectedTracks={selectedTracks}
            handleInput={handleInput}
            handleTracks={handleTracks}
            setOpened={setOpened}
          />
          <ModalBase
            title="Create Playlist"
            isOpen={opened}
            setModal={setOpened}
          >
            <FormPlaylist
              playlist={playlist}
              handleFormChange={handleFormChange}
              handleFormSubmit={handlePlaylist}
            />
          </ModalBase>
          <TrackContainer
            tracks={tracks}
            selectedTracks={selectedTracks}
            handleSelected={handleSelected}
          />
        </>
      ) : (
        <SelectedTracksContainer
          handleSelected={handleSelected}
          selectedTracks={selectedTracks}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: flex-start;
  flex-direction: column;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: #333;
`;
