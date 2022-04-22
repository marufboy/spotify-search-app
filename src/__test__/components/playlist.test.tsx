import { FormPlaylist } from "../../components/FormPlaylist";
import { render, screen } from "../../store/test-utils";

test("should be render modal create playlist properly", async () => {
  render(
    <FormPlaylist
      playlist={{ name: "judul", description: "playlist baru" }}
      handleFormChange={() => console.log()}
      handleFormSubmit={() => console.log()}
    />
  );

  const LabelName = screen.getByLabelText(/Playlist Name/i);
  expect(LabelName).toBeInTheDocument();

  const LabelDescription = screen.getByLabelText(/Playlist Decription/i);
  expect(LabelDescription).toBeInTheDocument();

  const ButtonPlaylist = screen.getByText(/Save/i);
  expect(ButtonPlaylist).toBeInTheDocument();

  //expect input type pass data before
  expect(screen.getByDisplayValue("judul")).toBeTruthy();
});
