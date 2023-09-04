import logo from './logo.svg';
import './App.css';
import React,{ useState } from "react";
import Movie from './Movie';
import { Home } from './Home';
import {Watched} from './Watched';
import {WillWatch} from './WillWatch';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  const watchedMovies = [];
  const WillWatchMovies = [];

  //function to add to array
  const addNumberToArray = (newNumber) => {
    watchedMovies.push(newNumber);
  }

  const addToWillWatch = (movie) => {
    WillWatchMovies.push(movie);
  }
  return (
      <div className="App container-fluid" style={{background:'black',paddingBottom:"10px"}}>
           <nav className="navbar navbar-expand-sm navbar-dark" style={{padding: "5px 10px"}}>
           <a className="navbar-brand" href="#">
            {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/> */}
            Rukeya Movies
          </a>

            <ul className='navbar-nav'>
              <li className='nav-item m-1'>
                <NavLink className="" to="/home">
                  Now Showing
                </NavLink>
              </li>
              <li className='nav-item m-1'>
                <NavLink className="" to="/willwatch">
                  To Watch
                </NavLink>
              </li>
              <li className='nav-item m-1'>
                <NavLink className="" to="/watched">
                  Watched
                </NavLink>
              </li>
{/* 
              <li className='nav-item m-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/employee">
                  Employees
                </NavLink>
              </li> */}
            </ul>
          </nav>

          
          <Routes>
              {/* <Route exact path='/home' element={<Home/>}/> */}
               {/* <Route exact path='/watched' element={<Watched/>}/> */}
               <Route
                  path='/home'
                  element={<Home addNumberToArray={addNumberToArray} addToWillWatch={addToWillWatch} />}
                />
                <Route
                  path='/watched'
                  element={<Watched watchedMovies={watchedMovies} />}
                />
                <Route
                  path='/willwatch'
                  element={<WillWatch WillWatchMovies={WillWatchMovies} />}
                />
             {/* <Route exact path='/employee' element={<Employee/>}/> */}
          </Routes>
          
      </div>
  );
}

export default App;