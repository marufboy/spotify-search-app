import { rest } from "msw";
import MockTrackResponse from "./response/MockTrackResponse";

const _url = 'https://api.spotify.com/v1/search?q=tulus&type=track&limit=16&offset=0';

export const handlers = [
    rest.get(_url, (req, res, ctx) => {
        console.debug(`${req.headers}`)
        return res(ctx.json(MockTrackResponse))
    })
]