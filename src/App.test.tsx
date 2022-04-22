import { render, screen } from "./store/test-utils";
import userEvent from "@testing-library/user-event";
import { store } from "./store";
import { Provider } from "react-redux";
import { CreatePlaylistPage } from "./pages/CreatePlaylistPage";

test("should render search page properly", async () => {
  render(
    <Provider store={store}>
      <CreatePlaylistPage />
    </Provider>,
    {
      preloadedState: {
        token: { value: "testToken" },
      },
    }
  );

  const SearchElement = screen.getByRole("button", { name: "Search" });

  const InputElement = screen.getByRole("textbox");

  expect(SearchElement).toBeInTheDocument();
  expect(InputElement).toBeInTheDocument();

  userEvent.type(InputElement, "tulus");
  userEvent.click(SearchElement);

  // await waitFor(() => ).toBeTruthy());
  expect(await screen.findAllByText(/minutes/i)).toHaveLength(16);

  expect(await screen.findAllByText(/tulus/i)).toHaveLength(16);
});
