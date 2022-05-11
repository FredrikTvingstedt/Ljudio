import PauseIcon from '@mui/icons-material/Pause'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import ShareIcon from '@mui/icons-material/Share'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { BrowserRouter as Router,Switch,Route,Link, useParams } from "react-router-dom"
import { Dialog } from '@mui/material';

export function Song (){
const [searchResult, setSearchResult] = useState([])
const [searchValue, setSearchValue] = useState("")
const [isPlaying, setIsPlaying] = useState(true)
const [playSongId, setPlaySongId] = useState("")
const [currentSong, setCurrentSong] = useState(0)
const [allSongIds, setAllSongIDs] = useState([])
const SONG_URL = "https://yt-music-api.herokuapp.com/api/yt/songs/search+"
const ARTIST_URL = "https://yt-music-api.herokuapp.com/api/yt/artists/search+"

const {id} = useParams()

useEffect(() => {
function playSongFromRouteParams() {
console.log("Inside useEffect. ParamID", id);
setPlaySongId(id)
setIsPlaying(false)
    }
  
playSongFromRouteParams()
  }, [id]);
  
const searchSong = async () => {        
const result = await axios.get(SONG_URL+searchValue)    
setSearchResult(result.data.content)    
setAllSongIDs(result.data.content.map((item) => {
return item.videoId
}))   
}

const searchArtist = async () => {        
const result = await axios.get(ARTIST_URL+searchValue)    
setSearchResult(result.data.content)    
setAllSongIDs(result.data.content.map((item) => {
return item.browseId
}))   
}


const playNext = () => {    
console.log("AllsongIds", allSongIds);
let videoid = allSongIds[currentSong + 1]
console.log("Video to play: ", videoid);
playSong(videoid)
}

const playPrevious = () => {
let videoid = allSongIds[currentSong - 1]
console.log("Video to play: ", videoid);
playSong(videoid)
}


const PlayButtons = () => {
return (
<div className="Controll">     
<PlayCircleIcon fontSize="large" onClick={() => setIsPlaying(true)}/>
<PauseIcon fontSize="large" onClick={() => setIsPlaying(false)}/>
<SkipPreviousIcon fontSize="large" onClick={() => playPrevious()}/>
<SkipNextIcon fontSize="large" onClick={() => playNext()}/>
</div>
)
} 

const playSong = (videoId) => {    
const videoIndex = allSongIds.findIndex((item) => item === videoId)
console.log("CurrentSongINDEX ", videoIndex);
setCurrentSong(videoIndex)
setPlaySongId(videoId)
}
  
const handleChange = (event) => {
setSearchValue(event.target.value);
};

console.log("Playsong ID: ", playSongId);
console.log("Isplaying: ", isPlaying);

return (
<div className="App">
<header className="App-header">
<h1>LjudioPlayer</h1>
<h3>A music player without any advertising</h3>
{playSongId && <ReactPlayer url={"https://www.youtube.com/watch?v="+playSongId} playing={isPlaying} width={0} height={0} /> }
<div>
<TextField id="outlined-basic" label="Search..." style={{margin:5}} variant="outlined" size="small" value={searchValue} onChange={handleChange}/>     
<Button style={{margin:5}} variant="contained" onClick={() => searchSong()}>Search Song</Button>
<PlayButtons videoId={playSongId}/>
</div>
<List>
{searchResult && searchResult.length && searchResult.map((item) => {
return (    
<ListItem>
<ListItemButton onClick={() => playSong(item.videoId)}>              
<ListItemText primary={item.name} />
</ListItemButton> 
<ListItemIcon>
<ShareIcon color="primary" onClick={() => alert("http://localhost:3000/song/"+item.videoId)}/>          
</ListItemIcon>     
</ListItem>
)
})}  
</List>        
</header>        
</div>  
  )
}











