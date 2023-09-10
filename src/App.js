import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Movie from "./Movie";
import { Home } from "./Home";
import { Watched } from "./Watched";
import { WillWatch } from "./WillWatch";
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const watchedMovies = [];
  const WillWatchMovies = [];

  //function to add to array
  const addNumberToArray = (newNumber) => {
    watchedMovies.push(newNumber);
  };

  const addToWillWatch = (movie) => {
    WillWatchMovies.push(movie);
  };
  return (
    <Provider store={store}>
      <div className="container-fluid">
        {/* <main className="container">
        <AppNavbar/>
        <About /> 
      <Projects />
       <Skills/> 
       <Testimonials /> 
       <Contact />
     </main> */}

        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="./material_ui.svg"
                alt="Bootstrap"
                width="30"
                height="24"
              />
            </a>

            <button
              className="custom-toggler navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Projects</a>
        </li> */}
                <li className="nav-item m-1">
                  <NavLink className="" to="/home">
                    Now Showing
                  </NavLink>
                </li>
                <li className="nav-item m-1" style={{ marginRight: "10px" }}>
                  <NavLink className="" to="/willwatch">
                    To Watch
                  </NavLink>
                </li>
                <li className="nav-item m-1" style={{ marginRight: "10px" }}>
                  <NavLink className="" to="/watched">
                    Watched
                  </NavLink>
                </li>
                {/* <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li> */}
                {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
                {/* <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}
              </ul>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ borderRadius: "20px" }}
                />
                <button
                  className="btn btn-outline-info"
                  type="submit"
                  style={{ borderRadius: "20px" }}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            exact
            path="/home"
            element={
              <Home
                addNumberToArray={addNumberToArray}
                addToWillWatch={addToWillWatch}
              />
            }
          />
          <Route
            path="/watched"
            element={<Watched watchedMovies={watchedMovies} />}
          />
          <Route
            path="/willwatch"
            element={<WillWatch WillWatchMovies={WillWatchMovies} />}
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
