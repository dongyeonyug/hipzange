 
import { useEffect, useState } from "react";
import { useParams, useHistory} from "react-router-dom";

import axios from 'axios';

import ReactPlayer from "react-player";

import { authService } from "./fbase";

function Playlist(){



  


  const API_KEY = process.env.REACT_APP_YOUTUBE_KEY;
  let { id } = useParams();

let [videolist, setVideolist] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${API_KEY}`
      )
      .then((res) => {
       
        setVideolist(res.data.items);
      })
      .catch(() => {});
  }, []);



  let videoID = [];
 
  {
    videolist.map((x) => {
      videoID.push("&id=" + x.snippet.resourceId.videoId);
    });
  }
   let videoIDstring = videoID.join("");
   




   let [videoInfo, setVideoInfo] = useState([]);

   useEffect(() => {
     axios
       .get(
         `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics${videoIDstring}&maxResults=50&key=${API_KEY}`
       )
       .then((res) => {
       
         setVideoInfo(res.data.items);
       })
       .catch(() => {});
   }, [videolist]);



   const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

    return(
        
      <div >
        <div><button onClick={onLogOutClick}>Log Out</button> </div>
      {videoInfo&&videoInfo.map((i) => {
          return (
           


              
              <div className="App">
      <ReactPlayer
        className="player"
        url={`https://www.youtube.com/embed/${i.id}`}
        width="500px"
        heigth="300px"
        playing={false}
        muted={false}
        controls={true}
      />
      <h3>{i.snippet.localized.title}</h3>      
            
                  
            </div>
          );
        })}
    </div>
    )

    }

export default Playlist;