import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

export function WillWatch() {
  const state = useSelector((state) => state);
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        // logged in, use authObj
        fetchMovies();
      } else {
        navigate("/Login");
      }
    });
  }, []);

  async function fetchMovies() {
    const { uid } = auth.currentUser;
    if (!uid) return;
    const q = query(collection(db, "moviestowatch"), where("uid", "==", uid));

    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMoviesList(newData);
      //console.log(moviesList, newData);
    });
  }

  //delete record

  function deleteMovie(movieId) {
    const docRef = doc(db, "moviestowatch", movieId);

    deleteDoc(docRef)
      .then(() => {
        fetchMovies();
        alert("Movie has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="row" style={{ marginTop: "10px" }}>
        {
          // JSON.stringify(moviesList[1])
        }
        {}

        {moviesList.map((movie) => (
          <div key={movie.movieId} className="col-sm-2  col-6">
            <img
              width={220}
              src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}
            />
            <br />
            <b style={{ color: "#ffcfb8" }}>{movie.original_title}</b>
            <p style={{ color: "rgb(155, 155, 155)" }}>
              Released: {movie.release_date}
            </p>
            <span>
              <button
                className="btn btn-danger"
                onClick={() => deleteMovie(movie.id)}
              >
                Delete
              </button>
            </span>
            {/* <select className="form-select" aria-label="Default select example" onChange={changeLanguage}>
                        <option value={movie.id}>Now Watching</option>
                        <option value={movie.id}>Watched</option>
                        <option value={movie.id}>Won't Watch</option> 
                        </select> */}
          </div>
        ))}
      </div>
      {/*Add paging from material UI and pass in page whenever it is clicked */}
      {/* <Stack spacing={2} style={{margin:'10px'}}>
                <Typography>Page: {page}</Typography>
                <Pagination count={10} page={page} onChange={handleChange} color="secondary" />
            </Stack> */}
    </div>
  );
}
