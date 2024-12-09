import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import './MovieSearch.css'; // Import your CSS file
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export const MovieSearch = () => {
  const [movieData, setMovieData] = useState(null);
  const { title } = useParams();
  const [open, setOpen] = useState(false)
  const history = useHistory(); // Get the history object

  const apiKey = 'f607a0e8';

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log('Title parameter:', title);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`);
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, [title]);


  return (
    <div>
    <Dialog open={handleClickOpen}>
        <DialogContent  style={{paddingTop: 20}} >
                {movieData && movieData.Response === 'True' ? (
            <div className="movie-details">
              <h2>{movieData.Title}</h2>
              <img src={movieData.Poster} alt={movieData.Title} class="center"/>
              <p>{movieData.Plot}</p>
              <p>Rated: {movieData.Rated}</p>
              <p>Released: {movieData.Released}</p>
              <p>Runtime: {movieData.Runtime}</p>
              <p>Genre: {movieData.Genre}</p>
              <p>Director: {movieData.Director}</p>
              <p>Writer: {movieData.Writer}</p>
              <p>Actors: {movieData.Actors}</p>
            </div>
          ) : (
            <p>No movie found with the title {title}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" component={Link} to={`/`} style={{margin: 10, width: 150, height: 30, color: "white", background: "black"}}>Close</Button>
        </DialogActions>
    </Dialog>  

    </div>
  );
};

export default MovieSearch;


