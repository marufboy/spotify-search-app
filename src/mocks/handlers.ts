import { rest } from "msw";
import MockTrackResponse from "./response/MockTrackResponse";

export const handlers = [
    rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
        console.debug(`${req.url.searchParams}`)
        return res(ctx.json(MockTrackResponse))
    })
]