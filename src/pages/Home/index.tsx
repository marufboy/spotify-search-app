import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../components/Login";
import { useAppSelector } from "../../hooks";
import { ErrorPage } from "../404";
import { CreatePlaylistPage } from "../CreatePlaylistPage";

export function Home() {
  const globToken = useAppSelector((state) => state.token.value);
  return (
    <>
      <Switch>
        <Route path={"/create-playlist"}>
          {globToken ? <CreatePlaylistPage /> : <Redirect to={"/"} />}
        </Route>
        <Route exact path={"/"}>
          <Login />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </>
  );
}
