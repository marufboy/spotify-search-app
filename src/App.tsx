import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useAppSelector } from "./hooks";
import { ErrorPage } from "./pages/404";
import { CreatePlaylistPage } from "./pages/CreatePlaylistPage";

function App() {
  const globToken = useAppSelector((state) => state.token.value);
  return (
      <BrowserRouter>
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
      </BrowserRouter>
  );
}

export default App;
