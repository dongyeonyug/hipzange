import { BrowserRouter as  Router,Route,Link,Switch } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from 'axios';

import Home from "./Home"
import Playlist from "./playlist"

function App() {



  return (
   

    <Router>
    <Switch>

  
    <Route path="/playlist/:id">
          <Playlist/>
        </Route>
   
        <Route path="/">
          <Home/>
          
        </Route>

        
        
        </Switch>
    </Router>
      
      
        
        )

 
}

export default App;
