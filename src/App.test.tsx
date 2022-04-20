import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "./store";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { CreatePlaylistPage } from "./pages/CreatePlaylistPage";


test("should render search page properly", async () => {
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

  expect( await screen.findAllByText('Search')).toBeInTheDocument();
  expect( await screen.findByRole('textbox')).toBeInTheDocument();

  expect( await screen.findAllByText('Tulus')).toBeVisible();
  expect( await screen.findAllByText('Diri')).toBeVisible();
});
