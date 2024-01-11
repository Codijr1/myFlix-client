//imports
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //Serves LoginView if no user is logged in
  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }
  

  useEffect(()=>{
    if (!token) {
      return;
    }
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/movies",{
      headers: {Authorization: `Bearer ${token}`}
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
  },[token]);
  

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

<button onClick={() => { setUser(null);setToken(null); }}>Logout</button>

  return(
    <div>
      {movies.map((movie)=>(
        <MovieCard
          key={movie._id}
          movieData={movie}
          onMovieClick={()=>{
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};

//https://myflixproject-9c1001b14e61.herokuapp.com/
