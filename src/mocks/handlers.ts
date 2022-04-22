import { rest } from "msw";
import MockTrackResponse from "./response/MockTrackResponse";
import MockUserResponse from "./response/MockUserResponse";

export const handlers = [
  rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
    console.debug(`${req.url.searchParams}`);
    return res(ctx.json(MockTrackResponse));
  }),
  rest.get("https://api.spotify.com/v1/me", (req, res, ctx) => {
    console.debug(req.headers);
    return res(ctx.json(MockUserResponse));
  }),
];
