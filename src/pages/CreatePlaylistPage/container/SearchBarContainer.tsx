import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { CirclePlus } from "tabler-icons-react";
import SearchBar from "../../../components/SearchBar";
import { Item } from "../../../types/spotify";

interface ISearch {
  selectedTracks: Item[];
  handleInput: (e: ChangeEvent) => void;
  handleTracks: (e: FormEvent) => void;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const SearchBarContainer = ({ selectedTracks, handleInput, handleTracks, setOpened} : ISearch) => {

  return (
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
  );
};

export default SearchBarContainer;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 25px;
  gap: 1.2rem;
  justify-content: flex-start;
`;
