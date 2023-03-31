import { BrowserRouter as  Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from 'axios';


function Home(){



  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCY3jpJxcRPZtiR5gEthdO2g&maxResults=50&key=AIzaSyB18CRLS9UbO8nAfvMSjLwsigntsM_UtCQ"
      )
      .then((res) => {
        console.log(res);
        setPlaylist(res.data.items);
      })
      .catch(() => {});
  }, []);
  console.log(playlist);


  return(
    <div className="container">
            {playlist &&
              playlist.map((i, idx) => {
                return (
                  <div className="playlist" key={idx}>
                    <img src={i.snippet.thumbnails.high["url"]} alt="" />
                    <h1>
                      <Link to={`/playlist/${i.id}`}>
                      {i.snippet.localized["title"]}
                    </Link>
                    </h1>
                    <p>{i.snippet.localized["description"]}</p>
                  </div>
                );
              })}
          </div>
  );
  }

export default Home;