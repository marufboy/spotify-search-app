import styled from "@emotion/styled";
import { ActionIcon, Button, Navbar } from "@mantine/core";
import { useState } from "react";
import { Logout } from "tabler-icons-react";
import { ModalBase } from "../../../components/ModalBase";
import Profile from "../../../components/Profile";
import { useAppSelector } from "../../../hooks";

const NavBarContainer = () => {
  const user = useAppSelector((state) => state.user);
  const [opened, setOpened] = useState(false);

  const handleLogOut = () => {
    window.location.reload();
  };

  return (
    <Navbar height={60} p="xs">
      <Header>
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          alt="spotify"
        />
        <HeaderRight>
          <Button
            color="green"
            onClick={handleLogOut}
            leftIcon={<Logout color="white" size={25} />}
          >
            Log Out
          </Button>
          <ActionIcon size="lg" onClick={() => setOpened(true)}>
            <img src={user.profilImg} alt="profile image" />
          </ActionIcon>
        </HeaderRight>
      </Header>
      <ModalBase
        title="My Profile"
        isOpen={opened}
        setModal={() => setOpened(false)}
      >
        <Profile user={user} />
      </ModalBase>
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
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  img {
    border-radius: 100px;
    width: 45px;
  }
`;
