import './App.css';
import Login from './components/Login';

function App() {
  return (
    // <div className="App">
    //   {/* <h2>Schedule</h2> */}
    //   <BrowserRouter>
    //       <div>
    //         <Switch>
    //           <Route exact path="/" component={Schedule} />
    //           <Route path="/addSchedule" component={AddSchedule} />
    //           <Route path="/editSchedule" component={EditSchedule} />
    //           <Route path="/deleteSchedule" component={DeleteSchedule} />
    //           <Route path="/addMovie" component={AddMovie} />
    //           <Route path="/movies" component={Movies} />
    //           <Route path="/deleteMovie" component={DeleteMovie} />
    //           <Route render={ () => <h1>Page not found</h1>} />
    //         </Switch>
    //       </div>
    //   </BrowserRouter>
    // </div>
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
