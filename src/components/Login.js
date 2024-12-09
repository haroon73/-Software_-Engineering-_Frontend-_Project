import React, {useState} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Schedule from './Schedule';
import AddSchedule from './AddSchedule';
import EditSchedule from './EditSchedule';
import DeleteSchedule from './DeleteSchedule';
import AddMovie from './AddMovie';
import Movies from './Movies';
import DeleteMovie from './DeleteMovie';
import  {MovieSearch}  from './MovieSearch';
import {SERVER_URL} from '../constants';
import { Button } from '@mui/material';


function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        fetch(`${SERVER_URL}/login`, {
            method:'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => { 
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
        .catch(err => console.log(err));
    }

    if (isAuthenticated) {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Switch>
                        <Route exact path="/" component={Schedule} />
                        <Route path="/addSchedule" component={AddSchedule} />
                        <Route path="/movieSearch/:title" component={MovieSearch} />
                        <Route path="/editSchedule" component={EditSchedule} />
                        <Route path="/deleteSchedule" component={DeleteSchedule} />
                        <Route path="/addMovie" component={AddMovie} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/deleteMovie" component={DeleteMovie} />
                        <Route render={ () => <h1>Page not found</h1>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
          )
    } else {
        return (
            <div style={{margin: "250px", marginLeft: "auto", marginRight: "auto"}} >
                <table>
                    <tbody>
                        <tr><td>
                                <label htmlFor="username">Username</label>
                            </td><td>
                                <input type="text" name="username" value={user.username} onChange={onChange} />
                            </td></tr>
                            <tr><td>
                                <label htmlFor="password">Password</label>
                            </td><td>
                                <input type="text" name="password" value={user.password} onChange={onChange} />
                        </td></tr>
                    </tbody>
                </table>             
                <Button id="submit" color="error" onClick={login} style={{margin: 10, width: 100, height: 30, color: "white", background: "black"}}> Login </Button>
            </div>
        );
    }
}
export default Login;