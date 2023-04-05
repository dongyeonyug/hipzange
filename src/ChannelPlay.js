import { Link,useHistory,useParams} from "react-router-dom";
import { useEffect, useState,React } from "react";

import axios from 'axios';



import { authService } from "./fbase";


function ChannelPlaylist(){

  const API_KEY = process.env.REACT_APP_YOUTUBE_KEY;
  let { id } = useParams();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${id}&maxResults=50&key=${API_KEY}`
      )
      .then((res) => {
      
        setPlaylist(res.data.items);
      })
      .catch(() => {});
  }, []);
 


  
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return(
    <div className="container">
      <div><button onClick={onLogOutClick}>Log Out</button> </div>
            {playlist &&
              playlist.map((i, idx) => {
                return (
                  <div  key={idx}>
                    <img src={i.snippet.thumbnails.high["url"]} alt="" />
                    <h1>
                      <Link to={`/playlist/${i.id}`}>
                      {i.snippet.localized["title"]}
                    </Link>
                    </h1>
                   
                  </div>
                );
              })}
          </div>
  );
  }

export default ChannelPlaylist;