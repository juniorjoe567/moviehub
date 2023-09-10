import { useSelector } from "react-redux";

export function WillWatch() {
  const state = useSelector((state) => state);
  return (
    <div>
      <div className="row" style={{ marginTop: "10px" }}>
        {
          // JSON.stringify(moviesList[1])
        }
        {}

        {state.willWatchMovies.map((movie) => (
          <div key={movie.id} className="col-sm-2">
            <img
              width={220}
              src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}
            />
            <br />
            <b style={{ color: "#ffcfb8" }}>{movie.original_title}</b>
            <p style={{ color: "rgb(155, 155, 155)" }}>
              Released: {movie.release_date}
            </p>
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
