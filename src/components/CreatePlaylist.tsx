import styled from "@emotion/styled";
import { ChangeEvent, FormEvent } from "react";

interface ICreatePlaylist {
  playlist: {
    name: string;
    description: string;
  };
  handleFormChange: (e: ChangeEvent) => void;
  handleFormSubmit: (e: FormEvent) => void;
}

const CreatePlaylist = ({
  playlist,
  handleFormSubmit,
  handleFormChange,
}: ICreatePlaylist) => (
  <FormCreatePlaylist onSubmit={handleFormSubmit}>
    <LabelForm htmlFor="name">Playlist Name</LabelForm>
    <InputForm name="name" value={playlist.name} onChange={handleFormChange} />
    <LabelForm htmlFor="description">Playlist Description</LabelForm>
    <TextAreaForm
      rows={4}
      cols={30}
      name="description"
      value={playlist.description}
      onChange={handleFormChange}
      style={{resize: 'none'}}
    />
    <ButtonSubmit type="submit">Create Playlist</ButtonSubmit>
  </FormCreatePlaylist>
);

export default CreatePlaylist;

const FormCreatePlaylist = styled.form`
  display: flex;
  height: 200px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const LabelForm = styled.label`
  color: white;
`;

const InputForm = styled.input`
  color: black;
`;

const TextAreaForm = styled.textarea`
  color: black;
`;

const ButtonSubmit = styled.button`
  max-width: 150px;
  background-color: aquamarine;
  border: none;
  color: black;
  padding: 5px 12px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
`;
