import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Aliens",
      image: "https://upload.wikimedia.org/wikipedia/en/f/fb/Aliens_poster.jpg",
      director: "James Cameron",
    },
    {
      id: 2,
      title: "Spirited Away",
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
      director: "Hayao Miyazaki",
    },
    {
      id: 3,
      title: "Whiplash",
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
      director: "Damien Chazelle",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
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

  return (
    <div>
      {movies.map((movies) => (
        <MovieCard
          key={movies.id}
          movieData={movies}
          onMovieClick={() => {
            setSelectedMovie(movies);
          }}
        />
      ))}
    </div>
  );
};
