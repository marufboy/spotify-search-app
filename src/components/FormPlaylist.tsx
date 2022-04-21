import styled from "@emotion/styled";
import { Textarea, TextInput, Button } from "@mantine/core";
import { ChangeEvent, FormEvent } from "react";

interface IFormPlaylist {
  playlist: {
    name: string;
    description: string;
  };
  handleFormChange: (e: ChangeEvent) => void;
  handleFormSubmit: (e: FormEvent) => void;
}

export const FormPlaylist = ({
  playlist,
  handleFormChange,
  handleFormSubmit,
}: IFormPlaylist) => (
  <FormCreatePlaylist onSubmit={handleFormSubmit}>
    <TextInput
      placeholder="Playlist name"
      label="Playlist Name"
      variant="filled"
      name="name"
      value={playlist.name}
      onChange={handleFormChange}
      style={{ width: "100%" }}
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
      style={{ width: "100%" }}
    />
    <Button color="green" type="submit">
      Save
    </Button>
  </FormCreatePlaylist>
);

const FormCreatePlaylist = styled.form`
  display: flex;
  height: 42vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;
