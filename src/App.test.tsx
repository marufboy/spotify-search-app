import { render, screen } from "./store/test-utils";
import userEvent from "@testing-library/user-event";
import { store } from "./store";
import { Provider } from "react-redux";
import { CreatePlaylistPage } from "./pages/CreatePlaylistPage";

test("should render search page properly", () => {
  const access_token =
    "BQBeNIQogiY5ErqwVe_aYqQX5mfJcR9Ydi8yO2AgW0OOWZeA3MBN4-_KfFu8h8JmawUyCIJgRKiCLnW2OLt6n57ahX_ae7JgCI8ylgcKh8CTW-bEUoFLO1Yd9mnZqar20woNd1qAQ0f8HQwCNee0mYtbKxesqi5rewRyr_pH-u2S0S-32CfUokJBR-xDXCCaKalHbmz6pwMZ6EHdSR1cQLutqEUqKzk";

  render(
    <Provider store={store}>
      <CreatePlaylistPage />
    </Provider>,
    {
      preloadedState: {
        token: { value: access_token },
      },
    }
  );

  const SearchElement = screen.getByText(/Search/i);

  const InputElement = screen.getByRole("textbox");

  expect(SearchElement).toBeInTheDocument();
  expect(InputElement).toBeInTheDocument();

  userEvent.type(InputElement, "tulus");

  expect(screen.getByDisplayValue(/tulus/i)).toBeVisible();
});
