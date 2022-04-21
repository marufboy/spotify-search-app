import axios from "axios";

export function getUser(globToken: string) {
  return axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + globToken,
      "Content-Type": "application/json",
    },
  });
}

export function getTracks(globToken: string, uri: string) {
  return axios.get(uri, {
    params: { limit: 16, market: "ID", offset: 0 },
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + globToken,
      "Content-Type": "application/json",
    },
  });
}

export function postPlaylist(
  globToken: string,
  user: string,
  data: {
    name: string;
    description: string;
    public: boolean;
  }
) {
  return axios.post(
    `https://api.spotify.com/v1/users/${user}/playlists`,
    data,
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + globToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function postTrackToPlaylist(
  globToken: string,
  user: string,
  playlistID: string,
  selectedTracks: string[]
) {
  return axios.post(
    `https://api.spotify.com/v1/users/${user}/playlists/${playlistID}/tracks`,
    selectedTracks,
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + globToken,
        "Content-Type": "application/json",
      },
    }
  );
}
