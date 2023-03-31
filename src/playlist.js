 
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

import axios from 'axios';

import ReactPlayer from "react-player";

function Playlist(){



  



  let { id } = useParams();

let [videolist, setVideolist] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=AIzaSyB18CRLS9UbO8nAfvMSjLwsigntsM_UtCQ`
      )
      .then((res) => {
        console.log(res);
        //console.log(res.data.items);
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
   //console.log(videoIDstring);




   let [videoInfo, setVideoInfo] = useState([]);

   useEffect(() => {
     axios
       .get(
         `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics${videoIDstring}&maxResults=50&key=AIzaSyB18CRLS9UbO8nAfvMSjLwsigntsM_UtCQ`
       )
       .then((res) => {
         console.log(res);
         setVideoInfo(res.data.items);
       })
       .catch(() => {});
   }, [videolist]);


    return(
        
      <div >
      {videoInfo&&videoInfo.map((i, idx) => {
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