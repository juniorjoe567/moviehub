import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import { Home } from "./Home";
import { Watched } from "./Watched";
import { WillWatch } from "./WillWatch";
import { Register } from "./Register";
import { Login } from "./Login";
import { Provider } from "react-redux";
import store from "./store";

//firebase
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  //const [value, setValue] = useState("");

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const watchedMovies = [];
  const WillWatchMovies = [];

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data) => {
      navigate("/home");
      //setValue(data.user.email);
      //localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    //setValue(localStorage.getItem("email"));
  });

  const signOut = () => {
    auth.signOut();
    navigate("/Login");
  };

  //function to add to array
  const addNumberToArray = (newNumber) => {
    watchedMovies.push(newNumber);
  };

  const addToWillWatch = (movie) => {
    WillWatchMovies.push(movie);
  };
  return (
    <Provider store={store}>
      <div
        className="container-fluid body"
        style={{ paddingRight: "0px", paddingLeft: "0px" }}
      >
        {/* <main className="container">
        <AppNavbar/>
        <About /> 
      <Projects />
       <Skills/> 
       <Testimonials /> 
       <Contact />
     </main> */}

        <nav
          className="navbar navbar-expand-lg shadow-sm bg-white rounded"
          style={{ background: "white" }}
        >
          <div
            className="container-fluid"
            style={{ paddingRight: "10px", paddingLeft: "10px" }}
          >
            <a className="navbar-brand" href="#">
              <img
                src="./material_ui.svg"
                alt="Bootstrap"
                width="30"
                height="24"
              />
              <span style={{ marginLeft: "10px" }}>
                <strong>MuvyHub</strong>
              </span>
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
                {user ? (
                  <>
                    <li className="nav-item m-1">
                      <Link className="" to="/home">
                        Now Showing
                      </Link>
                    </li>
                    <li
                      className="nav-item m-1"
                      style={{ marginRight: "10px" }}
                    >
                      <Link className="" to="/willwatch">
                        To Watch
                      </Link>
                    </li>
                    <li
                      className="nav-item m-1"
                      style={{ marginRight: "10px" }}
                    >
                      <Link className="" to="/watched">
                        Watched
                      </Link>
                    </li>
                  </>
                ) : (
                  <span></span>
                )}

                {user ? (
                  <li className="nav-item m-1">
                    <Link className="" onClick={signOut} to="/Login">
                      Sign out
                    </Link>
                  </li>
                ) : (
                  <>
                    {/* <li className="nav-item m-1">
                      <NavLink className="" onClick={googleSignIn}>
                        <img width={150} src={"./googlebtn.png"} />
                      </NavLink>
                    </li> */}
                  </>
                )}

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
                {/* <input
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
                </button> */}
                {user ? (
                  <span>{user.email}</span>
                ) : (
                  <>
                    <NavLink
                      className=""
                      to="/Register"
                      style={{ marginRight: "20px" }}
                    >
                      Create Account
                    </NavLink>

                    <NavLink
                      className=""
                      to="/Login"
                      style={{ marginRight: "20px" }}
                    >
                      Login
                    </NavLink>
                  </>
                )}
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
          <Route path="/watched" element={<Watched />} />
          <Route path="/willwatch" element={<WillWatch />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route exact path='/about' element={<About/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/skills' element={<Skills/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path="/" element={<Navigate to="/about" />} /> */}

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
