import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';

function AddMovie(props) { 

  const [message, setMessage] = useState('');
  const [movie, setMovie] = useState({movieTitle: "", movieRating: "", movieLength: 0, priceId: 0});
  const token = sessionStorage.getItem("jwt");

  const handleChange = (event) => {
    setMovie({...movie, [event.target.name]:event.target.value});
    setMovie({...movie, [event.target.name]:event.target.value});
    setMovie({...movie, [event.target.name]:event.target.value});
    setMovie({...movie, [event.target.name]:event.target.value});
  }

  const newMovie = ( ) => {
    fetch(`${SERVER_URL}/movie`, 
          {  
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization' : token},
            body: JSON.stringify(movie)})
    .then((response) => {
      if(response.ok){
        setMessage("Movie Added");
      } else {
         setMessage("Failed to add Movie")
      }})
    .catch((err) => {
      setMessage(err)});
  }

  const handleAdd = () => {
    newMovie();
  }

  const headers = ['Movie Title', 'Movie Rating', 'Movie Length', 'Price Id'];

  return (
      <div>
      <h2 style={{color: "white"}}>Add Movie</h2>
            <div margin="auto" >
              <h4 id="gmessage" style={{color: "white"}} >{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                        <input type="text" name="movieTitle"  onChange={handleChange} />
                      </td>
                      <td>
                        <input type="text" name="movieRating" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="movieLength" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="priceId" onChange={handleChange} />
                      </td>
                    </tr>
                </tbody>
              </table>
              {/* <button id="submit" type="button" margin="auto" onClick={handleAdd}>Save Movie</button> */}
              <Button color="error" style={{margin: 10, width: 150, height: 30, color: "white", background: "black"}} id="submit" type="button" margin="auto" onClick={handleAdd}> Save Movie </Button>
              {/* <button> <Link to={`/`}>Back</Link></button> */}

              <Button color="error" component={Link} to={`/`} style={{margin: 10, width: 100, height: 30, color: "white", background: "black"}}> Back </Button>
            </div>
      </div>
  ); 
}

export default AddMovie;