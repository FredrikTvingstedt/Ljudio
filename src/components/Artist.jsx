
import ShareIcon from '@mui/icons-material/Share'
import { Button, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
export function Artist (){
    
          const [searchResult, setSearchResult] = useState([])
          const [searchValue, setSearchValue] = useState("")
          const [artistName, setArtistName] = useState("")
          const ARTIST_URL = "https://yt-music-api.herokuapp.com/api/yt/artists/search+"
          const BROWSE_URL = "https://yt-music-api.herokuapp.com/api/yt/artists/"
          const {id} = useParams()
          useEffect(() => {
          async function searchForArtist() {
          console.log("Inside useEffect. ParamID", id);
          const result = await axios.get(BROWSE_URL+id) 
          console.log(result);    
          setArtistName(result.data.content[0].name)                    
        }
      
        searchForArtist()
      }, [id]);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
      };
      const searchArtist = async () => {        
        const result = await axios.get(ARTIST_URL+searchValue)    
        setSearchResult(result.data.content)    
        // setAllSongIDs(result.data.content.map((item) => {
        //   return item.browseId
        // }))   
      }
    return (
    
   <div className="App">               
       <header className="App-header">   
       <h1>LjudioPlayer</h1>
       <h3>A music player without any advertising</h3>

          <h3>Show Artist : {artistName}</h3>
         <div>   
         <TextField id="outlined-basic" label="Search..." style={{margin:5}} variant="outlined" size="small" value={searchValue} onChange=            	{handleChange}/>               
         <Button style={{margin:5}} variant="contained" onClick={() => searchArtist()}>Search Artist</Button>                                   
        </div>
         
         <List>
           {searchResult && searchResult.length && searchResult.map((item) => {
           return(  
             <ListItem>                
             <ListItemText primary={item.name} />
             <ListItemIcon>             
             <ShareIcon  onClick={() => alert("http://localhost:3000/artist/"+item.browseId)}/>             
             </ListItemIcon>     
             </ListItem>)
            })}
         </List> 
       </header>        
     </div>  
     )
}