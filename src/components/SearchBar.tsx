import styled from "@emotion/styled";
import { ChangeEvent, FormEvent } from "react";

interface ISearch {
  handleInput: (e: ChangeEvent) => void;
  handleSubmit: (e: FormEvent) => void;
}

const SearchBar = ({ handleInput, handleSubmit }: ISearch) => (
  <Form onSubmit={handleSubmit}>
    <SearchInput onChange={handleInput} />
    <SearchButton>Search</SearchButton>
  </Form>
);

export default SearchBar;

const Form = styled.form`
  margin-top: 20px;
  width: 80vw;
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

const SearchButton = styled.button`
  max-width: 150px;
  background-color: #1f1f1f;
  border: none;
  color: white;
  padding: 8px 12px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #009688;
  }
`;
