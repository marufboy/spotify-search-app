import styled from "@emotion/styled";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TrackContainer from "./container/TrackContainer";
import { Button } from "@mantine/core";
import { CirclePlus } from "tabler-icons-react";
import { ModalBase } from "../../components/ModalBase";
import { getTracks, getUser, postPlaylist, postTrackToPlaylist } from "./lib";
import NavBarContainer from "./container/NavBarContainer";
import { FormPlaylist } from "../../components/FormPlaylist";
import { Item } from "../../types/spotify";
import { setUser } from "../../store/token/userSlice";

export function CreatePlaylistPage() {
  const [search, setSearch] = useState<string>("");
  const [tracks, setTracks] = useState<Item[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState({ name: "", description: "" });
  const [opened, setOpened] = useState<boolean>(false);

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

  const handleSelected = (id: string) => {
    const alreadySelected = selectedTracks.find(
      (selectedId) => selectedId === id
    );
    if (alreadySelected) {
      const filterSelected = selectedTracks.filter((item) => item !== id);
      setSelectedTracks(filterSelected);
    } else {
      setSelectedTracks((selectedTrack): string[] => [...selectedTrack, id]);
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
      <NavBarContainer />
      <InputContainer>
        <SearchBar handleInput={handleInput} handleSubmit={handleTracks} />
        {selectedTracks.length > 0 && (
          <Button
            leftIcon={<CirclePlus color="white" size={18} />}
            color="green"
            onClick={() => setOpened(true)}
          >
            Create Playlist
          </Button>
        )}
      </InputContainer>
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 25px;
  gap: 1.2rem;
  justify-content: flex-start;
`;
