//imports
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Row, Button } from "react-bootstrap";

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

  return (
    <Row className="justify-content-md-center">
      <Col md={12}>
        {!user ? (
          <Row>
            <Col md={5}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              <span>or</span>
              <SignupView />
            </Col>
          </Row>
        ) : selectedMovie ? (
          <Row>
            <Col md={8} style={{ border: "1px solid black" }}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              {movies.map((movie) => (
                <Col className='mb=5' key={movie._id} md={4}>
                  <MovieCard
                    movieData={movie}
                    onMovieClick={() => {
                      setSelectedMovie(movie);
                    }}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col xs={12}>
                <Button
                  onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};