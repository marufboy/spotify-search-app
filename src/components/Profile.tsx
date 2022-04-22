import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { BrandSpotify } from "tabler-icons-react";
interface IProfile {
  user: {
    id: string;
    name: string;
    profilImg: string;
    spotifyUrl: string;
  };
}

const Profile = ({ user }: IProfile) => {
  const handleConnect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <ProfilContainer>
      <ProfilImage src={user.profilImg} alt="profile image" />
      <h1>{user.name}</h1>
      <h2>Follow me on Spotify</h2>
      <Button
        color="green"
        leftIcon={<BrandSpotify size={25} color="white"/>}
        onClick={() => handleConnect(user.spotifyUrl)} 
      >
        Connect
      </Button>
    </ProfilContainer>
  );
};

export default Profile;

const ProfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: white;
    font-size: 2rem;
  }
  h2 {
    margin-top: 0;
    color: #8d8daa;
    font-size: 1.2rem;
  }
`;

const ProfilImage = styled.img`
  width: 120px;
  border-radius: 100%;
`;
