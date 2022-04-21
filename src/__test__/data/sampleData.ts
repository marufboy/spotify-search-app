interface ISongs {
  uri: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  duration_ms: number;
}

export const allDataTracks: ISongs[] = [
  {
    album: {
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b273b55d26c578e30129b0a7e86e",
        },
      ],
    },
    artists: [
      {
        name: "Tulus",
      },
    ],
    duration_ms: 242000,
    name: "Hati-Hati di Jalan",
    uri: "spotify:track:2hHeGD57S0BcopfVcmehdl",
  },
  {
    album: {
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b273b55d26c578e30129b0a7e86e",
        },
      ],
    },
    artists: [
      {
        name: "Tulus",
      },
    ],
    duration_ms: 240000,
    name: "Diri",
    uri: "spotify:track:2qgjqbi96IAOBzZFC6H57U",
  },
];
