//imports
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //renders the movie list if a user is logged in
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          Title: movie.title,
          Year: movie.year,
          Description: movie.description,
          Genre: movie.genre,
          Director: movie.director,
          _id: movie._id.$oid,
        }));
        setMovies(moviesFromApi);
      })
      //just in case
      .catch((error) => {
        console.error('Error importing data', error);
      });
  }, [token]);

  //Serves LoginView/SignupView if no user is logged in
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <span>or</span>
        <SignupView />
      </>
    );
  }

  //serves MovieView when a MovieCard is clicked
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  //Serves error if list is empty
  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  //renders list of MovieCards
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movieData={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  )
};