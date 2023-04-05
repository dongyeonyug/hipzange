 
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";


import { authService } from "./fbase";
import { useHistory} from "react-router-dom";

import axios from 'axios';



function UserSearch(){



  


const API_KEY = process.env.REACT_APP_YOUTUBE_KEY;
const [completesearch, setcompletesearch] = useState(false);
const [search, setsearch] = useState("");
const [searchname, setsearchname] = useState("");

const onChange=(e)=>{

    setsearch(e.target.value);

}
  

const onSubmit=(e)=>{
    e.preventDefault();
    setsearchname(search);
    setcompletesearch(true);
   

}


let [channel, setchannel] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${searchname}&type=channel&key=${API_KEY}`
      )
      .then((res) => {
      
        setchannel(res.data.items);
      })
      .catch(() => {});
  }, [searchname]);


  
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  

    return(
        
      <div >
        <div><button onClick={onLogOutClick}>Log Out</button> </div>
      <form onSubmit={onSubmit}>

      <input
          name="search"
          type="text"
         
          required
          value={search}
          onChange={onChange}
        />
        <input type="submit"  />
      </form>

      <div>
      {completesearch ? 
      <div>   
    {channel.map((channel)=>{
      return (
      <div>
   <img src={channel.snippet.thumbnails.medium["url"]} alt="" />
   <Link to={`/channel/${channel.snippet.channelId}`}>
      <h1> {channel.snippet["title"]}</h1>
      </Link>
      </div>
   )}
     )}
    </div>:<img src=""/>}
</div>

    </div>
    )

    }

export default UserSearch;