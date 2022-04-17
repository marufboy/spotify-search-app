import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, MouseEvent, FormEvent, useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Album from "../../components/Album";
import { useAppSelector } from "../../hooks";
import TabButton from "../../components/TabButton";
import CreatePlaylist from "../../components/CreatePlaylist";

export function CreatePlaylistPage() {
  const [search, setSearch] = useState<string | null>();
  const [tracks, setTracks] = useState<any[]>([]);
  const [user, setUser] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState({ name: "", description: "" });
  const [boolTab, setBoolTab] = useState<boolean>(true);

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

  const handleTab = (e: MouseEvent) => {
    if ((e.target as HTMLInputElement).value === "search") {
      setBoolTab(true);
    } else {
      setBoolTab(false);
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
      <TabButton handleTab={handleTab} />
      {boolTab ? (
        <SearchBar handleInput={handleInput} handleSubmit={handleTracks} />
      ) : (
        <CreatePlaylist
          playlist={playlist}
          handleFormChange={handleFormChange}
          handleFormSubmit={handlePlaylist}
        />
      )}

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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: #333;
`;

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
