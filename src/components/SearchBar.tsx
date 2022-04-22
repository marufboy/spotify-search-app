import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { ChangeEvent, FormEvent } from "react";


interface ISearch {
  handleInput: (e: ChangeEvent) => void;
  handleSubmit: (e: FormEvent) => void;
}

const SearchBar = ({ handleInput, handleSubmit }: ISearch) => (
  <Form onSubmit={handleSubmit}>
    <SearchInput onChange={handleInput} name="input-music"/>
    <Button color="green" type="submit">
      Search
    </Button>
  </Form>
);

export default SearchBar;

const Form = styled.form`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-start;
`;

const SearchInput = styled.input`
  border-radius: 10px;
  background-color: #1f1f1f;
  color: white;
  border: 1px solid #009688;
  font-size: 16;
  max-width: 200px;
  padding: 8px 12px;
  &:focus {
    box-shadow: #009688 0 0 0 0.2rem;
    border-color: #009688;
  }
`;
