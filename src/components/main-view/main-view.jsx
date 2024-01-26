//imports
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Row, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Hardcoded sample movies for testing
  const hardcodedMovies = [
    { Title: 'Movie 1', Year: 2022, Description: 'Description 1', Genre: 'Action', Director: 'Director 1', _id: '1' },
    { Title: 'Movie 2', Year: 2023, Description: 'Description 2', Genre: 'Comedy', Director: 'Director 2', _id: '2' },
    // Add more sample movies as needed
  ];

  //renders the movie list if a user is logged in
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log('API Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data from API:', data);
        const moviesFromApi = data.map((movie) => ({
          Title: movie.title,
          Year: movie.year,
          Description: movie.description,
          Genre: movie.genre,
          Director: movie.director,
          _id: movie._id.$oid,
        }));
        console.log('Transformed Movies:', moviesFromApi);
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
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:Title"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Empty List 1</Col>
                ) : (
                  <Col md={8}>
                    <MovieView selectedMovie={selectedMovie} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Empty list 2</Col>
                ) : (
                  <Row>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movieData={movie} />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

//   return (
//     <Row className="justify-content-md-center">
//       <Col md={12}>
//         {!user ? (
//           <Row>
//             <Col md={5}>
//               <LoginView
//                 onLoggedIn={(user, token) => {
//                   setUser(user);
//                   setToken(token);
//                 }}
//               />
//               <span>or</span>
//               <SignupView />
//             </Col>
//           </Row>
//         ) : selectedMovie ? (
//           <Row>
//             <Col md={8} style={{ border: "1px solid black" }}>
//               <MovieView
//                 movie={selectedMovie}
//                 onBackClick={() => setSelectedMovie(null)}
//               />
//             </Col>
//           </Row>
//         ) : (
//           <>
//             <Row>
//               {movies.map((movie) => (
//                 <Col className='mb=5' key={movie._id} md={4}>
//                   <MovieCard
//                     movieData={movie}
//                     onMovieClick={() => {
//                       setSelectedMovie(movie);
//                     }}
//                   />
//                 </Col>
//               ))}
//             </Row>
//             <Row>
//               <Col xs={12}>
//                 <Button
//                   onClick={() => {
//                     setUser(null);
//                     setToken(null);
//                     localStorage.clear();
//                   }}
//                 >
//                   Logout
//                 </Button>
//               </Col>
//             </Row>
//           </>
//         )}
//       </Col>
//     </Row>
//   );
// };