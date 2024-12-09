import React, {useState, useEffect}  from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';

function DeleteMovie(props) { 

    const [currentMovie, setName] = useState([]);
    let movieId=0;
    const [message, setMessage] = useState('');
    const token = sessionStorage.getItem("jwt");
  
    const path = window.location.pathname;
    const s = /\d+$/.exec(path)[0];
    console.log("Movie movieId="+s);
    movieId=s;
  
    useEffect(() => {
      fetchMovies()
     }, [] )
  
    const fetchMovies = ( ) => {
        setMessage('');
        console.log("fetchMovie "+movieId);
        fetch(`${SERVER_URL}/movie/${movieId}`, {
            headers: {'Authorization' : token}})
        .then((response) => response.json()) 
        .then((data) => { setName(data) })       
        .catch(err => { 
          setMessage("Exception. "+err);
          console.error("fetch Movie error "+ err);
        });
      }
  
      const deleteMovie = ( ) => {
        setMessage(''); 
        console.log("Movie.save ");     
        fetch(`${SERVER_URL}/movie/${movieId}` , 
            {  method: 'Delete',
               headers: {'Authorization' : token}})
        .then(res => {
          fetchMovies(movieId);
          setMessage("Movie Deleted.");
            
          })
          .catch(err => {
              setMessage("Exception. "+err);
              console.error('Save Movie exception =' + err);
          });
     };  
  
    const headers = ['Movie Title', 'Movie Rating', 'Movie Length'];
    
    return (
        <div>
            <h2 style={{color: "white"}}> Delete Movie </h2>
            <div margin="auto" >
            <h4 id="gmessage" style={{color: "white"}}>{message}&nbsp;</h4>
            <table className="Center"> 
                <thead>
                <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{currentMovie.movieTitle}</td>  
                    <td>{currentMovie.movieRating}</td>  
                    <td>{currentMovie.movieLength}</td>
                    </tr>
                </tbody>
            </table>
            <Button color="error" style={{margin: 10, width: 150, height: 30, color: "white", background: "black"}} id="submit" type="button" margin="auto" onClick={deleteMovie}> Delete Movie </Button>
            <Button color="error" component={Link} to={`/Movies`} style={{margin: 10, width: 100, height: 30, color: "white", background: "black"}}> Back </Button>
            </div>
        </div>
        )
    }
    
    export default DeleteMovie;    