import { render, screen } from "./store/test-utils";
import userEvent from "@testing-library/user-event";
import { store } from "./store";
import { Provider } from "react-redux";
import { CreatePlaylistPage } from "./pages/CreatePlaylistPage";

test("should render search page properly", () => {
  render(
    <Provider store={store}>
      <CreatePlaylistPage />
    </Provider>
  );

  const SearchElement = screen.getByText(/Search/i);

  const InputElement = screen.getByRole("textbox");

  expect(SearchElement).toBeInTheDocument();
  expect(InputElement).toBeInTheDocument();

  userEvent.type(InputElement, "tulus");

  expect(screen.getByDisplayValue(/tulus/i)).toBeVisible();
});
