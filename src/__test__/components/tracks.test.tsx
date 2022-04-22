import TrackContainer from "../../pages/CreatePlaylistPage/container/TrackContainer";
import { render, screen } from "../../store/test-utils";
import { allDataTracks } from "../data/sampleData";

describe("track test on", () => {
  beforeEach(() =>
    render(
      <TrackContainer
        tracks={allDataTracks}
        selectedTracks={[]}
        handleSelected={(_) => console.log(_)}
      />
    )
  );

  it("should have title", () => {
    const title = screen.getAllByText(/Hati-Hati di Jalan/i);
    expect(title).toBeTruthy();
  });
});

test("should render track components properly", () => {
  render(
    <TrackContainer
      tracks={allDataTracks}
      selectedTracks={[]}
      handleSelected={(_) => console.log(_)}
    />
  );

  //   expect title
  expect(screen.getAllByText(/tulus/i)).toHaveLength(16);
  expect(
    screen.getByRole("heading", {
      name: /hati\-hati di jalan \- tulus/i,
    })
  ).toBeInTheDocument();

  // expect duration
  expect(screen.getByText(/4:02 minutes/i)).toBeVisible();

  const SelectButton = screen.getAllByText(/Select/i);
  expect(SelectButton).toHaveLength(16);
});
