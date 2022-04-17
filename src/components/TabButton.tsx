import styled from "@emotion/styled";
import { MouseEvent } from "react";

const TabButton = ({handleTab} : {handleTab: (e: MouseEvent) => void}) => (
  <ContainerTab>
    <button value={'search'} onClick={handleTab}>Search Tab</button>
    <button value={'form'} onClick={handleTab}>Create Playlist Tab</button>
  </ContainerTab>
);

export default TabButton;

const ContainerTab = styled.div`
  display: flex;
  height: 80px;
  width: 50vh;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  button {
    background-color: white;
    color: black;
    max-width: 150px;
    margin-bottom: 20px;
    border: none;
    padding: 5px 12px;
    text-decoration: none;
    font-size: 16px;
    border-radius: 10px;
  }
`;
