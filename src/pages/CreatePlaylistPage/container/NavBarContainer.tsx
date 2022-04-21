import styled from "@emotion/styled";
import { Button, Navbar } from "@mantine/core";

const NavBarContainer = () => {
  
  return (
    <Navbar height={60} p="xs">
      <Header>
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          alt="spotify"
        />
        <HeaderRight>
          <Button color="green">Log Out</Button>
        </HeaderRight>
      </Header>
    </Navbar>
  );
};

export default NavBarContainer;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  img {
    width: 120px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
`;
