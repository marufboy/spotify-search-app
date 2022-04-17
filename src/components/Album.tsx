import styled from "@emotion/styled";

interface IAlbum {
  image: string;
  title: string;
  artist: string;
  duration: string;
  select: () => void;
  isSelect: boolean;
}

const milistToMinute = (milis: number) => {
  const minutes: number = Math.floor(milis/60000);
  const seconds = ((milis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (parseFloat(seconds) < 10 ? '0' : '') + seconds + ' minutes';
}

const Album = ({ image, title, artist, duration, select, isSelect}: IAlbum) => (
  <SongTrack>
    <SongLogo>
      <img src={image} alt="album image" />
    </SongLogo>
    <DetailTrack>
      <h1>{title}</h1>
      <p>{artist}</p>
      <p>{milistToMinute(parseInt(duration))}</p>
      <button onClick={select}>{isSelect ? 'Select' : 'Deselect'}</button>
    </DetailTrack>
  </SongTrack>
);

const SongTrack = styled.div`
  margin: 2px;
  width: 80vh;
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
  text-align: left;
  color: white;
  h1 {
    line-height: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
  p {
    line-height: 20px;
    font-size: 1rem;
    color: #efefef;
  }
`;

export default Album;
