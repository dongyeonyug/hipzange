


import { BrowserRouter as  Router,Route,Switch } from "react-router-dom";

import Auth from "./routes/Auth";

import Playlist from "./playlist"

import UserSearch from "./Usersearch";
import ChannelPlaylist from "./ChannelPlay";




const AppRouter = ({ isLoggedIn }) => {


  
    return (
    <Router>
    <Switch>

  
<Route path="/playlist/:id">
            <Playlist />
          </Route>
          

          
          <Route path="/channel/:id">
            <ChannelPlaylist />
          </Route>

    {isLoggedIn ? (
          <>
            <Route exact path="/">
            <UserSearch/>
            </Route>

          
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}


      </Switch>
    </Router>
  );
};

    export default AppRouter;