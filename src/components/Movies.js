import React, { useEffect, useState } from 'react';
import {SERVER_URL} from '../constants';
import './Movies.css'; // Import your CSS file
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';

const MoviesComponent = () => {
  const [movies, setMovie] = useState([]);
  const [message, setMessage] = useState('');
  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    // called once after intial render
    fetchMovies();
   }, [] )
  
   const fetchMovies = () => {
       console.log("fetchMovies");
       fetch(`${SERVER_URL}/movies`, {
        headers: {'Authorization' : token}
       })
       .then(response => response.json()) 
       .then(data => { 
         console.log("movies length "+ data.length);
         setMovie(data);
         console.log()
       })
       .catch(err => console.error(err)); 
   }

  const headers = ['Movie Title', 'Movie Rating', 'Movie Length', ' '];
    
    return (
      <div>
        <h2 style={{color: "white"}}> Movies </h2>
        <div margin="auto" >
          <h4 style={{color: "white"}} >{message}&nbsp;</h4>
              <table className="movie-table"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {movies.map((row, idx) => (
                    <tr key={idx} class="active-row" >
                      <td>
                        <Link to={`/movieSearch/${encodeURIComponent(row.movieTitle)}`}>
                          {row.movieTitle}
                        </Link>
                      </td>
                      <td>{row.movieRating}</td>
                      <td>{row.movieLength}</td>
                      <td> <Link to={`/deleteMovie/${row.movieId}`} > Delete </Link> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button color="error" component={Link} to={`/`} style={{margin: 10, width: 150, height: 30, color: "white", background: "black"}}> View Schedule </Button>
          </div>
      </div>
    )
};
export default MoviesComponent; 