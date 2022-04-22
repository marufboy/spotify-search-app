import styled from "@emotion/styled";
import { Button } from "@mantine/core";

interface IAlbum {
  image: string;
  title: string;
  artist: string;
  duration: number;
  select: () => void;
  isSelect: boolean;
}

const milistToMinute = (milis: number) => {
  const minutes: number = Math.floor(milis / 60000);
  const seconds = ((milis % 60000) / 1000).toFixed(0);
  return (
    minutes + ":" + (parseFloat(seconds) < 10 ? "0" : "") + seconds + " minutes"
  );
};

const colorButton = (isSelect: boolean) => {
  return isSelect ? "teal" : "gray";
};

const Album = ({
  image,
  title,
  artist,
  duration,
  select,
  isSelect,
}: IAlbum) => (
  <SongTrack>
    <SongLogo>
      <img src={image} alt="album image" />
    </SongLogo>
    <DetailTrack>
      <h1>{title} - {artist}</h1>
      <p>{milistToMinute(duration)}</p>
      <Button color={colorButton(isSelect)} onClick={select}>
        {isSelect ? "Select" : "Deselect"}
      </Button>
    </DetailTrack>
  </SongTrack>
);

const SongTrack = styled.div`
  width: 80vh;
  height: 18vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  border-radius: 5px;
  border: 2px solid grey;
  padding: 12px;
`;

const SongLogo = styled.div`
  margin-right: 20px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    box-shadow: 7px 10px 10px #000000, 0px 2px 2px #333;
  }
`;

const DetailTrack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: white;
  h1 {
    flex: 2;
    margin: 0;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
  p {
    flex: 1;
    margin: 0;
    font-size: 1rem;
    color: #efefef;
  }
  Button{
    margin-top: 3px;
    width: 25%;
  }
`;

export default Album;
