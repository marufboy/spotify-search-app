import styled from "@emotion/styled";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { useAppSelector } from "../../hooks";
import TrackContainer from "./container/TrackContainer";
import { Button } from "@mantine/core";
import { CirclePlus } from "tabler-icons-react";
import { ModalComponents } from "../../components/ModalComponents";
import { getTracks, getUser, postPlaylist, postTrackToPlaylist } from "./lib";
import NavBarContainer from "./container/NavBarContainer";
import { FormPlaylist } from "../../components/FormPlaylist";

export function CreatePlaylistPage() {
  const [search, setSearch] = useState<string>("");
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState({ name: "", description: "" });
  const [opened, setOpened] = useState<boolean>(false);

  const globToken = useAppSelector((state) => state.token.value);

  const handleInput = (e: ChangeEvent) =>
    setSearch((e.target as HTMLInputElement).value);

  const handleTracks = async (e: FormEvent) => {
    e.preventDefault();
    const uri = `https://api.spotify.com/v1/search?q=${search}&type=track`;
    getTracks(globToken, uri)
      .then((res) => {
        console.log(JSON.stringify(res.data.tracks.items, null, 2));
        const data = res.data.tracks.items;
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
      postPlaylist(globToken, user, data)
        .then((res) => {
          const playlistID = res.data.id;
          postTrackToPlaylist(globToken, user, playlistID, selectedTracks);
        })
        .catch((err) => console.log(err.message));

      alert("Successfully added playlist");
      setPlaylist({ name: "", description: "" });
    } else {
      alert("Please add your select playlist");
      setPlaylist({ name: "", description: "" });
    }
  };

  const handleUser = async () => {
    if (globToken !== "") {
      getUser(globToken).then((res) => setUser(res.data.id));
    } else {
      return;
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
    handleUser();
  });

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
      <ModalComponents
        title="Create Playlist"
        isOpen={opened}
        setModal={setOpened}
      >
        <FormPlaylist
          playlist={playlist}
          handleFormChange={handleFormChange}
          handleFormSubmit={handlePlaylist}
        />
      </ModalComponents>
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
