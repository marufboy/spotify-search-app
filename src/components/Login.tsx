import styled from "@emotion/styled";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Credential } from "../Credential";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setToken } from "../store/token/tokenSlice";
export default function Login() {
  const spotify = Credential();

  const globToken = useAppSelector((state) => state.token.value);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const getAccessToken = (hash: string) => {
    const stringAfterHash = hash.substring(1);
    const paramsInUrl = stringAfterHash.split("&");
    return paramsInUrl.reduce((acc: { [key: string]: string }, curVal) => {
      const [key, value] = curVal.split("=");
      acc[key] = value;
      return acc;
    }, {});
  };

  const handleClick = () => {
    window.location.href = `${spotify.AuthEndPoint}client_id=${
      spotify.ClientId
    }&redirect_uri=${spotify.RedirectUrl}&scope=${spotify.Scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const { access_token } = getAccessToken(hash);
      dispatch(setToken(access_token));
      history.push('/create-playlist');
      window.location.hash = "";

    }
  }, [globToken, dispatch]);
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify"
      />
      <button onClick={handleClick}>Login to Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
