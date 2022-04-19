import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { useAppSelector } from "../../hooks";
import TrackContainer from "./container/TrackContainer";
import { Button } from "@mantine/core";
import { CirclePlus } from "tabler-icons-react";
import { ModalPlaylist } from "../../components/ModalPLaylist";

export function CreatePlaylistPage() {
  const [search, setSearch] = useState<string | null>();
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState({ name: "", description: "" });
  const [opened, setOpened] = useState<boolean>(false);

  const globToken = useAppSelector((state) => state.token.value);

  const handleInput = (e: ChangeEvent) =>
    setSearch((e.target as HTMLInputElement).value);

  const handleTracks = async (e: FormEvent) => {
    e.preventDefault();
    const uri = `https://api.spotify.com/v1/search?q=${search}&type=track`;
    axios
      .get(uri, {
        params: { limit: 16, offset: 0 },
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + globToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const items = res.data.tracks.items;
        setTracks(items);
        console.log(items);
        console.log('this is typeof items',typeof items);
      });
  };

  const handlePlaylist = async (e: FormEvent) => {
    e.preventDefault();
    if (
      playlist.name.length > 10 &&
      playlist.description !== "" &&
      tracks.length > 0
    ) {
      const data = {
        name: playlist.name,
        description: playlist.description,
        public: false,
      };
      axios
        .post(`https://api.spotify.com/v1/users/${user}/playlists`, data, {
          headers: {
            Accept: "application/json",
            // Authorization: "Bearer " + token,
            Authorization: "Bearer " + globToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const playlistID = res.data.id;
          axios.post(
            `https://api.spotify.com/v1/users/${user}/playlists/${playlistID}/tracks`,
            tracks,
            {
              headers: {
                Accept: "application/json",
                // Authorization: "Bearer " + token,
                Authorization: "Bearer " + globToken,
                "Content-Type": "application/json",
              },
            }
          );
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
      axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + globToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => setUser(res.data.id));
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
      <ModalPlaylist
          isOpen={opened}
          setModal={setOpened}
          playlist={playlist}
          handleFormChange={handleFormChange}
          handleFormSubmit={handlePlaylist}
        />
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
