
import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import './App.css'
import About from './components/About'
import { Artist } from './components/Artist'
import { Home } from './components/Home'
import { Song } from './components/Song'


function App() {  
  return (     
    <Router> 
    <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/song">Search Song</Link>
    <Link to="/artist">Show Artist</Link>
    </nav>
     
     <Switch>
       <Route exact path="/" component={Home}/>
         
       <Route exact path="/about" component={About}/>
       
        <Route path="/artist/:id?" component={Artist} /> 
       <Route path="/song/:id?" component={Song} />                
     </Switch>
   </Router>
  )
}

export default App

