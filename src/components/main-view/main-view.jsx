//imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Row, FormControl, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { MovieModal } from "../movie-view/movie-modal";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { AnnouncementBanner } from "./announcementBanner";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import './main-view.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  //open modal
  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  //close modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

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
          Trailer: movie.trailer,
          Poster: movie.poster,
          _id: movie._id,
        }));
        //filtering movie cards
        const filtered = moviesFromApi.filter((movie) =>
          movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMovies(moviesFromApi);
        setFilteredMovies(filtered);
      })
      .catch((error) => {
        console.error('Error importing data', error);
      });
  }, [token, searchQuery]);

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
              <Col sm={12} md={10} lg={8}>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <SignupView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </Col>
            }
          />
          <Route
            path="/login"
            element={
              <Col sm={12} md={10} lg={8}>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </Col>
            }
          />
          <Route
            path="/movies/:_id"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>Loading...</Col>
              ) : (
                <Col sm={12} md={8}>
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
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <FormControl
                      type="text"
                      placeholder="Search films by title"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ margin: '10px 0', paddingRight: '35px' }}
                    />
                    {searchQuery && (
                      <Button
                        variant="outline-secondary"
                        onClick={() => setSearchQuery('')}
                        style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', padding: '2px 8px' }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  {searchQuery ? (
                    filteredMovies.map((movie) => (
                      <Col sm={12} lg={4} xl={3} className="mb-5 col-12 col-md-6 col-lg-4 col-xl-3" key={movie._id}>
                        <MovieCard movieData={movie} onCardClick={() => handleOpenModal(movie)} />
                      </Col>
                    ))
                  ) : (
                    movies.map((movie) => (
                      <Col sm={12} lg={4} xl={3} className="mb-5 col-12 col-md-6 col-lg-4 col-xl-3" key={movie._id}>
                        <MovieCard movieData={movie} onCardClick={() => handleOpenModal(movie)} />
                      </Col>
                    ))
                  )}
                </>
              )
            }
          />
          <Route
            path="/users/profile"
            element={
              user && movies ? (
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    toast.dismiss();
                  }}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Row>
      <MovieModal
        show={showModal}
        handleClose={handleCloseModal}
        movieData={selectedMovie}
        onAddToFavorites={handleAddToFavorites}
        user={user}
        size='xl'
      />
      <AnnouncementBanner></AnnouncementBanner>
    </BrowserRouter>
  );
};