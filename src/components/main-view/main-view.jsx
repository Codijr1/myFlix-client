import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from 'prop-types';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/movies")
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
      // just in case
      .catch((error) => {
        console.error('Error importing data', error);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

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
