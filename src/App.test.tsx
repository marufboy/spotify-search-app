import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "./store";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { CreatePlaylistPage } from "./pages/CreatePlaylistPage";

test("renders learn react link", async () => {
  render(
    <Provider store={store}>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <CreatePlaylistPage />
      </MantineProvider>
    </Provider>
  );
  const SearchElement = screen.getByText(/Search/i);

  const InputElement = screen.getByRole("textbox");

  fireEvent.change(InputElement, { target: { value: "tulus" } });

  userEvent.click(SearchElement);
  
  //check input & button Search Bar
  expect(InputElement).toBeInTheDocument();
  expect(SearchElement).toBeInTheDocument();

  //Check track item are visible
  expect(await screen.findByRole('heading', {name: /diri/i})).toBeVisible();

  const SelectElement = screen.getByRole('button', {name: /select/i});

  expect(SelectElement).toBeInTheDocument();
});
