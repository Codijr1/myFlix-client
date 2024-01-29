//imports
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Col, Row, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  //renders the movie list if a user is logged in
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        //debug
        // console.log('API Response:', response);
        return response.json();
      })
      .then((data) => {
        //debug
        // console.log('Data from API:', data);
        const moviesFromApi = data.map((movie) => ({
          Title: movie.title,
          Year: movie.year,
          Description: movie.description,
          Genre: movie.genre,
          Director: movie.director,
          _id: movie._id,
        }));
        // console.log('Transformed Movies:', moviesFromApi);
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error importing data', error);
      });
  }, [token]);


  //debug
  // console.log('Movies length:', movies.length);
  // console.log('Movies data:', movies);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => setUser(null)}
      />
      <Row className="justify-content-md-center">
        <Routes>
          {/* serves SignupView if no user is detected else MovieCard list*/}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          {/* serves LoginView if user is not detected else MovieCard list */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          {/* serves MovieView if MovieCard is clicked and user detected else LoginView*/}
          <Route
            path="/movies/:_id"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list appears empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          {/* serves MovieCard list unless lists cannot be populated */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Loading...</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col md={6} lg={4} xl={3} className="mb-5 col-8" key={movie._id}>
                        <Link to={`/movies/${movie._id}`}>
                          <MovieCard movieData={movie} />
                        </Link>
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          {/* serves profile view if user detected else login view */}
          <Route
            path="/users/profile"
            element={
              <>
                {user ? (
                  <ProfileView user={user} />
                ) : (
                  <Navigate to="/login" />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};