//imports
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  //debug
  // console.log('Stored User:', storedUser);
  // console.log('Stored Token:', storedToken);
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
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error importing data', error);
      });
  }, [token]);

  //adding favorites
  const handleAddToFavorites = async (username, movieId) => {
    try {
      if (user.favoriteMovies.includes(movieId)) {
        toast.info('This movie is already in your favorites');
        return;
      }

      const response = await fetch(`https://myflixproject-9c1001b14e61.herokuapp.com/users/${username}/movies/${movieId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error adding movie to favorites:', errorResponse);
        return;
      }
      const updatedUserData = await response.json();
      setUser(updatedUserData);
      toast.success('Added to your favorites')
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          toast.dismiss();
        }}
      />
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <Col md={5}>
                {user ? <Navigate to="/" /> : <SignupView />}
              </Col>
            }
          />
          <Route
            path="/login"
            element={
              <Col md={5}>
                {user ? <Navigate to="/" /> : <LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }} />}
              </Col>
            }
          />
          <Route
            path="/movies/:_id"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list appears empty</Col>
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} user={user} onAddToFavorites={handleAddToFavorites} />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
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
              )
            }
          />
          <Route
            path="/users/profile"
            element={
              user && movies ? (
                <ProfileView user={user} token={token} movies={movies} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};