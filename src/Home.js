import React, { useState, useEffect } from "react";
import { variables } from "./Variables";
import "./site.css";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { addToDataArray } from "./actions/watchedactions";
import { addToWillWatchDataArray } from "./actions/willwatchActions";
import { auth, db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function Home(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [movie1, setMovie1] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [overview, setOverview] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        // logged in, use authObj
        refreshList(1);
      } else {
        // not logged in
        navigate("/Login");
      }
    });
  }, []);

  async function refreshList(page) {
    try {
      const response = await fetch(
        `${variables.API_URL}?language=en-US&page=${page}&api_key=ebcfb0277eec8adca4b2a4d1e7652134`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const movies = await response.json();
      setMoviesList(movies.results);

      // Get random number to get header page
      let num = Math.floor(Math.random() * 20) + 1;
      //num == null ? (num = 1) : num;
      setMovie1(movies.results[num].original_title);
      setBgImage(
        `https://image.tmdb.org/t/p/original${movies.results[num].backdrop_path}`
      );
      setOverview(movies.results[num].overview);
      setPage(page);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event, value) => {
    refreshList(value);
  };

  const changeLanguage = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    console.log(selectedOption.text);
    var moviesSelected = moviesList.filter((mov) => {
      return mov.id == event.target.value;
    });

    moviesSelected.map(async (movi) => {
      const { uid, displayName, photoURL } = auth.currentUser;

      if (selectedOption.text.includes("Watched")) {
        //dispatch(addToDataArray(movi));

        await addDoc(collection(db, "watchedmovies"), {
          movieId: movi.id,
          poster_path: movi.poster_path,
          release_date: movi.release_date,
          original_title: movi.original_title,
          createdAt: serverTimestamp(),
          uid,
        });
        //props.addToDataArray(movi);
        //console.log(movi);
      } else {
        //call redux to add to list
        //dispatch(addToWillWatchDataArray(movi));
        await addDoc(collection(db, "moviestowatch"), {
          movieId: movi.id,
          poster_path: movi.poster_path,
          release_date: movi.release_date,
          original_title: movi.original_title,
          createdAt: serverTimestamp(),
          uid,
        });
      }
    });
  };

  const externalImage = bgImage;

  return (
    <>
      <div style={{ height: "600px", width: "100%" }}>
        <div
          className="landingImage"
          style={{
            backgroundImage: `url(${externalImage})`,
            backgroundSize: "cover",
            opacity: "1",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <span style={{ color: "white", fontSize: "50px" }}>{movie1}</span>
            <br />
            <span style={{ color: "white", fontSize: "18px" }}>{overview}</span>
          </div>
          <div style={{ color: "white", fontSize: "13px" }}></div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "10px" }}>
        {moviesList.map((movie) => (
          <div key={movie.id} className="col-sm-2">
            <img
              width={220}
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            />
            <br />
            <b style={{ color: "#ffcfb8" }}>{movie.original_title}</b>
            <p style={{ color: "rgb(155, 155, 155)" }}>
              Released: {movie.release_date}
            </p>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={changeLanguage}
            >
              <option value={movie.id}>Now Watching</option>
              <option value={movie.id}>Watched</option>
              <option value={movie.id}>Will Watch</option>
            </select>
          </div>
        ))}
      </div>
      <Stack spacing={2} style={{ margin: "10px" }}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={10}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </Stack>
    </>
  );
}

// const mapDispatchToProps = (state) => {
//   return {
//     addToDataArray: state.addToDataArray,
//   };
// };

// export default connect(null, mapDispatchToProps)(Home);
