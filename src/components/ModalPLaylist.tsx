import { Modal, Textarea, TextInput, Button } from "@mantine/core";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import styled from "@emotion/styled";

interface IModal {
  isOpen: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  playlist: {
    name: string;
    description: string;
  };
  handleFormChange: (e: ChangeEvent) => void;
  handleFormSubmit: (e: FormEvent) => void;
}

export const ModalPlaylist = ({
  isOpen,
  setModal,
  playlist,
  handleFormChange,
  handleFormSubmit,
}: IModal) => (
  <Modal
    centered
    title="Create Playlist"
    opened={isOpen}
    onClose={() => setModal(false)}
  >
    <FormCreatePlaylist onSubmit={handleFormSubmit}>
      <TextInput
        placeholder="PLaylist name"
        label="Playlist Name"
        variant="filled"
        name="name"
        value={playlist.name}
        onChange={handleFormChange}
        style={{width: '100%'}}
      />
      <Textarea
        placeholder="Playlist description"
        label="Playlist Decription"
        variant="filled"
        minRows={4}
        cols={30}
        name="description"
        value={playlist.description}
        onChange={handleFormChange}
        style={{width: '100%'}}
      />
      <Button color="green" type="submit">
        Save
      </Button>
    </FormCreatePlaylist>
  </Modal>
);

const FormCreatePlaylist = styled.form`
  display: flex;
  height: 35vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
