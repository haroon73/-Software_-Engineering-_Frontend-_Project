import React, { useEffect, useState } from 'react';
import {SERVER_URL} from '../constants';
import './Schedule.css'; // Import your CSS file
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';

const ScheduleComponent = () => {
  const [schedule, setSchedule] = useState([]);
  const [message, setMessage] = useState('');
  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    // called once after intial render
    fetchSchedule();
   }, [] )
  
   const fetchSchedule = () => {
       console.log("fetchSchedule");
       fetch(`${SERVER_URL}/schedule`, {
        headers: {'Authorization' : token}
       })
       .then(response => response.json()) 
       .then(data => { 
         console.log("assignment length "+ data.length);
         setSchedule(data);
         console.log()
       })
       .catch(err => console.error(err)); 
   }

  const headers = ['Movie Title', 'Date', 'Start Time', 'End Time', ' Room Capacity', ' ', ' '];
    
    return (
      <div>
        <h2 style={{color: "white"}}> Schedules </h2>
        <div margin="auto" >
          <h4 style={{color: "white"}}>{message}&nbsp;</h4>
              <table className="schedule-table"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, idx) => (
                    <tr key={idx} class="active-row">
                      <td>
                        <Link to={`/movieSearch/${encodeURIComponent(row.movieTitle)}`}>
                          {row.movieTitle}
                        </Link>
                      </td>
                      <td>{row.date}</td>
                      <td>{row.start_time}</td>
                      <td>{row.end_time}</td>
                      <td>{row.roomCapacity}</td>
                      <td> <Link to={`/editSchedule/${row.scheduleId}`} > Edit </Link> </td>
                      <td> <Link to={`/deleteSchedule/${row.scheduleId}`} > Delete </Link> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button id="submit" color="error" component={Link} to={`/addSchedule`} style={{margin: 10, width: 135, height: 30, color: "white", background: "black"}}> Add Schedule </Button>
              <Button color="error" component={Link} to={`/addMovie`} style={{margin: 10, width: 135, height: 30, color: "white", background: "black"}}> Add Movie </Button>
              <Button color="error" component={Link} to={`/Movies`} style={{margin: 10, width: 135, height: 30, color: "white", background: "black"}}> Movies </Button>
          </div>
      </div>
    )
};
export default ScheduleComponent; 